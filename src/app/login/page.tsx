'use client'

import React, { useState } from 'react'
import InputField from '@/Components/PureComponents/InputField/InputField'
import CustomButton from '@/Components/PureComponents/CustomButton/CustomButton'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Typography } from '@mui/material'
import { encryptionDataStrengths, whoIsLoggedIn } from '@/Constants/myLocalData'
import areCredentialsMatching from '@/Utils/areCredentialsMatching'
import encrypt from '@/Utils/encryptions/encryptData'
import { routes } from '@/Constants/routes'
import storeDataInSessionStorage from '@/Utils/storeDataInSessionStorage'


const Login = () => {

  const [signupData, setSignupData] = useState({ email: "", password: "" })

  const router = useRouter()

  const handleClickLogin = () => {

    const isCredentialsMatched = areCredentialsMatching(signupData?.email, encrypt(signupData?.password, encryptionDataStrengths), true)
    if (!signupData.email) return alert('Please Provide Email!')
    if (!signupData.password) return alert('Please Provide Password!')
    if (isCredentialsMatched) if (storeDataInSessionStorage(whoIsLoggedIn, signupData)) return router.push(routes.home)
    else return alert('The Login Details are Incorrect')
  }

  const handleInputFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className={'theMainDiv'}>
      <div className={'container'}>
        <h1>Log In</h1>
        <div className={'innerContainer'}>
          <InputField onChange={handleInputFieldChange} name='email' type='email' lable='Email' />
          <InputField onChange={handleInputFieldChange} name='password' type='password' lable='Password' />
        </div>
        <CustomButton onClick={() => handleClickLogin()} type='submit' name='LOG IN' />
        <Link className={'link'} href={routes.signup}>
          <Typography variant="subtitle1" gutterBottom>Don Not Have An Account ?</Typography>
        </Link>
      </div>
    </div>
  )
}

export default Login
