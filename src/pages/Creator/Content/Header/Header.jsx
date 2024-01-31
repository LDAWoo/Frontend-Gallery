import classNames from "classnames/bind";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { findHistoryCreateNFTById } from "~/api/CreatorNFT";
import routesConfig from "~/configs";
import styles from "./Header.module.sass";
import Listing from "./Listing";
import Main from "./Main";
import { UserContext } from "~/components/Contexts/AppUserProvider";

const cx = classNames.bind(styles);

const Header = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentSource = searchParams.get("source");
  const [data, setData] = useState({});
  const { id } = useParams();

  const { artist } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await findHistoryCreateNFTById(id);
        setData(results);

        if (artist.symbol) {
          setData((prev) => ({ ...prev, symbolArtist: artist.symbol }));
        }
      } catch (e) {
        setData({});
        navigate(routesConfig.dashboard);
      }
    };

    fetchData();
  }, [id, navigate, currentSource, artist]);

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
