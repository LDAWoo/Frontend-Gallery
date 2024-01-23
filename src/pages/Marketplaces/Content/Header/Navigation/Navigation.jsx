import classNames from "classnames/bind";
import styles from "./Navigation.module.sass";
import Button from "~/components/Button";
import { VscListFilter } from "react-icons/vsc";
import { BsGrid3X3Gap, BsGrid, BsArrowDownUp } from "react-icons/bs";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { PiCoins } from "react-icons/pi";
import { FiRefreshCw } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import TextInput from "~/components/TextInput";
import Tooltip from "~/components/Tooltip";
import { arrowDownUp } from "~/assets/Icon";
import Select from "~/components/Select";
import { useState } from "react";
import DropDownSort from "./DropDownSort";
const cx = classNames.bind(styles);

const items = [
  {
    id: 1,
    groups: [
      {
        id: "filter",
        name: "Traits Filter",
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
    id: 4,
    groups: [
      {
        id: "sort",
        name: "sort",
        type: "dropDown",
        data: [
          { name: "Price: Low to High", value: "low_to_high" },
          { name: "Price: High to Low", value: "high_to_low" },
          { name: "Inscription: Low to High", value: "inscription_low_to_high" },
          { name: "Inscription: High to Low", value: "inscription_high_to_low" },
          { name: "Recently", value: "recently" },
          { name: "Common to Rare", value: "common_to_rare" },
          { name: "Rare to Common", value: "rare_to_common" },
        ],
        icon: arrowDownUp,
      },
    ],
  },
  {
    id: 5,
    groups: [
      {
        id: "modal",
        name: "Make Offer",
        title: "Make Offer",
        type: "button",
        icon: PiCoins,
      },
    ],
  },
  {
    id: 6,
    groups: [
      {
        id: "refresh",
        name: "Refresh",
        type: "button",
        icon: FiRefreshCw,
        toolTip: true,
      },
    ],
  },
];

const Navigation = () => {
  const [sortValue, setSortValue] = useState();
  const data = [
    { name: "Price: Low to High", value: "low_to_high" },
    { name: "Price: High to Low", value: "high_to_low" },
    { name: "Inscription: Low to High", value: "inscription_low_to_high" },
    { name: "Inscription: High to Low", value: "inscription_high_to_low" },
    { name: "Recently", value: "recently" },
    { name: "Common to Rare", value: "common_to_rare" },
    { name: "Rare to Common", value: "rare_to_common" },
  ];

  const handleSort = (v) => {
    setSortValue(v);
  };

  const ButtonNavigation = ({ group }) => {
    return <>{group?.title ? <Button className={cx("buttonNavigation")} classButton={cx("contentButtonNavigation")} xl fontMedium title={group?.title} backgroundGallery icon={group?.icon} size={20} /> : <Button className={cx("buttonNavigation")} backgroundGallery icon={group?.icon} size={20} />}</>;
  };

  const InputNavigation = ({ group }) => {
    return (
      <div className={cx("wrapperSearch")}>
        <Button icon={group?.icon} size={20} backgroundGallery className={`${cx("buttonNavigation")} ${cx("buttonSearch")}`} />
        <TextInput className={cx("inputSearch")} classBorder={cx("borderInputSearch")} icon={group?.icon} sizeIcon={20} placeholder={group?.placeHolder} />
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
                {group?.type === "dropDown" && <DropDownSort data={group.data} value={sortValue} onChange={handleSort} />}
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
