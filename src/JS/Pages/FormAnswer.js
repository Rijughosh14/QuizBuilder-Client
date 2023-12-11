import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import AnswerCategorize from '../AnswerComponent/AnswerCategorize'
import AnswerCloze from '../AnswerComponent/AnswerCloze'
import AnswerComprehension from '../AnswerComponent/AnswerComprehension'
import { useNavigate } from 'react-router-dom'





const FormAnswer = () => {


    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const ref = useRef('')
    const navigate = useNavigate()
    const userRef = useRef('')
    const [Formtitle, SetFormtitle] = useState()
    const [UserName, SetUserName] = useState('')
    const [ResponseCategorize,SetResponseCategorize]=useState([])
    const [ResponseCloze,SetResponseCloze]=useState([])
    const [ResponseComprehension,SetResponseComprehension]=useState([])
    const [QuestionCategorize,SetQuestionCategorize]=useState([])
    const [QuestionCloze,SetQuestionCloze]=useState([])
    const [QuestionComprehension,SetQuestionComprehension]=useState([])

    console.log(ResponseComprehension)

    const getData = async () => {
        const response = await axios.get('/answerdata', { params: { id: id } })
        console.log(response.data)
        SetUserName(response.data.UserName)
        SetFormtitle(response.data.FormTitle)
        SetResponseCategorize(response.data.Categorize)
        SetResponseCloze(response.data.Cloze)
        SetResponseComprehension(response.data.Comprehension)
        SetQuestionCategorize(response.data.FormId.Categorize)
        SetQuestionCloze(response.data.FormId.Cloze)
        SetQuestionComprehension(response.data.FormId.Comprehension)
    }


    useEffect(() => {
        getData()
        ref.current.focus()
        if (!id) {
            navigate('/')
        }
    }, [id, navigate])
    return (
        <>
            <div className="flex w-screen h-screen text-gray-700">

                <div className="flex flex-col flex-grow">
                    <div className="flex flex-row items-center flex-shrink-0 h-16 px-8 border-b-2 border-red-300 justify-between">
                        <input className="text-lg font-medium p-2" placeholder='Form Title' ref={ref} defaultValue={Formtitle} readOnly />
                        <div className='flex flex-row gap-4 justify-center items-center '>
                            <div>
                                <input className=" text-lg font-medium border border-gray-400 rounded p-2 mt-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 m-auto " type="text" placeholder="Enter Your Name" defaultValue={UserName} readOnly
                                ref={userRef}
                                 />

                            </div>
                        </div>
                    </div>

                    <div className="flex-grow p-10 overflow-auto flex-col">
                        {
                            QuestionCategorize?.map((data, index) => {
                                if (data.Description === '' && data.Categories.length < 1 && data.Items.length < 1) {
                                    return ('')
                                }
                                return (
                                    <AnswerCategorize
                                    Description={data.Description}
                                    Categories={data.Categories}
                                     Items={ResponseCategorize[index]?.Item} 
                                     ItemAnswers={ResponseCategorize[index]?.ItemAnswers} 
                                     key={index}  
                                    index={index}
                                    />
                                )
                            })
                        }
                        {
                            QuestionCloze?.map((data, index) => {
                                if (data.Preview === '' && data.Options.length < 1) {
                                    return ('')
                                }
                                return (
                                    <AnswerCloze
                                    Preview={data.Preview}
                                    option={ResponseCloze[index]?.option}
                                    selectedOption={ResponseCloze[index]?.selectedOption}
                                    key={index} 
                                    />
                                )
                            })
                        }
                        {
                            QuestionComprehension?.map((data, index) => {
                                if (data.Passage === '' && data.Questions.length < 1) {
                                    return ('')
                                }
                                return (
                                    <AnswerComprehension 
                                    Passage={data.Passage}
                                    Questions={data.Questions}
                                    Option={ResponseComprehension[index]?.selectedOption}
                                    key={index} 
                                    index={index} />
                                )
                            })
                        }
                    </div>
                </div>

            </div>
        </>
    )
}

export default FormAnswer