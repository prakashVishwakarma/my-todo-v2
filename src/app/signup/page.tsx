'use client'

import React, { useState } from 'react'
// import styles from './page.module.css'
import '.././globals.css'
import InputField from '@/Components/PureComponents/InputField/InputField'
import CustomButton from '@/Components/PureComponents/CustomButton/CustomButton'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Box, Typography } from '@mui/material'
import useLocalStorage from '@/Hooks/useLocalStorage'
import useModifyLocalStorage from '@/Hooks/useModifyLocalStorage'
import isEmailExists from '@/Utils/isEmailExists'
import modifyLocalStorageData from '@/Utils/modifyLocalStorageData'
import getLocalStorageData from '@/Utils/getLocalStorageData'
import { encryptionDataStrengths, myLocalDataName } from '@/Constants/myLocalData'
import generateRandomNumber from '@/Utils/generateRandomNumber'
import encrypt from '@/Utils/encryptions/encryptData'
import decrypt from '@/Utils/encryptions/decryptData'
import { routes } from '@/Constants/routes'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Signup = () => {

  const [signupData, setSignupData] = useState({ email: "", password: "", confirmPassword: "", })
  const router = useRouter()


  const handleClickSignup = () => {

    const mySignupData = {
      email: signupData.email,
      password: encrypt(signupData.password, encryptionDataStrengths),
      confirmPassword: encrypt(signupData.confirmPassword, encryptionDataStrengths),
      id: generateRandomNumber()
    }
    const isValidEmail = emailRegex.test(signupData?.email);
    const isEmail = isEmailExists(signupData?.email)
    const modifiedLocalStorageData = modifyLocalStorageData(mySignupData)
    const isLocalStorageData = getLocalStorageData(myLocalDataName)

    if (!isValidEmail) return alert('Envalid Email!')
    if (isEmail) return alert('Email Already Exist')
    if (!signupData.password) return alert('Please Fill The Password!')
    if (signupData.password !== signupData.confirmPassword) return alert('Confirm Password Is Not Matching!')
    if (isLocalStorageData) {
      localStorage.setItem(myLocalDataName, JSON.stringify([modifiedLocalStorageData, ...isLocalStorageData]))
      router.push(routes.login)
    } else {
      localStorage.setItem(myLocalDataName, JSON.stringify([modifiedLocalStorageData]))
      router.push(routes.login)
    }
  }

  const handleInputFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const { name, value } = e.target;

    setSignupData(prev => ({ ...prev, [name]: value }))
  }


  return (
    <div className={'theMainDiv'}>
      <div className={'container'}>
        <h1>Sign Up</h1>
        <div className={'innerContainer'}>
          <InputField onChange={handleInputFieldChange} name='email' type='email' lable='Email' />
          <InputField onChange={handleInputFieldChange} name='password' type='password' lable='Password' />
          <InputField onChange={handleInputFieldChange} name='confirmPassword' type='password' lable='Confirm Password' />
        </div>
        <CustomButton onClick={() => handleClickSignup()} type='submit' name='SIGN UP' />
        <Link className={'link'} href={routes.login}>
          <Typography variant="subtitle1" gutterBottom>Already Have An Account ?</Typography>
        </Link>
      </div>
    </div>
  )
}

export default Signup
