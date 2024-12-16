import Login from "../components/Authentication/Login";
import Home from "../components/Deskboard/Home";


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
];