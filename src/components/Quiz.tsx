import { useState } from 'react';
import { useI18n } from '../hooks/i18nContext';
import quizEn from '../data/quiz-en.json';
import quizFr from '../data/quiz-fr.json';
import '../index.css';

type QuizQuestion = {
    question: string;
    options: string[];
    answer: string;
    explanation: string;
    reference: string;
};

type UserResponse = {
    questionIndex: number;
    selected: string;
    isCorrect: boolean;
};

type QuizProps = {
    onClose: () => void;
};

export default function Quiz({ onClose }: QuizProps) {
    const { t, lang } = useI18n();
    const [scope, setScope] = useState('Overall Bible');
    const [difficulty, setDifficulty] = useState('Medium');
    const [questionCount, setQuestionCount] = useState(5);

    const [isGenerating, setIsGenerating] = useState(false);
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [userResponses, setUserResponses] = useState<UserResponse[]>([]);
    const [currentQ, setCurrentQ] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [showResult, setShowResult] = useState(false);

    const generateQuiz = () => {
        setIsGenerating(true);
        setQuestions([]);
        setUserResponses([]);
        setCurrentQ(0);
        setScore(0);
        setShowResult(false);
        setSelectedAnswer(null);

        // 1. Select the correct language dataset
        const dataset = lang === 'fr' ? quizFr : quizEn;

        // 2. Filter the dataset based on user selection (Scope & Difficulty)
        // If the user selects "Medium", we can optionally include Easy questions too so the pool is larger,
        // but for now we strictly filter to match.
        const filteredPool = dataset.filter(q => 
            q.scope === scope && q.difficulty === difficulty
        );

        // 3. Fallback: If we don't have enough exact matches, just use the whole language dataset
        const poolToUse = filteredPool.length >= questionCount ? filteredPool : dataset;

        // 4. Shuffle the pool randomly
        const shuffled = [...poolToUse].sort(() => 0.5 - Math.random());

        // 5. Slice the requested number of questions
        const selectedQuestions = shuffled.slice(0, questionCount);

        // Add a tiny delay just so the button "Loading" state flickers for UX, feeling like it built something
        setTimeout(() => {
            setQuestions(selectedQuestions);
            setIsGenerating(false);
        }, 400);
    };

    const checkAnswer = (opt: string, ans: string) => {
        const normOpt = opt.trim().toLowerCase();
        const normAns = ans.trim().toLowerCase();
        // Exact match
        if (normOpt === normAns) return true;
        // Strip prefix "a: " or "a. " or "a) " from option and compare
        const strippedOpt = normOpt.replace(/^[a-d]\s*[:.)-]\s*/, '').trim();
        if (strippedOpt === normAns) return true;
        // Handle case where answer is just the letter "A"
        if (normAns.length === 1 && normAns.match(/[a-d]/)) {
            if (normOpt.startsWith(normAns)) return true;
        }
        return false;
    };

    const handleAnswer = (option: string) => {
        if (selectedAnswer !== null) return;
        setSelectedAnswer(option);
        const isCorrect = checkAnswer(option, questions[currentQ].answer);
        if (isCorrect) {
            setScore(s => s + 1);
        }
        setUserResponses(prev => [...prev, {
            questionIndex: currentQ,
            selected: option,
            isCorrect: isCorrect
        }]);
    };

    const nextQuestion = () => {
        if (currentQ < questions.length - 1) {
            setCurrentQ(q => q + 1);
            setSelectedAnswer(null);
        } else {
            setShowResult(true);
        }
    };

    if (showResult) {
        return (
            <div className="app-main" style={{ justifyContent: 'center', alignItems: 'center', height: 'auto', padding: '4rem 1rem' }}>
                <div className="glass-container" style={{ width: '100%', maxWidth: '700px' }}>
                    <div style={{ textAlign: 'center' }}>
                        <h2>{t('quizCompleted')}</h2>
                        <p style={{ fontSize: '1.5rem', fontWeight: 600, margin: '1.5rem 0' }}>
                            {t('quizTotalScore')} {score} / {questions.length}
                        </p>
                    </div>

                    <div style={{ marginTop: '2.5rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '2rem' }}>
                        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>{lang === 'fr' ? 'Récapitulatif' : 'Quiz Recap'}</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            {questions.map((q, idx) => {
                                const resp = userResponses.find(r => r.questionIndex === idx);
                                return (
                                    <div key={idx} style={{ padding: '1rem', background: 'rgba(0,0,0,0.03)', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                                        <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>{idx + 1}. {q.question}</p>
                                        <p style={{ fontSize: '0.9rem', color: resp?.isCorrect ? '#10b981' : '#ef4444' }}>
                                            {lang === 'fr' ? 'Votre réponse : ' : 'Your answer: '} {resp?.selected}
                                        </p>
                                        {!resp?.isCorrect && (
                                            <p style={{ fontSize: '0.9rem', color: '#10b981', marginTop: '0.2rem' }}>
                                                {lang === 'fr' ? 'Réponse correcte : ' : 'Correct answer: '} {q.answer}
                                            </p>
                                        )}
                                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.8rem', fontStyle: 'italic' }}>
                                            {q.explanation} — <span style={{ fontWeight: 600 }}>{q.reference}</span>
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '3rem' }}>
                        <button className="glass-button primary-button" onClick={generateQuiz}>
                            {t('quizRestart')}
                        </button>
                        <button className="glass-button" onClick={onClose}>
                            {t('quizClose')}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (questions.length > 0) {
        const q = questions[currentQ];
        return (
            <div className="app-main" style={{ justifyContent: 'center', alignItems: 'center' }}>
                <div className="glass-container" style={{ width: '100%', maxWidth: '600px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        <span>Question {currentQ + 1} of {questions.length}</span>
                        <span>Score: {score}</span>
                    </div>

                    <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>{q.question}</h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {q.options.map((opt, i) => {
                            let btnClass = "glass-button";
                            if (selectedAnswer !== null) {
                                if (checkAnswer(opt, q.answer)) btnClass += " completed";
                                else if (opt === selectedAnswer) btnClass += " incorrect";
                                else btnClass += " incorrect"; // Re-evaluate if we want all red
                            }
                            return (
                                <button
                                    key={i}
                                    className={btnClass}
                                    style={{ justifyContent: 'flex-start', padding: '1rem', fontSize: '1.1rem' }}
                                    onClick={() => handleAnswer(opt)}
                                    disabled={selectedAnswer !== null}
                                >
                                    {opt}
                                </button>
                            );
                        })}
                    </div>

                    {selectedAnswer && (
                        <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
                            <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                                {lang === 'fr' ? 'Explication :' : 'Explanation:'}
                            </p>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5, fontSize: '0.95rem' }}>
                                {q.explanation}
                            </p>
                            <p style={{ marginTop: '0.8rem', fontWeight: 700, fontSize: '0.9rem', color: 'var(--accent-color)' }}>
                                {q.reference}
                            </p>
                            
                            <button 
                                className="glass-button primary-button" 
                                style={{ width: '100%', marginTop: '1.5rem' }}
                                onClick={nextQuestion}
                            >
                                {currentQ < questions.length - 1 ? (lang === 'fr' ? 'Suivant' : 'Next') : (lang === 'fr' ? 'Voir Résultats' : 'See Results')}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="app-main" style={{ justifyContent: 'center', alignItems: 'center' }}>
            <button className="back-button" onClick={onClose} style={{ alignSelf: 'flex-start', marginLeft: 'max(0px, calc(50% - 300px))' }}>
                {t('backToBible')}
            </button>

            <div className="glass-container" style={{ width: '100%', maxWidth: '600px' }}>
                <h2 style={{ textAlign: 'center' }}>{t('aiQuizTitle')}</h2>
                <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>
                    {t('aiQuizSub')}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>{t('quizTopicLabel') || 'Scope'}</label>
                        <select
                            className="ai-input"
                            style={{ width: '100%', appearance: 'none' }}
                            value={scope}
                            onChange={e => setScope(e.target.value)}
                        >
                            <option value="Overall Bible">{t('overallBible') || 'Overall Bible'}</option>
                            <option value="Old Testament">{t('otText')}</option>
                            <option value="New Testament">{t('ntText')}</option>
                            <option value="The Gospels">{t('gospelsText') || 'The Gospels'}</option>
                        </select>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>{t('quizDifficultyLabel') || 'Difficulty'}</label>
                        <select
                            className="ai-input"
                            style={{ width: '100%', appearance: 'none' }}
                            value={difficulty}
                            onChange={e => setDifficulty(e.target.value)}
                        >
                            <option value="Easy">{t('diffEasy') || 'Easy'}</option>
                            <option value="Medium">{t('diffMedium') || 'Medium'}</option>
                            <option value="Hard">{t('diffHard') || 'Hard'}</option>
                        </select>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>{t('numberOfQuestions') || 'Number of Questions'}</label>
                        <select
                            className="ai-input"
                            style={{ width: '100%', appearance: 'none' }}
                            value={questionCount}
                            onChange={e => setQuestionCount(Number(e.target.value))}
                        >
                            <option value={3}>3 {t('questions') || 'Questions'}</option>
                            <option value={5}>5 {t('questions') || 'Questions'}</option>
                            <option value={10}>10 {t('questions') || 'Questions'}</option>
                        </select>
                    </div>
                </div>

                <button
                    className="glass-button primary-button"
                    style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}
                    onClick={generateQuiz}
                    disabled={isGenerating}
                >
                    {isGenerating ? t('quizLoading') : t('quizStart')}
                </button>
            </div>
        </div>
    );
}
