import { React, useEffect, useState, useRef } from "react";
import UserPanel from "../components/media/UserPanel";
import UploadDialogue from "../components/media/UploadDialogue";
import Posts from "../components/media/Posts/posts";


import "./media.css"

const Media = () => {

    const [posts, setPosts] =  useState([])

    useEffect(() => {
        const storedMessages = JSON.parse(localStorage.getItem("posts"))
        if (storedMessages) setPosts(storedMessages)

    }, [])

    
    useEffect(() => {
        localStorage.setItem("posts", JSON.stringify(posts))
    }, [posts])

    function addMessage(message) {
        const content = message
        if (content === '') return
        setPosts(prevMessage => {
          const ID = new Date()
          return [...prevMessage, { id: ID.toString(), content: content, user: "test" }]
        })
    }



    return (
        <>
        <div className="Media" id="main-container" data-scroll-container>
            <UserPanel/>
            <UploadDialogue postFunction={addMessage}/>
            <Posts posts={posts}/>
        </div>
        </>
    );
};

export default Media