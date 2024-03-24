
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import Button from '~/components/Button'
import TextInput from '~/components/TextInput'

import { IoClose } from 'react-icons/io5'
import { useLocation, useNavigate } from 'react-router-dom'
import useDebounced from '~/hooks/useDebounced'
import styles from "./Search.module.sass"
const cx = classNames.bind(styles);

const Search = ({group,searchActive,setSearchActive}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const currentSearch = params.get("search");
    const [value, setValue] = useState("")

    const debouncedValue = useDebounced(value, 1000)

    useEffect(() => {
      if (currentSearch) {
        setValue(currentSearch);
      }
    }, []);

    useEffect(() => {
      if (currentSearch) {
        params.set("search", debouncedValue);
      } else {
        params.append("search", debouncedValue);
      }
      navigate(`${location.pathname}?${params.toString()}`);
      
  }, [debouncedValue]);

  useEffect(() => {
    if(location.search.startsWith("?search=") || location.search.endsWith("&search=")){
      if(location.search.endsWith("&search=")){
        const subStringSearch = location.search.substring(0, location.search.length - 8);
        navigate(location.pathname + subStringSearch)
      }

      if(location.search.startsWith("?search=") && !debouncedValue){
        navigate(location.pathname)
      }
    }
  },[location,debouncedValue])

    return (
        <div className={cx("wrapperSearch")}>
            <Button icon={group?.icon} size={20} backgroundGallery className={`${cx("buttonNavigation")} ${cx("buttonSearch")} ${searchActive ? cx("active") : ""}`} onClick={() => setSearchActive(true)} />
            <TextInput value={value} onChange={(e) => setValue(e.target.value)} className={`${cx("inputSearch")} ${searchActive ? cx("active") : ""}`} classBorder={cx("borderInputSearch")} icon={group?.icon} sizeIcon={20} placeholder={group?.placeHolder} copy iconCopy={searchActive && IoClose} onClickCopy={() => setSearchActive(false)} />
        </div>
    )
}

Search.propTypes = {
    group: PropTypes.object,
    searchActive: PropTypes.bool,
    setSearchActive: PropTypes.func
}

export default Search
