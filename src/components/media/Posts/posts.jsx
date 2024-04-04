import React, {} from 'react'

function Post({post}) {
    // console.log(message.message.userImage)

    return (
      <div className='post'>
          <div className='post-info'>
            <img className='user-image' src={''}></img>
            <p className='post-user'><b>{post.username}</b> on {post.created}: </p>
          </div>
          
          <hr></hr>

          <p className='post-content'>{post.body}</p>
          <br></br>

          <img className='post-image' src={post.image}></img>
      </div>
    )
  }



export default function Posts({posts}) {
    return (
      posts.slice(0).reverse().map(post => {
          return <Post message={post} key={post.id}/>
      })
    )
  }