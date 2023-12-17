'use client'

import React, { useState } from 'react'
import styles from '../signup/page.module.css'
import InputField from '@/Components/PureComponents/InputField/InputField'
import CustomButton from '@/Components/PureComponents/CustomButton/CustomButton'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Typography } from '@mui/material'
import { myLocalData, myLocalDataName } from '@/Constants/myLocalData'

const Login = () => {
  const [signupData, setSignupData] = useState(myLocalData)

  const router = useRouter()
  const jsonString = '{"loginAndSignup":{"email":"","password":"","confirmPassword":""},"myTodo":[{"id":"","title":"","content":""}],"checkConfirmPassword":false}';
  const errorMsg = 'Wrong Email ID or Password';

  const handleClickLogin = () => {
    const myLocalStorageData = JSON.parse(localStorage.getItem(myLocalDataName) ?? jsonString);

    if (myLocalStorageData.loginAndSignup.email !== signupData.loginAndSignup.email) {
      alert(errorMsg)
      return
    }
    if (myLocalStorageData.loginAndSignup.password !== signupData.loginAndSignup.password) {
      alert(errorMsg)
      return
    }
    router.push('/')
  }

  const handleInputFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setSignupData((prev) => {
      return {
        ...prev,
        loginAndSignup: {
          ...prev.loginAndSignup,
          [name]: value,
        },
      };
    });
  }
  console.log(signupData)
  return (
    <div className={styles.theMainDiv}>
      <div className={styles.container}>
        <h1>Log In</h1>
        <div className={styles.innerContainer}>
          <InputField onChange={handleInputFieldChange} value={signupData.loginAndSignup.email} name='email' type='email' lable='Email' />
          <InputField onChange={handleInputFieldChange} value={signupData.loginAndSignup.password} name='password' type='password' lable='Password' />
        </div>
        <CustomButton onClick={() => handleClickLogin()} type='submit' name='LOG IN' />
        <Link href={'/signup'}>
          <Typography sx={{ color: 'gray', mt: '40px' }} variant="subtitle1" gutterBottom>Don Not Have An Account ?</Typography>
        </Link>
      </div>
    </div>
  )
}

export default Login
