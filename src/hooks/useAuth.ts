import { useContext } from "react";
import { AuthContext } from "../components/app/app";

export default function useAuth () {
  const auth = useContext(AuthContext);
  return auth;
}