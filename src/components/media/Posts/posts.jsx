import React, {} from 'react'

function Post(message) {
    // console.log(message.message.userImage)

    return (
      <div className='post'>
          <div className='post-info'>
            <img className='user-image' src={message.message.userImage}></img>
            <p className='post-user'><b>{message.message.user}</b> on {message.message.id}: </p>
          </div>
          
          <hr></hr>

          <p className='post-content'>{message.message.content}</p>
          <br></br>

          <img className='post-image' src={message.message.image}></img>
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