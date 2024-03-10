import classNames from "classnames/bind";
import { useEffect } from "react";
import { setGlobalState, useGlobalState } from "~/store";
import styles from "./Collection.module.sass";
import Grid from "./Grid/Grid";
import List from "./List/List";

const cx = classNames.bind(styles);

const Collection = () => {
  const [showHomeGridStyle] = useGlobalState("showHomeGridStyle");

  useEffect(() => {
    const styleLocalStorage = localStorage.getItem("home-gridstyle");

    if (!styleLocalStorage) {
      localStorage.setItem("home-gridstyle", "grid");
      setGlobalState("showHomeGridStyle", "grid");
    } else {
      setGlobalState("showHomeGridStyle", styleLocalStorage);
    }
  }, []);

  const data = [
    {
      name: "Frogana",
      image_url: "https://img-cdn.magiceden.dev/rs:fill:128:0:0/plain/https%3A%2F%2Fimg.reservoir.tools%2Fimages%2Fv2%2Fmainnet%2Fz9JRSpLYGu7%252BCZoKWtAuAJXt3VAp54pSaUsIEJ3nSlXy2mBtINU59f5tUQ2c6EFv4Eddsqp6ySUiNlk%252BZnSyZyEUjg4skoxxfq6YneaRAeQj3TFEnYc4FaoWjkYhr3zY%3Fwidth%3D250",
    },
    {
      name: "meowmeowmeowmeowmeowmeow",
      image_url: "https://img-cdn.magiceden.dev/rs:fill:128:0:0/plain/https%3A%2F%2Fimg.reservoir.tools%2Fimages%2Fv2%2Fmainnet%2Fz9JRSpLYGu7%252BCZoKWtAuAJXt3VAp54pSaUsIEJ3nSlXy2mBtINU59f5tUQ2c6EFv4Eddsqp6ySUiNlk%252BZnSyZyEUjg4skoxxfq6YneaRAeQj3TFEnYc4FaoWjkYhr3zY%3Fwidth%3D250",
    },
    {
      name: "Pikachu",
      image_url: "https://img-cdn.magiceden.dev/rs:fill:128:0:0/plain/https%3A%2F%2Fimg.reservoir.tools%2Fimages%2Fv2%2Fmainnet%2Fz9JRSpLYGu7%252BCZoKWtAuAJXt3VAp54pSaUsIEJ3nSlXy2mBtINU59f5tUQ2c6EFv4Eddsqp6ySUiNlk%252BZnSyZyEUjg4skoxxfq6YneaRAeQj3TFEnYc4FaoWjkYhr3zY%3Fwidth%3D250",
    },
    {
      name: "Cets",
      image_url: "https://img-cdn.magiceden.dev/rs:fill:128:0:0/plain/https%3A%2F%2Fimg.reservoir.tools%2Fimages%2Fv2%2Fmainnet%2Fz9JRSpLYGu7%252BCZoKWtAuAJXt3VAp54pSaUsIEJ3nSlXy2mBtINU59f5tUQ2c6EFv4Eddsqp6ySUiNlk%252BZnSyZyEUjg4skoxxfq6YneaRAeQj3TFEnYc4FaoWjkYhr3zY%3Fwidth%3D250",
    },
    {
      name: "Ticket",
      image_url: "https://img-cdn.magiceden.dev/rs:fill:128:0:0/plain/https%3A%2F%2Fimg.reservoir.tools%2Fimages%2Fv2%2Fmainnet%2Fz9JRSpLYGu7%252BCZoKWtAuAJXt3VAp54pSaUsIEJ3nSlXy2mBtINU59f5tUQ2c6EFv4Eddsqp6ySUiNlk%252BZnSyZyEUjg4skoxxfq6YneaRAeQj3TFEnYc4FaoWjkYhr3zY%3Fwidth%3D250",
    },
    {
      name: "Fox",
      image_url: "https://img-cdn.magiceden.dev/rs:fill:128:0:0/plain/https%3A%2F%2Fimg.reservoir.tools%2Fimages%2Fv2%2Fmainnet%2Fz9JRSpLYGu7%252BCZoKWtAuAJXt3VAp54pSaUsIEJ3nSlXy2mBtINU59f5tUQ2c6EFv4Eddsqp6ySUiNlk%252BZnSyZyEUjg4skoxxfq6YneaRAeQj3TFEnYc4FaoWjkYhr3zY%3Fwidth%3D250",
    },
  ];

  return (
    <div className={cx("wrapper")}>
      {showHomeGridStyle === "list" && <List data={data} />}
      {showHomeGridStyle === "grid" && <Grid data={data} />}
    </div>
  );
};

export default Collection;
