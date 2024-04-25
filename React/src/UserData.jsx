import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ConfigProvider, Table } from 'antd'
import './data.css'
import { useQuestion } from './App'

export default function UserData() {
const { openNotification } = useQuestion()
const columns = [
  {
    title: 'Firstname',
    dataIndex: 'firstname',
    key: 'firstname',
  },
  {
    title: 'Lastname',
    dataIndex: 'lastname',
    key: 'lastname',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Result',
    dataIndex: 'result',
    key: 'result',
  },
  {
    title: 'Action',
    key: 'delete',
    render: (_,record) => <a id='delete' onClick={() => deleteUser(record._id)}>Delete</a>
  },
]

  const [ userData, setUserData ] = useState([])
  useEffect(() => {
    (async () => {
      await axios.get(`http://localhost:3000/user/getuser`)
        .then(values => setUserData(values.data))
        .catch(error => openNotification("Error",error.message))
    })()
  },[])

  const deleteUser = (record) => {
    (async () => {
      await axios.delete(`http://localhost:3000/user/deleteuser/${record}`)
      .then(values => {
        setUserData(values.data)
        openNotification('Success',"User Deleted")
      })
      .catch(error => openNotification("Error","Not Found"))
    })()
  }

  return (
    <ConfigProvider
      theme={{
        components:{
          Table:{
            rowHoverBg: 'none',
            colorBgContainer: 'none',
            fontSize: '1.1rem',
          }
        }
      }}
    >
      <div id="result-container">
        <Table 
          id='result-item' 
          columns={columns} 
          dataSource={userData} 
          pagination={{
            className: 'page',
            position: ['bottomCenter'],
            pageSize: 4,
          }}
          footer={() => <span className='footer'>Total Records: {userData.length}</span>}
        />
      </div>
    </ConfigProvider>
  )
}