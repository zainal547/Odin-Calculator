let firstNum = '';
let secondNum = '';
let currentOperator = null;
let shouldResetDisplay = false;

// Fungsi Dasar
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => (b === 0 ? "Hayo mau ngapain?" : a / b);

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case '+': return add(a, b);
        case '-': return subtract(a, b);
        case '*': return multiply(a, b);
        case '/': return divide(a, b);
        default: return null;
    }
}


const display = document.getElementById('display');

function updateDisplay(number) {
    if (display.textContent === '0' || shouldResetDisplay) {
        display.textContent = number;
        shouldResetDisplay = false;
    } else {
        display.textContent += number;
    }
}

// Event untuk tombol Angka
document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', () => updateDisplay(button.textContent));
});

// Event untuk tombol Operator
document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', () => {
        if (currentOperator !== null) calculate(); // Jika sudah ada pasangan angka, hitung dulu
        firstNum = display.textContent;
        currentOperator = button.textContent;
        shouldResetDisplay = true;
    });
});

// Fungsi Hitung (saat tekan = atau tekan operator beruntun)
function calculate() {
    if (currentOperator === null || shouldResetDisplay) return;
    secondNum = display.textContent;
    let result = operate(currentOperator, firstNum, secondNum);
    
    // Pembulatan angka desimal panjang
    if (typeof result === 'number') {
        result = Math.round(result * 1000) / 1000;
    }
    
    display.textContent = result;
    firstNum = result;
    currentOperator = null;
}

document.querySelector('.equals').addEventListener('click', calculate);

// Tombol Clear
document.querySelector('.clear').addEventListener('click', () => {
    display.textContent = '0';
    firstNum = '';
    secondNum = '';
    currentOperator = null;
});