import React from 'react';

const Button = ({ label, onClick, className }) => {
  const buttonClassName = ["container", className].join(" ").trim();

  return (
    <button className={buttonClassName} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
