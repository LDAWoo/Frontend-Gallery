import ModalFull from "~/components/Modal/ModalFull/ModalFull";
import { useGlobalState } from "~/store";
import PropTypes from "prop-types";
import classNames from "classnames/bind";

import styles from "./ModalAppSettings.module.sass";
import Header from "./Header";
import Body from "./Body";

const cx = classNames.bind(styles);

function ModalAppSettings({children}) {
    const [showModalAppSettings] = useGlobalState("showModalAppSettings");
    return ( 
        <ModalFull topLeft type="showModalAppSettings" isOpen={showModalAppSettings} header={<Header />} body={<Body />} classContent={cx("classContentModal")} classHeader={cx("classHeader")} classBody={cx("classBody")}>
            {children}
      </ModalFull>
     );
}

ModalAppSettings.propTypes = {
    children: PropTypes.node,
};

export default ModalAppSettings;