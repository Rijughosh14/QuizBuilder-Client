import React, {  useEffect, useRef, useState } from 'react'
import Categorize from '../Component/Categorize';
import { Cloze } from '../Component/Cloze';
import Comprehension from '../Component/Comprehension';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';




const FormBuilder = () => {

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const navigate=useNavigate()

    
    const [isActive, setIsActive] = useState(1);
    const [FormTitle, setFormTitle] = useState('');

    //total categorize questions and functions
    const [categorize, setCategorize] = useState([
        {
            Description: '',
            Categories: [],
            Items: []
        }
    ]);


    const AddCategorize = () => {
        setCategorize([
            {
                Description: '',
                Categories: [],
                Items: []
            },
            ...categorize
        ])
    }

    const SetCategorize = (index, data) => {
        const list = [...categorize]
        if (list[index]) {
            list[index].Description = data.Description
            list[index].Categories = data.Categories
            list[index].Items = data.Items
            setCategorize(list)
        }

    }

    const DeleteCategorize = (i) => {
        const filteredData = categorize.filter((data, index) => index !== i);
        setCategorize(filteredData)
    }

    //total Cloze questions and functions

    const [cloze, setCloze] = useState([
        {
            Sentence: '',
            Preview: '',
            Options: []
        }
    ])

    const AddCloze = () => {
        setCloze([
            {
                Sentence: '',
                Preview: '',
                Options: []
            },
            ...cloze
        ])
    }

    const SetCloze = (index, data) => {

        const list = [...cloze]
        if (list[index]) {
            list[index].Sentence = data.Sentence
            list[index].Preview = data.Preview
            list[index].Options = data.Options
            setCloze(list)
        }

    }

    const DeleteCloze = (i) => {
        const filteredData = cloze.filter((data, index) => index !== i);
        setCloze(filteredData)
    }

    //total comprehension questions and functions

    const [comprehension, setComprehensions] = useState([
        {
            Passage: '',
            Questions: [{
                number: null,
                questions: '',
                options: [{
                    value: ''
                  }]
            }]
        }
    ])

    const Addcomprehension = () => {
        setComprehensions([
            {
                Passage: '',
                Questions: [{
                    number: null,
                    questions: '',
                    options: [{
                        value: ''
                      }]
                }]
            },
            ...comprehension
        ])
    }

    const Setcomprehension = (index, data) => {

        const list = [...comprehension]
        if (list[index]) {
            list[index].Passage = data.Passage
            list[index].Questions = data.Questions
            setComprehensions(list)
        }

    }

    const Deletecomprehension = (i) => {
        const filteredData = comprehension.filter((data, index) => index !== i);
        setComprehensions(filteredData)
    }

    const ref = useRef();
    const categorizeRef = useRef();
    const clozeRef = useRef();
    const comprehensionRef = useRef();

    useEffect(() => {
        ref.current.focus()
        if(!id){
            navigate('/')
        }
    }, [id,navigate])

    //toggling current question interface
    const toggleActive = (value) => {
        setIsActive(value);
    };


    //submitting a form

    const SubmitForm=async()=>{
        const data={
            FormTitle:FormTitle,
            Categorize:categorize,
            Cloze:cloze,
            Comprehension:comprehension
        }
        await axios.post('/submitform',{ id: id, data: data })
        navigate('/')
    }

    return (
        <>
            <div className="flex w-screen h-screen text-gray-700">

                <div className="flex flex-col flex-grow">
                    <div className="flex items-center flex-shrink-0 h-16 px-8 border-b border-gray-300">
                        <input className="text-lg font-medium p-2" placeholder='Form Title' ref={ref} onChange={(e) => setFormTitle(e.target.value)} value={FormTitle} />
                        <button className={`flex items-center justify-center h-10 px-4 ml-auto text-sm font-medium ${isActive === 1 ? 'bg-gray-200' : ''} rounded hover:bg-gray-300`} onClick={() => toggleActive(1)}>
                            Categorize
                        </button>
                        <button className={`flex items-center justify-center h-10 px-4 ml-2 text-sm font-medium ${isActive === 2 ? 'bg-gray-200' : ''} rounded hover:bg-gray-300`} onClick={() => toggleActive(2)}>
                            Cloze
                        </button>
                        <button className={`flex items-center justify-center h-10 px-4 ml-2 text-sm font-medium ${isActive === 3 ? 'bg-gray-200' : ''} rounded hover:bg-gray-300`} onClick={() => toggleActive(3)}>
                            Comprehension
                        </button>
                    </div>
                    <div className="flex-grow p-6 overflow-auto flex-col">
                        
                                        <div
                                            className=''
                                        >
                                            {isActive === 1 &&
                                                categorize.map((data, index) => {
                                                    return (
                                                        <div key={index} ref={index === 0 ? categorizeRef : null} >
                                                            <Categorize
                                                                data={data}
                                                                index={index}
                                                                AddCategorize={AddCategorize}
                                                                SetCategorize={SetCategorize}
                                                                DeleteCategorize={DeleteCategorize}

                                                            />
                                                        </div>
                                                    )
                                                })
                                            }
                                            {isActive === 2 &&
                                                cloze.map((data, index) => {
                                                    return (
                                                        <div key={index} ref={index === 0 ? clozeRef : null}>
                                                            <Cloze
                                                                AddCloze={AddCloze}
                                                                SetCloze={SetCloze}
                                                                DeleteCloze={DeleteCloze}
                                                                index={index}
                                                                data={data}
                                                            />
                                                        </div>
                                                    )
                                                })}
                                            {isActive === 3 &&
                                                comprehension.map((data, index) => {
                                                    return (
                                                        <div key={index} ref={index === 0 ? comprehensionRef : null}>
                                                            <Comprehension
                                                                Addcomprehension={Addcomprehension}
                                                                Setcomprehension={Setcomprehension}
                                                                Deletecomprehension={Deletecomprehension}
                                                                index={index}
                                                                data={data}
                                                            />
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    
                        <div className='flex flex-row justify-between'>
                            <div>
                                {isActive !== 1 && <button
                                    onClick={() => toggleActive(isActive - 1)}
                                    className='bg-gray-500 flex items-center justify-center h-10 px-4 ml-2 text-sm font-medium rounded text-white'
                                >
                                    {"<--Prev"}
                                </button>}
                            </div>
                            <div>
                                {isActive !== 3 && <button
                                    onClick={() => toggleActive(isActive + 1)}
                                    className='bg-gray-500 flex items-center justify-center h-10 px-4 ml-2 text-sm font-medium rounded text-white'
                                > {"Next-->"}
                                </button>}
                                {
                                    isActive === 3 && <button className='bg-green-400 flex items-center justify-center h-10 px-4 ml-2 text-sm font-medium rounded text-white'
                                    onClick={SubmitForm}
                                    >
                                        Submit
                                    </button>
                                }
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default FormBuilder