'use client'

import React, { useState } from 'react'
import styles from '../signup/page.module.css'
import InputField from '@/Components/PureComponents/InputField/InputField'
import CustomButton from '@/Components/PureComponents/CustomButton/CustomButton'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Typography } from '@mui/material'
import { encryptionDataStrengths, myLocalData, myLocalDataName } from '@/Constants/myLocalData'
import getLocalStorageData from '@/Utils/getLocalStorageData'
import areCredentialsMatching from '@/Utils/areCredentialsMatching'
import encrypt from '@/Utils/encryptions/encryptData'
import { routes } from '@/Constants/routes'

const isLocalStorageData = getLocalStorageData(myLocalDataName)

const Login = () => {

  const [signupData, setSignupData] = useState({ email: "", password: "" })

  const router = useRouter()

  const handleClickLogin = () => {

    const isCredentialsMatched = areCredentialsMatching(signupData?.email, encrypt(signupData?.password, encryptionDataStrengths))
    if (!signupData.email) return alert('Please Provide Email!')
    if (!signupData.password) return alert('Please Provide Password!')
    if (isCredentialsMatched) return router.push(routes.home)
    else return alert('The Login Details are Incorrect')
  }

  const handleInputFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className={styles.theMainDiv}>
      <div className={styles.container}>
        <h1>Log In</h1>
        <div className={styles.innerContainer}>
          <InputField onChange={handleInputFieldChange} name='email' type='email' lable='Email' />
          <InputField onChange={handleInputFieldChange} name='password' type='password' lable='Password' />
        </div>
        <CustomButton onClick={() => handleClickLogin()} type='submit' name='LOG IN' />
        <Link href={routes.signup}>
          <Typography sx={{ color: 'gray', mt: '40px' }} variant="subtitle1" gutterBottom>Don Not Have An Account ?</Typography>
        </Link>
      </div>
    </div>
  )
}

export default Login
