import { useEffect, useState } from "react"
import NavigationModule from "../modules/NavigationModule"

export let willClose = true;

const InfoComponent = () => {

    const [isBackEnabled, setToggleBack] = useState(true);
    const next = () => {
        const route = window.history.state?.routeId;
        NavigationModule.push(route+1);
    }
    
    const back = () => {
        NavigationModule.pop();
    }

    const toggleBack = () => {
        setToggleBack(!isBackEnabled);
        willClose = !willClose;
    }

    return (<div>

        <div className="carn-screens-container" id="carn-screens">

        </div>
        <div className="button" onClick={back} role={"button"}>Pop</div>
        <div className="button" onClick={next} role={"button"}>Push</div>
        <div className="button" onClick={toggleBack} role={"button"}>{`${ isBackEnabled ? 'Disable' : 'Enable' }`} Back</div>
        <br/>
    </div>)
}

export default InfoComponent;