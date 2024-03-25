
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'
import TextInput from '~/components/TextInput'

import { setGlobalState, useGlobalState } from '~/store'
import styles from "./Search.module.sass"
const cx = classNames.bind(styles);

const Search = ({group}) => {
    const [ownerArtworksFilter] = useGlobalState("ownerArtworksFilter");
  
    const onChange = (v) => {
        setGlobalState("ownerArtworksFilter", {
            ...ownerArtworksFilter,
            dataSearch: v,
        })
    }

    return (
        <div className={cx("wrapperSearch")}>
            <TextInput value={ownerArtworksFilter?.dataSearch} onChange={(e) => onChange(e.target.value)} className={`${cx("inputSearch")}`} classBorder={cx("borderInputSearch")} icon={group?.icon} sizeIcon={20} placeholder={group?.placeHolder}/>
        </div>
    )
}

Search.propTypes = {
    group: PropTypes.object,
    searchActive: PropTypes.bool,
    setSearchActive: PropTypes.func
}

export default Search
