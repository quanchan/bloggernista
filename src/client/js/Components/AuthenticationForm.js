import { useState, Fragment } from "react"
import '../../style/AuthenticationForm.scss'
const axios = require('axios')
function LoginForm() {
    const handleLogin = async (e) => {
        e.preventDefault()
        const username = document.getElementById('username').value
        const password = document.getElementById('password').value

        axios.post(
            'http://localhost:8082/api/user/login', 
            {username, password}
        )
        .then(userData => userData.data.token)
        .then(token => window.localStorage.setItem("token", token))
        .then(axios.get(
            'http://localhost:8082/api/posts',
            
        ))
        .catch(err => console.log(err))
        
    }
    return(
        <form>
            <input id="username" type="text" className="auth-input" placeholder="Enter your username"></input>
            <input id="password" type="password" className="auth-input" placeholder="Enter your password"></input>
            <input id="login-submit" type="submit" onClick={handleLogin} className="auth-submit" value="Submit"></input>
            <ErrorMessage/>
        </form>
    )
}

function SignUpForm() {
    const handleSignUp = async (e) => {
        e.preventDefault()
        const username = document.getElementById('username').value
        const password = document.getElementById('password').value
        const confirmPassword = document.getElementById('confirm-password').value
        const error = document.querySelector(".error-message")
        if (password !== confirmPassword) {
            error.innerHTML = "Your passwords do not match"
        }
        axios.post(
            'http://localhost:8082/api/user/login', 
            {username, password}
        )
        .then(userData => console.log(userData))
        .catch(err => console.err(err))
    }
    return(
        <form>
            <input id="username" type="text" className="auth-input" placeholder="Enter your username"></input>
            <input id="password" type="password" className="auth-input" placeholder="Enter your password"></input>
            <input id="confirm-password" type="password" className="auth-input" placeholder="Re-enter your password"></input>
            <input id="signup-submit" type="submit" className="auth-submit" value="Submit" onClick={handleSignUp}></input>
            <ErrorMessage/>
        </form>
        
    )
}

function ErrorMessage() {
    return (
        <div className="error-message">

        </div>
    )
}

function AuthenticationForm() {
    const [isLoginScreen, setIsLoginScreen] = useState(true)
    if(isLoginScreen) {
        return( 
        <>
            <LoginForm />
            <a onClick={() => setIsLoginScreen(!isLoginScreen)}>
                Haven't got an account? Sign up!
            </a>
        </>
        )
    } 
    return (
        <>
            <SignUpForm />
            <a onClick={() => setIsLoginScreen(!isLoginScreen)}>
               Already got an account? Login!
            </a>
        </>
        )
}


export default AuthenticationForm