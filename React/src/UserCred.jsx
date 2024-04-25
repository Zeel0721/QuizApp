import React from 'react'
import { Form, Button, Input, ConfigProvider } from 'antd'
import './user.css'
import { useTheme } from './App'

export default function UserCred({setUser}) {
    const { primaryColor,secondaryColor } = useTheme()
    const inputStyle = {border: 'none', width: '300px'}
    const UserLogin = ({firstname,lastname,email}) => {
        setUser({firstname,lastname,email})
    }

  return (
    <ConfigProvider 
        theme={{components:{
            Form: {
                labelColor: secondaryColor,
                labelFontSize: 20
            }
        }}}
    >
    <Form className='login-from' layout='vertical' size='large' name="basic" onFinish={UserLogin} autoComplete='off'>
        <Form.Item>
            <span className='login-header'>User Detail</span>
        </Form.Item>
        <Form.Item
            className='input-field'
            name="firstname"
            label='Fistname'
            rules={[{
                min: 3,
                required: true,
                message: 'Please enter a valid Firstname!',
                validateTrigger: 'onSubmit',
            }]}
        >
            <Input className='login-input' 
                style={inputStyle}
                id='firstname' 
            />
        </Form.Item>
        <Form.Item
            className='input-field'
            name="lastname"
            label='Lastname'
            rules={[{
                min: 3,
                required: true,
                message: 'Please enter a valid Lastname!',
                validateTrigger: 'onSubmit',
            }]}
        >
            <Input className='login-input'
                style={inputStyle}
                id='lastname' 
            />
        </Form.Item>
        <Form.Item
            className='input-field'
            name="email"
            label='Email'
            rules={[{
                type: 'email',
                required: true,
                message: 'Please enter a valid Email!',
                validateTrigger: 'onSubmit',
            }]}
        >
            <Input className='login-input'
                style={inputStyle}
                id='email' 
            />
        </Form.Item>
        <Form.Item>
            <Button className='primary-btn' 
                id='login-submit' 
                type="primary" 
                htmlType='submit' 
                style={{width: '100px'}}
            >
                Submit
            </Button>
        </Form.Item>
    </Form>
    </ConfigProvider>
  )
}