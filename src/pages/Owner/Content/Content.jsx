import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArtworkByWalletAddress, getArtworkByWalletAddressAndByCondition } from "~/api/Artwork";
import { getListOwnerByWalletAddress } from "~/api/Owner";
import { setGlobalState, useGlobalState } from "~/store";
import styles from "./Content.module.sass";
import Filter from "./Filter";
import FilterModal from "./FilterModal";
import Header from "./Header";
import Main from "./Main";

const cx = classNames.bind(styles)

const Content = () => {
    const [owners] = useGlobalState("owners")
    const [loading, setLoading] = useState(false)
    const {address} = useParams();
    const [currentNFTs, setCurrentNFTs] = useState([]);
    const [currentSymbol, setCurrentSymbol] = useState("")
    const [showOwners] = useGlobalState("showOwners")
    const [ownerArtworksFilter] = useGlobalState("ownerArtworksFilter");
    const [originalNFTs, setOriginalNFTs] = useState([]); 

    useEffect(() => { 
        if(!address.trim()) return;

        const fetchData = async () => {
            try {
                setLoading(true);
                const results = await getListOwnerByWalletAddress(address);
                setGlobalState("owners", {...owners ,data: results?.listResult})
                setLoading(false);
            } catch (error) {
                setLoading(false)
                setGlobalState("owners", {...owners, data: []})
            }
        }
        fetchData();
    },[address])

    const handleFilterSymbol = (symbol) => {
        if(loading) return;

        if(showOwners){
            setGlobalState("showOwners" , false);
        }
        
        if(symbol === currentSymbol){
            setCurrentSymbol("") 
            return;
        }
        setCurrentSymbol(symbol)
    }

    useEffect(() => {
        const fetchData = async () => {
            await fetch(address,currentSymbol)
        }
        fetchData()
    },[currentSymbol,address])

    const fetch = async (wallet, symbol) => {
        try{
            if(!symbol) {
                setLoading(true);
                const results = await getArtworkByWalletAddress(wallet);
                setCurrentNFTs(results?.listResult);
                setOriginalNFTs(results?.listResult);
                setLoading(false);
            }else{
                setLoading(true);
                const results = await getArtworkByWalletAddressAndByCondition(wallet, symbol);
                setCurrentNFTs(results?.listResult);
                setOriginalNFTs(results?.listResult);
                setLoading(false);
            }
        }catch (error) {
            setLoading(true);
        }
    }

    useEffect(() => {
        if(!ownerArtworksFilter.dataSearch.trim()){
            setCurrentNFTs(originalNFTs);
            return;
        }

        const filteredNFTs = originalNFTs.filter(nft =>
            nft.name.toLowerCase().includes(ownerArtworksFilter.dataSearch.toLowerCase())
        );
        setCurrentNFTs(filteredNFTs);

    },[ownerArtworksFilter, originalNFTs])

    useEffect(() => {
        if (!ownerArtworksFilter.sortValues.sortPrice && !ownerArtworksFilter.sortValues.sortListed) return;
    
        let sortedNFTs = [...originalNFTs];
    
        if (ownerArtworksFilter.dataSearch.trim()) {
            sortedNFTs = sortedNFTs.filter(nft =>
                nft.name.toLowerCase().includes(ownerArtworksFilter.dataSearch.toLowerCase())
            );
        }
    
        sortedNFTs.sort((a, b) => {
            if (a.price !== null && b.price !== null) {
                return ownerArtworksFilter.sortValues.sortPrice === "high_to_low" ? b.price - a.price : a.price - b.price;
            } else if (a.price === null && b.price !== null) {
                return ownerArtworksFilter.sortValues.sortPrice === "high_to_low" ? 1 : -1;
            } else if (a.price !== null && b.price === null) {
                return ownerArtworksFilter.sortValues.sortPrice === "high_to_low" ? -1 : 1;
            } else {
                return 0;
            }
        });
    
        if (ownerArtworksFilter.sortValues.sortListed === "listed") {
            sortedNFTs = sortedNFTs.filter(nft => nft.price !== null);
        }
    
        setCurrentNFTs(sortedNFTs);
    }, [ownerArtworksFilter, originalNFTs]);

    return (
        <>
            <Filter currentSymbol={currentSymbol} onClick={handleFilterSymbol}/>
            <FilterModal data={currentNFTs} currentSymbol={currentSymbol} onClick={handleFilterSymbol}/>
                <div className={cx("wrapper")}>
                    <div className={cx("container")}>
                        <Header/>
                        <Main data={currentNFTs} loading={loading} onClick={handleFilterSymbol}/>
                    </div>
            </div>
        </>
    );
};

export default Content;
