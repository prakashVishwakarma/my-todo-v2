'use client'

import React from 'react'
import styles from './page.module.css'
import Link from 'next/link'


import { routes } from '@/Constants/routes'
import My3dCard from '@/Components/My3dCard/My3dCard'
import HoverCard from '@/Components/HoverCard/HoverCard'

const Home = () => {

  return (
    <>
      <HoverCard />
      <div className={styles.HomePageContainer} style={{ display: 'flex', justifyContent: 'center', width: '100%', height: '100vh' }}>
        <div style={{ width: '90%', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }} >
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }} >
            <Link href={routes.googleKeepTodo.home} style={{ textDecoration: 'none' }}>
              <My3dCard title={'MY GOOGLE KEEP TODOS'} tagLine={'Stay organized, seize the day: Google Keep Todos _ Your thoughts, your tasks, your way.'} />
            </Link>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }} >
            <Link href={routes.richTextEditor.home} style={{ textDecoration: 'none' }}>
              <My3dCard title={'MY RICH TEXT EDITOR TODOS'} tagLine={'Empower Your Words: Unleash Creativity with Our Rich Text Editor.'} />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home;