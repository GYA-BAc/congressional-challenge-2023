import React, {} from 'react'

function Post({post}) {
    console.log(post.image)
    return (
      <div className='post'>
          <div className='post-info'>
            <img className='user-image' src={''}></img>
            <p className='post-user'><b>{post.username}</b> on {post.created}: </p>
          </div>
          
          <hr></hr>

          <p className='post-content'>{post.body}</p>
          <br></br>

          <img className='post-image' src={post.data_url}></img>
      </div>
    )
  }



export default function Posts({posts}) {
    console.log(posts)
    return (
      posts.slice(0).reverse().map(post => {
          return <Post post={post} key={post.id}/>
      })
    )
  }