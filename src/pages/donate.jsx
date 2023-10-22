import { React, useEffect, useState, useRef } from "react";

import "./donate.css"
import DonationGallery from "../components/donate/Gallery";

const Donate = () => {

    return (
        <div className="Donate">
            <DonationGallery></DonationGallery>
        </div>
    )
}

export default Donate