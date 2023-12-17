'use client'

import React, { useEffect, useState } from 'react'

import styles from '@/app/update/page.module.css'
import InputField from '@/Components/PureComponents/InputField/InputField'
import CustomButton from '@/Components/PureComponents/CustomButton/CustomButton'
import { useRouter, useParams } from 'next/navigation'
import { TodoItem } from '@/app/create/page'
import { myLocalDataName } from '@/Constants/myLocalData'

const Updatetodo = () => {

    const [todoObj, setTodoObj] = useState<TodoItem>({
        title: '',
        content: '',
    })

    const [todoArray, setTodoArray] = useState<TodoItem[]>([{
        // id: '',
        title: '',
        content: '',
    }])
    const params = useParams()
    // console.log('params', params)

    const router = useRouter()


    const handleInputFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTodoObj((prev) => ({ ...prev, [name]: value }));
    }
    // console.log(todoObj)

    const handleClickUpdate = () => {

        // let tempTodoArray: TodoItem[] = []

        if (!todoObj.title) return alert('Please Fill The Title')
        if (!todoObj.content) return alert('Please Fill The Content')

        setTodoArray(prev => {
            // tempTodoArray = [...prev, todoObj]
            // console.log('tempTodoArray', tempTodoArray)

            const storedData = localStorage.getItem(myLocalDataName);
            const parsedData = storedData ? JSON.parse(storedData) : {};
            for (let i = 0; i < parsedData.myTodo.length; i++) {
                if (i === Number(params.id)) {
                    parsedData.myTodo[i].title = todoObj.title;
                    parsedData.myTodo[i].content = todoObj.content;
                    console.log('parsedData localStorage', parsedData)
                }
            }
            const myLocalData = {
                loginAndSignup: { ...parsedData?.loginAndSignup },
                myTodo: [...parsedData.myTodo]
            }
            localStorage.setItem(myLocalDataName, JSON.stringify(myLocalData))
            // console.log('myLocalData', myLocalData)

            return [...prev, todoObj]
        })
        router.back()
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

        for (let i = 0; i < myLocalData.myTodo.length; i++) {
            if (i === Number(params.id)) {
                setTodoObj(() => ({ title: myLocalData.myTodo[i].title, content: myLocalData.myTodo[i].content }))
                // myLocalData.myTodo[i].title = todoObj.title;
                // myLocalData.myTodo[i].content = todoObj.content;
                // console.log('myLocalData localStorage', myLocalData)
            }
        }

        // alert('sjdf')
        // console.log('myLocalData',myLocalData)
    }, [params.id])
    console.log(todoObj)
    return (

        <div className={styles.theMainDiv}>
            <div className={styles.container}>
                <h1>Update</h1>
                <div className={styles.innerContainer}>
                    <InputField onChange={handleInputFieldChange} value={todoObj?.title} name='title' type='text' lable='Title' />
                    <InputField onChange={handleInputFieldChange} value={todoObj?.content} name='content' type='text' lable='Content' />
                </div>
                <CustomButton onClick={() => handleClickUpdate()} type='submit' name='Update' />
            </div>
        </div>
    )
}

export default Updatetodo
