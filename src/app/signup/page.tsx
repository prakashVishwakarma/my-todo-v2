'use client'

import React, { useState } from 'react'
import styles from './page.module.css'
import InputField from '@/Components/PureComponents/InputField/InputField'
import CustomButton from '@/Components/PureComponents/CustomButton/CustomButton'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Box, Typography } from '@mui/material'
import { myLocalData, myLocalDataName } from '@/Constants/myLocalData'

const Signup = () => {

  const [signupData, setSignupData] = useState(myLocalData)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const router = useRouter()

  const handleClickSignup = () => {
    const isValidEmail = emailRegex.test(signupData?.loginAndSignup?.email);
    if (!isValidEmail) {
      alert('Envalid Email')
      return
    }

    if (signupData.loginAndSignup.password === signupData.loginAndSignup.confirmPassword) {
      localStorage.setItem(myLocalDataName, JSON.stringify(signupData))
      router.push('/login')
    } else {
      alert('Confirm Password Is Not Matching')
    }
    
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

  return (
    <div className={styles.theMainDiv}>
      <div className={styles.container}>
        <h1>Sign Up</h1>
        <div className={styles.innerContainer}>
          <InputField onChange={handleInputFieldChange} value={signupData.loginAndSignup.email} name='email' type='email' lable='Email' />
          <InputField onChange={handleInputFieldChange} value={signupData.loginAndSignup.password} name='password' type='password' lable='Password' />
          <InputField onChange={handleInputFieldChange} value={signupData.loginAndSignup.confirmPassword} name='confirmPassword' type='password' lable='Confirm Password' />
          {/* {
            checkConfirmPassword &&
            <Typography sx={{ color: 'red', mt: '0px' }} variant="subtitle1" gutterBottom>Confirm Password Is Not Matching</Typography>
          } */}
        </div>
        <CustomButton onClick={() => handleClickSignup()} type='submit' name='SIGN UP' />
        <Link href={'/login'}>
          <Typography sx={{ color: 'gray', mt: '40px' }} variant="subtitle1" gutterBottom>Already Have An Account ?</Typography>
        </Link>
      </div>
    </div>
  )
}

export default Signup
