'use client'

import React, { useEffect, useState } from 'react'
import InputField from '@/Components/PureComponents/InputField/InputField'
import CustomButton from '@/Components/PureComponents/CustomButton/CustomButton'
import { useRouter } from 'next/navigation'
import { myLocalData, myLocalDataName } from '@/Constants/myLocalData'


const Create = () => {

  const [todoObj, setTodoObj] = useState({
    title: '',
    content: '',
  })

  const [todoArray, setTodoArray] = useState([{
    title: '',
    content: '',
  }])

  const router = useRouter()

  const handleClickCreate = (buttonType: string) => {
    if (buttonType === 'Create') {

      if (!todoObj.title) return alert('Please Fill The Title')
      if (!todoObj.content) return alert('Please Fill The Content')

      setTodoArray(prev => {

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
  }

  useEffect(() => {
    const myLocalData = JSON.parse(localStorage.getItem(myLocalDataName) ?? `{}`)
    setTodoArray(myLocalData.myTodo)
  }, [])

  return (
    <div className={'theMainDiv'}>
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
    </div>
  )
}

export default Create
