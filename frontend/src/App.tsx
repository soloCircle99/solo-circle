import { Routes, Route, Navigate } from "react-router-dom"
import { AUTH_ROUTES, ROUTES } from "./constants/routes"
import { RootElement } from "./helpers/RootElemet"
import { useAuthState } from "./context/auth"

function App() {
  const { isLoggedIn } = useAuthState()

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
        <Route element={<Navigate to="/" />} path="*" />
      </Routes>
    </>
  )
}

export default App
