import React, { useState } from 'react'
import { Button, Form, Modal, Radio, Input } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { useQuestion, useTheme } from './App'
import EditForm from './EditForm'

const { TextArea } = Input

export default function Question({ id, isAdmin, setOrder, order }) {
    const { questions, answer } = useQuestion()
    const [value] = useState()
    const [ idModal, setModal ] = useState()
    const {question, optionOne, optionTwo, optionThree, optionFour, isRequired,isDisabled } = questions[id]
    const questionStyle = {
        border: 'none',
        cursor: 'default',
        fontSize: '1.2rem',
        resize: 'none',
        fontWeight: '600',
    }
    const optionStyle = {
        border: 'none',
        fontSize: '1.2rem',
        cursor: 'default',
        pointerEvents: isAdmin ? 'all' : 'none',
        resize: 'none',
        fontWeight: '500',
    }
    const editQue = () => {
        setModal(true)
    }

  return (
    <>
        <EditForm action = {'edit'} idModal = {idModal} questions = {questions[id]} setModal = {setModal} value = {value} setOrder = {setOrder} order = {order} />
        <Form.Item name={id}
            className='question-container'
            label={id+1}
            rules={[{
                required: isRequired && !isDisabled ,
                message: 'Please select answer'
            }]}
            validateTrigger='onSubmit'
            initialValue={answer[id]}
        >
            <Radio.Group
                disabled={isDisabled || isAdmin}
                value={value}
            >
                <TextArea 
                    className='question-item'
                    style={questionStyle}
                    value={question}
                    disabled
                    autoSize
                />
                {isAdmin && (<Button className='primary-btn edit-btn' id='edit' onClick={editQue}><EditOutlined /></Button>)}
                <div className="options-container">
                    <Radio value={1} className='options-item'>
                        <TextArea className='option-text'
                            id='optiona'
                            style={optionStyle} 
                            value={optionOne}
                            disabled
                            autoSize
                        />
                    </Radio>
                    <Radio value={2} className='options-item'>
                        <TextArea className='option-text' 
                            id='optionb'
                            style={optionStyle} 
                            value={optionTwo}
                            disabled
                            autoSize
                        />
                    </Radio>
                    <Radio value={3} className='options-item'>
                        <TextArea className='option-text' 
                            id='optionc'
                            style={optionStyle} 
                            value={optionThree}
                            disabled
                            autoSize
                        />
                    </Radio>
                    <Radio value={4} className='options-item'>
                        <TextArea className='option-text' 
                            id='optiond'
                            style={optionStyle} 
                            value={optionFour}
                            disabled
                            autoSize
                        />
                    </Radio>
                </div>
            </Radio.Group>
        </Form.Item>
    </>
  )
}