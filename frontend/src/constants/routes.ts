import Login from "../components/Authentication/Login";
import Home from "../components/Deskboard/Home";


export const AUTH_ROUTES = [
  {
    path: "/",
    component: Login,
  },
];

export const ROUTES = [
  {
    path: "/home",
    component: Home,
  },
];