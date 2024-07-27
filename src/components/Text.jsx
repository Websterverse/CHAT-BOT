import React, { useRef, useState } from 'react'
import { GoogleGenerativeAI } from "@google/generative-ai";
import loading_img from "../assets/loading.gif"
const Text = () => {

// Access your API key as an environment variable.
const genAI = new GoogleGenerativeAI("AIzaSyD_6LWlGfsbaclXVliwehXxB3PtDNb0J-M");
const [input , setInput] = useState("") ; 
const [generatedtext , setGeneratedtext] = useState("")
const [loading , setLoading] = useState(true)
const copyref = useRef("") ; 


const genText = async ()=>{

try {
setLoading(true);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
    const prompt = input
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    setInput("") ; 
    setLoading(false)
    setGeneratedtext(text);
    console.log(text);



}
 catch (error) {
    console.log(error)
}
}

const onCopyText = ()=>{
copyref.current.select()

}




    return (
        <div className='min-h-screen bg-gray-100 flex items-center justify-center  ' >
            <div className='max-w-3xl w-full md:w-2/3 lg:w-1/2 mx-4 my-8 p-6 bg-white rounded-lg shadow-lg  '  >

                <h1 className='text-3xl font-bold  text-center mb-4 text-gray-500 '  >KinglyWords</h1>
                <div className='flex flex-col gap-2 ' >
                    <div className='cursor-pointer  flex justify-end ' >
                        <p  onClick={onCopyText}  className="bg-blue-500 px-2 py-2 rounded-md" >copy</p>
                    </div>

                    <div className='' >

{
loading === true ?  

<div className='flex items-center justify-center border border-gray-300 rounded-md p-4 w-full h-72 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500' >

<img src={loading_img} alt="loading " />

   </div> 


: (<textarea ref={copyref}  readOnly value={generatedtext}   className='border border-gray-300 rounded-md p-4 w-full h-72 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500'  placeholder='GENERATED TEXT WILL APPEAR HERE' name="" id=""></textarea>
)


}


                        
                    </div>




                </div>



<div  className="flex pt-4" >
    <input value={input}  onChange={(e)=>{setInput(e.target.value)}}  className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    
  type="text"   placeholder="Enter your prompt..." />

<button  onClick={genText}   className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
             >Generate</button>




</div>




            </div>
        </div>
    )
}

export default Text
