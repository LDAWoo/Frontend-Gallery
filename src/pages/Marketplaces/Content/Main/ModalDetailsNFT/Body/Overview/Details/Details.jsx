import classNames from "classnames/bind";
import PropTypes from "prop-types";
import styles from "./Details.module.sass";
import Icon from "~/components/Icon";
import Title from "~/components/Title";
import { MdKeyboardArrowDown } from "react-icons/md";
import { PiBarcodeThin } from "react-icons/pi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import routesConfig from "~/configs";
import { truncate } from "~/store";
import Image from "~/components/Image";
import Tooltip from "~/components/Tooltip";

const cx = classNames.bind(styles);
const Details = ({ data }) => {
  const [active, setActive] = useState([]);
  const [owner, setOwner] = useState({});

  useEffect(() => {
    if (data?.owner) {
      setOwner(data.owner);
    }
  }, [data]);

  const handleShowDetails = () => {
    setActive(!active);
  };

  console.log(data);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("wrapperContainer")}>
        <div className={cx("containerHeader")} onClick={handleShowDetails}>
          <div className={cx("wrapperDetails")}>
            <Icon icon={PiBarcodeThin} size={16} classIcon={cx("detailsIcon")} />
            <Title title="Details" white xl fontBold />
          </div>

          <Icon icon={MdKeyboardArrowDown} size={24} classIcon={`${cx("wrapperArrow")} ${!active ? cx("notActive") : ""}`} />
        </div>

        {data && active && (
          <div className={`${cx("wrapperBody")} ${active ? cx("active") : ""}`}>
            <div className={cx("bodyAnimation")}>
              <div className={cx("bodyDetails")}>
                {owner && (
                  <div className={cx("containerDetails")}>
                    <Title title="Owner" white xl />
                    <div className={cx("wrapperItems")}>
                      <Tooltip toolTip content="Open in solscan">
                        <Link to={`https://solscan.io/account/${owner?.walletAddress}?cluster=devnet`} className={cx("wrapperImageChain")} target="_blank">
                          <Image src="/images/solscan.png" />
                        </Link>
                      </Tooltip>
                      <Link to={routesConfig.user.replace(":address", owner?.walletAddress)} className={cx("wrapperLink")}>
                        {owner?.walletAddress && <Title title={truncate(owner?.walletAddress, 4, 3, 10)} large />}
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

Details.propTypes = {
  data: PropTypes.object,
};

export default Details;
