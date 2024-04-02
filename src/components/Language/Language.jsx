import classNames from "classnames/bind";
import i18next from "i18next";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { GiEarthAmerica } from "react-icons/gi";
import PropTypes from "prop-types";
import Item from "./Item";
import ItemChildren from "./ItemChildren";
import styles from './Language.module.sass';

const cx = classNames.bind(styles)

function Language({initialState = 0, onClick}) {
    const [currentLanguage, setCurrentLanguage] = useState(i18next.language)
    const {t} = useTranslation()
    
    const data = [
        {
            icon: GiEarthAmerica,
            title: t("Modal.Settings.apps.language"),
            children: {
                title: t("Modal.Settings.apps.items.chooseLanguages"),
                data: [
                    {
                        title: "Tiếng Việt",
                        value: "vi-VN",
                        type: "language",
                        check: currentLanguage === "vi-VN",
                    },
                    {
                        title: "Español",
                        value: "es",
                        type: "language",
                        check: currentLanguage === "es",
                    },
                    {
                        title: "Deutsch",
                        value: "de",
                        type: "language",
                        check: currentLanguage === "de",
                    },
                    {
                        title: "Français",
                        value: "fr-FR",
                        type: "language",
                        check: currentLanguage === "fr-FR",
                    },
                    {
                        title: "English",
                        value: "en-EN",
                        type: "language",
                        check: currentLanguage === "en-EN",
                    },
                    {
                        title: "日本語",
                        value: "ja",
                        type: "language",
                        check: currentLanguage === "ja",
                    },
                    {
                        title: "한국어",
                        value: "ko",
                        type: "language",
                        check: currentLanguage === "ko",
                    },
                    {
                        title: "中文",
                        value: "zh-CN",
                        type: "language",
                        check: currentLanguage === "zh-CN",
                    },
                    
                ]
            }
        }
    ]

    const currentData = () => {
        if (initialState === 0) {
            return data;
        } else if (initialState > 0 && initialState <= data.length) {
            return data[initialState - 1].children.data;
        } else {
            return [];
        }
        
    }


    const [history, setHistory] = useState([{data: currentData()}])
    const current = history[history.length - 1];
    const [isClick,setIsClick] = useState(false)

    const handleBack = () =>{
        setIsClick(false)
        setHistory((prev) => prev.slice(0, prev.length -1))
    }

    const handClick = (isParent, item) => {
        setIsClick(true)
        if(isParent){
            setHistory(prev => [...prev, item.children])
        }
        if(item.value && item.type === "language"){
            i18next.changeLanguage(item.value);
            setCurrentLanguage(item.value);
            onClick();
        }
    }

    const renderItems = () => {
        return (
            current.data.map((item, index) => {
                const isParent = !!item.children;
                return (
                    <Item 
                        key={index} 
                        isChildren={isParent} 
                        data={item}
                        onClick={() => handClick(isParent,item)}
                    />
                )
            })
        )
    }

    return ( 
        <div className={`${cx("wrapper")} ${isClick ? cx('active') : ''}`}>
            <div className={cx("container")}>
                <div className={cx("wrapperContainer")}>
                    {
                        history.length > 1 
                        ?
                            <ItemChildren data={current} onBack={handleBack}/>
                        :
                        <div>

                        </div>
                    }

                    {renderItems()}
                </div>
            </div>
        </div>
     );
}

Language.propTypes = {
    initialState: PropTypes.number,
    onClick: PropTypes.func
}

export default Language;