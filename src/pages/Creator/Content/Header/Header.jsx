import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { findHistoryCreateNFTById } from "~/api/CreatorNFT";
import routesConfig from "~/configs";
import styles from "./Header.module.sass";
import Listing from "./Listing";
import Main from "./Main";

const cx = classNames.bind(styles);

const Header = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentSource = searchParams.get("source");
  const [data, setData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await findHistoryCreateNFTById(id);
        setData(results);
      } catch (e) {
        setData({});
        navigate(routesConfig.dashboard);
      }
    };

    fetchData();
  }, [id, navigate, currentSource]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <Listing data={data} />
        <Main data={data} currentSource={currentSource} />
      </div>
    </div>
  );
};

export default Header;
