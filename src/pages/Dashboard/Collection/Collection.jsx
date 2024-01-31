import classNames from "classnames/bind";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { findAllHistoryCreateNFTByEmail, postCreateHistoryNFT, updateHistoryCreateNFT } from "~/api/CreatorNFT";
import Button from "~/components/Button";
import { UserContext } from "~/components/Contexts/AppUserProvider";
import routesConfig from "~/configs";
import styles from "./Collection.module.sass";
import Drafts from "./Drafts";

const cx = classNames.bind(styles);

const Collection = () => {
  const navigate = useNavigate();
  const { artist } = useContext(UserContext);
  const [active, setActive] = useState("drafts");
  const [data, setDate] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleActiveTab = (tab) => {
    setActive(tab);
  };

  const handleCreateNewCollection = async () => {
    const email = artist.email;

    try {
      const results = await postCreateHistoryNFT({ email });
      await updateHistoryCreateNFT({ id: results, email: email });
      navigate(`${routesConfig.creator.replace(":id", results)}`);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (artist) {
        try {
          setLoading(true);
          const results = await findAllHistoryCreateNFTByEmail(artist.email);
          setDate(results.listResult);
          setLoading(false);
        } catch (e) {
          console.log(e);
        }
      }
    };

    fetchData();
  }, [artist]);

  const items = [
    {
      tab: "drafts",
      name: "Drafts",
      value: data.length,
    },

    {
      tab: "submissions",
      name: "Submissions",
      value: 0,
    },
  ];

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("wrapperContainer")}>
          <div className={cx("wrapperContentItem")}>
            {items.map((item, index) => (
              <div key={index} onClick={() => handleActiveTab(item?.tab)} className={`${cx("containerItem")} ${active === item?.tab ? cx("active") : ""}`}>
                <div className={cx("contentItem")}>
                  <div>{item?.name}</div>
                  {item?.value > 0 && <div className={`${cx("containerValueItem")} ${active === item?.tab ? cx("active") : ""}`}>{item?.value}</div>}
                </div>
              </div>
            ))}
          </div>

          <div className={cx("wrapperContentCreator")}>
            <div>
              <Button title="Create New Collection" disabled={loading} background fontBold xxl className={cx("buttonCreatorNewCollection")} onClick={handleCreateNewCollection} />
            </div>
          </div>
        </div>

        <div>{active === "drafts" && <Drafts data={data} loading={loading} />}</div>
      </div>
    </div>
  );
};

export default Collection;
