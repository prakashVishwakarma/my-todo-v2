'use client'
import React, { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic';
import storeDataInSessionStorage from '@/Utils/storeDataInSessionStorage';
import { encryptionDataStrengths, myLocalDataName, myRichTextEditorData, whoIsLoggedIn } from '@/Constants/myLocalData';
import CustomButton from '../PureComponents/CustomButton/CustomButton';
import { routes } from '@/Constants/routes';
import areCredentialsMatching from '@/Utils/areCredentialsMatching';
import deleteObjectById from '@/Utils/deleteObjectById';
import encrypt from '@/Utils/encryptions/encryptData';
import getDataFromSessionStorage from '@/Utils/getDataFromSessionStorage';
import getLocalStorageData from '@/Utils/getLocalStorageData';
import modifyLocalStorageData from '@/Utils/modifyLocalStorageData';
import storeDataInLocalStorage from '@/Utils/storeDataInLocalStorage';
import router from 'next/router';
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });
import { useRouter } from 'next/navigation';


const RichTextEditor = () => {

  const [data, setData] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const editor = useRef(null);
  const [content, setContent] = useState<string>(data); // data not working ( on page reload editor data should not lost )
  const router = useRouter();

  function handleOnchangeRichTextEditor(newContent: React.SetStateAction<string>): void {
    if (!storeDataInSessionStorage(myRichTextEditorData, newContent)) return
    setContent(newContent)
  }

  const HandleClickNavigate = (data: any) =>  {
   
    
    const theLoggedInUserData = getDataFromSessionStorage(whoIsLoggedIn)

    if (theLoggedInUserData.success) {

      // accessing user specific data theUserWhoIsLoggedIn, from local storage
      const theUserWhoIsLoggedIn = areCredentialsMatching(theLoggedInUserData?.data?.email, encrypt(theLoggedInUserData?.data?.password, encryptionDataStrengths), false)

      // adding new todo the user who is created
      theUserWhoIsLoggedIn.myRichTextEditorTodo.push(data)
      
      // deleteObjectById() becouse modify locale storage data is not possible
      if (storeDataInLocalStorage(myLocalDataName, [modifyLocalStorageData(theUserWhoIsLoggedIn), ...deleteObjectById(getLocalStorageData(myLocalDataName), theUserWhoIsLoggedIn.id)])) {

        console.log('Successfully Created Todo')
        // return router.push(routes.richTextEditor.home)
        setIsSuccess(true)

      } else {

        setIsSuccess(false)
        console.log('Something Went Wrong !')
        return alert('Something Went Wrong !')
      }
    } else {

      console.log('Failed to retrieve data from session storage.');
      alert('Please login first')
      return router.push(routes.login)
    }
   
    // // add a logic to create function 
    // const setDataInLocalStorate = (data: string)=>{
    //   const isLocalStorageData = getLocalStorageData(myLocalDataName)
    //   const theLoggedInUserData = getDataFromSessionStorage(whoIsLoggedIn)
    //   if (theLoggedInUserData.success) {
  
    //     const theUserWhoIsLoggedIn = areCredentialsMatching(theLoggedInUserData?.data?.email, encrypt(theLoggedInUserData?.data?.password, encryptionDataStrengths), false)
    //     // setMyTodos(theUserWhoIsLoggedIn)
    //     console.log('theUserWhoIsLoggedIn',theUserWhoIsLoggedIn)
    //   } else {
    //     router.push(routes.login)
    //     console.error('Failed to retrieve data from session storage.');
    //   }
    // }
    // setDataInLocalStorate(data)
    // route.push(routes.richTextEditor.home)
  }
  

  useEffect(() => {

    if (!getDataFromSessionStorage(myRichTextEditorData).success) return
    setData(getDataFromSessionStorage(myRichTextEditorData).data)

  }, [])

  useEffect(() => {

    isSuccess && router.push(routes.richTextEditor.home)

  }, [isSuccess, router])
  return (<>
    <JoditEditor
      ref={editor}
      value={data}
      // tabIndex={1} // tabIndex of textarea
      onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
      onChange={(newContent) => handleOnchangeRichTextEditor(newContent)}
    />

    <div dangerouslySetInnerHTML={{ __html: content }} />
    <CustomButton  name={'create'} onClick={() => HandleClickNavigate(content)} />
  </>)
}

export default RichTextEditor
