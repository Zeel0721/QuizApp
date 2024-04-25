import React, { useEffect, useState } from 'react'
import './user.css'
import Quiz from './Quiz'
import UserCred from './UserCred'
import Result from './Result'
import { useQuestion } from './App'

export default function User({isAdmin= false, setAuthenticate}) {
  const [user,setUser] = useState({})
  const [result,setResult]= useState({})
  const [isCompleted,setCompleted] = useState(false)

  useEffect(() => (setAuthenticate(false),sessionStorage.setItem('authorised','false')),[])

  return (
    <>
    {isAdmin === false && !user.firstname ? <UserCred setUser = {setUser} /> :null}
    <div className="quiz">
      {user.firstname && isCompleted === false ? <Quiz isAdmin ={false} setResult = {setResult} setCompleted = {setCompleted} /> :null}
    </div>
    {isCompleted === true ? <Result user = {user} result = {result} setUser = {setUser} setCompleted = {setCompleted} /> :null}
  </>
  )
}