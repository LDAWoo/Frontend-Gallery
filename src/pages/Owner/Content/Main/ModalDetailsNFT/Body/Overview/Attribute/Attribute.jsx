import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { attributeIcon } from "~/assets/Icon";
import Icon from "~/components/Icon";
import Title from "~/components/Title";
import styles from "./Attribute.module.sass";

const cx = classNames.bind(styles);

const Attribute = ({ data }) => {
  const [active, setActive] = useState(true);
  const [attributes, setAttributes] = useState([]);

  useEffect(() => {
    if (data?.attributes) {
      setAttributes(data?.attributes);
    }
  }, [data]);

  const handleShowAttribute = () => {
    setActive(!active);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("wrapperContainer")}>
        <div className={cx("containerHeader")} onClick={handleShowAttribute}>
          <div className={cx("wrapperAttribute")}>
            <Icon icon={attributeIcon} />
            <Title title="Attributes" white xl fontBold />
            <div className={cx("wrapperCountAttribute")}>{attributes?.length}</div>
          </div>

          <Icon icon={MdKeyboardArrowDown} size={24} classIcon={`${cx("wrapperArrow")} ${!active ? cx("notActive") : ""}`} />
        </div>

        {attributes && active && (
          <div className={`${cx("wrapperBody")} ${active ? cx("active") : ""} ${attributes.length > 0 ? cx("activeAttr") : ""}`}>
            <div className={cx("bodyAnimation")}>
              <div className={cx("bodyAttribute")}>
                {attributes.map((att, index) => (
                  <div key={index} className={cx("containerItemsAttribute")}>
                    <Title title={att?.trait_type} medium />
                    <Title title={att?.value} white fontBold xl />

                    {/* <div className={cx("wrapperAttributePrice")}>
                      <div className={cx("wrapperPercent")}>12.1%</div>
                      <div className={cx("containerAttributePrice")}>
                        <Title title="200" white fontMedium large />
                        <Icon icon={dollarIcon} classIcon={cx("chainIcon")} />
                      </div>
                    </div> */}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

Attribute.propTypes = {
  data: PropTypes.object,
};

export default Attribute;
