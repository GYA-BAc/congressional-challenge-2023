import React, {} from 'react'

function Fundraiser(message) {
    
    const style = {
        backgroundImage: `url(${message.message.image})`,
        backgroundSize:"100% 100%",                      
        backgroundPosition: "50% 50%",                    
        backgroundRepeat: "no-repeat",                    
    }

    return (
        <a
            className='donate-post' href={message.message.href} 
            style={style}
        >
        </a>
    )
  }



export default function Fundraisers({fundraisers}) {
    return (
      fundraisers.slice(0).reverse().map(fundraiser => {
          return <Fundraiser message={fundraiser} key={fundraiser.id}/>
      })
    )
  }