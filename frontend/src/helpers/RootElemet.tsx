import { Roles } from "../constants";
import { Navigate } from "react-router-dom"

export const RootElement = ({ role }: { role: string }) => {
  let url: string

  switch (role) {
    case role = Roles.USER:
      url = "/home"
      break;
    case role = Roles.ADMIN || Roles.SUPERUSER:
      url = "/admin"
      break;
    default:
      url = "/error"
  }

  return <Navigate to={url} />;
};