'use client'

import React, { useEffect, useState } from 'react'
import Card from '@/Components/PureComponents/Card/MyCard'
import styles from './page.module.css'
import { Box, Grid } from '@mui/material'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import CustomButton from '@/Components/PureComponents/CustomButton/CustomButton'
import Link from 'next/link'
import { myLocalData, myLocalDataName } from '@/Constants/myLocalData'
import { useRouter } from 'next/navigation'

import RichTextEditor from '@/Components/RichTextEditor/RichTextEditor'


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


  // // Function to generate a random encryption key
  // function generateEncryptionKey() {
  //   return window.crypto.subtle.generateKey(
  //     { name: 'AES-GCM', length: 256 },
  //     true,
  //     ['encrypt', 'decrypt']
  //   );
  // }

  // // Function to encrypt and store data in localStorage
  // async function encryptAndStore(data: { username: string; email: string }) {
  //   const key = await generateEncryptionKey();
  //   const iv = window.crypto.getRandomValues(new Uint8Array(12));
  //   const encryptedData = await window.crypto.subtle.encrypt(
  //     { name: 'AES-GCM', iv },
  //     key,
  //     new TextEncoder().encode(JSON.stringify(data))
  //   );

  //   const combinedData = new Uint8Array([...iv, ...new Uint8Array(encryptedData)]);
  //   const encryptedString = btoa(String.fromCharCode(...combinedData));
  //   localStorage.setItem('encryptedData', encryptedString);
  // }

  // // Function to retrieve and decrypt data from localStorage
  // async function retrieveAndDecrypt() {
  //   const encryptedString = localStorage.getItem('encryptedData');
  //   if (!encryptedString) {
  //     return null;
  //   }

  //   const combinedData = new Uint8Array([...atob(encryptedString)].map(char => char.charCodeAt(0)));
  //   const iv = combinedData.slice(0, 12);
  //   const encryptedData = combinedData.slice(12);

  //   const key = await generateEncryptionKey();
  //   const decryptedData = await window.crypto.subtle.decrypt(
  //     { name: 'AES-GCM', iv },
  //     key,
  //     encryptedData
  //   );

  //   const decryptedString = new TextDecoder().decode(decryptedData);
  //   return JSON.parse(decryptedString);
  // }

  // // Example usage
  // const dataToEncrypt = { username: 'john_doe', email: 'john@example.com' };

  // // Encrypt and store data
  // encryptAndStore(dataToEncrypt);

  // // Retrieve and decrypt data
  // retrieveAndDecrypt().then(decryptedData => {
  //   console.log('Decrypted Data:', decryptedData);
  // });

  return (
    <>
      <RichTextEditor />

      <Box className={styles.container} sx={{ mt: '20px' }}>
        <Link href="/create">
          <CustomButton type='button' name='Create' />
        </Link>
        {/* <div dangerouslySetInnerHTML={{ __html: content }} /> */}
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