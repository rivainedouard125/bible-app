import { useState } from 'react';
import { useI18n } from '../hooks/i18nContext';
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
    llmModel: string;
    onClose: () => void;
};

export default function Quiz({ llmModel, onClose }: QuizProps) {
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

    const generateQuiz = async () => {
        setIsGenerating(true);
        setQuestions([]);
        setUserResponses([]);
        setCurrentQ(0);
        setScore(0);
        setShowResult(false);
        setSelectedAnswer(null);

        const prompt = `Generate a ${questionCount}-question multiple choice quiz about ${scope} at a ${difficulty} difficulty level.
${lang === 'fr' ? 'IMPORTANT: You MUST write the questions, options, and explanations in French.' : ''}
Respond ONLY with a raw JSON object. Do NOT include prefixes like "A:", "B:", or "1." in the options.
CRITICAL: The "answer" field MUST be EXACTLY the same string as one of the four strings in the "options" array.
Format:
{
  "questions": [
    {
      "question": "Who built the ark?",
      "options": ["Noah", "Abraham", "Moses", "David"],
      "answer": "Noah",
      "explanation": "God told Noah to build an ark to save his family and animals from the flood.",
      "reference": "Genesis 6:14-22"
    }
  ]
}`;


        try {
            const response = await fetch('/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: llmModel,
                    messages: [{ role: 'user', content: prompt }],
                    stream: false,
                    format: 'json'
                })
            });

            if (!response.ok) throw new Error('API Error');
            const data = await response.json();
            const parsed = JSON.parse(data.message.content);

            if (parsed.questions && Array.isArray(parsed.questions)) {
                // Safety net: Ensure answer is always in options (even if LLM fails)
                const validatedQuestions = parsed.questions.map((q: QuizQuestion) => {
                    const hasAnswer = q.options.some(opt => 
                        opt.trim().toLowerCase() === q.answer.trim().toLowerCase()
                    );
                    if (!hasAnswer && q.options.length > 0) {
                        const randomIndex = Math.floor(Math.random() * q.options.length);
                        q.options[randomIndex] = q.answer;
                    }
                    return q;
                });
                setQuestions(validatedQuestions);
            } else {
                throw new Error('Invalid JSON structure');
            }
        } catch (err) {
            console.error('Quiz Generation Error', err);
            // Fallback questions if Ollama fails or is offline
            if (lang === 'fr') {
                setQuestions([
                    {
                        question: "Qui a construit l'arche ?",
                        options: ["Noé", "Moïse", "Abraham", "David"],
                        answer: "Noé",
                        explanation: "Noé a construit l'arche selon les instructions de Dieu pour sauver sa famille et les animaux durant le déluge.",
                        reference: "Genèse 6:14"
                    },
                    {
                        question: "En combien de jours Dieu a-t-il créé le monde ?",
                        options: ["3", "5", "6", "7"],
                        answer: "6",
                        explanation: "La Bible déclare que Dieu a créé le monde en six jours et s'est reposé le septième jour.",
                        reference: "Genèse 1"
                    }
                ]);
            } else {
                setQuestions([
                    {
                        question: "Who built the ark?",
                        options: ["Noah", "Moses", "Abraham", "David"],
                        answer: "Noah",
                        explanation: "Noah built the ark according to God's instructions to save his family and the animals.",
                        reference: "Genesis 6:14"
                    },
                    {
                        question: "How many days did it take God to create the world?",
                        options: ["3", "5", "6", "7"],
                        answer: "6",
                        explanation: "The Bible states that God created the world in six days and rested on the seventh.",
                        reference: "Genesis 1"
                    }
                ]);
            }
        } finally {
            setIsGenerating(false);
        }
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
