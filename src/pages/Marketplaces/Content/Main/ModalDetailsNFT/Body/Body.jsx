import classNames from "classnames/bind";
import styles from "./Body.module.sass";
import Button from "~/components/Button";
import { setGlobalState, useGlobalState } from "~/store";
import { useCallback, useEffect } from "react";
import Overview from "./Overview";
const cx = classNames.bind(styles);

const Body = () => {
  const [showActiveNFTDetails] = useGlobalState("showActiveNFTDetails");

  const items = [
    {
      tab: "overview",
      name: "Overview",
      action: "overview",
      visible: showActiveNFTDetails.overview,
    },
    {
      tab: "activity",
      name: "Activity",
      action: "activity",
      visible: showActiveNFTDetails.activity,
    },
    {
      tab: "offers",
      name: "Offers",
      action: "offers",
      visible: showActiveNFTDetails.offers,
    },
  ];

  useEffect(() => {
    setGlobalState("showActiveNFTDetails", { overview: true, activity: false, offers: false });
  }, []);

  const handleShow = useCallback((action) => {
    const updatedState = {};
    items.forEach((item) => {
      const currentAction = item.action;
      updatedState[currentAction] = currentAction === action;
    });
    setGlobalState("showActiveNFTDetails", updatedState);
  }, []);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("wrapperContainer")}>
        <div className={cx("container")}>
          {items.map((item, index) => (
            <Button key={index} title={item?.name} className={`${cx("buttonActive")} ${item.visible ? cx("active") : ""}`} onClick={() => handleShow(item?.action)} />
          ))}
        </div>
      </div>
      {showActiveNFTDetails.overview && <Overview />}
    </div>
  );
};

export default Body;
