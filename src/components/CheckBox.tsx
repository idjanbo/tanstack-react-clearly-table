import React from 'react'

interface CheckBoxProps {
    checked: boolean
    indeterminate?: boolean
    disabled?: boolean
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    onClick?: (event: React.MouseEvent<HTMLInputElement>) => void
    className?: string
}

const CheckBox: React.FC<CheckBoxProps> = ({
    checked,
    indeterminate = false,
    disabled = false,
    onChange,
    onClick,
    className = ''
}) => {
    return (
        <input
            type="checkbox"
            checked={checked}
            disabled={disabled}
            ref={input => {
                if (input) input.indeterminate = indeterminate
            }}
            onChange={onChange}
            onClick={onClick}
            className={`cursor-pointer ${className}`}
        />
    )
}

export default CheckBox