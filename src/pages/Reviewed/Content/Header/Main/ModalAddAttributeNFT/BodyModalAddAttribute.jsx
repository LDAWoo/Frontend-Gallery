import classNames from "classnames/bind";
import { useContext, useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import { Bounce, toast } from "react-toastify";
import { addAttributeNFT, deleteAttributeById, findAttributeByIdArtwork } from "~/api/Attribute";
import Button from "~/components/Button";
import { UserContext } from "~/components/Contexts/AppUserProvider";
import Select from "~/components/Select";
import TextInput from "~/components/TextInput";
import Title from "~/components/Title";
import { setGlobalState, useGlobalState } from "~/store";
import styles from "./BodyModalAddAttribute.module.sass";

const cx = classNames.bind(styles);

const BodyModalAddAttribute = () => {
  const [showModalAddAttributeNFT] = useGlobalState("showModalAddAttributeNFT");
  const [attributes] = useGlobalState("currentAttribute");
  const [traitType, setTraitType] = useState("");
  const [name, setName] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [activeAttribute, setActiveAttribute] = useState(false);
  const { artist } = useContext(UserContext);

  const fetchData = async () => {
    try {
      const results = await findAttributeByIdArtwork(showModalAddAttributeNFT.data.id);
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
            _id_artwork: showModalAddAttributeNFT.data.id,
            email: artist?.email,
          },
          attributes: [{ trait_type: traitType.trim(), value: name.trim() }],
        };
        await addAttributeNFT(data);
        fetchData();
        setTraitType("");
        setName("");
        setGlobalState("loading", false);
        handleSuccessfully();
      } catch (e) {
        setGlobalState("loading", false);
        handleError();
      }
    }
  };

  const handleDeleteAttribute = async (id) => {
    if (id === "") return;
    try {
      await deleteAttributeById(id);
      fetchData();
    } catch (e) {
      console.log(e);
    }
  };

  const handleSuccessfully = () => {
    toast("🦄 Add Attribute NFT Successfully!", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  const handleError = () => {
    toast("🦄 This Attribute NFT Already Exists!", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  useEffect(() => {
    traitType.length === 0 || name.length === 0 ? setDisabled(true) : setDisabled(false);
  }, [traitType, name]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("wrapperHeader")}>
        <Title nowrap={false} xl title={`(${attributes.length}) Attributes currently selected. You can add or remove other properties.`} />
        <div>
          <Button icon={CiCirclePlus} size={20} onClick={handleAddMoreAttribute} />
        </div>
      </div>

      {activeAttribute && (
        <div className={cx("containerAddAttribute")}>
          <div className={cx("itemsAttribute")}>
            <Title title="Type" xl white fontMedium />
            <TextInput value={traitType} placeholder="Ex: Size" name="trait_type" onChange={handleChangeTraitType} />
          </div>

          <div className={cx("itemsAttribute")}>
            <Title title="Name" xl white fontMedium />
            <TextInput value={name} placeholder="Ex: Large" name="value" onChange={handleChangeValue} />
          </div>
        </div>
      )}

      <div className={cx("container")}>
        {attributes &&
          attributes.map((item, index) => {
            const values = [
              { name: "Select...", value: "" },
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
          <Button title="Add & Save" background xl disabled={disabled} onClick={handleAddAndSave} />
        </div>
      </div>
    </div>
  );
};

export default BodyModalAddAttribute;
