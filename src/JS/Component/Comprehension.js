import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import MCQ from './Comprehension/MCQ'
import MCQform from './Comprehension/MCQform'


const Comprehension = ({Addcomprehension,Setcomprehension,Deletecomprehension,index,data}) => {
  const [Questions, SetQuestion] = useState(data.Questions)
  const [MCQs, SetMCQ] = useState([])
  const [Passage, SetPassage] = useState(data.Passage)
  const [MCQquestion, SetMCQquestion] = useState('')
  


  useEffect(()=>{
    Setcomprehension(index,
      {
        Passage: Passage,
        Questions:Questions
    }
      )
  },[Passage,Questions,index])



  // new Option on input
  const MCQSet = (MCQref) => {
    SetMCQ([
      {
        value: ''
      },
      ...MCQs
    ])

    setTimeout(() => {
      MCQref.current && MCQref.current.focus();
    }, 0);
  }

  //handle Options input change
  const handleOptionchange = (e, i) => {
    const list = [...MCQs];
    list[i].value = e.target.value;
    SetMCQ(list);
  }


  //handle Per mcq question change change
  const handleQuestionchange = (e, i) => {
    SetMCQquestion(e)
  }

  //handle removing option
  const handleRemoveoption = (i) => {
    const filteredData = MCQs.filter((data, index) => index !== i);
    SetMCQ(filteredData);
  }

  //submit question
  const SubmitQuestion=(index)=>{
    if(MCQquestion===''||MCQs.length<1||Passage==='') return
    const list=[...Questions]
    list[index].questions=MCQquestion;
    list[index].options=MCQs
    list[index].number=index
    SetQuestion(list)
    SetMCQ([])
  }

  //adding a new mcq question
  const Addquestion=()=>{
    SetQuestion((data)=>[
      ...data,
      {
        number:null,
        question:"",
        options:[]
      }
    ])
  }

  //deleting the mcq question
  const Deletequestion=(i)=>{
    if(i===0){
      SetQuestion([{
        number:null,
        question:"",
        options:[]
      }])
      return
    }
    const filteredData = Questions.filter((data, index) => index !== i);
    SetQuestion(filteredData)
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
                    <div className='flex flex-row gap-4'>
                      <button onClick={Addcomprehension}>
                        <i className="fas fa-plus"></i>
                      </button>
                      {index>0&&<button onClick={()=>Deletecomprehension(index)}>
                        <i className="fas fa-trash"></i>
                      </button>}
                    </div>
                  </div>
                  <div className='flex flex-row gap-2  '>
                    <div className='w-1/2  mt-3'>
                      <textarea className="appearance-none block text-gray-700 border border-gray-300 rounded py-2 px-3  leading-tight focus:outline-none focus:bg-white focus:border-gray-500 w-full h-16" id="preview" type="text" placeholder="Passage" value={Passage} onChange={(e)=>SetPassage(e.target.value)}></textarea>
                    </div>
                    <div className=' ml-2 flex  justify-between '>
                    </div>
                  </div>
                  {/* MCQ section */}
                  {
                    Questions.map((data,index)=>{
                      return(
                        <div key={index}>
                        {(data.questions===''||data.options.length<1)?
                        (<MCQform 
                        MCQSet={MCQSet}
                        handleOptionchange={handleOptionchange}
                        handleRemoveoption={handleRemoveoption}
                        handleQuestionchange={handleQuestionchange}
                        MCQquestion={MCQquestion}
                        MCQs={MCQs}
                        SubmitQuestion={SubmitQuestion}
                        index={index}
                        key={index}
                        Addquestion={Addquestion}
                        Deletequestion={Deletequestion}
                         />)
                        :
                        (<MCQ 
                          index={index}
                          Questions={Questions}
                          Addquestion={Addquestion}
                          value={Questions.length-1===index?true:false}
                          Deletequestion={Deletequestion}
                          />)
                        }
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </div>
        
    </>
  )
}

export default Comprehension