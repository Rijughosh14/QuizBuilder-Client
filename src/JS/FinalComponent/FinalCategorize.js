import React, { useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

const FinalCategorize = ({ data,CategorizeAnswers ,index}) => {

    const [Description, SetDescription] = useState('')
    const [Categories, SetCategories] = useState([])
    const [Item, SetItems] = useState([])
    const [ItemAnswers, SetItemsAnswer] = useState([{
        value:'',
        category:''
    }])

    useEffect(() => {
        SetCategories(data.Categories);
        SetDescription(data.Description);
        SetItems(data.Items);
    }, [data])

    useEffect(()=>{
        CategorizeAnswers(Item,ItemAnswers,index)
    },[Item,ItemAnswers])

    const dragend = (result) => {
        if (!result.destination) return
        if (result.destination.droppableId === result.source.droppableId) return
        let add,active=Item,complete=ItemAnswers
        if(result.source.droppableId==='keysAnswer'){
            add={
                value:active[result.source.index].value,
                category:result.destination.droppableId
            }     
            active.splice(result.source.index,1);
            complete.splice(result.destination.index,0,add)
        }
        else if(result.destination.droppableId==='keysAnswer'){
            add={               
                value: complete[result.source.index].value,
                category: ''     
            }
            complete.splice(result.source.index,1);
            active.splice(result.destination.index,0,add)
        }
        else{
            add={
                value:complete[result.source.index].value,
                category:result.destination.droppableId
            }
            complete.splice(result.source.index,1);
            complete.splice(result.destination.index,0,add)
        }

        SetItems(active)
        SetItemsAnswer(complete)
        CategorizeAnswers(active,complete,index)

    }


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
                                <input className="appearance-none block  bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-3 mt-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 w-full" type="text" placeholder="Description" defaultValue={Description} readOnly />
                            </div>
                        </div>
                    </div>
                    {/* answer section */}
                    <DragDropContext onDragEnd={dragend}>
                        <div className="flex flex-col mt-10"
                        >
                            {/* keys sections */}
                            <Droppable droppableId='keysAnswer'>
                                {
                                    (provided) => (
                                        <div id='key'
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            className='h-32 w-1/2 m-auto flex justify-center items-center flex-row gap-2 border border-gray-100'>
                                            {
                                                Item?.map((data, index) => {
                                                    return (
                                                        <Draggable key={index} draggableId={`drag-Keys-${index}`} index={index}>
                                                            {
                                                                (provided) => (
                                                                    <div className='min-h-fit min-w-fit border border-gray-300 place-items-center rounded-lg p-4'
                                                                        key={index}
                                                                        {...provided.draggableProps}
                                                                        ref={provided.innerRef}
                                                                        {...provided.dragHandleProps}
                                                                    >
                                                                        <p className='text-lg'>
                                                                            {data.value}
                                                                        </p>
                                                                    </div>
                                                                )
                                                            }
                                                        </Draggable>
                                                    )
                                                })
                                            }
                                            {provided.placeholder}
                                        </div>)}
                            </Droppable>
                            {/* categories sections */}
                            <div id='category' className='flex justify-center flex-row gap-2 mt-8'>
                                {Categories?.map((data, index) => (
                                    <div id={`category-box-${index}`} className='flex flex-col gap-4' key={index}>
                                        <div className='min-h-fit min-w-fit border borer-gray-300 bg-rose-300 py-3 px-7 rounded-xl'>
                                            <p className='text-lg'>{data.value}</p>
                                        </div>
                                        {/* Droppable component wrapping the area */}
                                        <Droppable droppableId={`${data.value}`} key={index} index={index}>
                                            {(provided) => (
                                                <div
                                                    className=' w-36 min-h-[128px] h-auto overflow-hidden rounded-xl bg-rose-300 p-3'
                                                    ref={provided.innerRef}
                                                    {...provided.droppableProps}
                                                >
                                                   {ItemAnswers?.map((Data, i) => {
                                                    if(data.value!==Data.category) return('')
                                                    // if(Data.value==='') return('')
                                                    return (
                                                        <Draggable key={i} draggableId={`Keys-${i}`} index={i}>
                                                            {
                                                                (provided) => (
                                                                    <div className='min-h-fit min-w-fit border border-gray-300 place-items-center rounded-lg p-4'
                                                                        key={index}
                                                                        {...provided.draggableProps}
                                                                        ref={provided.innerRef}
                                                                        {...provided.dragHandleProps}
                                                                    >
                                                                        <p className='text-lg'>
                                                                            {Data.value}
                                                                        </p>
                                                                    </div>
                                                                )
                                                            }
                                                        </Draggable>
                                                    )
                                                })}
                                                    {provided.placeholder}
                                                </div>
                                            )}
                                        </Droppable>
                                    </div>
                                ))}
                            </div>

                        </div>

                    </DragDropContext>
                </div>
            </div>
        </>
    )
}

export default FinalCategorize