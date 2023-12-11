import React, { useCallback, useEffect, useRef, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'


const AnswerCloze = ({ Preview,option ,selectedOption}) => {
    const [Option, SetOptions] = useState([])
    const [preview, SetPreview] = useState([])
    const [Selectedoption, SetSelectedOption] = useState([' '])
    const PreviewRef = useRef(null)



    const DesignChange = useCallback(() => {
        const content = Preview;
        if (content) {
            const stringWithDiv = content.replaceAll("&nbsp;", " ");
            const array = stringWithDiv.split('_____')
            SetPreview(array)
     }

    }, [Preview])


    useEffect(() => {
        SetOptions(option||[]);
        SetSelectedOption(selectedOption||[' '])
        DesignChange()
    }, [ DesignChange])




    return (
        <>
            <div
                className="py-4 px-8 bg-white shadow-lg rounded-lg my-5"
            >
                <div
                    className='hover:cursor-auto'
                >
                    <div>
                        <div className='flex flex-row justify-between'>
                            <div className='flex flex-row gap-2'>
                                <i className="fas fa-caret-square-up my-auto"
                                ></i>
                                <h2 className="text-gray-800 text-2xl font-semibold">Question </h2>
                            </div>
                        </div>
                    </div>
                    {/* answer section */}
                        <div className="flex flex-col mt-10">
                            {/* options sections */}
                                        <div id='key' className='flex flex-row gap-2 h-16 w-1/2 border border-gray-100'
                                        
                                        >
                                            {
                                                Option?.map((data, index) => {
                                                    return (
                                                                    <div className='h-fit w-fit border border-gray-300 bg-purple-400 py-2 px-7 rounded-xl' key={index}
                                                                
                                                                    >
                                                                        <p className='text-lg text-white font-medium'>
                                                                            {data}
                                                                        </p>
                                                                    </div>
                                                                
                                                            
                                                    )
                                                })
                                            }
                                        </div>
                                    
                            {/* Question sections */}
                            <div id='category' className='flex flex-row gap-2 mt-8'>
                                <div id='category-box' className='flex flex-row '>
                                    <div className="flex items-center text-lg font-serif" ref={PreviewRef}>
                                        {preview.map((data, index) => (
                                            <div key={index} className='flex items-center'>{
                                                data
                                            }
                                                {index !== preview.length - 1 &&
                                                

                                                            <div className=" ml-2 inline-block border border-gray-300 bg-purple-400 h-12 w-32 rounded-xl"
                                                            
                                                            >
                                                              { Selectedoption[index]!==' '&&
                                                
                                                                    
                                                                            <div className='min-h-fit min-w-fit bg-purple-400 py-2 px-7 rounded-xl' key={index}
                                                                            
                                                                            >
                                                                                <p className='text-lg text-white font-medium'>
                                                                                    {Selectedoption[index]}
                                                                                </p>
                                                                            </div>  
                                                                        }
                                                            </div>
                                                        }
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </>
    )
}

export default AnswerCloze