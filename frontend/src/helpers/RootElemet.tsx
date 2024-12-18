import { Roles } from "../constants";
import { Navigate } from "react-router-dom"

export const RootElement = ({ role }: { role: string }) => {
  let url: string

  switch (role) {
    case Roles.USER:
      url = "/home"
      break;
    case Roles.ADMIN:
    case Roles.SUPERUSER:
      url = "/admin"
      break;
    default:
      url = "/error"
  }

  return <Navigate to={url} />;
};