import Avatar from "./Avartar.jsx"
import React, { useRef, useEffect, useState } from "react";

import SupportWindow from './Sup2/Index.jsx'
const SupPage = () => {
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);
    const [visible, setVisible] = useState(false)

    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setVisible(false)
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }
    return (
        <div ref={wrapperRef}>
            <SupportWindow visible={visible} />

            <Avatar 
                onClick={() => setVisible(true)}
                style={{
                    position: 'fixed',
                    bottom: '40px',
                    right: '40px',
                }}
            />
        </div>
        

    )
}


export default SupPage;