import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button className="bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded h-12 justify-center" onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LoginButton;