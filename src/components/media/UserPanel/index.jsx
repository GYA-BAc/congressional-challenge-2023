import React from "react";
import UploadPhoto from "../UploadPhoto";
import { Link } from "react-router-dom"
import UserProfile from "../UserProfile";

import "./style.css"

export default function UserPanel() {

    return (
        <>
            <div className="side-panel-container">
                <div className="side-panel-info">
                    <Link to="/" id="link">
                        <img className="menu" src="/assets/menu.png"></img>
                    </Link>
                    <UserProfile username={localStorage.getItem("currentUsername")}/>
                    <div className="error-panel" hidden ></div>
                </div>

                <div className="side-panel-options">
                    <UploadPhoto/>
                    <Link to="/donate" id="link">
                        <img className="donate-button" src="/assets/fundraise.png"></img>
                    </Link>
                </div>
            </div>

        </>
    )

}