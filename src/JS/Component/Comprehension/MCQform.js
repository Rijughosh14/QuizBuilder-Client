import React from 'react'
import { useState } from 'react'
import { useRef } from 'react'



const MCQform = ({handleOptionchange,MCQSet,handleRemoveoption,MCQs,index,SubmitQuestion,Deletequestion,handleQuestionchange,MCQquestion}) => {
    const MCQref = useRef(null)

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
                                <h2 className="text-gray-800 text-xl font-semibold">{`MCQ Question ${index+1}`} </h2>
                            </div>
                            <div className='flex flex-row gap-4'>
                                {
                                    index>0&&
                                <button onClick={()=>Deletequestion(index)}>
                                    <i className="fas fa-trash"></i>
                                </button>
                                }
                            </div>
                        </div>
                        <div className='flex flex-row '>
                            <div className='w-1/2'>
                                <input className="appearance-none block  bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-3 mt-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 w-full" type="text" placeholder="Question" value={MCQquestion} onChange={(e)=>handleQuestionchange(e.target.value)} />
                            </div>
                            <div className=' ml-2 flex flex-col justify-between '>
                                
                            </div>
                        </div>
                    </div>
                    {/* Options section */}
                    <div className="flex flex-col mt-5">
                        <p className='text-sm font-semibold'>
                            Options
                        </p>
                                    <div
                                        id='Options'
                                        className=''
                                    >
                                        {
                                            MCQs.map((data, index) => {
                                                return (
                                                    <div key={`options-${index}`}>
                                                        
                                                                <div
                                                                    id={`${index}`}
                                                                    className={` flex flex-row gap-3  p-2`}
                                                                        
                                                                >
                                                                    <i className="fas fa-caret-square-up my-auto"
                                                                    ></i>
                                                                    <input
                                                                        id={`${index}`}
                                                                        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-1/2"
                                                                        type="text"
                                                                        value={data.value}
                                                                        onChange={(e) => handleOptionchange(e, index)}
                                                                        ref={index === 0 ? MCQref : null} />

                                                                    <button className='' onClick={() => handleRemoveoption(index)}>
                                                                        <i className="fas fa-times"></i>
                                                                    </button>
                                                                </div>
                                                            
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                
                        <div className='my-1 mx-2'>
                            <input className="shadow appearance-none border rounded py-2 px-3 w-1/2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-7" type="text" value={''} placeholder={`Option ${MCQs.length + 1}`} onInput={() => MCQSet(MCQref)} />
                        </div>
                        <div className='mt-4'>
                            <button className='rounded bg-blue-300 items-center px-4 text-sm font-bold hover:text-white h-6'
                            onClick={()=>SubmitQuestion(index)}>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MCQform