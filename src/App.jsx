import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"

import AuthApi from "./AuthApi"
import { useEffect, useState } from "react"
import Authentication from "./pages/Authentication"
import ProtectRouteAuthIsLogin from "./Midleware/ProtectRouteAuthIsLogin"
import ProtectRouteAuth from "./Midleware/ProtectRouteAuth"
import Cookies from "js-cookie"
import NotFound from "./pages/NotFound"

function App() {
  const [auth, setAuth] = useState(false)
  const readCookie = () => {
    const refreshToken = Cookies.get("refreshToken")
    if (refreshToken) {
      setAuth(true)
    }
  }

  useEffect(() => {
    readCookie()
  }, [])

  return (
    <AuthApi.Provider value={{ auth, setAuth }}>
      {/* <BrowserRouter basename='FeMongoose'> */}
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectRouteAuthIsLogin auth={auth} />}>
            <Route index element={<Authentication />} />
          </Route>
          <Route element={<ProtectRouteAuth auth={auth} />}>
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthApi.Provider>
  )
}

export default App
