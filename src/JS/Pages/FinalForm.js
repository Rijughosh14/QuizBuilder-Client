import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const FinalForm = () => {

   const navigate=useNavigate();
   const [Forms,SetForms]=useState([])
   const [FormAnswer,SetFormAnswer]=useState([])



  const CreateForm=async()=>{
    try {  
        const response=await axios.post('/creates')
      navigate(`/create?id=${response.data}`)
    } catch (error) {
      console.log(error)
    }
  }

  const GetFormsAndAnswer=async()=>{
    const formdata=await axios.get('/getforms')
    SetForms(formdata.data)
    const formans=await axios.get('/getformanswers')
    SetFormAnswer(formans.data)
  }

  useEffect(()=>{
    GetFormsAndAnswer()
  },[])

  return (
    <>
    {/* <!-- component --> */}
<div className="bg-blue-400 min-h-screen flex items-center justify-center">
  <div className="bg-gray-800 flex-1 flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:space-x-10 max-w-6xl sm:p-6 sm:my-2 sm:mx-4 sm:rounded-2xl">
    {/* <!-- Content --> */}
    <div className="flex-1 px-2 sm:px-0">
      <div className="flex justify-between items-center">
        <h3 className="text-3xl font-extralight text-white/50">Forms</h3>
      </div>
      <div className="mb-10 sm:mb-0 mt-10 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div className="group bg-gray-900/30 py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/40 hover:smooth-hover" onClick={CreateForm}>
          <div className="bg-gray-900/70 text-white/50 group-hover:text-white group-hover:smooth-hover flex w-20 h-20 rounded-full items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <p className="text-white/50 group-hover:text-white group-hover:smooth-hover text-center">Create Form</p>
        </div>
        {
          Forms.map((data,index)=>{
            return(
        <div className="relative group bg-gray-900 py-10 sm:py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/80 hover:smooth-hover"
         onClick={()=>navigate(`/form?id=${data._id}`)}
         key={index}
        >
          <h4 className="text-white text-2xl font-bold capitalize text-center">{data.FormTitle===""?"Untitled":data.FormTitle}</h4>
        </div>
            )
          })
        }
        {
          FormAnswer.map((data,index)=>{
            return(
        <div className="relative group bg-gray-900 py-10 sm:py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/80 hover:smooth-hover"
          onClick={()=>navigate(`/answer?id=${data._id}`)}
         key={index}
        >
          <h4 className="text-white text-2xl font-bold capitalize text-center">{data.FormTitle===""?"Untitled":data.FormTitle}</h4>
          <p className="text-white text-lg mt-4  text-center">
              Answer Submitted By {data.UserName}
          </p>
        </div>
            )
          })

        }
      </div>
    </div>
  </div>
</div>
    </>
  )
}

export default FinalForm