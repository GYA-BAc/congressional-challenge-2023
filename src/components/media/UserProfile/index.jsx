import React from "react";

import "./style.css"

export default function UserProfile({username}) {

    return (
        <>
            <div className="profile-container">
                <img className="user-photo" src="/assets/pfp.png"></img>
                <div className="user">
                    @{username}
                </div>
                <h5>Hello! I like recycling and being green.</h5>
            </div>

        </>
    )

}