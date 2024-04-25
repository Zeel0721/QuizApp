import { createContext, useContext, useEffect, useState } from "react"
import Login from "./Login"
import { Link, Route, Routes } from "react-router-dom"
import User from "./User"
import Admin from "./Admin"
import './styles.css'
import { Dropdown, notification } from "antd"

const ThemeContext = createContext()
const QuestionContext = createContext()
export const useTheme = () => useContext(ThemeContext)
export const useQuestion = () => useContext(QuestionContext)
const linearBackground = (primaryColor,secondaryColor) => {return {backgroundImage: `linear-gradient(to right, ${primaryColor} 50%, ${secondaryColor} 50%)`}}
const items = [
  {
    key: 'purple-pink',
    label: <div id="purple-pink" className="theme-container" style={linearBackground(`#f9c5bd`,`#161748`)} />,
  },
  {
    key: 'greyblue-purple',
    label: <div id="greyblue-purple" className="theme-container" style={linearBackground(`#4f5f76`,`#091f36`)} />,
  },
  {
    key: 'silver-slate',
    label: <div id="silver-slate" className="theme-container" style={linearBackground(`#bccbde`,`#1d1e22`)} />,
  },  
]

export default function App() {
  const [ questions, setQuestions ] = useState([])
  const [ answer, setAnswer ] = useState({})
  const [authenticate,setAuthenticate] = useState(false)
  const [ adminComp, setAdminComp ] =useState('Edit')
  const root = document.querySelector(":root")
  const primaryColor = getComputedStyle(root).getPropertyValue('--primary-color')
  const secondaryColor = getComputedStyle(root).getPropertyValue('--secondary-color')
  const changeAdmin = (e) => {
    e.preventDefault()
    setAdminComp(e.target.innerText)
  }
  const changeTheme = (e) => {
    switch(e.key){
      case 'purple-pink' :
        root.style.setProperty('--primary-color','#f9c5bd')
        root.style.setProperty('--secondary-color','#161748')
        return
      case 'greyblue-purple' :
        root.style.setProperty('--primary-color','#4f5f76')
        root.style.setProperty('--secondary-color','#091f36')
        return
      case 'silver-slate' :
        root.style.setProperty('--primary-color','#1d1e22')
        root.style.setProperty('--secondary-color','#bccbde')
        return
    }
  }
  const openNotification = ( type, message ) => {
    switch(type){
      case "Success":
        notification.success({
          message: type,
          description: message,
          duration: 3,
          style: {fontSize: 'large', fontWeight: 'bold', color: 'red'},
        });
        return
      case "Error":
        notification.error({
          message: type,
          description: message,
          duration: 3,
          style: {fontSize: 'large', fontWeight: 'bold', color: 'red'},
        });
        return
    }
  }

  useEffect(() =>{
    if (sessionStorage.getItem('authorised') === 'true') setAuthenticate(true)
  },[])

  return (
  <QuestionContext.Provider value={{ questions, setQuestions, answer, setAnswer, openNotification }}>
    <ThemeContext.Provider value = {{ primaryColor, secondaryColor }}>
      <header className="header">
        <Link to='/' id="user" >User</Link>
        <Link to='/login' id="login" >Admin</Link>
        <Dropdown
          menu={{
            items,
            onClick: changeTheme
          }}
          overlayClassName='theme-dropdown'
        >
          <a id="theme" onClick={(e) => e.preventDefault()}>Theme</a>
        </Dropdown>
        {authenticate ?<a href="" id="edit" onClick={changeAdmin} >Edit</a> :null}
        {authenticate ?<a href="" id="result-grid" onClick={changeAdmin} >Result</a> :null}
      </header>
      <div className="app">
        <Routes>
          <Route path="/"
            element ={<User 
            key='user'
            setAuthenticate = {setAuthenticate}
            />}
          />
          <Route path="/login" 
            element ={authenticate === false
            ?<Login
              key='login'
              setAuthenticate = {setAuthenticate} />
            :<Admin
                key='admin'
                adminComp={adminComp}
              />
            }>
          </Route>
        </Routes>
      </div>
    </ThemeContext.Provider>
  </QuestionContext.Provider>
  )
}