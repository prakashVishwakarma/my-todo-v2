'use client'

import CustomButton from '@/Components/PureComponents/CustomButton/CustomButton'
import { routes } from '@/Constants/routes'
import React, { useEffect, useState, } from 'react'
import { useRouter } from 'next/navigation'
import router from 'next/router'
import { whoIsLoggedIn, encryptionDataStrengths } from '@/Constants/myLocalData'
import areCredentialsMatching from '@/Utils/areCredentialsMatching'
import encrypt from '@/Utils/encryptions/encryptData'
import getDataFromSessionStorage from '@/Utils/getDataFromSessionStorage'
import { MyLocalDataINTERFACE } from '@/TypeScriptTypes/TypeScriptTypes'
import generateRandomNumber from '@/Utils/generateRandomNumber'
const Home = () => {

  const [myTodos, setMyTodos] = useState<MyLocalDataINTERFACE>({
    "id": +generateRandomNumber(),
    "email": "",
    "password": "",
    "confirmPassword": "",
    "myGoogleKeepTodo": [
      {
        "id": +generateRandomNumber(),
        "title": "",
        "contents": [
          {
            "id": +generateRandomNumber(),
            "content": "",
          },
        ]
      }
    ],
    "myRichTextEditorTodo": [
      {
        "id": +generateRandomNumber(),
        "title": "",
        "contents": [
          {
            "id": +generateRandomNumber(),
            "content": "",
          },
        ]
      }
    ]
  })
  const router = useRouter()

  const HandleClickNavigate = () => {
    router.push(routes.richTextEditor.create)
  }


  const checkWhoIsLoggedIn = () => {

    const theLoggedInUserData = getDataFromSessionStorage(whoIsLoggedIn)

    if (theLoggedInUserData.success) {

      const theUserWhoIsLoggedIn = areCredentialsMatching(theLoggedInUserData?.data?.email, encrypt(theLoggedInUserData?.data?.password, encryptionDataStrengths), false)
      setMyTodos(theUserWhoIsLoggedIn)
    } else {
      router.push(routes.login)
      console.error('Failed to retrieve data from session storage.');
    }
  }

  useEffect(() => {

    checkWhoIsLoggedIn()

  }, [])

  console.log('myTodos', myTodos)

  return (
    <>
      <h1>rich text editor</h1>
      <CustomButton type={'button'} name={'Create'} onClick={() => HandleClickNavigate()} />

      {
        myTodos?.myRichTextEditorTodo?.map((value, i, arr) => {
          return <>
            <div dangerouslySetInnerHTML={{ __html: value }} /><hr/><hr/><hr/>
          </>
        })
      }


    </>
  )
}

export default Home;