import React, { useEffect, useState } from 'react'

const AnswerComprehension = ({ Passage ,Questions,Option,index}) => {
  const [passage, SetPassage] = useState('')
  const [questions, SetQuestions] = useState([])
  const [Active, SetActive] = useState(0)
  const[selectedOption,SetselectedOption]=useState([''])
console.log(selectedOption)
  const ChangeActive=()=>{
    SetActive(Active+1);
  }



  useEffect(() => {
    SetPassage(Passage);
    SetQuestions(Questions||[]);
    SetselectedOption(Option||[''])
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
            <div className='flex flex-row mt-4 '>
              <div className='w-1/2'>
                <p className="appearance-none block" type="text" placeholder="Description" >{passage}</p>
              </div>
            </div>
          </div>
          {/* answer section */}
          <div className="flex flex-col mt-10">
            <div
              className="py-4 px-8 bg-white rounded-lg my-5 border border-gray-300 mx-auto w-3/4 mt-10 "
            >
              <div
                className='hover:cursor-auto'
              >
                <div>
                  <div className='flex flex-row justify-between border-b border-gray-200 p-2'>
                    <div className='flex flex-row gap-2  '>
                      <h2 className="text-gray-800 text-xl font-semibold">{`MCQ Question`} </h2>
                    </div>
                    <div className='flex flex-row gap-2'>
                      {Active<Questions?.length-1&&<button onClick={ChangeActive}>
                        <i className="fas fa-plus"></i>
                      </button>}
                      {Active!==0&&<button onClick={()=>SetActive(Active-1)}>
                        <i className="fas fa-minus"></i>
                      </button>}
                    </div>
                  </div>
                </div>
                {/* question section */}
                {questions?.map((data,index)=>{
                  return(
               Active===index&& <div className="flex flex-col mt-5 gap-3" key={index}>
                  <div className='w-1/2'>
                    <p className='text-lg font-medium'>
                      {data.questions}
                    </p>
                  </div>
                  <div>
                    {data.options.map((data, i) => {
                return (
                  <div className="flex items-center mt-1" key={i}>
                    <input id="opitions" 
                    type="radio" 
                     value={data.value} 
                     checked={selectedOption[index]===data.value}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                    readOnly
                     />
                    <label htmlFor="radio" className="ms-2 text-sm font-medium text-gray-900">{data.value}</label>
                  </div>
                )
              })}
                  </div>
                </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AnswerComprehension