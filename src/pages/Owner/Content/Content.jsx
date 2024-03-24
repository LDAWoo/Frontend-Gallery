import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArtworkByWalletAddress } from "~/api/Artwork";
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const results = await getArtworkByWalletAddress(address);
                setCurrentNFTs(results?.listResult)
                setLoading(false);
            } catch (error) {
                setLoading(false)
                setCurrentNFTs([])
            }
        }

        fetchData()
    },[address])

    return (
        <>
            <Filter/>
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
