import React from 'react'
import './button.css'
const Button = ({ ...props }) => {
    const { label, title, onClick, className, value, key, disabled } = props
    return (
        <div>
            <button
                type="button"
                disabled={disabled}
                value={value}
                key={key}
                className={`generic-button ${className}`}
                onClick={onClick}
                title={title}
            >
                <span>
                    {label}
                </span>
            </button>
        </div>
    )
}

export default Button;