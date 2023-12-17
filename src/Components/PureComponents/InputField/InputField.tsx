import React, { ChangeEventHandler } from 'react'
import styles from './page.module.css'


interface InputFieldProps {
    type?: string;
    lable?: string;
    name?: string;
    value?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
}

const InputField: React.FC<InputFieldProps> = ({ type, lable, name, value, onChange }) => {
    return (
        <div className={styles.InputField}>
            <label>{lable || 'Please provide lable'}</label>
            <input onChange={onChange} type={type || 'text'} value={value} name={name} />
        </div>
    )
}

export default InputField
