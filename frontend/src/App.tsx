import { Routes, Route, Navigate } from "react-router-dom"
import { AUTH_ROUTES, ROUTES } from "./constants/routes"
import { RootElement } from "./helpers/RootElemet"
import { useAuthState } from "./context/auth"
import { useEffect, useState } from "react"
import userApi from "./api/user"
import UserContext, { UserInterFace } from "./context/user"
import Loading from "./components/Loading"
import { Roles } from "./constants"

function App() {
  const { isLoggedIn } = useAuthState()
  const [userData, setUserData] = useState<UserInterFace>({
    user: {
      nickName: null,
      fullName: null,
      email: null,
      avatar: null,
      gender: null,
      birthday: null,
      id: null,
      role: null,
      phoneNumber: null,
      provider: null,
      verified: false,
    },
  })

  useEffect(() => {
    if (isLoggedIn) {
      (async () => {
        try {
          const { user } = await userApi.get()
          setUserData({ user })
        } catch (error) {
          console.error(error)
        }
      })()
    }
  }, [isLoggedIn])

  if (!isLoggedIn) {
    return (
      <>
        <Routes>
          {AUTH_ROUTES.map(route => (
            <Route
              element={<route.component />}
              key={route.path}
              path={route.path}
            />
          ))}
          <Route element={<Navigate to="/login" />} path="*" />
        </Routes>
      </>
    )
  }

  else if (userData.user.role === null) return (<Loading />)

  else {
    return (
      <UserContext.Provider value={userData}>
        <Routes>
          <Route element={<RootElement role={userData.user.role} />} path="/" />
          {ROUTES.map(route => (
            <Route
              element={route.role.includes(userData.user.role as Roles) ? <route.component /> : <Navigate to="/" />}
              key={route.path}
              path={route.path}
            />
          ))}
          <Route element={<Navigate to="/" />} path="*" />
        </Routes>
      </UserContext.Provider>
    )
  }
}

export default App