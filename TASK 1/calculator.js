document.addEventListener('DOMContentLoaded', () => {
  const display = document.getElementById('display');
  const keys = document.querySelectorAll('.number, .operator');
  const calculateBtn = document.getElementById('calculate');
  const backspaceBtn = document.querySelector('.backspace');

  keys.forEach(key => {
    key.addEventListener('click', () => {
      if (key.innerText === 'C') {
        display.value = '';
      } else if (key.innerText === '=') {
        try {
          const result = evaluateExpression(display.value);
          display.value = result !== null ? result : 'Error';
        } catch (error) {
          display.value = 'Error';
        }
      } else if (key.innerText === '←') {
        display.value = display.value.slice(0, -1);
      } else if (key.innerText === '%') {
        display.value = evaluateExpression(`(${display.value} / 100)`);
      } else if (key.innerText === 'x²') {
        display.value = evaluateExpression(`Math.pow(${display.value}, 2)`);
      } else {
        display.value += key.innerText;
      }
    });
  });

  backspaceBtn.addEventListener('click', () => {
    display.value = display.value.slice(0, -1);
  });

  calculateBtn.addEventListener('click', () => {
    try {
      const result = evaluateExpression(display.value);
      display.value = result !== null ? result : 'Error';
    } catch (error) {
      display.value = 'Error';
    }
  });

  function evaluateExpression(expression) {
    const sanitizedExpression = expression.replace(/÷/g, '/').replace(/×/g, '*');
    const result = Function(`'use strict'; return (${sanitizedExpression})`)();
    return Number.isFinite(result) ? result : null;
  }
});
