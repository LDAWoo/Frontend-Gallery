
import classNames from "classnames/bind";
import styles from "./Body.module.sass";
import { GiEarthAmerica } from "react-icons/gi";
import { useState } from "react";
import ItemChildren from "./ItemChildren";
import Item from "./Item";
import i18next from "i18next";
import { setGlobalState } from "~/store";
const cx = classNames.bind(styles);

function Body() {
    const [currentLanguage, setCurrentLanguage] = useState(i18next.language)
    const data = [
        {
            icon: GiEarthAmerica,
            title: "Language",
            children: {
                title: "Choose Language",
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

    const [history, setHistory] = useState([{data}])
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
            setGlobalState("showModalAppSettings", false);
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

export default Body;