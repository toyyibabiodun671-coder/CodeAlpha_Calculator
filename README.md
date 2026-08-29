# Scientific Calculator

A clean, white/blue-themed scientific calculator built for the **CodeAlpha Frontend Development Internship (Task 2)**.

## Features
- All core arithmetic operations: `+`, `−`, `×`, `÷`
- Scientific functions: `sin`, `cos`, `tan`, `log`, `ln`, `√`, `x²`, `xʸ`, `π`, `e`
- `DEG` / `RAD` toggle for trig functions
- Chained operations (e.g. `5 + 3 × 2 =`)
- Clear (`C`), sign toggle (`±`), and percent (`%`)
- Memory functions: `M+`, `M−`, `MR`, `MC` with a live memory indicator
- Decimal input handling
- Real-time display updates
- Error handling for invalid operations (e.g. divide by zero, log of a negative number)
- Full keyboard support: number keys, `+ - * / ^`, `Enter`/`=`, `Backspace`, `Esc`, `%`
- Clean white/blue modern UI, fully responsive

## Tech Stack
- HTML5
- CSS3 (grid layout, custom properties)
- Vanilla JavaScript

## File Structure
```
CodeAlpha_Calculator/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Running Locally
Open `index.html` directly in any browser.

## Keyboard Shortcuts
| Key | Action |
|---|---|
| `0-9` | Enter digit |
| `.` | Decimal point |
| `+ - * / ^` | Operators (`^` = power) |
| `Enter` or `=` | Evaluate |
| `Backspace` | Delete last digit |
| `Esc` | Clear all |
| `%` | Percent |

## Commit History
```
git commit -m "Build calculator with arithmetic, memory functions, and keyboard support"
git commit -m "Upgrade calculator to scientific with trig, log, and constants"
git commit -m "Add README documentation for calculator"
```

---
*Built as part of the CodeAlpha Frontend Development Internship.*