import { React} from "react";
import { Link } from "react-router-dom";

import "./donate.css"
import DonationGallery from "../components/donate/Gallery";

const Donate = () => {

    return (
        <div className="Donate">
            <Link to="/" id="link">
                <img className="menu" src="/assets/menu.png"></img>
            </Link>
            <DonationGallery></DonationGallery>
        </div>
    )
}

export default Donate