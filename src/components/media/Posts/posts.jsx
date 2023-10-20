import React, {} from 'react'

function Post(message) {

    return (
      <div>
          <p><b>{message.message.user}</b> on {message.message.id}: <br/> 
              {message.message.content}</p>
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