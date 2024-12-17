import { Routes, Route, Navigate } from "react-router-dom"
import { AUTH_ROUTES, ROUTES } from "./constants/routes"
import { RootElement } from "./helpers/RootElemet"
import { useAuthState } from "./context/auth"
import { useEffect } from "react"
import userApi from "./api/user"

function App() {
  const { isLoggedIn } = useAuthState()

  useEffect(() => {
    if (isLoggedIn) {
      (async () => {
        try {
          const userData = await userApi.get()
          console.log(userData)
        } catch (error) {
          console.error(error)
        }
      })()
    }
  }, [isLoggedIn])

  if (isLoggedIn) {
    return (
      <>
        <Routes>
          <Route element={<RootElement role="USER" />} path="/" />
          {ROUTES.map(route => (
            <Route
              element={<route.component />}
              key={route.path}
              path={route.path}
            />
          ))}
          <Route element={<Navigate to="/" />} path="*" />
        </Routes>
      </>
    )
  }

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

export default App
