import classNames from "classnames/bind";
import { useState } from 'react';
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

    const dataSort= [
        { name: "Price: Low to High", value: "low_to_high" },
        { name: "Price: High to Low", value: "high_to_low" },
        { name: "Inscription: Low to High", value: "inscription_low_to_high" },
        { name: "Inscription: High to Low", value: "inscription_high_to_low" },
        { name: "Recently", value: "recently" },
        { name: "Common to Rare", value: "common_to_rare" },
        { name: "Rare to Common", value: "rare_to_common" },
    ]

    const items = [
        { name: "All", value: "all" },
        { name: "NFTs", value: "nfts" },
    ]

    const [owners] = useGlobalState("owners")
    const [tabsActive, setTabsActive] = useState("all")
    const [showFilter] = useGlobalState("showFilter");
    const [searchActive, setSearchActive] = useState(false);
    const [value, setValue] = useState("")


    const handleSearchCollection = (e) => {
        setValue(e.target.value);
    }

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
                                    <Button icon={searchActive ? MdOutlineClose : CiSearch} size={20} backgroundGallery onClick={() => setSearchActive(!searchActive)} />
                                </div>
                                )}
                            </div>
                            <div className={`${cx("wrapperSelectSort")} ${searchActive && cx('active')}`}>
                                <div><Select translate placement="top" data={dataSort} /></div>
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
                                {owners?.data && owners?.data.map((collection, index) => (
                                    <ItemCollection key={index} data={collection} currentSymbol={currentSymbol} onClick={onClick}/>
                                ))}
                            </div>}

                            {tabsActive === "nfts" && <div className={cx('wrapperContainerFilterList')}>
                                {owners?.data && owners?.data.map((collection, index) => (
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

