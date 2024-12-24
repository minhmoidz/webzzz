import React from "react";
import EmailForm from "./EmailForm.jsx"
import { styles } from "../styles";

const Sup2 = props => {
    return (
        <div 
            className='transition-5'
            style={{
                ...styles.supportWindow,
                ...{ opacity: props.visible ? '1' : '0' }
            }}
        >
            <EmailForm/>
        </div>
    )
}

export default Sup2;