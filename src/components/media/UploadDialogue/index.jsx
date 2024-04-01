import { React, useEffect, useState } from "react";
import { Configuration, OpenAIApi } from "openai"

import "./style.css"

// const API_KEY = process.env.REACT_APP_API_KEY

export default function UploadDialogue(postFunction) {

    const [shareable, setShareable] = useState(false)

    // let configuration = new Configuration({ apiKey: API_KEY,});

    // Delete it
    // delete configuration.baseOptions.headers['User-Agent'];

    
    // const openai = new OpenAIApi(configuration);

    // const handleSubmit = async (prompt) => {
        
    //   try {
    //     //console.log("Prompt: " + prompt)
    //     const result = await openai.createChatCompletion({
    //       model: "gpt-3.5-turbo",
    //     //   model: "text-davinci-003",
    //       messages: [{ role: "user", content: prompt }],
    //     //   prompt: prompt,
    //     //   temperature: 0.3,
    //     //   max_tokens: 500,
    //     });
    //     //console.log("response", result.data.choices[0].text);
    //     // setApiResponse(result.data.choices[0].text);
    //     //console.log("result: "+ result.data.choices[0].message.content)
    //     return result.data.choices[0].message.content  
    //   } catch (e) {
    //     console.log(e);
    //     return "Something went wrong, try again..."
    //   }

    // };

    const handleSubmit = (category) => {
        console.log(category)

        switch (category) {
            case "plastic":
                return "\
                In order to recycle plastic, you can either put your recycling in the appropriate bin \
                (usually labelled), or you can directly bring your recycling \
                to a local recycling plant. \
                Make sure to dispose of any plastics in the proper place \
                to ensure that reusable plastics are recycled. \ "
            case "cardboard":
                return "\
                In order to recycle cardboard, please first ensure that the \
                cardboard you are trying to recycle is clean and dry.\
                Make sure to flatten any cardboard boxes by folding them to save space.\
                Most curbside recycling programs accept cardboard boxes, but\
                you can also drop off cardboard recycling at recycling plants, or\
                even paper mills (if your cardboard is of high enough quality)\
                "
            default:
                return "In order to recycle any waste, make sure to consult with local\
                organizations and agencies to find out what types of materials are accepted.\
                Common recyclable materals are metals, plastics, papers, and glasses. "
        }
    }

    // useEffect(() => {
    //     handleSubmit("hi")
    // }, [])

    async function getInfo() {
        if (shareable) {
            return
        }


        const dialogueBox = document.querySelector('.upload-dialogue-container');
        const webcamContainer = document.getElementById("webcam-container")
        
        const predictionBox = document.querySelector('.prediction')
        const suggestionBox = document.querySelector('.ai-suggestion')
        try {
        // injection attack possible here
        const category = predictionBox.innerHTML

        if (category === "Nothing in frame!") {
            return
        }

        webcamContainer.setAttribute("freeze", "true")
        
        const result = handleSubmit(category)

        // console.log(result)

        // while (loading) {
        //     console.log("loading")
        // }
        //console.log(apiResponse)
        suggestionBox.innerHTML = result

        setShareable(true)

        } catch(e) {
            console.log(e)
            dialogueBox.setAttribute("hidden", "true")
        } finally {
        }
    }

    function cancel() {
        const dialogueBox = document.querySelector('.upload-dialogue-container');
        dialogueBox.setAttribute("hidden", "true")
        document.getElementById("webcam-container").innerHTML = ""
        cleanup()
    }


    


    async function share() {
        const commentBox = document.querySelector(".comment")
        const webcamContainer = document.getElementById("webcam-container")
        const errorBox = document.querySelector(".error-panel")
        
        if (!shareable) {
            return
        }

        if (commentBox.value == "") {
            return
        }

        // const p = "Is the following message hateful, hurtful, or misleading? \""
        //     + commentBox.value + "\" Answer with \"Yes\" or \"No\""
        // const result = handleSubmit(p)

        // console.log(apiResponse)
        // console.log(result)
        // if (result.slice(0, 3) === "Yes") {
        //     errorBox.removeAttribute("hidden")
        //     errorBox.innerHTML = "Sorry, that is not an appropriate comment"
        //     cancel()
        //     return
        // }
        postFunction.postFunction(commentBox.value, webcamContainer.children[0].toDataURL());

        cancel()
    }

    function cleanup() {
        setShareable(false)
    }

    

    return (
        <div className="upload-dialogue-container" hidden>
                
            <div className="display">

                <div className="get-data">
                    <div id="webcam-container"></div>
                    <div className="prediction"></div>

                    <div id="manual-upload">
                        <button type="submit" className="submit-button" onClick={getInfo}>Submit Photo</button>
                    </div>
                    <div className="spacer"></div>
                </div>

                <div className="info">
                    <div className="ai-suggestion"></div>
                    <textarea className="comment" rows="4" cols="50" placeholder="Add Comment"/>

                </div>
            </div>


            <div className="options">
                <img className="share" onClick={share} src="/assets/share.png"/>

                <img className="cancel" onClick={cancel} src="/assets/cancel.png"/>
            </div>
        </div>
    )
}