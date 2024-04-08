import React, { useEffect, useState } from "react";
import * as tmImage from '@teachablemachine/image';
import { loadLayersModel } from '@tensorflow/tfjs-layers'
import UploadDialogue from "../UploadDialogue";

import "./style.css"


export default function UploadPhoto() {

    const URL = "https://teachablemachine.withgoogle.com/models/fVe21QzxG/";
    const [model, setModel] = useState(null)
    const [maxPredictions, setMaxPredictions] = useState(null)
    var webcam

    const dialogueBox = document.querySelector('.upload-dialogue-container');
    const webcamContainer = document.getElementById("webcam-container")
    const predictionBox = document.querySelector('.prediction');
    const suggestionBox = document.querySelector('.ai-suggestion')
    const commentBox = document.querySelector(".comment")
    const errorBox = document.querySelector(".error-panel")

    useEffect(() => {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        // try load from localstorage first
        tmImage.load(modelURL, metadataURL).then(
            async (ret) => {
                setModel(ret)
                setMaxPredictions(ret.getTotalClasses())
            }
        )

    }, [])


    // Load the image model and setup the webcam
    async function init() {
        
        // show dialogue box
        if (dialogueBox.getAttribute("hidden") === null) return
        dialogueBox.removeAttribute("hidden")
        
        webcamContainer.removeAttribute("freeze")
        predictionBox.innerHTML = "Looks like: "
        suggestionBox.innerHTML = ""
        commentBox.value = ""

        errorBox.setAttribute("hidden", "true")
        errorBox.innerHTML = ""

        try {
            const flip = true; // whether to flip the webcam
            webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
            let constraints = {
                audio: false,
                // video: {
                //     facingMode: {
                //         exact: 'environment'
                //     }
                // }
            }

            await webcam.setup(constraints); // request access to the webcam
            await webcam.play()
            document.getElementById("webcam-container").appendChild(webcam.canvas)

            window.requestAnimationFrame(loop);
            // append elements to the DOM
            // document.getElementById("webcam-container")
        } catch(e){
            console.log(e)
        }
    }

    async function loop() {

        const predictClass = async () => {
            // predict can take in an image, video or canvas html element
            let prediction = await model.predict(webcam.canvas);
            const predictionBox = document.querySelector('.prediction');
            //console.log(prediction)
    
            let highestPrediction = 0
            let currentProbability = 0
    
            for (let i=0; i < maxPredictions; i++) {
                if (prediction[i].probability > currentProbability) {
                    // if (prediction[i].className === "human") {
                    //     continue
                    // }
                    highestPrediction = i
                    currentProbability = prediction[i].probability
                }
            }
    
            // console.log(prediction[highestPrediction].className)
    
            predictionBox.innerHTML = prediction[highestPrediction].className
            
        }

        const dialogueBox = document.querySelector('.upload-dialogue-container');
        const webcamContainer = document.getElementById("webcam-container")
        if (dialogueBox.getAttribute("hidden") !== null) {
            await webcam.stop()
            return
        }
        if (webcamContainer.getAttribute("freeze") !== null) {
            await webcam.stop()
            return
        }
        webcam.update(); // update the webcam frame

        try {
            await predictClass();
            window.requestAnimationFrame(loop);
        } catch(e) {
            // if something errors here, it could be that user has left page. Either way, stop webcam
            console.log(e)
            webcam.stop()
            return
        }
        
    }

            

    return (
        <>
            <img className="upload-button" onClick={init} src="/assets/camera.png"/>
        </>
    )
}