import { useContext, useEffect, useState } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import getUserProfile from "../../services/utils/api/get-user-profile";
import { setCookie } from "../../services/utils/cookie";
import { AuthContext } from "../app/app";
import LoadingIcon from "../loading-icon/loading-icon";

interface TProtectedProps extends RouteProps {
  auth?: string;
  path: string;
  redirect?: string;
}

export default function ProtectedRoute({
  path,
  auth,
  redirect,
  children,
  ...props
}: TProtectedProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const {currentUser} = useContext<any>(AuthContext);
  const role = currentUser.role;

  useEffect(() => {
    /* setLoading(true);
    if (localStorage.getItem("accessToken")) {
      getUserProfile().then((res) => {
        setRole(res.role);
        setLoading(false);
      });
    } else { */
      if (document.location.hash) {
        const newToken = document.location.hash
          .split("&")
          .find((el) => el.includes("access_token"))
          ?.split("=")[1];
        setCookie("accessToken", newToken);
      }
      setLoading(false);
    // }
  }, []);

  if (loading) {
    return (
      <main>
        <LoadingIcon />
      </main>
    );
  }

  if (!localStorage.getItem("accessToken")) {
    return <Redirect to="/login" />;
  }

  if (!localStorage.getItem('accessToken')) {
    return (
      <Redirect to='/login' />
    );
  }

  return (
    <Route path={path} {...props}>
      {!auth || auth === role ? (
        children
      ) : (
        <Redirect to={redirect ? redirect : "/missing"} />
      )}
    </Route>
  );
}
