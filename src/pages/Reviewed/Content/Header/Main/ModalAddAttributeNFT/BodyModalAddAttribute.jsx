import classNames from "classnames/bind";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CiCirclePlus } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import { addAttributeNFT, deleteAttributeById, findAttributeByIdArtwork } from "~/api/Attribute";
import Button from "~/components/Button";
import { UserContext } from "~/components/Contexts/AppUserProvider";
import Select from "~/components/Select";
import TextInput from "~/components/TextInput";
import Title from "~/components/Title";
import { setGlobalState, toastInformation, useGlobalState } from "~/store";
import styles from "./BodyModalAddAttribute.module.sass";

const cx = classNames.bind(styles);

const BodyModalAddAttribute = () => {
  const {t} = useTranslation();
  const [showModalAddAttributeNFT] = useGlobalState("showModalAddAttributeNFT");
  const [attributes] = useGlobalState("currentAttribute");
  const [traitType, setTraitType] = useState("");
  const [name, setName] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [activeAttribute, setActiveAttribute] = useState(false);
  const { artist } = useContext(UserContext);

  const fetchData = async () => {
    try {
      const results = await findAttributeByIdArtwork(showModalAddAttributeNFT.data.artwork.id);
      setGlobalState("currentAttribute", results);
    } catch (e) {
      setGlobalState("currentAttribute", []);
    }
  };

  const handleAddMoreAttribute = () => {
    setActiveAttribute(!activeAttribute);
  };

  const handleChangeTraitType = (e) => {
    const value = e.target.value;
    setTraitType(value);
  };

  const handleChangeValue = (e) => {
    const value = e.target.value;
    setName(value);
  };

  const handleAddAndSave = async () => {
    if (artist) {
      try {
        setGlobalState("loading", true);

        const data = {
          attributeRequest: {
            _id_artwork: showModalAddAttributeNFT.data.artwork.id,
            email: artist?.email,
          },
          attributes: [{ trait_type: traitType.trim(), value: name.trim() }],
        };
        await addAttributeNFT(data);
        fetchData();
        setTraitType("");
        setName("");
        setGlobalState("loading", false);
        toastInformation(
          t("Modal.AddAttribute.Success")
        )
      } catch (e) {
        setGlobalState("loading", false);
        toastInformation(
          t("Modal.AddAttribute.Exists")
        )
      }
    }
  };

  const handleDeleteAttribute = async (id) => {
    if (id === "") return;
    try {
      await deleteAttributeById(id);
      fetchData();
    } catch (e) {
      toastInformation(
        t("Modal.AddAttribute.Error")
      )
    }
  };

  useEffect(() => {
    traitType.length === 0 || name.length === 0 ? setDisabled(true) : setDisabled(false);
  }, [traitType, name]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("wrapperHeader")}>
        <Title nowrap={false} xl title={`(${attributes.length}) ${t("Modal.AddAttribute.title")}`} />
        <div>
          <Button icon={CiCirclePlus} size={20} onClick={handleAddMoreAttribute} />
        </div>
      </div>

      {activeAttribute && (
        <div className={cx("containerAddAttribute")}>
          <div className={cx("itemsAttribute")}>
            <Title title={t("Modal.AddAttribute.type")} xl white fontMedium />
            <TextInput value={traitType} placeholder={t("Modal.AddAttribute.typePlaceholder")} name="trait_type" onChange={handleChangeTraitType} />
          </div>

          <div className={cx("itemsAttribute")}>
            <Title title={t("Modal.AddAttribute.name")} xl white fontMedium />
            <TextInput value={name} placeholder={t("Modal.AddAttribute.namePlaceholder")} name="value" onChange={handleChangeValue} />
          </div>
        </div>
      )}

      <div className={cx("container")}>
        {attributes &&
          attributes.map((item, index) => {
            const values = [
              { name: t("Modal.AddAttribute.select"), value: "" },
              { name: item.value, value: item.id },
            ];

            return (
              <div key={index} className={cx("wrapperContainerAttribute")}>
                <Title title={item?.trait_type} white fontMedium xl />
                <Select data={values} visibleItemNoValue={false} placement="bottom" icon={IoCloseOutline} onChange={handleDeleteAttribute} />
              </div>
            );
          })}

        <div className={cx("buttonAddAndSave")}>
          <Button title={t("Modal.AddAttribute.addAndSave")} background xl disabled={disabled} onClick={handleAddAndSave} />
        </div>
      </div>
    </div>
  );
};

export default BodyModalAddAttribute;
