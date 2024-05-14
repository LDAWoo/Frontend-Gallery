import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaPlus } from "react-icons/fa6";
import { LuCopy } from "react-icons/lu";
import { postCreateMarketplace } from "~/api/Marketplace";
import { createMarketplacePhantomSolana } from "~/api/PhantomSolana/PhantomSolana.services";
import Button from "~/components/Button";
import Icon from "~/components/Icon";
import TabsTip from "~/components/TabsTip";
import Tick from "~/components/Tick";
import Title from "~/components/Title";
import Tooltip from "~/components/Tooltip";
import { copyText, setGlobalState, truncate, useGlobalState } from "~/store";
import styles from "./Listing.module.sass";
import ListingSkeleton from "./ListingSkeleton";
const cx = classNames.bind(styles);

const Listing = ({ data, loading,onUpdateData }) => {
  const {t} = useTranslation();
  const [WidthAndHeightWindow] = useGlobalState("WidthAndHeightWindow")
  const [loadingGlobal] = useGlobalState("loading");
  const [connectedAccount] = useGlobalState("connectedAccount");
  const [artworks, setArtworks] = useState([])
  const [marketplace, setMarketplace] = useState({})

  const items = [
    {
      id: 1,
      tabs: "overview",
      name: t("Reviewed.items.overview"),
    },
    {
      id: 2,
      tabs: "claimCondition",
      name: t("Reviewed.items.claimCondition"),
    },
    {
      id: 3,
      tabs: "settings",
      name: t("Reviewed.items.settings"),
    },
  ];

  useEffect(() => {
    if(data?.artwork){
      setArtworks(data?.artwork)
    }
    if(data?.marketplace){
      setMarketplace(data?.marketplace)
    }
  },[data])

  const handleCopyWalletAddress = () => {
    copyText(data?.wallet_address);
  };


  const handleCreateMarketplace = async() => {
    if(!connectedAccount){
      setGlobalState("connectedModal" ,true);
      return;
    }
    if(loadingGlobal) return;

    const dataCreate = {
      creatorAddress: connectedAccount.address
    }

    try{   
      setGlobalState("loading", true);

      const {signature, marketplaceAddress, marketplaceAuthority,currentAddress} = await createMarketplacePhantomSolana(dataCreate.creatorAddress);
      
      const dataCreateMarketplace = {
        ...dataCreate,
        currentAddress,
        signature,
        marketplaceAddress,
        marketplaceAuthority,
      }

      const results = await postCreateMarketplace(dataCreateMarketplace);
      setGlobalState("loading", false);
      onUpdateData(results)
    }catch(e){
      setGlobalState("loading", false);
    }
  }

  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("container")}>
          <div className={cx("containerNFT")}>
            <div className={cx('wrapperNFT')}>
              <div className={cx("wrapperMetaData")}>{loading ? <ListingSkeleton metaData /> : <img className={cx("metaData")} src={artworks?.image_url} />}</div>

              <div className={cx("wrapperNameNFT")}>
                {loading ? (
                  <ListingSkeleton wrapperNameNFT />
                ) : (
                  <>
                    <Title title={artworks?.name} white fontBold xxl />
                    <Title title={artworks?.symbol} large nowrap medium />
                    <div className={cx("wrapperWalletAddress")} onClick={handleCopyWalletAddress}>
                      <Icon icon={LuCopy} size={14} classIcon={cx("wrapperCopyIcon")} />
                      {artworks?.wallet_address && <Title title={truncate(artworks?.wallet_address, 4, 3, 11)} large />}
                    </div>
                  </>
                )}
              </div>
            </div>

            {Object.keys(marketplace).length === 0 ? 
              <div className={cx('wrapperMarketplace')}>
                    <div>
                      {WidthAndHeightWindow.width > 786 ? <Button title={t("Reviewed.Right.createMarketplace")} xl fontBold className={cx('buttonMarketplace')} background onClick={handleCreateMarketplace}/> 
                      : <Tooltip content={t("Reviewed.Right.createMarketplace")} toolTip placement="bottom">
                        <div>
                            <Button icon={FaPlus} size={18} fontBold className={cx('buttonMarketplace')} background/>
                          </div>
                      </Tooltip> 
                      }
                    </div>
              </div> : 
              <div className={cx('wrapperMarketplace')}>
                  <div className={cx('containerMarketplace')}>
                      <Tick/>
                      <Title title={t("Reviewed.Right.marketplace")} xxl fontMedium white/>
                  </div>
              </div> 
            }
          </div>
          <div>
            <TabsTip data={items} params="tabs" className={cx("wrapperTabTip")} />
          </div>
        </div>
      </div>
    </>
  );
};

Listing.propTypes = {
  data: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  onUpdateData: PropTypes.func.isRequired,
};

export default Listing;
