'use client'

import React, { useEffect, useState } from 'react'
import InputField from '@/Components/PureComponents/InputField/InputField'
import CustomButton from '@/Components/PureComponents/CustomButton/CustomButton'
import { useRouter } from 'next/navigation'
import { encryptionDataStrengths, myLocalData, myLocalDataName, myRichTextEditorData, whoIsLoggedIn } from '@/Constants/myLocalData'
import RichTextEditor from '@/Components/RichTextEditor/RichTextEditor'
import getDataFromSessionStorage from '@/Utils/getDataFromSessionStorage'
import { routes } from '@/Constants/routes'
import getLocalStorageData from '@/Utils/getLocalStorageData'
import areCredentialsMatching from '@/Utils/areCredentialsMatching'
import encrypt from '@/Utils/encryptions/encryptData'
import router from 'next/router'
import ModifyTodoData from '@/Utils/ModifyTodoData'
import deleteObjectById from '@/Utils/deleteObjectById'
import modifyLocalStorageData from '@/Utils/modifyLocalStorageData'
import storeDataInLocalStorage from '@/Utils/storeDataInLocalStorage'


const Create = () => {

  const route = useRouter()

  return (
    < >
      <RichTextEditor />
      {/* <div dangerouslySetInnerHTML={{ __html: data }} /> */}
    </>
  )
}

export default Create
