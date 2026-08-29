const display = document.getElementById('display');
const historyEl = document.getElementById('history');
const memoryIndicator = document.getElementById('memoryIndicator');
const modeToggle = document.getElementById('modeToggle');
const sciKeys = document.querySelector('.sci-keys');
const mainKeys = document.querySelector('.main-keys');

let current = '0';
let previous = null;
let operator = null;
let justEvaluated = false;
let memory = 0;
let memoryActive = false;
let isDeg = true;

function updateScreen(){
  display.textContent = current;
  historyEl.textContent = previous !== null && operator
    ? `${previous} ${operator}`
    : '\u00A0';
  memoryIndicator.textContent = memoryActive ? `M = ${trimNumber(memory)}` : '\u00A0';
}

function inputDigit(d){
  if(justEvaluated){
    current = d;
    justEvaluated = false;
  } else {
    current = current === '0' ? d : current + d;
  }
  if(current.length > 14) current = current.slice(0,14);
}

function inputDecimal(){
  if(justEvaluated){
    current = '0.';
    justEvaluated = false;
    return;
  }
  if(!current.includes('.')) current += '.';
}

function clearAll(){
  current = '0';
  previous = null;
  operator = null;
  justEvaluated = false;
}

function negate(){
  if(current === '0') return;
  current = current.startsWith('-') ? current.slice(1) : '-' + current;
}

function percent(){
  current = trimNumber(parseFloat(current) / 100);
}

function trimNumber(n){
  if(!isFinite(n) || Number.isNaN(n)) return 'Error';
  const rounded = Math.round(n * 1e10) / 1e10;
  return String(rounded);
}

function toRadians(x){ return isDeg ? x * Math.PI / 180 : x; }

function compute(a,b,op){
  switch(op){
    case '+': return a + b;
    case '−': return a - b;
    case '×': return a * b;
    case '÷': return b === 0 ? NaN : a / b;
    case '^': return Math.pow(a,b);
    default: return b;
  }
}

function chooseOperator(op){
  if(operator && previous !== null && !justEvaluated){
    const result = compute(parseFloat(previous), parseFloat(current), operator);
    previous = trimNumber(result);
    current = previous;
  } else {
    previous = current;
  }
  operator = op;
  justEvaluated = false;
  current = '0';
}

function equals(){
  if(operator === null || previous === null) return;
  const result = compute(parseFloat(previous), parseFloat(current), operator);
  current = trimNumber(result);
  previous = null;
  operator = null;
  justEvaluated = true;
}

function applyFunction(fn){
  const x = parseFloat(current);
  let result;
  switch(fn){
    case 'sin':  result = Math.sin(toRadians(x)); break;
    case 'cos':  result = Math.cos(toRadians(x)); break;
    case 'tan':  result = Math.tan(toRadians(x)); break;
    case 'log':  result = Math.log10(x); break;
    case 'ln':   result = Math.log(x); break;
    case 'sqrt': result = Math.sqrt(x); break;
    case 'sq':   result = x * x; break;
    default: return;
  }
  current = trimNumber(result);
  justEvaluated = true;
}

function insertConstant(name){
  current = name === 'pi' ? trimNumber(Math.PI) : trimNumber(Math.E);
  justEvaluated = true;
}

function memoryClear(){ memory = 0; memoryActive = false; }
function memoryRecall(){
  if(!memoryActive) return;
  current = trimNumber(memory);
  justEvaluated = true;
}
function memoryAdd(){ memory += parseFloat(current) || 0; memoryActive = true; }
function memorySubtract(){ memory -= parseFloat(current) || 0; memoryActive = true; }

function handleKey(btn){
  if(btn.dataset.num !== undefined) inputDigit(btn.dataset.num);
  else if(btn.dataset.op) chooseOperator(btn.dataset.op);
  else if(btn.dataset.fn) applyFunction(btn.dataset.fn);
  else if(btn.dataset.const) insertConstant(btn.dataset.const);
  else if(btn.dataset.action === 'decimal') inputDecimal();
  else if(btn.dataset.action === 'clear') clearAll();
  else if(btn.dataset.action === 'negate') negate();
  else if(btn.dataset.action === 'percent') percent();
  else if(btn.dataset.action === 'equals') equals();
  else if(btn.dataset.action === 'mc') memoryClear();
  else if(btn.dataset.action === 'mr') memoryRecall();
  else if(btn.dataset.action === 'mplus') memoryAdd();
  else if(btn.dataset.action === 'mminus') memorySubtract();
  updateScreen();
}

mainKeys.addEventListener('click', e => {
  const btn = e.target.closest('.key');
  if(btn) handleKey(btn);
});
sciKeys.addEventListener('click', e => {
  const btn = e.target.closest('.key');
  if(btn) handleKey(btn);
});

modeToggle.addEventListener('click', () => {
  isDeg = !isDeg;
  modeToggle.textContent = isDeg ? 'DEG' : 'RAD';
});

const opMap = { '+':'+', '-':'−', '*':'×', '/':'÷', '^':'^' };

document.addEventListener('keydown', e => {
  if(e.key >= '0' && e.key <= '9'){ inputDigit(e.key); updateScreen(); return; }
  if(e.key === '.'){ inputDecimal(); updateScreen(); return; }
  if(opMap[e.key]){ chooseOperator(opMap[e.key]); updateScreen(); return; }
  if(e.key === 'Enter' || e.key === '='){ e.preventDefault(); equals(); updateScreen(); return; }
  if(e.key === 'Backspace'){
    current = current.length > 1 ? current.slice(0,-1) : '0';
    updateScreen();
    return;
  }
  if(e.key === 'Escape'){ clearAll(); updateScreen(); return; }
  if(e.key === '%'){ percent(); updateScreen(); return; }
});

updateScreen();