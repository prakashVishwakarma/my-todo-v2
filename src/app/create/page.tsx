'use client'

import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import InputField from '@/Components/PureComponents/InputField/InputField'
import CustomButton from '@/Components/PureComponents/CustomButton/CustomButton'
import { useRouter } from 'next/navigation'
import { myLocalData, myLocalDataName } from '@/Constants/myLocalData'

export interface TodoItem {
  // id?: string;
  title: string;
  content: string;
}

const Create = () => {

  const [todoObj, setTodoObj] = useState<TodoItem>({
    // id: '',
    title: '',
    content: '',
  })

  const [todoArray, setTodoArray] = useState<TodoItem[]>([{
    // id: '',
    title: '',
    content: '',
  }])

  const router = useRouter()

  const handleClickCreate = (buttonType: string) => {
    if (buttonType === 'Create') {

      let tempTodoArray: TodoItem[] = []

      if (!todoObj.title) return alert('Please Fill The Title')
      if (!todoObj.content) return alert('Please Fill The Content')

      setTodoArray(prev => {
        // tempTodoArray = [...prev, todoObj]
        console.log('tempTodoArray', tempTodoArray)

        const storedData = localStorage.getItem(myLocalDataName);
        const parsedData = storedData ? JSON.parse(storedData) : {};
        const myLocalData = {
          loginAndSignup: { ...parsedData?.loginAndSignup },
          myTodo: [...prev, todoObj]
        }
        localStorage.setItem(myLocalDataName, JSON.stringify(myLocalData))
        console.log('myLocalData', myLocalData)

        return [...prev, todoObj]
      })
    }
    router.back()
  }

  const handleInputFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTodoObj((prev) => ({ ...prev, [name]: value }));
    // console.log({ name, value })
  }

  useEffect(() => {
    const myLocalData = JSON.parse(localStorage.getItem(myLocalDataName) ?? `{

      loginAndSignup: {
        email: '',
        password: '',
        confirmPassword: '',
      },

      myTodo: [
        {
          title: '',
          content: '',
        },

      ],


    }`)
    setTodoArray(myLocalData.myTodo)
    // alert('sjdf')
    // console.log('myLocalData',myLocalData)
  }, [])

  return (
    <div className={styles.theMainDiv}>
      <div className={styles.container}>
        <h1>Create</h1>
        <div className={styles.innerContainer}>
          <InputField onChange={handleInputFieldChange} name='title' type='text' lable='Title' />
          <InputField onChange={handleInputFieldChange} name='content' type='text' lable='Content' />
        </div>
        <div>
          <CustomButton onClick={() => handleClickCreate('Cancel')} type='submit' name='Cancel' />
          <CustomButton onClick={() => handleClickCreate('Create')} type='submit' name='Create' />
        </div>
      </div>
    </div>
  )
}

export default Create
