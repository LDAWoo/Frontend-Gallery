import Language from "~/components/Language";
import { setGlobalState } from "~/store";

function Body() {
    
    const handleClickLanguage = () => {
        setGlobalState("showModalAppSettings", false)
    }
    
    return ( 
        <>
            <Language onClick={handleClickLanguage}/>
        </>
     );
}

export default Body;