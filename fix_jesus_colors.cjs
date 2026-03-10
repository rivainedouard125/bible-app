const fs = require('fs');

const cssFile = 'src/index.css';
let cssContent = fs.readFileSync(cssFile, 'utf-8');

// 1. Ensure variables exist and are correct
// We want a darker gold for light mode to be readable on white
const lightThemeVars = `  --on-accent: #ffffff;
  --jesus-accent: #745b08;
  --jesus-accent-rgb: 116, 91, 8;
  --jesus-muted: #e4d0b4;`;

const darkThemeVars = `  --pattern-color: rgba(255, 255, 255, 0.05);
  --jesus-accent: #d4af37;
  --jesus-accent-rgb: 212, 175, 55;
  --jesus-muted: #d1bea8;`;

// Replace previous attempts if any
cssContent = cssContent.replace(/--jesus-accent: #8a6d0a;[\s\n]*--jesus-accent-rgb: 138, 109, 10;/, '--jesus-accent: #745b08;\n  --jesus-accent-rgb: 116, 91, 8;');

// Map specific problematic yellowish/white colors to theme-aware variables
// Large titles that were #fcebd2
cssContent = cssContent.replace(/color: #fcebd2;/gi, 'color: var(--text-primary);');
// Pullquotes that were #fdf5e6
cssContent = cssContent.replace(/color: #fdf5e6;/gi, 'color: var(--text-primary);');
// Small text that was #e4d0b4
cssContent = cssContent.replace(/color: #e4d0b4;/gi, 'color: var(--text-secondary);');

// Ensure any remaining #d4af37 is variable-ized
cssContent = cssContent.replace(/#d4af37/gi, 'var(--jesus-accent)');

// Ensure any remaining rgba(232, 216, 192, ...) is mapped to text color
cssContent = cssContent.replace(/rgba\(\s*232,\s*216,\s*192,\s*([\d.]+)\s*\)/g, 'rgba(var(--text-primary-rgb), $1)');

fs.writeFileSync(cssFile, cssContent);

console.log('Successfully refined Jesus section colors for better readability in light mode.');
