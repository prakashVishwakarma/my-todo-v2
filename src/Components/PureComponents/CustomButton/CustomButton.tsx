'use client'

import React, { MouseEventHandler } from 'react'
import styles from './page.module.css'

interface CustomButtonProps {
  type?: "submit" | "reset" | "button";
  name?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const CustomButton: React.FC<CustomButtonProps> = ({ type, name, onClick }) => {
  return (
    <button onClick={onClick} type={type || "submit"} className={styles.CustomButton}>{name || 'submit'}</button>
  )
}

export default CustomButton
