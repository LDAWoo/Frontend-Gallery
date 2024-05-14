import classNames from "classnames/bind";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "~/components/Contexts/AppUserProvider";
import styles from "./Content.module.sass";
import Header from "./Header";
import Main from "./Main";
import NoSignIn from "./NoSignIn";
import { getArtworkReviewedByEmail } from "~/api/Artwork";

const cx = classNames.bind(styles);

const Content = () => {
  const { artist } = useContext(UserContext);
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])


  useEffect(() => {
    if(Object.keys(artist).length > 0) {
      const fetchData = async() => {
        try {
          setLoading(true)
          const results = await getArtworkReviewedByEmail(artist.email)
          setData(results?.listResult)
          setLoading(false)
        } catch (error) {
          setLoading(true)
        }
      }
      
      fetchData();
    }
  },[artist])

  return (
    <div className={cx("container")}>
      <div className={cx("wrapper")}>
        {Object.keys(artist).length > 0 ? (
          <div className={cx("wrapper")}>
            <div className={cx("container")}>
              <Header />
              <Main data={data} loading={loading}/>
            </div>
          </div>
        ) : (
          <NoSignIn />
        )}
      </div>
    </div>
  );
};

export default Content;
