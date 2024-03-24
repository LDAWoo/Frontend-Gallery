import classNames from "classnames/bind";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { BsArrowDownUp, BsFolder2Open, BsGrid, BsGrid3X3Gap } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import { VscListFilter } from "react-icons/vsc";
import { arrowDownUp } from "~/assets/Icon";
import Button from "~/components/Button";
import TextInput from "~/components/TextInput";
import Tooltip from "~/components/Tooltip";
import styles from "./Navigation.module.sass";
import { useEffect } from "react";
import { setGlobalState } from "~/store";
const cx = classNames.bind(styles);

const Navigation = () => {

  const localMarketPlaceGridStyle = localStorage.getItem("marketplace-gridstyle");

  useEffect(() => {
    if (!localMarketPlaceGridStyle) {
      localStorage.setItem("marketplace-gridstyle", "grids");
      setGlobalState("showMarketplaceGridStyle", "grids");
    } else {
      setGlobalState("showMarketplaceGridStyle", localMarketPlaceGridStyle);
    }
  }, [localMarketPlaceGridStyle]);

  const items = [
    {
      id: 1,
      groups: [
        {
          id: "filter",
          name: "Collection Filter",
          type: "button",
          icon: VscListFilter,
          toolTip: true,
        },
      ],
    },
    {
      id: 2,
      groups: [
        {
          id: "girds",
          name: "girds",
          type: "button",
          icon: BsGrid3X3Gap,
        },
        {
          id: "gird",
          name: "grid",
          type: "button",
          icon: BsGrid,
        },
        {
          id: "list",
          name: "list",
          type: "button",
          icon: AiOutlineUnorderedList,
        },
      ],
    },
    {
      id: 3,
      groups: [
        {
          id: "sort",
          name: "sort",
          type: "button",
          icon: BsArrowDownUp,
        },
      ],
    },
    {
      id: 4,
      flex: true,
      groups: [
        {
          id: "search",
          name: "search",
          type: "input",
          placeHolder: "Search items",
          icon: IoSearchOutline,
        },
      ],
    },
    {
      id: 5,
      groups: [
        {
          id: "sort",
          name: "Price: Low To High",
          type: "dropDown",
          data: [],
          icon: arrowDownUp,
        },
      ],
    },
    {
      id: 6,
      groups: [
        {
          id: "sort",
          name: "All",
          type: "dropDown",
          data: [],
          icon: arrowDownUp,
        },
      ],
    },
    {
      id: 7,
      groups: [
        {
          id: "refresh",
          name: "Refresh",
          type: "button",
          icon: BsFolder2Open,
        },
      ],
    },
  ];

  const ButtonNavigation = ({ group }) => {
    return <>{group?.title ? <Button className={cx("buttonNavigation")} classButton={cx("contentButtonNavigation")} xl fontMedium title={group?.title} backgroundGallery icon={group?.icon} size={20} /> : <Button className={cx("buttonNavigation")} backgroundGallery icon={group?.icon} size={20} />}</>;
  };

  const InputNavigation = ({ group }) => {
    return (
      <div className={cx("wrapperSearch")}>
        <TextInput className={cx("inputSearch")} icon={group?.icon} sizeIcon={20} placeholder={group?.placeHolder} />
      </div>
    );
  };

  const DropDownNavigation = ({ group }) => {
    return (
      <div className={cx("wrapperDropDown")}>
        <Button className={`${cx("buttonNavigation")} ${cx("buttonDropDown")}`} border title={group?.name} titlePosition="before" icon={group?.icon} />
      </div>
    );
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("content")}>
        {items.map((item, index) => (
          <div key={index} className={cx("wrapperContent")}>
            {item?.groups.map((group, index) => (
              <div key={index} className={`${cx("wrapperGroups")} ${item?.groups.length > 1 ? cx("active") : ""}`}>
                {group?.type === "button" && (
                  <div>
                    {group?.toolTip ? (
                      <Tooltip content={group?.name} toolTip>
                        <div className={cx("wrapperButton")}>
                          <ButtonNavigation group={group} />
                        </div>
                      </Tooltip>
                    ) : (
                      <div className={cx("wrapperButton")}>
                        <ButtonNavigation group={group} />
                      </div>
                    )}
                  </div>
                )}
                {group?.type === "dropDown" && <DropDownNavigation group={group} />}
                {group?.type === "input" && <InputNavigation group={group} />}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
