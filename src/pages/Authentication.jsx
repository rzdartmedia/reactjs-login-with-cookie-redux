import React, { useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
import AuthApi from "../AuthApi"
// import { selectRefreshToken, setCredentials } from "../features/authSlice"
import Cookies from "js-cookie"
import ValidatorAuthentication from "../app/validator/authentication"
import AuthenticationService from "../app/Services/AuthenticationService"

function Authentication() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState({})
  const authenticationService = new AuthenticationService()

  // const token = useSelector(selectRefreshToken)

  // const dispatch = useDispatch()

  const Auth = React.useContext(AuthApi)

  async function login(e) {
    e.preventDefault()

    // validation form
    const { errors: errorValidate, formIsValid } =
      ValidatorAuthentication.validatePostAuthentication({
        email,
        password,
      })

    if (!formIsValid) {
      setErrors(errorValidate)
      return false
    }

    // dispatch(
    //   setCredentials({
    //     refreshToken: email,
    //   })
    // )

    const result = await authenticationService.postAuthentication({
      email,
      password,
    })

    if (result.status === "success") {
      // const accessToken = result.data.accessToken;
      Auth.setAuth(true)
      Cookies.set("refreshToken", result.data.refreshToken, { expires: 7 }) // expired 7 day
    }
  }

  return (
    <div className='container'>
      <form action='' className='w-[300px] mx-auto' onSubmit={(e) => login(e)}>
        <div className='flex flex-col'>
          <label htmlFor='email'>Email</label>
          <input
            className='border-2 border-black px-1'
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className='text-red-500'>{errors.email}</div>
        </div>
        <div className='flex flex-col'>
          <label htmlFor='password'>Password</label>
          <input
            className='border-2 border-black px-1'
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className='text-red-500'>{errors.password}</div>
        </div>
        <div className='w-full mt-2'>
          <button
            className='bg-black text-white w-full py-1 rounded-lg'
            type='submit'>
            Login
          </button>
        </div>
      </form>
    </div>
  )
}

export default Authentication
