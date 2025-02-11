import React, { Children } from "react";

interface Props {
  children: string;
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  onClick: () => void;
}

const Button = ({ children, onClick, color = 'primary' }: Props) => {
  return (
    <div>
      <button type="button" className={'btn btn-' + color} onClick={onClick}>
        {children}
      </button>
    </div>
  );
};

export default Button;
