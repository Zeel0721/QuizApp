import React from 'react'
import axios from 'axios'
import { Button, Form, Radio, Select, Input, Modal } from 'antd'
import { useQuestion } from './App'

const { TextArea } = Input

export default function EditForm({ action, questions, idModal, setModal, value, setOrder, order }) {
    const { setQuestions, openNotification } = useQuestion()
    const submitEdit = (values) => {
        const {question, optionOne, optionTwo, optionThree, optionFour, answer, isRequired, isDisabled} = values
        if(questions?._id){
            axios.put(`http://localhost:3000/admin/setquestion/${questions._id}`,{
                question,
                optionOne,
                optionTwo,
                optionThree,
                optionFour,
                answer:parseInt(answer),
                isRequired,
                isDisabled
            })
            .then(value => {
                openNotification("Success","Question Updated")
                setQuestions(value.data)
            })
            .catch((error) => {
                openNotification("Error",error.response.data.message)
                closeModal()
            })
        }
        else{
            axios.post(`http://localhost:3000/admin/addquestion/`,{
                question,
                optionOne,
                optionTwo,
                optionThree,
                optionFour,
                answer,
                isRequired,
                isDisabled
            })
            .then(value => {
                openNotification("Success","Question Added")
                setQuestions(value.data)
                closeModal()
            })
            .catch((error) => {
                openNotification("Error",error.response.data.message)
                closeModal()
            })
        }
        setModal(false)
    }
    const closeModal = () => {
        document.getElementById('edit-form').reset()
        setModal(false)
    }
    const deleteQuestion = (id) => {
        (async () => {
            await axios.delete(`http://localhost:3000/admin/deletequestion/${id}`)
                .then(values => {
                    openNotification("Success","Question Deleted")
                    setQuestions(values.data)
                    if(values.data.length === order.minOrder){
                        setOrder((prev) => {
                            return {minOrder: prev.minOrder-4,
                            maxOrder: prev.maxOrder-4}
                        })
                    }
                })
                .catch(error => {
                    openNotification("Error",error.message)
                })
        })()
        setModal(false)
    }

  return (
    <Modal className='modal-container' title='Set Answer' open={idModal} footer={null} onCancel={closeModal}>
        <Form id='edit-form' labelCol={{span: 3}} onFinish={submitEdit} autoComplete='off'>
            <Form.Item name='question' label={'Question'} initialValue={questions?.question}>
                <TextArea
                    className='modal-input'
                    autoSize
                />
            </Form.Item>
            <Form.Item name='optionOne' label={'A'} initialValue={questions?.optionOne}>
                <TextArea className='modal-input'
                    autoSize
                />
            </Form.Item>
            <Form.Item name='optionTwo' label={'B'} initialValue={questions?.optionTwo}>
                <TextArea className='modal-input' 
                    autoSize
                />
            </Form.Item>
            <Form.Item name='optionThree' label={'C'} initialValue={questions?.optionThree}>
                <TextArea className='modal-input'       
                    autoSize
                />
            </Form.Item>
            <Form.Item name='optionFour' label={'D'} initialValue={questions?.optionFour}>
                <TextArea className='modal-input'       
                    autoSize
                />
            </Form.Item>
            <Form.Item name='answer' label='Select Answer' initialValue={questions?.answer}>
                <Select style={{width: '120px'}}
                    className=''
                    options={[
                        {value: 1, label: 'Option A'},
                        {value: 2, label: 'Option B'},
                        {value: 3, label: 'Option C'},
                        {value: 4, label: 'Option D'}
                    ]}
                >
                </Select>
            </Form.Item>
            <Form.Item name='isRequired' label='Is Required' initialValue={false}>
                <Radio.Group value={value}>
                    <Radio value={true}>True</Radio>
                    <Radio value={false}>False</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item name='isDisabled' label='Is Disabled' initialValue={false}>
                <Radio.Group value={value}>
                    <Radio value={true}>True</Radio>
                    <Radio value={false}>False</Radio>
                </Radio.Group>
            </Form.Item>
            <div className="edit-form-control">
                <Button style={{marginTop: '15px'}} className='primary-btn' htmlType='submit'>Submit</Button>
                { action === 'edit' &&(<Button style={{marginTop: '15px'}} className='primary-btn' onClick={() => deleteQuestion(questions._id)}>Delete</Button>)}
            </div>
        </Form>
    </Modal>
  )
}