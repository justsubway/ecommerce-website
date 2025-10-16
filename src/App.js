import React, { useState, useEffect } from 'react';
import './App.css';
import Button from './components/Button';

const calculate = (num1, op, num2) => {
  let result;
  if (op === '+') {
    result = num1 + num2;
  } else if (op === '-') {
    result = num1 - num2;
  } else if (op === '*') {
    result = num1 * num2;
  } else if (op === '/') {
    result = num1 / num2;
  }
  return result;
};

function App() {
  const [displayValue, setDisplayValue] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operator, setOperator] = useState(null);

  const handleNumberClick = (number) => {
    if (displayValue === '0') {
      setDisplayValue(number);
    } else {
      setDisplayValue(displayValue + number);
    }
  };

  const handleClearButton = () => {
    setDisplayValue('0');
    setPreviousValue(null);
    setOperator(null);
  };

  const handleOperatorClick = (op) => {
    if (previousValue !== null) {
      const result = calculate(parseFloat(previousValue), operator, parseFloat(displayValue));
      setPreviousValue(String(result));
      setOperator(op);
      setDisplayValue('0');
    } else {
      setPreviousValue(displayValue);
      setOperator(op);
      setDisplayValue('0');
    }
  };

  const handleEquals = () => {
    const result = calculate(parseFloat(previousValue), operator, parseFloat(displayValue));
    setDisplayValue(String(result));
    setPreviousValue(null);
    setOperator(null);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key;

      if (/^[0-9]$/.test(key)) {
        handleNumberClick(key);
      } else if (['+', '-', '*', '/'].includes(key)) {
        handleOperatorClick(key);
      } else if (key === 'Enter' || key === '=') {
        handleEquals();
      } else if (key === 'Escape' || key.toLowerCase() === 'c') {
        handleClearButton();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [displayValue, operator, previousValue]);

  return (
    <div className="App">
      <div className="calculator">
        <div className="display">{displayValue}</div>
        <div className="buttons-container">
          <div className="numbers">
            <Button label="7" onClick={() => handleNumberClick('7')} />
            <Button label="8" onClick={() => handleNumberClick('8')} />
            <Button label="9" onClick={() => handleNumberClick('9')} />
            <Button label="4" onClick={() => handleNumberClick('4')} />
            <Button label="5" onClick={() => handleNumberClick('5')} />
            <Button label="6" onClick={() => handleNumberClick('6')} />
            <Button label="1" onClick={() => handleNumberClick('1')} />
            <Button label="2" onClick={() => handleNumberClick('2')} />
            <Button label="3" onClick={() => handleNumberClick('3')} />
            <Button label="0" onClick={() => handleNumberClick('0')} className="zero-button" />
          </div>
          <div className="operators">
            <Button label="C" onClick={handleClearButton} className="operator-button" />
            <Button label="/" onClick={() => handleOperatorClick('/')} className="operator-button" />
            <Button label="*" onClick={() => handleOperatorClick('*')} className="operator-button" />
            <Button label="-" onClick={() => handleOperatorClick('-')} className="operator-button" />
            <Button label="+" onClick={() => handleOperatorClick('+')} className="operator-button" />
            <Button label="=" onClick={handleEquals} className="operator-button" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
