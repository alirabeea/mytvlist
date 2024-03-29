import React, {useState} from 'react'
import { useHistory } from "react-router-dom"
import axios from 'axios'

export default function Login(props) {
    const [loginInfo, setLoginInfo] = useState({username: "", password: ""})
    const [wrongPass, setWrongPass] = useState(false)
    let history = useHistory()
    const submitHandler = (e)=>{
        e.preventDefault();
        axios.post("/api/auth/login", {
            username: loginInfo.username,
            password: loginInfo.password
        })
        .then((res)=>{
            if (res.status === 200){
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('username', res.data.username)
                localStorage.setItem('isAuth', true)
                props.setIsAuth(true)
                history.push("/")
            }
        })
        .catch((err)=>{
            setWrongPass(true)
        })
    }

    return (
        <div>
            <form action="POST" onSubmit={submitHandler}>
                <div className="form-inner">
                    <h2>Login</h2>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input type="text" name="username" id="username" onChange={(e)=> setLoginInfo((curState)=>{return{...curState, username:e.target.value}})} value={loginInfo.username}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" id="password" onChange={(e)=> setLoginInfo((curState)=>{return{...curState, password:e.target.value}})} value={loginInfo.password}/>
                    </div>
                    {wrongPass? <p> Username/password is incorrect</p> : null}
                    <input type="submit" value="Login" />
                </div>
            </form>
        </div>
    )
}
