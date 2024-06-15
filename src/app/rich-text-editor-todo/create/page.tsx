'use client'

import React, { useEffect, useState } from 'react'
import InputField from '@/Components/PureComponents/InputField/InputField'
import CustomButton from '@/Components/PureComponents/CustomButton/CustomButton'
import { useRouter } from 'next/navigation'
import { myLocalData, myLocalDataName, myRichTextEditorData } from '@/Constants/myLocalData'
import RichTextEditor from '@/Components/RichTextEditor/RichTextEditor'
import getDataFromSessionStorage from '@/Utils/getDataFromSessionStorage'


const Create = () => {

  const [data, setData] = useState('')

  useEffect(() => {

    if (!getDataFromSessionStorage(myRichTextEditorData).success) return
    setData(getDataFromSessionStorage(myRichTextEditorData).data)

  }, [])

  return (
    < >
      <RichTextEditor data={data} />
      <div dangerouslySetInnerHTML={{ __html: data }} />
    </>
  )
}

export default Create
