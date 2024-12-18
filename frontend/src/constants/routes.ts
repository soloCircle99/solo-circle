import Login from "../components/Authentication/Login";
import Home from "../components/Deskboard/Home";
import Admin from "../pages/Admin";


export const AUTH_ROUTES = [
  {
    path: "/login",
    component: Login,
  },
];

export const ROUTES = [
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/admin",
    component: Admin,
  },
];