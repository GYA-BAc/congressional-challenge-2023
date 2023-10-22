import React, { useEffect, useState } from "react"
import gsap from "gsap";

import "./style.css"
import Fundraisers from "../CreateDonation/fundraisers";


function calcDynamicHeight(ref) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const objectWidth = ref.scrollWidth;
  return objectWidth - vw + vh + 150; // 150 is the padding (in pixels) desired on the right side of the .cards container. This can be set to whatever your styles dictate
}

export default function DonationGallery() {

    const [fundraisers, setFundraisers] =  useState([])
    const [uploaded, setUploaded] =  useState([])

    useEffect(() => {
        try {
            const storedFundraisers = JSON.parse(localStorage.getItem("fundraisers"))
            if (!(storedFundraisers === undefined || storedFundraisers.length === 0)) setFundraisers(storedFundraisers)
        } catch(e) {
        }

    }, [])

    
    useEffect(() => {
        localStorage.setItem("fundraisers", JSON.stringify(fundraisers))
    }, [fundraisers])



    function getImage() {
        try {

            let reader = new FileReader();

            const imageUpload = document.getElementById("donate-image")
            // console.log(imageUpload.files[0])

            reader.addEventListener("load", function () { // Setting up base64 URL on image
                setUploaded(reader.result)
                imageUpload.style.backgroundImage = `url(${reader.result})`
            }, false);

            reader.readAsDataURL(imageUpload.files[0]);


        } catch(e) {
            console.log(e)
        }

    }



    function addFundraiser(message, image) {
        const content = message
        const enc_image = image

        
        if (content === '') return
        if (enc_image === '') return

        setFundraisers(prevMessage => {
          const ID = new Date()
          return [...prevMessage, { id: ID.toString(), href: content, image: enc_image}]
        })
    }

    function submit() {
        const linkBox = document.querySelector(".add-link")
        
        addFundraiser(linkBox.value, uploaded)

        // console.log(linkBox.value)
        // console.log(uploaded)
        // window.location.reload()
        const heading = document.querySelector(".heading")
        heading.scrollIntoView({ behavior: 'smooth', block: 'center' })


    }



  useEffect (() => {
    // console.log(fundraisers.length)
      const spaceHolder = document.querySelector('.space-holder');
      const horizontal = document.querySelector('.horizontal');

      spaceHolder.style.height = `${calcDynamicHeight(horizontal)}px`;
      
      const sticky = document.querySelector('.sticky');

      window.addEventListener('scroll', () => {
        horizontal.style.transform = `translateX(-${Math.round(sticky.offsetTop/horizontal.scrollHeight)/(4+fundraisers.length)*(horizontal.scrollWidth-150)}px)`;
      });

      window.addEventListener('resize', () => {
        spaceHolder.style.height = `${calcDynamicHeight(horizontal)}px`;
      });
  }, [fundraisers])

  const scrollToCreate = () => {
    const create = document.querySelector(".create")
    create.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
  

  return (
    <>
    <div className="gallery-section">
      <h1 className="heading" style={{textAlign:"center",fontSize:"50px"}}><u>Donate!</u></h1>

      <div onClick={scrollToCreate} className="create-container">
        <p className="hook"><b>Have a Fundraiser Idea?</b></p>
        <div className="prompt" >Create Your Own!</div>
      </div>

      <section className="container" data-scroll-section>
        <div className="space-holder">
          <div className="sticky">
            <div className="horizontal">
              <section role="feed" className="cards">


             <a className="donate-post" href="https://secure.ucsusa.org/onlineactions/dR5QqmX2uUCLCFD1KkVEzg2?MS=waystogive"></a>

             <a className="donate-post" href="https://www.nrdc.org/"></a>

             <a className="donate-post" href="https://www.ewg.org/"></a>

             <a className="donate-post" href="https://www.greenpeace.org/international/https://www.nrdc.org/"></a>

             <Fundraisers fundraisers={fundraisers}></Fundraisers>

              </section>
            </div>
          </div>
        </div>
      </section>
      </div>
      
      <div className="create">
        <h1 className="create-title">Create A Fundraiser</h1>
        <hr></hr>

        <div className="submission-container">
            <textarea className="add-link" rows="4" cols="50" placeholder="Add a Link to a Donation Page"/>
            <button type="submit" onClick={submit}>Submit</button>

        </div>

        <div className="demo-donate-container">
            <form onChange={getImage}>
                <input type="file" accept="image/png, image/jpeg" id="donate-image" className="demo-donate-post"></input>
            </form>
        </div>


      </div>
      </>
  )
}
