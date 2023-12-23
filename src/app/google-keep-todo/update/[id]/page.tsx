'use client'

import React, { useEffect, useState } from 'react'

// import styles from '@/app/update/page.module.css'
import InputField from '@/Components/PureComponents/InputField/InputField'
import CustomButton from '@/Components/PureComponents/CustomButton/CustomButton'
import { useRouter, useParams, useSearchParams } from 'next/navigation'
import { encryptionDataStrengths, myLocalDataName, whoIsLoggedIn } from '@/Constants/myLocalData'
import { TodoItem, idNcontent } from '@/TypeScriptTypes/TypeScriptTypes'
import getLocalStorageData from '@/Utils/getLocalStorageData'
import getDataFromSessionStorage from '@/Utils/getDataFromSessionStorage'
import { routes } from '@/Constants/routes'
import areCredentialsMatching from '@/Utils/areCredentialsMatching'
import deleteObjectById from '@/Utils/deleteObjectById'
import encrypt from '@/Utils/encryptions/encryptData'
import modifyLocalStorageData from '@/Utils/modifyLocalStorageData'
import storeDataInLocalStorage from '@/Utils/storeDataInLocalStorage'
import assignObjectAtIndex from '@/Utils/assignObjectAtIndex'

const Updatetodo = () => {

    const [todoObj, setTodoObj] = useState<TodoItem>({ id: "", title: "", contents: [{ id: "", content: "" }] })

    const [todoArray, setTodoArray] = useState([{
        // id: '',
        title: '',
        content: '',
    }])
    const params = useParams()
    const searchParams = useSearchParams()
    const index = Number(searchParams.get('index'))


    const router = useRouter()

    const handleInputFieldChange = (e: React.ChangeEvent<HTMLInputElement>, i: number, inputValue: idNcontent) => {
        const { name, value } = e.target;

        setTodoObj((prevTodoObj) => {

            if (name === 'title') {

                // console.log({ ...prevTodoObj, title: value })
                return { ...prevTodoObj, title: value };

            } else if (name === 'content') {


                const updatedContents = [...prevTodoObj.contents];
                updatedContents[i].content = value;
                updatedContents[i].id = inputValue.id;
                // console.log({ ...prevTodoObj, contents: updatedContents })

                return { ...prevTodoObj, contents: updatedContents };
            }

            return prevTodoObj; // Do nothing if the name doesn't match 'title' or 'content'
        })

        // setTodoObj((prev) => ({ ...prev, [name]: value }));
    }
    console.log(todoObj)

    const handleClickUpdate = () => {

        if (!todoObj.title) return alert('Please Fill The Title')
        if (!todoObj.contents) return alert('Please Fill The Content')

        const theLoggedInUserData = getDataFromSessionStorage(whoIsLoggedIn)

        if (theLoggedInUserData.success) {

            // accessing user specific data theUserWhoIsLoggedIn, from local storage
            const theUserWhoIsLoggedIn = areCredentialsMatching(theLoggedInUserData?.data?.email, encrypt(theLoggedInUserData?.data?.password, encryptionDataStrengths), false)

            if (theUserWhoIsLoggedIn) {

                // delete todo which you want to update
                const restOfDeletedtTeUserWhoIsLoggedIn = deleteObjectById(getLocalStorageData(myLocalDataName), theUserWhoIsLoggedIn.id)

                if (getLocalStorageData(myLocalDataName)) {
                    // let a = theUserWhoIsLoggedIn
                    // let a = assignObjectAtIndex(theUserWhoIsLoggedIn.myGoogleKeepTodo, index, todoObj)
                    // let c = getLocalStorageData(myLocalDataName)

                    console.log(theUserWhoIsLoggedIn)
                    // console.log('assignObjectAtIndex(restOfDeletedMyGoogleKeepTodo, index, todoObj)', assignObjectAtIndex(restOfDeletedMyGoogleKeepTodo, index, todoObj))
                    // console.log('assignObjectAtIndex', a)
                    // console.log(c)
                    // console.log(restOfDeletedMyGoogleKeepTodo)
                    // console.log(typeof String(params.id))
                    
                    
                    storeDataInLocalStorage(myLocalDataName, [{ ...theUserWhoIsLoggedIn, myGoogleKeepTodo: [...assignObjectAtIndex(theUserWhoIsLoggedIn.myGoogleKeepTodo, index, todoObj)] }, ...restOfDeletedtTeUserWhoIsLoggedIn])
                    return router.back()
                }
            }
        } else {

            console.log('Failed to retrieve data from session storage.');
            alert('Please login first')
            return router.push(routes.login)
        }
    }

    useEffect(() => {

        const theLoggedInUserData = getDataFromSessionStorage(whoIsLoggedIn)

        if (theLoggedInUserData.success) {

            // accessing user specific data theUserWhoIsLoggedIn, from local storage
            const theUserWhoIsLoggedIn = areCredentialsMatching(theLoggedInUserData?.data?.email, encrypt(theLoggedInUserData?.data?.password, encryptionDataStrengths), false)

            if (theUserWhoIsLoggedIn) {
                setTodoObj(theUserWhoIsLoggedIn.myGoogleKeepTodo[index])
            }
        } else {

            console.log('Failed to retrieve data from session storage.');
            alert('Please login first')
            return router.push(routes.login)
        }



        // const myLocalData = JSON.parse(localStorage.getItem(myLocalDataName) ?? `{}`)

        // setTodoArray(myLocalData.myTodo)

        // for (let i = 0; i < myLocalData?.myTodo?.length; i++) {
        //     if (i === Number(params.id)) {
        //         setTodoObj(() => ({ title: myLocalData.myTodo[i].title, content: myLocalData.myTodo[i].content }))
        //         myLocalData.myTodo[i].title = todoObj.title;
        //         myLocalData.myTodo[i].content = todoObj.content;
        //         console.log('myLocalData localStorage', myLocalData)
        //     }
        // }
    }, [])

    function handleClickAddMore(): void {
        throw new Error('Function not implemented.')
    }

    return (<>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '60px' }}>
            <div style={{ width: '50%', border: '2px solid black', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <h1 style={{ textAlign: 'center' }} >Create</h1>
                <InputField onChange={(e) => handleInputFieldChange(e, 0, { id: '' })} value={todoObj?.title} name='title' type='text' lable='Title' />
                {
                    todoObj?.contents?.map((value, i, arr) => {
                        return (<>
                            <InputField onChange={(e) => handleInputFieldChange(e, i, value)} value={value?.content} name='content' type='text' lable='Content' />
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
