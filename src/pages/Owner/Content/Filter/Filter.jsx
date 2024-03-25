import classNames from "classnames/bind";
import { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { MdOutlineClose } from 'react-icons/md';
import Button from '~/components/Button';
import Select from '~/components/Select';
import TextInput from '~/components/TextInput';
import { useGlobalState } from '~/store';
import styles from "./Filter.module.sass";
import Header from './Header';
import ItemCollection from './ItemCollection';
import ItemListCollection from "./ItemListCollection";
import PropTypes from 'prop-types'

const cx = classNames.bind(styles);
const Filter = ({currentSymbol, onClick}) => {

    const dataSort = [
        { name: "Price: Low to High", value: "low_to_high" },
        { name: "Price: High to Low", value: "high_to_low" },
    ];

    const items = [
        { name: "All", value: "all" },
        { name: "NFTs", value: "nfts" },
    ];

    const [owners] = useGlobalState("owners");
    const [originalOwners, setOriginalOwners] = useState([]);
    const [sortValues, setSortValues] = useState('high_to_low');
    const [tabsActive, setTabsActive] = useState("all");
    const [showFilter] = useGlobalState("showFilter");
    const [searchActive, setSearchActive] = useState(false);
    const [value, setValue] = useState("");

    const handleSearchCollection = (e) => {
        setValue(e.target.value);
    };

    const handleSortValue = (v) => {
        setSortValues(v);
    };

    useEffect(() => { 
        if (owners.data) {
            setOriginalOwners(owners.data);
        }
    }, [owners.data]);

    useEffect(() => { 
        if (!value.trim()) {
            setSearchActive(false)
            setOriginalOwners(owners.data);
            return;
        }

        const filteredOwners = owners.data.filter(owner =>
            (owner.name || owner.symbol).toLowerCase().includes(value.toLowerCase())
        );

        filteredOwners.sort((a, b) => {
            if (a.floorPrice != null && b.floorPrice != null) {
                return sortValues === "low_to_high" ? (a.floorPrice - b.floorPrice) : (b.floorPrice - a.floorPrice);
            } else if (a.floorPrice === null && b.floorPrice !== null) {
                return sortValues === "low_to_high" ? 1 : -1;
            } else if (a.floorPrice !== null && b.floorPrice === null) {
                return sortValues === "low_to_high" ? -1 : 1;
            } else {
                return 0;
            }
        });

        setOriginalOwners(filteredOwners);
    }, [value, owners.data, sortValues]);

    return (
        <div className={`${cx("wrapper")} ${showFilter ? cx("show") : ""}`}>
            <div className={cx("wrapperContainer")}>
                <Header data={owners?.data || []}/>
                <div className={cx("wrapperBody")}>
                    <div className={cx("containerBody")}>
                        <div className={cx("containerSearch")}>
                            <div className={`${cx("wrapperSearch")} ${searchActive && cx('active')}`}>
                                <TextInput icon={CiSearch} value={value} onChange={handleSearchCollection} placeholder="Search collections" sizeIcon={20} className={`${cx("inputSearch")} ${searchActive ? cx("active") : ""}`} copy iconCopy={MdOutlineClose} sizeIconCopy={20} onClickCopy={() => setSearchActive(!searchActive)} />
                                {!searchActive && (
                                <div className={cx("button")}>
                                    <Button className={cx('buttonSearch')} icon={searchActive ? MdOutlineClose : CiSearch} size={20} backgroundGallery onClick={() => setSearchActive(!searchActive)} />
                                </div>
                                )}
                            </div>
                            <div className={`${cx("wrapperSelectSort")} ${searchActive && cx('active')}`}>
                                <Select value={sortValues} onChange={handleSortValue} placement="bottom" data={dataSort} />
                            </div>
                        </div>

                        <div className={cx('wrapperTabs')}>
                            <div className={cx('containerTabs')}>
                                {items.map((item, index) => (
                                    <div key={index} className={`${cx("wrapperItem")} ${item?.value === tabsActive ? cx("active") : ""}`} onClick={() => setTabsActive(item?.value)}>
                                        <div className={cx("containerItem")}>
                                            <div className={cx("contentItem")}>
                                                {item?.name}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={`${cx('containerFilter')} no-scrollbar`}>
                            {tabsActive === "all" && <div className={cx('wrapperContainerFilter')}>
                                {originalOwners && originalOwners.map((collection, index) => (
                                    <ItemCollection key={index} data={collection} currentSymbol={currentSymbol} onClick={onClick}/>
                                ))}
                            </div>}

                            {tabsActive === "nfts" && <div className={cx('wrapperContainerFilterList')}>
                                {originalOwners && originalOwners.map((collection, index) => (
                                    <ItemListCollection key={index} data={collection} currentSymbol={currentSymbol} onClick={onClick}/>
                                ))}
                            </div>}
                        </div>      
                    </div>
                </div>
            </div>
        </div>
    )
}

Filter.propTypes = {
    currentSymbol: PropTypes.string,
    onClick: PropTypes.func,
}

export default Filter

