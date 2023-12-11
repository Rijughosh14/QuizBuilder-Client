import React, { useEffect, useState } from 'react'

const AnswerCategorize = ({ Description,Categories ,Items,ItemAnswers}) => {

    const [Descriptions, SetDescription] = useState('')
    const [Categorie, SetCategories] = useState([])
    const [Item, SetItems] = useState([])
    const [ItemAnswer, SetItemsAnswer] = useState([])

    useEffect(() => {
        SetCategories(Categories);
        SetDescription(Description);
        SetItems(Items);
        SetItemsAnswer(ItemAnswers)
    }, [])


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
                        <div className='flex flex-row '>
                            <div className='w-1/2'>
                                <input className="appearance-none block  bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-3 mt-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 w-full" type="text" placeholder="Description" value={Descriptions} readOnly />
                            </div>
                        </div>
                    </div>
                    {/* answer section */}
                        <div className="flex flex-col mt-10"
                        >
                            {/* keys sections */}
                                        <div id='key'
                                            className='h-32 w-1/2 m-auto flex justify-center items-center flex-row gap-2 border border-gray-100'>
                                            {
                                                Item?.map((data, index) => {
                                                    return (
                                                        
                                                                    <div className='min-h-fit min-w-fit border border-gray-300 place-items-center rounded-lg p-4'
                                                                        key={index}
                                                                    >
                                                                        <p className='text-lg'>
                                                                            {data.value}
                                                                        </p>
                                                                    </div>
                                                             
                                                    )
                                                })
                                            }
                                        </div>
                            {/* categories sections */}
                            <div id='category' className='flex justify-center flex-row gap-2 mt-8'>
                                {Categorie?.map((data, index) => (
                                    <div id={`category-box-${index}`} className='flex flex-col gap-4' key={index}>
                                        <div className='min-h-fit min-w-fit border borer-gray-300 bg-rose-300 py-3 px-7 rounded-xl'>
                                            <p className='text-lg'>{data.value}</p>
                                        </div>
                                                <div
                                                    className=' w-36 min-h-[128px] h-auto overflow-hidden rounded-xl bg-rose-300 p-3'
                                                >
                                                   {ItemAnswer?.map((Data, i) => {
                                                    if(data.value!==Data.category) return('')
                                                    // if(Data.value==='') return('')
                                                    return (
                                                                    <div className='min-h-fit min-w-fit border border-gray-300 place-items-center rounded-lg p-4'
                                                                        key={i}
                                                                    >
                                                                        <p className='text-lg'>
                                                                            {Data.value}
                                                                        </p>
                                                                    </div>
                                                              
                                                            
                                                    )
                                                })}
                                                </div>
                                            
                                    </div>
                                ))}
                            </div>

                        </div>
                </div>
            </div>
        </>
    )
}

export default AnswerCategorize