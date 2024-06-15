'use client'

import CustomButton from '@/Components/PureComponents/CustomButton/CustomButton'
import { routes } from '@/Constants/routes'
import React, { useEffect, } from 'react'
import { useRouter } from 'next/navigation'
const Home = () => {

  const route = useRouter()

  const HandleClickNavigate = () =>  {
    route.push(routes.richTextEditor.create)
  }

  return (
    <>
      {/* <RichTextEditor /> */}
      <h1>rich text editor</h1>

      <CustomButton type={'button'} name={'Create'} onClick={() => HandleClickNavigate()} />

    </>
  )
}

export default Home;