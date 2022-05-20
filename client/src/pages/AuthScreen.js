import React, {useState, useRef} from 'react'
import { useMutation } from '@apollo/client'
import { SIGNUP_USER, LOGIN_USER } from '../graphql/mutations'
import { Alert } from '@mui/material'

const AuthScreen = ({ setLoggedIn }) => {
    const [showLogin, setShowLogin] = useState(true)
    const[formData, setFormData] = useState({})
    const authForm = useRef(null)
    const [signupUser, { data:signupData, loading:l1, error:e1 }] = useMutation(SIGNUP_USER)
    const [loginUser, { data:loginData, loading:l2, error:e2 }] = useMutation(LOGIN_USER, {
      onCompleted(data) {
        localStorage.setItem("jwt", data.signinUser.token)
        setLoggedIn(true)
      }
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setFormData({})
        authForm.current.reset()
        if (showLogin) {
          loginUser({
            variables: {
              userSignin: formData
            }
          })
          console.log(loginData)
        } else {
            signupUser({
                variables: {
                  userInfo: formData
                }
            })
        }
    }

    return (
        <div className='AuthScreen'>
            <div className="AuthBox">
                {signupData && <Alert severity='success'>Signed Up Successfully!</Alert>}
                {e1 && <Alert severity='error'>{e1.message}</Alert>}
                {e2 && <Alert severity='error'>{e2.message}</Alert>}
                <h2>{showLogin ? "Login" : "Sign Up"}</h2>
                <form ref={authForm} className='AuthBox__form' onSubmit={handleSubmit}>
                    {
                        !showLogin &&
                        <>
                        <label htmlFor="firstName">First Name</label>
                        <input required={true} name='firstName' onChange={handleChange} id="firstName" type="text" />
                        <label htmlFor="lastName">Last Name</label>
                        <input required={true} name='lastName' onChange={handleChange} id="lastName" type="text" />
                        </>
                    }
                    <label htmlFor="email">Email</label>
                    <input required={true} name='email' onChange={handleChange} id="email" type="email" />
                    <label htmlFor="password">Password</label>
                    <input required={true} name='password' onChange={handleChange} id="password" type="password" />
                    <a href="#" onClick={() => {
                        setShowLogin(!showLogin)
                        setFormData({})
                        authForm.current.reset()
                    }}>{showLogin ? "Signup" : "Login"}</a>
                    <input id='submit' type="submit" value="Submit" />
                </form>
            </div>
        </div>
    )
}

export default AuthScreen;