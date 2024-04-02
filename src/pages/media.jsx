import { React, useEffect, useState} from "react";
import UserPanel from "../components/media/UserPanel";
import UploadDialogue from "../components/media/UploadDialogue";
import Posts from "../components/media/Posts/posts";
import { useNavigate } from "react-router-dom";
import { fetchWithTimeout } from "../Utils";

import "./media.css"


const DEMOGROUP = 1

const Media = () => {
    const navigate = useNavigate()

    const [posts, setPosts] =  useState([])


    useEffect(() => {
        if (localStorage.getItem("currentUserID") === null) {
            navigate("/login")
            return
        }
    }, [])    

    useEffect(() => {
        var storedMessages

        try {
            storedMessages = JSON.parse(localStorage.getItem(`Group${DEMOGROUP}`))
            if (!(storedMessages === undefined || storedMessages.length == 0)) {
                // check to make sure is up to date
                
                fetchWithTimeout(
                    `${process.env.EXPO_PUBLIC_API_URL}/groups/fetchLatestPostID/${DEMOGROUP}`
                ).then(
                    (res) => {
                        if (!res.ok) {
                            // TODO: add bad case where server fails
                            // probably where fails to fetch due to incorrect session cookie
                            console.log(res.status)
                            throw "ServerError"
                        }
                        return res.json()
                    }
                ).then(
                    (data) => {
                        
                    }
                ).catch(
                    (e) => {
                        console.log(e)
                    }
                )

                
                
                setPosts(storedMessages)
                return
            }
        } catch(e) {
        }


        fetchWithTimeout(
            `${process.env.EXPO_PUBLIC_API_URL}/groups/fetchPostRange/${DEMOGROUP}?`
            + new URLSearchParams({
                
            })
        ).then(
            (res) => {
                if (!res.ok) {
                  // TODO: add bad case where server fails
                  console.log(res.status)
                  throw "ServerError"
                }
                return res.json()
            }
        ).then(
            (data) => {

            }
        ).catch(
            (e) => {
                console.log(e)
            }
        )
        

    }, [])

    
    useEffect(() => {
        localStorage.setItem(`Group${DEMOGROUP}`, JSON.stringify(posts))
    }, [posts])

    function addMessage(message, image) {
        const content = message
        const enc_image = image
        
        if (content === '') return
        if (enc_image === '') return

        setPosts(prevMessage => {
          const ID = new Date()
          return [...prevMessage, { id: ID.toString(), content: content, image: enc_image, user: "test", userImage: "assets/pfp.png" }]
        })
    }



    return (
        <div className="Media" id="main-container" data-scroll-container>
            <UserPanel/>
            <UploadDialogue postFunction={addMessage}/>
            <div className="post-container">
                <Posts posts={posts}/>

                <div className='post'>
                    <div className='post-info'>
                        <img className='user-image' src="assets/turtle.png"></img>
                        <p className='post-user'><b>Admin_Turtle</b> on Sun Oct 22 2023 13:58:58 GMT-0500 (Central Daylight Time): </p>
                    </div>

                    <hr></hr>

                    <p className='post-content'>Also, posts will be moderated by an AI, so please don't post anything bad!</p>
                    <br></br>
                    <img className='post-image' src="assets/logo.png"></img>
                </div>


                <div className='post'>
                    <div className='post-info'>
                        <img className='user-image' src="assets/turtle.png"></img>
                        <p className='post-user'><b>Admin_Turtle</b> on Sun Oct 22 2023 13:58:58 GMT-0500 (Central Daylight Time): </p>
                    </div>

                    <hr></hr>

                    <p className='post-content'>Welcome Everyone! I encourage you to post any pictures of recycling you have. Also feel free to visit our fundraising page!</p>
                <br></br>
                </div>

                
            </div>


      </div>
    );
};

export default Media