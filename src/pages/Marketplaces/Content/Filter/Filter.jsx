import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { BsGrid } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { IoIosList } from "react-icons/io";
import { MdOutlineClose } from "react-icons/md";
import Button from "~/components/Button";
import Icon from "~/components/Icon";
import SelectOption from "~/components/SelectOption";
import TabsTip from "~/components/TabsTip";
import TextInput from "~/components/TextInput";
import Title from "~/components/Title";
import styles from "./Filter.module.sass";
import ItemAttribute from "./ItemAttribute";
import FilterSkeleton from "./FilterSkeleton";
const cx = classNames.bind(styles);
const items = [
  {
    name: "Traits",
    tabs: "traits",
  },
  {
    name: "Filter",
    tabs: "filter",
  },
];
const Filter = ({ data, loading }) => {
  const [searchActive, setSearchActive] = useState(false);
  const [filterList, setFilterList] = useState(true);
  const [sortedAttributeMap, setSortedAttributeMap] = useState({});
  const [options, setOptions] = useState({});

  function normalizeTraitType(traitType) {
    return traitType.toLowerCase();
  }

  useEffect(() => {
    const attributeMap = {};

    data.forEach((artwork) => {
      artwork.attributes.forEach((attribute) => {
        const status = true;
        const { trait_type, value, ...rest } = attribute;
        const normalizedTraitType = normalizeTraitType(trait_type);

        if (!attributeMap[normalizedTraitType]) {
          attributeMap[normalizedTraitType] = [{ value, status, ...rest, artwork: [artwork] }];
        } else {
          const existingAttribute = attributeMap[normalizedTraitType].find((attr) => attr.value.toLowerCase() === value.toLowerCase());
          if (existingAttribute) {
            existingAttribute.artwork.push(artwork);
          } else {
            attributeMap[normalizedTraitType].push({ value, status, ...rest, artwork: [artwork] });
          }
        }
      });
    });
    const attributeArray = Object.entries(attributeMap);
    attributeArray.sort((a, b) => a[0].localeCompare(b[0]));
    setSortedAttributeMap(Object.fromEntries(attributeArray));
  }, [data]);

  const handleFilterAttribute = (artwork, traitType) => {
    const filterAttribute = sortedAttributeMap[traitType].filter((att) => att.value === artwork.value);

    setSortedAttributeMap((prevAttribute) => {
      return {
        ...prevAttribute,
        [traitType]: prevAttribute[traitType].map((item) => ({
          ...item,
          status: filterAttribute.includes(item) ? false : item.status,
        })),
      };
    });

    setOptions((prevOptions) => {
      return {
        ...prevOptions,
        [traitType]: [...(prevOptions[traitType] || []), ...filterAttribute],
      };
    });
  };

  const handleRemoveAttribute = (artwork, traitType) => {
    const filterAttribute = sortedAttributeMap[traitType].filter((att) => att.value === artwork.value);

    setSortedAttributeMap((prevAttribute) => {
      return {
        ...prevAttribute,
        [traitType]: prevAttribute[traitType].map((item) => ({
          ...item,
          status: filterAttribute.includes(item) ? true : item.status,
        })),
      };
    });

    setOptions((prevOptions) => {
      return {
        ...prevOptions,
        [traitType]: prevOptions[traitType].filter((option) => !filterAttribute.some((att) => att.value === option.value)),
      };
    });
  };

  const handleClearAttribute = (option, traitType) => {
    setSortedAttributeMap((prevAttribute) => {
      return {
        ...prevAttribute,
        [traitType]: prevAttribute[traitType].map((item) => ({
          ...item,
          status: true,
        })),
      };
    });

    setOptions((prevOptions) => {
      return {
        ...prevOptions,
        [traitType]: [],
      };
    });
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("wrapperContainer")}>
        <div className={cx("containerHeader")}>
          <TabsTip data={items} />
          <div className={cx("wrapperHeaderRight")}>
            <Button title="Clear" border />
            <Icon icon={MdOutlineClose} size={20} classIcon={cx("buttonCloseFilter")} />
          </div>
        </div>
        <div className={cx("wrapperBody")}>
          <div className={cx("containerBody")}>
            <div className={cx("containerSearch")}>
              <div className={cx("wrapperSearch")}>
                <TextInput icon={CiSearch} placeholder="Search Traits" sizeIcon={20} className={`${cx("inputSearch")} ${searchActive ? cx("active") : ""}`} copy iconCopy={MdOutlineClose} sizeIconCopy={20} onClickCopy={() => setSearchActive(!searchActive)} />
                {!searchActive && (
                  <div className={cx("button")}>
                    <Button icon={searchActive ? MdOutlineClose : CiSearch} size={20} backgroundGallery onClick={() => setSearchActive(!searchActive)} />
                  </div>
                )}
              </div>
              {!searchActive && (
                <div className={cx("button")}>
                  <Button icon={filterList ? IoIosList : BsGrid} size={20} backgroundGallery onClick={() => setFilterList(!filterList)} />
                </div>
              )}
            </div>

            <div className={`${cx("containerFilter")} no-scrollbar`}>
              {loading ? (
                Array.from({ length: 4 }).map((_, index) => (
                  <div key={index}>
                    <FilterSkeleton />
                  </div>
                ))
              ) : (
                <>
                  {Object.keys(sortedAttributeMap).map((traitType, index) => (
                    <div key={index}>
                      <div className={cx("wrapperAttribute")}>
                        <Title title={traitType} white large fontSemiBold />
                        <Title title={"(" + sortedAttributeMap[traitType].length + ")"} large fontSemiBold />
                      </div>
                      <div>
                        <SelectOption key={index} placement="bottom" data={sortedAttributeMap[traitType]} options={options} traitType={traitType} componentItem={ItemAttribute} onClick={handleFilterAttribute} handleRemoveAttribute={handleRemoveAttribute} handleClearAttribute={handleClearAttribute} />
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Filter.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool,
};

export default Filter;
