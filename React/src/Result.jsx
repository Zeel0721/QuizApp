import React from 'react'
import './user.css'
import { Button } from 'antd'
import axios from 'axios'
import { useQuestion } from './App'

export default function Result({user, result, setUser, setCompleted}) {
    const { openNotification } = useQuestion()
    const { firstname, lastname, email } = user
    const reset = () => {
        (async () => {
            axios.post(`http://localhost:3000/user/adduser/`,{
                firstname,
                lastname,
                email,
                result: `${result.result} / ${result.max}`,
            })
            .then(() => openNotification("Success","User Added"))
            .catch(error => openNotification("Error",error.message))
        })()
        setUser({})
        setCompleted(false)
    }

    return (
        <div className='result-container'>
            <div id='result'>
                Firtname: <span className='result-value'>{firstname}</span>
                Lastname: <span className='result-value'>{lastname}</span>
                Email: <span className='result-value'>{email}</span>
                Result: <span className='result-value'>{`${result.result} / ${result.max}`}</span>
            </div>
            <Button className='primary-btn' id='home' onClick={reset}>Home</Button>
        </div>
  )
}