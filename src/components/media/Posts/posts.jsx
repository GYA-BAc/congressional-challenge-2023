import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'

function Post({post}) {
    return (
      <div className='post'>
          <div className='post-info'>
            <img className='user-image' src={''} alt=""></img>
            <p className='post-user'><b>{post.username}</b> on {post.created}: </p>
          </div>
          
          <hr></hr>

          <p className='post-content'>{post.body}</p>
          <br></br>

          <img className='post-image' src={post.data_url} alt=""></img>
      </div>
    )
  }



const Posts = forwardRef((props, ref) => {
    // console.log(posts)
    const thisRef = useRef(null)
    const [posts, setPosts] = useState([])


    useImperativeHandle(ref, () => {
      return {
        updatePosts: (posts) => {
          setPosts(posts)
        }
      }
      },
      []
    );

    // useImperativeHandle(ref, 
    //   () => {
    //       return {
    //         updatePosts: (posts) => {
    //           console.log(ref)
    //           setPosts(posts)
    //         }
    //       }
    //   }
    // )

    return (
      <div ref={thisRef}>
        {
        posts.slice(0).map(post => {
            return <Post post={post} key={post.id}/>
        })
        }
      </div>
      
    )
  }
)

export default Posts