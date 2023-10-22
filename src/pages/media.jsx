import { React, useEffect, useState, useRef } from "react";
import UserPanel from "../components/media/UserPanel";
import UploadDialogue from "../components/media/UploadDialogue";
import Posts from "../components/media/Posts/posts";


import "./media.css"

const Media = () => {

    const [posts, setPosts] =  useState([])

    useEffect(() => {
        try {
            const storedMessages = JSON.parse(localStorage.getItem("posts"))
            if (!(storedMessages === undefined || storedMessages.length == 0)) setPosts(storedMessages)
        } catch(e) {
        }
        

    }, [])

    
    useEffect(() => {
        localStorage.setItem("posts", JSON.stringify(posts))
    }, [posts])

    function addMessage(message, image) {
        const content = message
        const enc_image = image
        
        if (content === '') return
        if (enc_image === '') return

        setPosts(prevMessage => {
          const ID = new Date()
          return [...prevMessage, { id: ID.toString(), content: content, image: enc_image, user: "test" }]
        })
    }



    return (
        <>
        <div className="Media" id="main-container" data-scroll-container>
            <UserPanel/>
            <UploadDialogue postFunction={addMessage}/>
            <div className="post-container">
                <Posts posts={posts}/>
            </div>
        </div>
        </>
    );
};

export default Media