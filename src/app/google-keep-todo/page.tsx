'use client'

import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Link from 'next/link'
import { useRouter } from 'next/navigation'


import { routes } from '@/Constants/routes'
import My3dCard from '@/Components/My3dCard/My3dCard'
import HoverCard from '@/Components/HoverCard/HoverCard'
import { Box, Grid, Card } from '@mui/material';
import MyCard from '@/Components/PureComponents/Card/MyCard';
import CustomButton from '@/Components/PureComponents/CustomButton/CustomButton';
import { encryptionDataStrengths, whoIsLoggedIn } from '@/Constants/myLocalData';
import getDataFromSessionStorage from '@/Utils/getDataFromSessionStorage';
import areCredentialsMatching from '@/Utils/areCredentialsMatching';
import encrypt from '@/Utils/encryptions/encryptData';
import { MyLocalDataINTERFACE } from '@/TypeScriptTypes/TypeScriptTypes';
import generateRandomNumber from '@/Utils/generateRandomNumber';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

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

  const handleClickLogOut = () => {
    // localStorage.clear()
    // router.push('/signup')
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

  return (
    <>
      <Box className={styles.container} sx={{ mt: '20px' }}>
        <Link href={routes.googleKeepTodo.create}>
          <CustomButton type='button' name='Create' />
        </Link>
        {/* <div dangerouslySetInnerHTML={{ __html: content }} /> */}
        <CustomButton onClick={handleClickLogOut} type='button' name='Log Out' />
      </Box>
      {
        myTodos?.myGoogleKeepTodo?.length > 0 ?
          <div className={styles.container}>
            <div className={styles.innerContainer}>
              <Box sx={{ flexGrow: 1, mt: '20px' }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                  {myTodos?.myGoogleKeepTodo?.map((value, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
                      <MyCard value={value} index={index} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </div>
          </div>
          :
          <>
            <h1>Please Create a Todo</h1>
            <h3>Your Todo is Empty</h3>
          </>
      }
    </>
  )
}

export default Home;