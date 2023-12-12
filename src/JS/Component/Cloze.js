import React from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
export const Cloze = ({ AddCloze, SetCloze, DeleteCloze, index, data }) => {

  const [Sentence, SetSentence] = useState(data.Sentence)
  const [Preview, SetPreview] = useState(data.Preview)
  const [selectedWord, SetselectedWord] = useState(null)
  const [Options, SetOptions] = useState(data.Options)
  const SentenceRef = useRef(null)


  useEffect(() => {
    SetCloze(index,
      {
        Sentence: Sentence,
        Preview: Preview,
        Options: Options
      }
    )
  }, [Sentence, Preview, Options, index])


  //handling the selected words
  const handleWordSelection = () => {

    const selection = window.getSelection();
    const selectedText = selection.toString();

    // Check if there's a non-empty selection
    if (selectedText !== '' && selectedText !== " ") {
      if (!selectedText.includes(' ')) {
        SetselectedWord(selectedText);
        return
      }
    }
    else {
      SetselectedWord(null);
    }
  }

  //handle options
  const HandleOption = (option) => {
    const filteredData = Options.filter((data) => data !== option);
    SetOptions(filteredData);
    const pattern = new RegExp(`<u>${option}</u>`)
    const content = SentenceRef.current.innerHTML;
    if (pattern.test(content)) {
      const word = SentenceRef.current.innerHTML.replaceAll('<u>' + option + '</u>', option)
      SentenceRef.current.innerHTML = word
      SetSentence(word)
      SetPreview(word)
    }


  }

  //handling the underline function

  const HandleUnderline = () => {

    if (selectedWord) {

      const content = SentenceRef.current.innerHTML;
      const pattern = new RegExp(`<u>${selectedWord}</u>`)
      if (pattern.test(content)) {
        const word = SentenceRef.current.innerHTML.replaceAll('<u>' + selectedWord + '</u>', selectedWord)
        SentenceRef.current.innerHTML = word
        SetSentence(word)
        HandleOption(selectedWord)
        SetPreview(word)
        SetselectedWord(null)
        return
      }
      const secondpattern = new RegExp(`<u>${selectedWord}&nbsp;</u>`)
      if (secondpattern.test(content)) {
        const word = SentenceRef.current.innerHTML.replaceAll('<u>' + selectedWord + '&nbsp;</u>', selectedWord)
        SentenceRef.current.innerHTML = word
        SetSentence(word)
        HandleOption(selectedWord)
        SetPreview(word)
        SetselectedWord(null)
        return
      }


      const word = SentenceRef.current.innerHTML.replaceAll(selectedWord, '<u>' + selectedWord + '</u>&nbsp;')
      SentenceRef.current.innerHTML = word
      SetSentence(word)
      SetOptions([...Options, selectedWord])
      const PreviewWord = SentenceRef.current.innerHTML.replaceAll(selectedWord, "_____")
      const stringWithDashes = PreviewWord.replaceAll(/<u>(.*?)<\/u>/g, "_____");
      SetPreview(stringWithDashes)
      SetselectedWord(null)

    }
  }



  //handle input
  const HandleInput = (e) => {
    const input = e.target.innerHTML
    SetSentence(input);
    const stringWithDashes = input.replaceAll(/<u>(.*?)<\/u>/g, "_____");
    SetPreview(stringWithDashes);
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
                <button onClick={AddCloze}>
                  <i className="fas fa-plus"></i>
                </button>
                {index > 0 && <button onClick={() => DeleteCloze(index)}>
                  <i className="fas fa-trash"></i>
                </button>}
              </div>
            </div>
            <div className='flex flex-row gap-2 '>
              <div className='w-1/2  mt-3'>
                <label htmlFor="preview" className=''>Preview</label>
                {/* <input className="appearance-none block text-gray-700 border border-gray-300 rounded py-2 px-3  leading-tight focus:outline-none focus:bg-white focus:border-gray-500 w-full h-5/6" id="preview" type="text" placeholder="Preview" readOnly value={Sentence} /> */}
                <div
                  className="appearance-none block text-gray-700 border border-gray-300 rounded py-2 px-3  leading-tight focus:outline-none focus:border-gray-500 bg-white h-14 w-full"
                  dangerouslySetInnerHTML={{ __html: Preview }}
                >
                </div>
              </div>
              <div className=' ml-2 flex  justify-between '>
                
              </div>
            </div>
          </div>
          {/* sentence section */}
          <div className="flex flex-col mt-10 gap-4">
            <label htmlFor="sentence" className=''>Sentence</label>
            <div className='gap-2 flex flex-row '>
              <div
                contentEditable
                className="appearance-none block text-gray-700 border border-gray-300 rounded py-2 px-3  leading-tight focus:outline-none focus:border-gray-500 bg-white h-14 w-1/2"
                onInput={(e) => HandleInput(e)}
                onClick={handleWordSelection}
                ref={SentenceRef}
              // dangerouslySetInnerHTML={{ __html:Sentence}}
              >
              </div>
               <i className="fas fa-underline hover:cursor-pointer" onClick={HandleUnderline}></i>
            </div>
            <div className="flex flex-col gap-3">
              {Options.map((data, index) => {
                return (
                  <div index={index} key={index} className=''>

                    <div
                      className='flex flex-row gap-2'
                      >
                      <i className="fas fa-caret-square-up my-auto "
                      ></i>
                      <input className="appearance-none block text-gray-700 border border-gray-300 rounded py-2 px-3  leading-tight focus:outline-none focus:border-gray-500" id="sentence" type="text"
                        value={data} readOnly />
                      <button className='' onClick={() => HandleOption(data)}>
                        <i className="fas fa-times"></i>
                      </button>
                    </div>

                  </div>
                )
              })
              }
            </div>

          </div>
        </div>
      </div>

    </>
  )
}
