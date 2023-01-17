import { useEffect, useState } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import getUserProfile from "../../services/utils/api/get-user-profile";
import LoadingIcon from "../loading-icon/loading-icon";

interface TProtectedProps extends RouteProps {
  auth: string;
  path: string;
  redirect?: string;
}

export default function ProtectedRoute ({path, auth, redirect, children, ...props}: TProtectedProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [role, setRole] = useState<string>('');

  useEffect(() => {
    setLoading(true);
    getUserProfile().then((res) => {
      setRole(res.role);
      setLoading(false);
    });
  }, [])
  
  if (loading) {
    return (
      <main>
        <LoadingIcon />
      </main>
    )
  }

  return (
    <Route path={path} {...props}>
      {auth === role ? children : <Redirect to={redirect ? redirect : '/missing'} />}
    </Route>
  )
}
