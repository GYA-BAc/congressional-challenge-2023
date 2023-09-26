import React from "react";
import UserPanel from "../components/media/UserPanel";
import UploadDialogue from "../components/media/UploadDialogue";

import "./media.css"

const Media = () => {
    return (
        <>
        <div className="Media" id="main-container" data-scroll-container>
            <UserPanel/>
            <UploadDialogue/>
        </div>
        </>
    );
};

export default Media