import classNames from "classnames/bind";
import styles from "./MarketplaceTabsTip.module.sass";
import Button from "~/components/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles);

const items = [
  {
    title: "Items",
    tabs: "items",
  },
  {
    title: "Offers",
    tabs: "offers",
  },
  {
    title: "AMM",
    tabs: "AMM",
  },
];

const MarketplaceTabsTip = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tabs = searchParams.get("activeTab");
  const [active, setActive] = useState("");

  useEffect(() => {
    const currentTabs = tabs ? tabs : items[0].tabs;
    setActive(currentTabs);
  }, [tabs]);

  const handleChooseTab = (tab) => {
    navigate(`?activeTab=${tab}`);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("content")}>
        {items.map((item, index) => (
          <div key={index} className={`${cx("wrapperItem")}`}>
            <Button title={item?.title} xl className={cx("itemButton")} classTitle={`${cx("itemTitle")} ${active === item?.tabs ? cx("active") : ""}`} onClick={() => handleChooseTab(item?.tabs)} />
            <div className={`${cx("itemActive")} ${active === item?.tabs ? cx("active") : ""}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

MarketplaceTabsTip.propTypes = {};

export default MarketplaceTabsTip;
