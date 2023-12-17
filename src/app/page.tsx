'use client'

import React, { useEffect, useState, useRef, useMemo } from 'react'
import Card from '@/Components/PureComponents/Card/MyCard'
import styles from './page.module.css'
import { Box, Grid } from '@mui/material'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import CustomButton from '@/Components/PureComponents/CustomButton/CustomButton'
import Link from 'next/link'
import { myLocalData, myLocalDataName } from '@/Constants/myLocalData'
import { useRouter } from 'next/navigation'

import JoditEditor from 'jodit-react';


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
    localStorage.clear()
    router.push('/signup')
  }

  const reStoreMyLocalData = () => {
    const myLocalData = JSON.parse(localStorage.getItem(myLocalDataName) ?? '{}')
    if (!myLocalData.myTodo) return (router.push('/signup'))
    setMyTodos(myLocalData.myTodo)
  }

  useEffect(() => {

    reStoreMyLocalData()

  }, [])
  // console.log('myTodo', myTodos)  

  const editor = useRef(null);
	const [content, setContent] = useState('');

	// const config = useMemo(
	// 	{
	// 		readonly: false, // all options from https://xdsoft.net/jodit/docs/,
	// 		placeholder: placeholder || 'Start typings...'
	// 	},
	// 	[placeholder]
	// );

  const htmlContent = '<p>This is <em>HTML</em> content.</p>';

  return (
    <>
    <JoditEditor
			ref={editor}
			value={content}
			// config={config}
			// tabIndex={1} // tabIndex of textarea
			onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
			onChange={newContent => {setContent(newContent)}}
		/>

    {content}{'jkg'}
      <Box className={styles.container} sx={{ mt: '20px' }}>
        <Link href="/create">
          <CustomButton type='button' name='Create' />
        </Link>
        <div dangerouslySetInnerHTML={{ __html: content }} />
        <CustomButton onClick={handleClickLogOut} type='button' name='Log Out' />
      </Box>
      {
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
      }
    </>
  )
}

export default Home;