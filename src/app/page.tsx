'use client'

import React, { useEffect, useState } from 'react'
import Card from '@/Components/PureComponents/Card/MyCard'
import styles from './page.module.css'
import { Box, Grid } from '@mui/material'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import CustomButton from '@/Components/PureComponents/CustomButton/CustomButton'
import { myLocalData, myLocalDataName } from '@/Constants/myLocalData'

import RichTextEditor from '@/Components/RichTextEditor/RichTextEditor'
import { routes } from '@/Constants/routes'
import My3dCard from '@/Components/My3dCard/My3dCard'
import HoverCard from '@/Components/HoverCard/HoverCard'


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Home = () => {

  const [myTodos, setMyTodos] = useState([])
  const router = useRouter()

  const handleClickLogOut = () => {
    // localStorage.clear()
    // router.push('/signup')
  }

  // const reStoreMyLocalData = () => {
  //   const myLocalData = JSON.parse(localStorage.getItem(myLocalDataName) ?? '{}')
  //   if (!myLocalData.myTodo) return (router.push('/signup'))
  //   setMyTodos(myLocalData.myTodo)
  // }

  useEffect(() => {

    // reStoreMyLocalData()

  }, [])

  return (
    <>
      <HoverCard />
      <div className={styles.HomePageContainer} style={{ display: 'flex', justifyContent: 'center', width: '100%', height: '100vh' }}>
        <div style={{ width: '90%', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }} >
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }} >
            <Link href={routes.googleKeepTodo.home} style={{ textDecoration: 'none' }}>
              <My3dCard />
            </Link>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }} >
            <Link href={routes.richTextEditor.home} style={{ textDecoration: 'none' }}>
              <My3dCard />
            </Link>
          </div>
        </div>
      </div>


      {/* <My3dCard /> */}
      {/* <RichTextEditor /> */}

      {/* <Box className={styles.container} sx={{ mt: '20px' }}>
        <Link href={routes.googleKeepTodo.create}>
          <CustomButton type='button' name='Create' />
        </Link>
        <div dangerouslySetInnerHTML={{ __html: content }} />
        <CustomButton onClick={handleClickLogOut} type='button' name='Log Out' />
      </Box> */}
      {/* {
        myTodos.length > 0 ?
          <div className={styles.container}>
            <div className={styles.innerContainer}>
              <Box sx={{ flexGrow: 1, mt: '20px' }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                  {myTodos?.map((value, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Card value={value} index={index} />
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
      } */}
    </>
  )
}

export default Home;