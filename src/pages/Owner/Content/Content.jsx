import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArtworkByWalletAddress, getArtworkByWalletAddressAndByCondition } from "~/api/Artwork";
import { getListOwnerByWalletAddress } from "~/api/Owner";
import { setGlobalState } from "~/store";
import styles from "./Content.module.sass";
import Filter from "./Filter";
import Header from "./Header";
import Main from "./Main";

const cx = classNames.bind(styles)

const Content = () => {
    const [loading, setLoading] = useState(false)
    const {address} = useParams();
    const [currentNFTs, setCurrentNFTs] = useState([]);
    const [currentSymbol, setCurrentSymbol] = useState("")

    useEffect(() => { 
        if(!address.trim()) return;

        const fetchData = async () => {
            try {
                setLoading(true);
                const results = await getListOwnerByWalletAddress(address);
                setGlobalState("owners", {data: results?.listResult})
                setLoading(false);
            } catch (error) {
                setLoading(false)
                setGlobalState("owners", {data: []})
            }
        }
        fetchData();
    },[address])

    const handleFilterSymbol = (symbol) => {
        if(loading) return;
        if(symbol === currentSymbol){
            setCurrentSymbol("") 
            return;
        }
        setCurrentSymbol(symbol)
    }

    useEffect(() => {
        const fetchData = async () => {
            try{
                if(!currentSymbol) {
                    setLoading(true);
                    const results = await getArtworkByWalletAddress(address);
                    setCurrentNFTs(results?.listResult)
                    setLoading(false);
                }else{
                    setLoading(true);
                    const results = await getArtworkByWalletAddressAndByCondition(address, currentSymbol);
                    setCurrentNFTs(results?.listResult)
                    setLoading(false);
                }
            }catch (error) {
                setLoading(true);
            }

        }
        fetchData()

    },[currentSymbol,address])

    return (
        <>
            <Filter currentSymbol={currentSymbol} onClick={handleFilterSymbol}/>
            <div className={cx("container")}>
                <div className={cx("wrapper")}>
                    <div className={cx("wrapper")}>
                        <div className={cx("container")}>
                            <Header/>
                            <Main data={currentNFTs} loading={loading}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Content;
