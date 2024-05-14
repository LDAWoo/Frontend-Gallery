import classNames from "classnames/bind";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getArtworkByIdAndEmail } from "~/api/Artwork";
import { UserContext } from "~/components/Contexts/AppUserProvider";
import routesConfig from "~/configs";
import styles from "./Header.module.sass";
import Listing from "./Listing";
import Main from "./Main";

const cx = classNames.bind(styles);
const Header = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const { artist, artistLoading } = useContext(UserContext);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const currentTab = searchParams.get("tabs");
  useEffect(() => {
    const fetchData = async () => {
      if (artist && !artistLoading) {
        try {
          setLoading(true);
          const results = await getArtworkByIdAndEmail(id, artist?.email);
          setData(results);
          setLoading(false);
        } catch (e) {
          setData({});
          navigate(routesConfig.dashboard);
        }
      }
    };

    fetchData();
  }, [artist, artistLoading, id]);

  const handleUpdateData = (item) => {
    setData((prev) => ({
      ...prev,
      marketplace: item
    }));
  }

  const handleUpdate = (item) => {
    setData((prev) => ({
      ...prev,
      artwork: item?.artwork,
      attributes: item?.attributes
    }));
  }

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <Listing data={data} loading={loading || artistLoading} onUpdateData={handleUpdateData}/>
        {!loading && <Main data={data} currentTab={currentTab} onUpdateData={handleUpdate}/>}
      </div>
    </div>
  );
};

export default Header;
