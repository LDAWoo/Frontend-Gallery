import Cookie from "js-cookie";

const setCookie = (name, value, expires) => {
  Cookie.set(name, value, {
    expires: expires,
    secure: true,
    sameSite: "strict",
    path: "/",
  });
};

export default setCookie;
