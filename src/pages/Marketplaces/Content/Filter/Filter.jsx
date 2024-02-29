import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { BsGrid } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { IoIosList } from "react-icons/io";
import { MdOutlineClose } from "react-icons/md";
import Button from "~/components/Button";
import Icon from "~/components/Icon";
import SelectOption from "~/components/SelectOption";
import TextInput from "~/components/TextInput";
import Title from "~/components/Title";
import { useGlobalState } from "~/store";
import styles from "./Filter.module.sass";
import FilterSkeleton from "./FilterSkeleton";
import Header from "./Header";
import ItemAttribute from "./ItemAttribute";
import ItemListAttribute from "./ItemListAttribute";
const cx = classNames.bind(styles);

const Filter = ({ data, loading }) => {
  const [showFilter] = useGlobalState("showFilter");
  const [searchActive, setSearchActive] = useState(false);
  const [showTrait, setShowTrait] = useState("");
  const [value, setValue] = useState("");
  const [filterList, setFilterList] = useState(true);
  const [sortedAttributeMap, setSortedAttributeMap] = useState({});
  const [filteredData, setFilteredData] = useState({});
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

  const handleSearchAttribute = (e) => {
    const valueAttribute = e.target.value.toLowerCase();
    setValue(valueAttribute || "");
    const filteredKeys = Object.keys(sortedAttributeMap).filter((key) => key.includes(valueAttribute));

    const filteredData = filteredKeys.reduce((acc, key) => {
      acc[key] = sortedAttributeMap[key];
      return acc;
    }, {});

    setFilteredData(filteredData);
  };

  useEffect(() => {
    if (value.length === 0) {
      setSearchActive(false);
    }
  }, [value]);

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

  const handleShowTrait = (trait) => {
    trait === showTrait ? setShowTrait("") : setShowTrait(trait);
  };

  return (
    <div className={`${cx("wrapper")} ${showFilter ? cx("show") : ""}`}>
      <div className={cx("wrapperContainer")}>
        <Header />
        <div className={cx("wrapperBody")}>
          <div className={cx("containerBody")}>
            <div className={cx("containerSearch")}>
              <div className={cx("wrapperSearch")}>
                <TextInput icon={CiSearch} value={value} onChange={handleSearchAttribute} placeholder="Search Traits" sizeIcon={20} className={`${cx("inputSearch")} ${searchActive ? cx("active") : ""}`} copy iconCopy={MdOutlineClose} sizeIconCopy={20} onClickCopy={() => setSearchActive(!searchActive)} />
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

            {filterList ? (
              <div className={`${cx("containerFilter")} no-scrollbar`}>
                {loading ? (
                  Array.from({ length: 4 }).map((_, index) => (
                    <div key={index}>
                      <FilterSkeleton />
                    </div>
                  ))
                ) : (
                  <>
                    {Object.keys(value.length > 0 ? filteredData : sortedAttributeMap).map((traitType, index) => (
                      <div key={index}>
                        <div className={cx("wrapperAttribute")}>
                          <Title title={traitType} white large fontSemiBold />
                          <Title title={"(" + (value.length > 0 ? filteredData[traitType].length : sortedAttributeMap[traitType].length) + ")"} large fontSemiBold />
                        </div>
                        <div>
                          <SelectOption placement="bottom" data={value.length > 0 ? filteredData[traitType] : sortedAttributeMap[traitType]} options={options} traitType={traitType} componentItem={ItemAttribute} onClick={handleFilterAttribute} handleRemoveAttribute={handleRemoveAttribute} handleClearAttribute={handleClearAttribute} />
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            ) : (
              <div className={`${cx("containerListFilter")} no-scrollbar`}>
                {loading ? (
                  Array.from({ length: 4 }).map((_, index) => (
                    <div key={index}>
                      <FilterSkeleton />
                    </div>
                  ))
                ) : (
                  <>
                    {Object.keys(value.length > 0 ? filteredData : sortedAttributeMap).map((traitType, index) => (
                      <div key={index}>
                        <div className={cx("containerAttribute")} onClick={() => handleShowTrait(traitType)}>
                          <div className={cx("wrapperAttribute")}>
                            <Title title={traitType} white xl />
                            <Title title={"(" + (value.length > 0 ? filteredData[traitType].length : sortedAttributeMap[traitType].length) + ")"} xl />
                          </div>
                          <div>
                            <Icon icon={showTrait === traitType ? FaMinus : FaPlus} size={14} />
                          </div>
                        </div>

                        <div className={`${cx("containerTraitItems")} ${showTrait === traitType ? cx("active") : ""}`}>
                          <div className={cx("gridTraitItems")}>
                            <ItemListAttribute data={value.length > 0 ? filteredData[traitType] : sortedAttributeMap[traitType]} options={options} traitType={traitType} onClick={handleFilterAttribute} handleRemoveAttribute={handleRemoveAttribute} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            )}
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
