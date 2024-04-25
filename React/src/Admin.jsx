import React, { useContext } from 'react'
import Quiz from './Quiz'
import { useQuestion, useTheme } from './App'
import UserData from './UserData'

export default function Admin({ adminComp }) {
  const { questions } = useQuestion()
  
  return (
    <div id='admin'>
      {adminComp === 'Edit' &&(<Quiz isAdmin ={true} />)}
      {adminComp === 'Result' &&(<UserData />)}
    </div>
  )
}