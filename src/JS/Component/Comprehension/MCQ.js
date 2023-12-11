import React from 'react'
import { useState } from 'react'

const MCQ = ({ index, Questions,Addquestion,value,Deletequestion }) => {
  const[selectedOption,SetselectedOption]=useState('')
  return (
    <>
      <div
        className="py-4 px-8 bg-white rounded-lg my-5 border border-gray-300 mx-auto w-3/4 mt-10 "
        key={index}
      >
        <div
          className='hover:cursor-auto'
        >
          <div>
            <div className='flex flex-row justify-between'>
              <div className='flex flex-row gap-2'>
                <h2 className="text-gray-800 text-xl font-semibold">{`MCQ Question ${index + 1}`} </h2>
              </div>
              <div className='flex flex-row gap-4'>
                {value&&<button onClick={()=>Addquestion()}>
                  <i className="fas fa-plus"></i>
                </button>}
                <button onClick={()=>Deletequestion(index)}>
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
          {/* question section */}
          <div className="flex flex-col mt-5 gap-3">
            <div className='w-1/2'>
              <p className='text-lg font-medium'>
                {Questions[index].questions}
              </p>
            </div>
            <div>
              {Questions[index].options.map((data, index) => {
                return (
                  <div className="flex items-center" key={index}>
                    <input id="radio" 
                    type="radio" 
                    value={data.value} 
                    checked={selectedOption===data.value}
                    onChange={(e)=>SetselectedOption(e.target.value)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" />
                    <label htmlFor="radio" className="ms-2 text-sm font-medium text-gray-900">{data.value}.</label>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MCQ