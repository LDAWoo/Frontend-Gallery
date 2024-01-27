import PropType from "prop-types";
import { createContext, useEffect, useState } from "react";
import getCookie from "~/hooks/useRegisterGetCookie";
export const UseToken = createContext();

const AppTokenProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const cookieToken = getCookie("token");
  useEffect(() => {
    if (cookieToken) {
      setToken(cookieToken);
    }
  }, [cookieToken]);

  return <UseToken.Provider value={{ token, setToken }}>{children}</UseToken.Provider>;
};

AppTokenProvider.propTypes = {
  children: PropType.node.isRequired,
};

export default AppTokenProvider;
