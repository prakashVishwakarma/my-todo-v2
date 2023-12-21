'use client'

import React, { useEffect, useState } from 'react'

// import styles from '@/app/update/page.module.css'
import InputField from '@/Components/PureComponents/InputField/InputField'
import CustomButton from '@/Components/PureComponents/CustomButton/CustomButton'
import { useRouter, useParams } from 'next/navigation'
import { myLocalDataName } from '@/Constants/myLocalData'
import { TodoItem } from '@/TypeScriptTypes/TypeScriptTypes'

const Updatetodo = () => {

    const [todoObj, setTodoObj] = useState<TodoItem>({ id: "", title: "", contents: [{ id: "", content: "" }] })

    const [todoArray, setTodoArray] = useState([{
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
        if (!todoObj.contents) return alert('Please Fill The Content')

        // setTodoArray(prev => {
        //     // tempTodoArray = [...prev, todoObj]
        //     // console.log('tempTodoArray', tempTodoArray)

        //     // const storedData = localStorage.getItem(myLocalDataName);
        //     // const parsedData = storedData ? JSON.parse(storedData) : {};
        //     // for (let i = 0; i < parsedData.myTodo.length; i++) {
        //     //     if (i === Number(params.id)) {
        //     //         parsedData.myTodo[i].title = todoObj.title;
        //     //         parsedData.myTodo[i].content = todoObj.content;
        //     //         console.log('parsedData localStorage', parsedData)
        //     //     }
        //     // }
        //     // const myLocalData = {
        //     //     loginAndSignup: { ...parsedData?.loginAndSignup },
        //     //     myTodo: [...parsedData.myTodo]
        //     // }
        //     // localStorage.setItem(myLocalDataName, JSON.stringify(myLocalData))
        //     // // console.log('myLocalData', myLocalData)

        //     // return [...prev, todoObj]
        // })
        router.back()
    }

    useEffect(() => {
        const myLocalData = JSON.parse(localStorage.getItem(myLocalDataName) ?? `{}`)

        setTodoArray(myLocalData.myTodo)

        for (let i = 0; i < myLocalData?.myTodo?.length; i++) {
            if (i === Number(params.id)) {
                // setTodoObj(() => ({ title: myLocalData.myTodo[i].title, content: myLocalData.myTodo[i].content }))
                // myLocalData.myTodo[i].title = todoObj.title;
                // myLocalData.myTodo[i].content = todoObj.content;
                // console.log('myLocalData localStorage', myLocalData)
            }
        }
    }, [params.id])

    function handleClickAddMore(): void {
        throw new Error('Function not implemented.')
    }

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
                    <CustomButton onClick={() => handleClickUpdate()} type='submit' name='Cancel' />
                    {/* <CustomButton onClick={() => handleClickAddMore()} type='button' name='Add More' /> */}
                    <CustomButton onClick={() => handleClickUpdate()} type='submit' name='Update' />
                </div>

            </div>
        </div>

        {/* <div className={'theMainDiv'}>
            <div className={'container'}>
                <h1>Update</h1>
                <div className={'innerContainer'}>
                    <InputField onChange={handleInputFieldChange} value={todoObj?.title} name='title' type='text' lable='Title' />
                    <InputField onChange={handleInputFieldChange} value={todoObj?.contents} name='content' type='text' lable='Content' />
                </div>
                <CustomButton onClick={() => handleClickUpdate()} type='submit' name='Update' />
            </div>
        </div> */}
    </>
    )
}

export default Updatetodo
