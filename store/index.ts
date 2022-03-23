import { useState } from "react";
import { createContainer } from "unstated-next";


const useGlobal = ()=>{
    const [visible, setIsVisible] = useState(false);
    const toogleVisible = ()=>{
        setIsVisible(p=>!p);
    }
 
    return {
        visible, toogleVisible
    }
}

const GlobalState = createContainer(useGlobal);

export default GlobalState;