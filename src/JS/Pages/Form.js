import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FinalCategorize from '../FinalComponent/FinalCategorize'
import FinalCloze from '../FinalComponent/FinalCloze'
import FinalComprehension from '../FinalComponent/FinalComprehension'



const Form = () => {


    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const navigate = useNavigate()
    const ref = useRef('')
    const userRef = useRef('')
    const [FormData, SetData] = useState()
    const [UserName, SetUserName] = useState('')
    const [CategorizeAns, SetCategorizeAns] = useState([])
    const [ClozeAns, SetClozeAns] = useState([])
    const [ComprehensionAns, SetComprehensionAns] = useState([])

    const getData = async () => {
        const response = await axios.get('/getformdata', { params: { id: id } })
        SetData(response.data)
    }


    //handling the Categorize answers
    const CategorizeAnswers = (Item, ItemAnswers, index) => {
        const list = [...CategorizeAns];
        list[index] = { Item, ItemAnswers };
         // this is wrong ,needs to be fixed
        SetCategorizeAns(...CategorizeAns,
            CategorizeAns[index]={ Item, ItemAnswers })
        SetCategorizeAns(list);
    };

    //handling the Cloze Answers
    const ClozeAnswers=(Options,SelectedOptions,index)=>{
        const data={
            option:Options||[' '],
            selectedOption:SelectedOptions||[' ']
        }
        const list=[...ClozeAns]
            list[index]=data
            // this is wrong ,needs to be fixed
            SetClozeAns(...ClozeAns,
                ClozeAns[index]=data
                )
            SetClozeAns(list)
        
        }
        console.log(CategorizeAns)

    //Handling the Comprehension Answers
    const ComprehensionAnswers=(selectedOption,index)=>{

        const list=[...ComprehensionAns]
        list[index]={selectedOption};
        SetComprehensionAns(list);
    }

    
    
    //handling the answers submission
    const SubmitAnswer=async()=>{
        if(UserName===''){
            userRef.current.focus()
            return
        }
        console.log({
                FormId:id,FormTitle:FormData?.FormTitle,UserName,Categorize:CategorizeAns,Cloze:ClozeAns,Comprehension:ComprehensionAns
            })
        // const response=await axios.post('/submitanswer',{
        //     FormId:id,FormTitle:FormData?.FormTitle,UserName,Categorize:CategorizeAns,Cloze:ClozeAns,Comprehension:ComprehensionAns
        // })
        // navigate('/')
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
                        <input className="text-lg font-medium p-2" placeholder='Form Title' ref={ref} defaultValue={FormData?.FormTitle} readOnly />
                        <div className='flex flex-row gap-4 justify-center items-center '>
                            <div>
                                <input className=" text-lg font-medium border border-gray-400 rounded p-2 mt-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 m-auto " type="text" placeholder="Enter Your Name" value={UserName} onChange={(e) => SetUserName(e.target.value)}
                                ref={userRef}
                                 />

                            </div>
                        </div>
                    </div>

                    <div className="flex-grow p-10 overflow-auto flex-col">
                        {
                            FormData?.Categorize.map((data, index) => {
                                if (data.Description === '' && data.Categories.length < 1 && data.Items.length < 1) {
                                    return ('')
                                }
                                return (
                                    <FinalCategorize data={data} key={index} CategorizeAnswers={CategorizeAnswers} 
                                    index={index}
                                    />
                                )
                            })
                        }
                        {
                            FormData?.Cloze.map((data, index) => {
                                if (data.Preview === '' && data.Options.length < 1) {
                                    return ('')
                                }
                                return (
                                    <FinalCloze data={data} key={index} ClozeAnswers={ClozeAnswers} 
                                    index={index}
                                    />
                                )
                            })
                        }
                        {
                            FormData?.Comprehension.map((data, index) => {
                                if (data.Passage === '' && data.Questions.length < 1) {
                                    return ('')
                                }
                                return (
                                    <FinalComprehension data={data} key={index} ComprehensionAnswers={ComprehensionAnswers}
                                    index={index} />
                                )
                            })
                        }
                        <div>
                            <button
                                onClick={SubmitAnswer}
                                className='bg-blue-500 flex items-center justify-center h-10 px-4 ml-2 text-sm font-medium rounded text-white mt-2'
                            > Submit
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Form