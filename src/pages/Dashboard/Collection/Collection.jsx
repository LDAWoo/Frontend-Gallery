import { useContext, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { findAllHistoryCreateNFTByEmail, postCreateHistoryNFT, updateHistoryCreateNFT } from "~/api/CreatorNFT";
import Button from "~/components/Button";
import { UserContext } from "~/components/Contexts/AppUserProvider";
import routesConfig from "~/configs";
import Drafts from "./Drafts";
import Listed from "./Listed";
import Reviewed from "./Reviewed";
import { getArtworkReviewedByEmail } from "~/api/Artwork";
import classNames from "classnames/bind";
import styles from "./Collection.module.sass";

const cx = classNames.bind(styles);

const Collection = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { artist } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("drafts");
    const [drafts, setDrafts] = useState([]);
    const [reviews, setReviews] = useState([]);

    const handleActiveTab = (tab) => {
        setActiveTab(tab);
    };

    const handleCreateNewCollection = async () => {
        try {
            setLoading(true);
            const email = artist.email;
            const results = await postCreateHistoryNFT({ email });
            await updateHistoryCreateNFT({ id: results, email });
            setLoading(false);
            navigate(`${routesConfig.creator.replace(":id", results)}`);
        } catch (error) {
            setLoading(false);
            console.error("Error while creating new collection:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (artist) {
                try {
                    setLoading(true);
                    const draft = await findAllHistoryCreateNFTByEmail(artist.email);
                    const review = await getArtworkReviewedByEmail(artist.email);
                    setDrafts(draft.listResult);
                    setReviews(review.listResult);
                    setLoading(false);
                } catch (error) {
                    setLoading(false);
                    console.error("Error while fetching data:", error);
                }
            }
        };

        fetchData();
    }, [artist]);

    const items = useMemo(
        () => [
            {
                tab: "drafts",
                name: t("DashBoard.Collection.items.item1"),
                value: drafts.length,
            },
            {
                tab: "reviewed",
                name: t("DashBoard.Collection.items.item2"),
                value: reviews.length,
            },
            {
                tab: "listed",
                name: t("DashBoard.Collection.items.item3"),
            },
        ],
        [drafts.length, reviews.length, t]
    );

    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                <div className={cx("wrapperContainer")}>
                    <div className={cx("wrapperContentItem")}>
                        {items.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => handleActiveTab(item.tab)}
                                className={`${cx("containerItem")} ${activeTab === item.tab ? cx("active") : ""}`}
                            >
                                <div className={cx("contentItem")}>
                                    <div>{item.name}</div>
                                    {item.value > 0 && (
                                        <div className={`${cx("containerValueItem")} ${activeTab === item.tab ? cx("active") : ""}`}>
                                            {item.value}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={cx("wrapperContentCreator")}>
                            <Button
                                title={t("DashBoard.CreateNewCollection")}
                                disabled={loading}
                                loading={loading}
                                background
                                fontBold
                                xxl
                                className={cx("buttonCreatorNewCollection")}
                                onClick={handleCreateNewCollection}
                            />
                    </div>
                </div>

                <div>{activeTab === "drafts" && <Drafts data={drafts} loading={loading} />}</div>
                <div>{activeTab === "reviewed" && <Reviewed data={reviews} loading={loading} />}</div>
                <div>{activeTab === "listed" && <Listed />}</div>
            </div>
        </div>
    );
};

export default Collection;
