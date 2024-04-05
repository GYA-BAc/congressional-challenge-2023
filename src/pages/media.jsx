import { React, useEffect, useRef, useState} from "react";
import UserPanel from "../components/media/UserPanel";
import UploadDialogue from "../components/media/UploadDialogue";
import Posts from "../components/media/Posts/posts";
import { useNavigate } from "react-router-dom";
import { fetchWithTimeout, asyncFetchPosts } from "../Utils";

import "./media.css"
import { setSelectionRange } from "@testing-library/user-event/dist/utils";


const DEMOGROUP = 1
const POSTQUANTITY = 5

const Media = () => {
    const navigate = useNavigate()

    // const [state, setState] = useState({
    //     id: null,
    //     posts: [],
    //     latest: null,
    //     oldest: null,
    // })

    const postRef = useRef(null)

    const [groupID, setGroupID] = useState(DEMOGROUP)
    const [posts, setPosts] = useState([])
    const [latestPostID, setLatestPostID] = useState(null)
    const [oldestPostID, setOldestPostID] = useState(null)


    useEffect(() => {
        if (localStorage.getItem("currentUserID") === null) {
            navigate("/login")
            return
        }
    }, [])    

    const reloadPosts = () => {

        var localState = JSON.parse(localStorage.getItem(`Group${groupID}`))

        var latest = latestPostID

        if (!(localState === null)) {
            // check to make sure is up to date
            
            fetchWithTimeout(
                `${process.env.REACT_APP_BACKEND_API}/groups/fetchLatestPostID/${groupID}`
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
                    latest = data.id
                    setLatestPostID(data.id)

                    if (localState.latestPostID === latest) {
                        setPosts(localState.posts)
                        setOldestPostID(localState.oldestPostID)
                        return true
                    }

                    return false
                }
            ).then(
                // where localstate either doesn't exist or is out of date
                // overwrite localstorage
                (localExists) => {
                    if (localExists) return
                    fetchWithTimeout(
                        `${process.env.REACT_APP_BACKEND_API}/groups/fetchPostRange/${groupID}?`
                        + new URLSearchParams({
                            start_id: latest,
                            requested_posts: POSTQUANTITY
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
                        async (data) => {
                            let requestedPostIDs = data.map((item) => {return item.id})
                            postRef.current.updatePosts(
                                await asyncFetchPosts(requestedPostIDs)
                            )
                        }
                    ).catch(
                        (e) => {
                            console.log(e)
                        }
                    )
                }
            ).catch(
                (e) => {
                    console.log(e)
                }
            )
        }
    }


    useEffect(() => {
        reloadPosts()
    }, [])

    
    useEffect(() => {
        localStorage.setItem(
            `Group${groupID}`, 
            JSON.stringify({
                posts: posts,
                latestPostID: latestPostID,
                oldestPostID: oldestPostID
            })
        )
    }, [posts, latestPostID, oldestPostID])


    // function addMessage(message, image) {
    //     const content = message
    //     const enc_image = image
        
    //     if (content === '') return
    //     if (enc_image === '') return

    //     console.log(posts)

    //     setPosts(prevMessage => {
    //       const ID = new Date()
    //       return [...prevMessage, { id: ID.toString(), content: content, image: enc_image, user: "test", userImage: "assets/pfp.png" }]
    //     })
    // }

    const addMessage = (message) => {
        // TODO: make message reload

        fetchWithTimeout(
            `${process.env.REACT_APP_BACKEND_API}/posts/create`,{
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    body: message.body,
                    image: message.image,
                    group_id: DEMOGROUP
                })
            } 
        ).then(
            (res) => {
                if (!res.ok) {
                    // TODO: add bad case where server fails
                    console.log(res.status)
                    throw "ServerError"
                }
            }   
        ).then(
            () => {
                reloadPosts()
            }
        ).catch(
            (e) => {
                console.log(e)
                alert("Could not send post.")
            }
        )
    }



    return (
        <div className="Media" id="main-container" data-scroll-container>
            <UserPanel/>
            <UploadDialogue postFunction={addMessage}/>
            <div className="post-container">
                <Posts ref={postRef}/>

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