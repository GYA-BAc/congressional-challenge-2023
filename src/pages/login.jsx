import './login.css';
import { useEffect, useRef, useState } from "react"
import Navbar from '../components/home/Navbar';
import { Link } from "react-router-dom"
import { fetchWithTimeout } from '../Utils';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate()

    const correctLogin = () => {
        fetchWithTimeout(`${process.env.REACT_APP_BACKEND_API}/auth/fetchUserData`).then(
            
            (res) => {
              if (!res.ok) {
                // TODO: add bad case where server fails
                console.log(res.status)
                alert("Internal server error, please try again later")
              }

              return res.json()
            }
        ).then(
            (data) => {
                // console.log(AsyncStorage) 
                localStorage.setItem('currentUserID', data.content.id.toString())
                navigate("/media")
            }
        ).catch(
            (e) => {
              alert("Failed to fetch user data. Please try logging in again")
            }
        )
        
    }

    const incorrectLogin = () => {
        document.getElementById('input-container').elements[1].value = ""
        
        setTimeout(() => {
            alert("Username or Password Incorrect")
        }, 50)
    }
    
    const attemptLogin = () => {
        fetchWithTimeout(`${process.env.REACT_APP_BACKEND_API}/auth/login`, {
            method: "POST",
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}, 
            body: JSON.stringify({
                'username': document.getElementById('input-container').elements[0].value, 
                'password': document.getElementById('input-container').elements[1].value
            }),
            timeout: 3000
          }).then(
            (res) => {
              (res.ok) ? correctLogin(): incorrectLogin()
              // console.log(res.status)
                
              // console.log(res.headers)
              // return res.json()
            }
          ).catch(
            // failed to login due to timeout
            () => {
              alert("Could not connect to our servers. Check your internet connection")
            }
        )
    }

    const attemptRegister = () => {
        
    }


    return (
            <div className="Login" >
                <Link to="/" id="link">
                    <img className="menu" src="/assets/menu.png"></img>
                </Link>
                <div id="login-container">
                    <h1 id='login-title'>Login</h1>

                    <form id='input-container'>
                        <input
                            type='text'
                            placeholder='username'
                            id='username-field'
                        />
                        <input
                            type='password'
                            placeholder='password'
                            id='password-field'
                        />
                    </form>

                    <div id='submit-container'>
                        <button id='register-button'>Register</button>
                        <button onClick={attemptLogin} id='login-button'>Login</button>
                    </div>
                </div>
                
            </div>
    )
}

export default Login