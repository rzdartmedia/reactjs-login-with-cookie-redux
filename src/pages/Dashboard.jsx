import Cookies from "js-cookie"
import React from "react"
import AuthApi from "../AuthApi"

function Dashboard() {
  const Auth = React.useContext(AuthApi)

  function handleLogout() {
    Auth.setAuth(false)
    Cookies.remove("refreshToken")
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <button className='bg-black p-2 text-white m-3' onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}

export default Dashboard
