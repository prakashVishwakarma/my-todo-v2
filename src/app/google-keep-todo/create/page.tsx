'use client'

import React, { ChangeEvent, useEffect, useState } from 'react'
import InputField from '@/Components/PureComponents/InputField/InputField'
import CustomButton from '@/Components/PureComponents/CustomButton/CustomButton'
import { useRouter } from 'next/navigation'
import { encryptionDataStrengths, myLocalData, myLocalDataName, whoIsLoggedIn } from '@/Constants/myLocalData'
import { TodoItem } from '@/TypeScriptTypes/TypeScriptTypes'
import ModifyTodoData from '@/Utils/ModifyTodoData'
import { routes } from '@/Constants/routes'
import areCredentialsMatching from '@/Utils/areCredentialsMatching'
import encrypt from '@/Utils/encryptions/encryptData'
import getDataFromSessionStorage from '@/Utils/getDataFromSessionStorage'
import modifyLocalStorageData from '@/Utils/modifyLocalStorageData'
import deleteObjectById from '@/Utils/deleteObjectById'
import getLocalStorageData from '@/Utils/getLocalStorageData'
import storeDataInLocalStorage from '@/Utils/storeDataInLocalStorage'


const Create = () => {

  const [todoObj, setTodoObj] = useState<TodoItem>({ id: "", title: "", contents: [{ id: "", content: "" }] })
  const [counter, setCounter] = useState<number>(0)
  // const [todoArray, setTodoArray] = useState<TodoItem[]>([{
  //   title: '',
  //   content: '',
  // }])

  const router = useRouter()

  const handleClickAddMore = () => {

    setTodoObj((prevTodoObj) => {

      if (prevTodoObj.contents[prevTodoObj.contents.length - 1].content) {
        setCounter(p => p + .5)
        return { ...prevTodoObj, contents: [...prevTodoObj.contents, { id: "", content: "" }] }
      }
      else {
        alert('please fill the content')
        return { ...prevTodoObj, contents: [...prevTodoObj.contents] }
      }
    })
  }

  console.log(todoObj)


  const handleClickCreate = (buttonType: string) => {

    const theLoggedInUserData = getDataFromSessionStorage(whoIsLoggedIn)

    if (theLoggedInUserData.success) {

      // accessing user specific data theUserWhoIsLoggedIn, from local storage
      const theUserWhoIsLoggedIn = areCredentialsMatching(theLoggedInUserData?.data?.email, encrypt(theLoggedInUserData?.data?.password, encryptionDataStrengths), false)

      // adding new todo the user who is created
      theUserWhoIsLoggedIn.myGoogleKeepTodo.push(ModifyTodoData(todoObj.title, todoObj.contents))
      // deleteObjectById() becouse modify locale storage data is not possible
      if (storeDataInLocalStorage(myLocalDataName, [modifyLocalStorageData(theUserWhoIsLoggedIn), ...deleteObjectById(getLocalStorageData(myLocalDataName), theUserWhoIsLoggedIn.id)])) {

        console.log('Successfully Created Todo')
        return router.back()

      } else {

        console.log('Something Went Wrong !')
        return alert('Something Went Wrong !')
      }
    } else {

      console.log('Failed to retrieve data from session storage.');
      alert('Please login first')
      return router.push(routes.login)
    }
  }

  const handleInputFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const { name, value } = e.target;

    setTodoObj((prevTodoObj) => {

      if (name === 'title') {

        // console.log({ ...prevTodoObj, title: value })
        return { ...prevTodoObj, title: value };

      } else if (name === 'content') {


        const updatedContents = [...prevTodoObj.contents];
        updatedContents[counter].content = value;
        // console.log({ ...prevTodoObj, contents: updatedContents })

        return { ...prevTodoObj, contents: updatedContents };
      }

      return prevTodoObj; // Do nothing if the name doesn't match 'title' or 'content'
    })

  }

  useEffect(() => {
    // console.log(ModifyTodoData("newID", [
    //   { content: "Content 1" },
    //   { content: "Content 2" }
    // ]))
    // ModifyTodoData("newID", [
    //   { content: "Content 1" },
    //   { content: "Content 2" }
    // ])
    // const myLocalData = JSON.parse(localStorage.getItem(myLocalDataName) ?? `{}`)
    // setTodoArray(myLocalData.myTodo)
  }, [])

  return (<>
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '60px' }}>
      <div style={{ width: '50%', border: '2px solid black', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h1 style={{ textAlign: 'center' }} >Create</h1>
        <InputField onChange={handleInputFieldChange} name='title' type='text' lable='Title' />
        {
          todoObj?.contents?.map((value, i, arr) => {
            return (<>
              <InputField onChange={handleInputFieldChange} name='content' type='text' lable='Content' />
            </>)
          })
        }


        <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>


          <CustomButton onClick={() => handleClickCreate('Cancel')} type='submit' name='Cancel' />
          <CustomButton onClick={() => handleClickAddMore()} type='button' name='Add More' />
          <CustomButton onClick={() => handleClickCreate('create')} type='submit' name='Create' />
        </div>

      </div>
    </div>
    {/* <div className={'theMainDiv'}>
      <div className={'container'}>
        <h1>Create</h1>
        <div className={'innerContainer'}>
          <InputField onChange={handleInputFieldChange} name='title' type='text' lable='Title' />
          
          <InputField onChange={handleInputFieldChange} name='content' type='text' lable='Content' />
        </div>
        <div style={{ display: 'flex' }}>
          <div style={{ marginRight: '9px' }}>
            <CustomButton onClick={() => handleClickCreate('Cancel')} type='submit' name='Cancel' />
          </div>
          <CustomButton onClick={() => handleClickCreate('Create')} type='submit' name='Create' />
        </div>
      </div>
    </div> */}
  </>
  )
}

export default Create
