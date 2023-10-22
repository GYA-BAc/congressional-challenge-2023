import React, {} from 'react'

function Post(message) {

    return (
      <div className='post'>
          <p className='post-user'><b>{message.message.user}</b> on {message.message.id}: </p>
          
          <hr></hr>

          <p className='post-content'>{message.message.content}</p>
          <br></br>

          <img className='post-image' src={message.message.image}></img>
      </div>
    )
  }



export default function Posts({posts}) {
    return (
      posts.map(post => {
          return <Post message={post} key={post.id}/>
      })
    )
  }