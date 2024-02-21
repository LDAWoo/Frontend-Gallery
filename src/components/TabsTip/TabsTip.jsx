import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "~/components/Button";
import { setGlobalState } from "~/store";
import styles from "./TabsTip.module.sass";

const cx = classNames.bind(styles);

const TabsTip = ({ data, className, params, stateKey, ...props }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { [params]: tabs } = searchParams;

  const [active, setActive] = useState(tabs || data[0]?.tabs || "");

  const handleChooseTab = (tab) => {
    if (params) {
      navigate(`?${params}=${tab}`);
    }
    setActive(tab);
  };

  useEffect(() => {
    if (stateKey) {
      setGlobalState(stateKey, active);
    }
  }, [active, stateKey]);

  useEffect(() => {
    if (params) {
      navigate(`?${params}=${active}`);
    }
  }, [params, navigate, active]);

  return (
    <div className={cx("wrapper")} {...props}>
      <div className={`${className ? className : cx("content")} scrollbarCustom`}>
        {data &&
          data.map((item, index) => (
            <div key={index} className={`${cx("wrapperItem")}`}>
              <Button title={item?.name} xl className={cx("itemButton")} titlePosition="before" classTitle={`${cx("itemTitle")} ${active === item?.tabs ? cx("active") : ""}`} onClick={() => handleChooseTab(item?.tabs)} />
              <div className={`${cx("itemActive")} ${active === item?.tabs ? cx("active") : ""}`} />
            </div>
          ))}
      </div>
    </div>
  );
};

TabsTip.propTypes = {
  data: PropTypes.array.isRequired,
  params: PropTypes.string,
  className: PropTypes.string,
  stateKey: PropTypes.string,
};

export default TabsTip;
