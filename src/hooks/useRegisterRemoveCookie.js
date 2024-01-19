import Cookie from "js-cookie";

const removeCookie = (name) => {
  return Cookie.get(name);
};

export default removeCookie;
