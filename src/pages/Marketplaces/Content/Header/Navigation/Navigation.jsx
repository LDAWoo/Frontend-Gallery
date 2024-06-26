import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { BsGrid, BsGrid3X3Gap } from "react-icons/bs";
import { FiRefreshCw } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import { VscListFilter } from "react-icons/vsc";
import { arrowDownUp } from "~/assets/Icon";
import Button from "~/components/Button";
import Tooltip from "~/components/Tooltip";
import { setGlobalState, useGlobalState } from "~/store";
import DropDownSort from "./DropDownSort";
import styles from "./Navigation.module.sass";
import Search from "./Search/Search";
const cx = classNames.bind(styles);

const Navigation = () => {
  const [showFilter] = useGlobalState("showFilter");
  const [WidthAndHeightWindow] = useGlobalState("WidthAndHeightWindow");
  const [showMarketplaceGridStyle] = useGlobalState("showMarketplaceGridStyle");
  const localMarketPlaceGridStyle = localStorage.getItem("marketplace-gridstyle");
  const [searchActive, setSearchActive] = useState(false);
  const [marketplaceArtworksFilter] = useGlobalState("marketplaceArtworksFilter");
  const [refresh] = useGlobalState("refresh");

  const handleSort = (id, v) => {
    setGlobalState("marketplaceArtworksFilter", {
      ...marketplaceArtworksFilter,
      sortValues: {
        ...marketplaceArtworksFilter.sortValues,
        [id]: v
      }
    });
  };

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
          name: "Traits Filter",
          type: "button",
          icon: VscListFilter,
          categories: "boolean",
          show: showFilter,
          showType: "showFilter",
          toolTip: true,
        },
      ],
    },
    {
      id: 2,
      groups: [
        {
          id: "grids",
          name: "girds",
          localStore: "marketplace-gridstyle",
          type: "button",
          show: showMarketplaceGridStyle === "grids",
          showType: "showMarketplaceGridStyle",
          icon: BsGrid3X3Gap,
        },
        {
          id: "grid",
          name: "grid",
          localStore: "marketplace-gridstyle",
          show: showMarketplaceGridStyle === "grid",
          showType: "showMarketplaceGridStyle",
          type: "button",
          icon: BsGrid,
        },
        {
          id: "list",
          localStore: "marketplace-gridstyle",
          name: "list",
          show: showMarketplaceGridStyle === "list",
          showType: "showMarketplaceGridStyle",
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
          id: "sortPrice",
          name: "sort",
          type: "dropDown",
          data: [
            { name: "Price: Low to High", value: "low_to_high" },
            { name: "Price: High to Low", value: "high_to_low" },
          ],
          icon: arrowDownUp,
        },
      ],
    },
    {
      id: 5,
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

  const handleClickButton = (group) => {
    if (group.categories === "boolean") {
      setGlobalState(group?.showType, !group?.show);
      return;
    }

    if (group?.localStore) {
      localStorage.setItem(group?.localStore, group?.id);
      setGlobalState(group?.showType, group?.id);
      return;
    }

    if(group?.id === "refresh"){
      setGlobalState("refresh",!refresh);
      return;
    }
  };

  const ButtonNavigation = ({ group }) => {
    return (
      <>
        {group?.title ? (
          <Button className={cx("buttonNavigation")} classButton={cx("contentButtonNavigation")} xl fontMedium title={group?.title} backgroundGallery icon={group?.icon} size={20} onClick={() => handleClickButton(group?.showType, group?.show)} />
        ) : (
          <>
            <Button id={group?.id} className={cx("buttonNavigation")} onClick={() => handleClickButton(group)} background={group?.show} backgroundGallery={!group?.show} icon={group?.icon} size={20} />
          </>
        )}
      </>
    );
  };

  useEffect(() => {
    if (WidthAndHeightWindow.width < 768) {
      if (showMarketplaceGridStyle === "grids") {
        localStorage.setItem("marketplace-gridstyle", "grid");
        setGlobalState("showMarketplaceGridStyle", "grid");
      }
    }
  }, [WidthAndHeightWindow]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("content")}>
        {items.map((item, index) => (
          <div key={index} className={`${cx("wrapperContent")} ${searchActive ? cx("active") : ""}`}>
            {item?.groups.map((group, index) => (
              <div key={index} className={`${cx("wrapperGroups")} ${item?.groups.length > 1 ? cx("active") : ""} ${group?.show ? cx("show") : ""}`}>
                {group?.type === "button" && (
                  <>
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
                  </>
                )}
                {group?.type === "dropDown" && <DropDownSort data={group.data} value={marketplaceArtworksFilter?.sortValues[group?.id]} onChange={value => handleSort(group?.id, value)} />}
                {group?.type === "input" && 
                <Search 
                  group={group}
                  searchActive={searchActive} 
                  setSearchActive={setSearchActive}
                />}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
