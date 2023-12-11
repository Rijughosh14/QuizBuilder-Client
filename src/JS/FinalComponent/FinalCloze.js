import React, { useCallback, useEffect, useRef, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'


const FinalCloze = ({ data,ClozeAnswers,index }) => {
    const [Option, SetOptions] = useState([])
    const [Preview, SetPreview] = useState([])
    const [SelectedOption, SetSelectedOption] = useState([' '])
    const PreviewRef = useRef(null)



    const DesignChange = useCallback(() => {
        const content = data.Preview;
        if (content) {
            const stringWithDiv = content.replaceAll("&nbsp;", " ");
            const array = stringWithDiv.split('_____')
            SetPreview(array)
        }

    }, [data])

    const DragEnd=(result)=>{
        if (!result.destination) return
        if (result.destination.droppableId === result.source.droppableId)return
        let add,active=Option,complete=SelectedOption
        if(result.source.droppableId==='option')
        {
            add=active[result.source.index];
            active.splice(result.source.index,1);
            if(parseInt(result.destination.droppableId)>complete.length-1){
                complete.splice(parseInt(result.destination.droppableId),0,add)
            }
            else if(complete[parseInt(result.destination.droppableId)]!==' '&&parseInt(result.destination.droppableId)<complete.length-1){
                return
            }
            else if(complete[parseInt(result.destination.droppableId)]!==' '&&parseInt(result.destination.droppableId)===complete.length-1){
                return
            }
            else{
                complete[parseInt(result.destination.droppableId)]=add              
            }
        }
        else if(result.destination.droppableId==='option')
        {
            add=complete[parseInt(result.source.droppableId)];
            complete[parseInt(result.source.droppableId)]=' '
            // complete.splice(parseInt(result.source.droppableId),1)
            // complete.splice(result.source.index,0,' ')
            active.splice(result.destination.index,0,add)
        }

        SetOptions(active)
        SetSelectedOption(complete)
        ClozeAnswers(active,complete,index)

    }


    useEffect(() => {
        SetOptions(data.Options);
        DesignChange()
    }, [data, DesignChange])

    useEffect(()=>{
        ClozeAnswers(Option, SelectedOption, index);
          },[Option,SelectedOption,index])




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
                    <DragDropContext onDragEnd={DragEnd}>
                        <div className="flex flex-col mt-10">
                            {/* options sections */}
                            <Droppable droppableId={'option'}>
                                {
                                    (provided) => (
                                        <div id='key' className='flex flex-row gap-2 h-16 w-1/2 border border-gray-100'
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        >
                                            {
                                                Option?.map((data, index) => {
                                                    return (
                                                        <Draggable key={index} index={index} draggableId={`Option-${index}`}>
                                                            {
                                                                (provided) => (
                                                                    <div className='h-fit w-fit border border-gray-300 bg-purple-400 py-2 px-7 rounded-xl' key={index}
                                                                    {...provided.draggableProps}
                                                                        ref={provided.innerRef}
                                                                        {...provided.dragHandleProps}
                                                                    >
                                                                        <p className='text-lg text-white font-medium'>
                                                                            {data}
                                                                        </p>
                                                                    </div>
                                                                )
                                                            }
                                                        </Draggable>
                                                    )
                                                })
                                            }
                                            {provided.placeholder}
                                        </div>
                                    )
                                }
                            </Droppable>
                            {/* Question sections */}
                            <div id='category' className='flex flex-row gap-2 mt-8'>
                                <div id='category-box' className='flex flex-row '>
                                    <div className="flex items-center text-lg font-serif" ref={PreviewRef}>
                                        {Preview.map((data, index) => (
                                            <div key={index} className='flex items-center'>{
                                                data
                                            }
                                                {index !== Preview.length - 1 &&
                                                <Droppable droppableId={`${index}`}>
                                                    {
                                                        (provided)=>(

                                                            <div className=" ml-2 inline-block border border-gray-300 bg-purple-400 h-12 w-32 rounded-xl"
                                                            ref={provided.innerRef}
                                        {...provided.droppableProps}
                                                            >
                                                              { SelectedOption[index]!==' '&& <Draggable draggableId={`selectedoption-${index}`} index={index}>
                                                                    {
                                                                        (provided)=>(
                                                                            <div className='min-h-fit min-w-fit bg-purple-400 py-2 px-7 rounded-xl' key={index}
                                                                            {...provided.draggableProps}
                                                                                ref={provided.innerRef}
                                                                                {...provided.dragHandleProps}
                                                                            >
                                                                                <p className='text-lg text-white font-medium'>
                                                                                    {SelectedOption[index]}
                                                                                </p>
                                                                            </div>  
                                                                        )
                                                                    }
                                                                </Draggable>}
                                                                {provided.placeholder}
                                                            </div>
                                                        )
                                                    }
                                                </Droppable>}
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </DragDropContext>
                </div>
            </div>
        </>
    )
}

export default FinalCloze