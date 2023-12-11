import React, { useEffect, useRef, useState } from 'react'

const Categorize = ({data,index,AddCategorize,SetCategorize,DeleteCategorize}) => {


  const [Categories, setCategories] = useState(data.Categories||[])
  const [Items, setItems] = useState(data.Items||[])
  const [Description, setDescription] = useState(data.Description||'')
  const Categoryref = useRef(null)
  const Itemref = useRef(null)
  
  
  
  useEffect(()=>{
    if(Description===''&&Categories.length===0&&Items.length===0) return

      SetCategorize(index,
        {
            Description: Description,
            Categories: Categories,
            Items: Items    
        }
      )
  },[Description,Items,Categories,index])



  // new category on input
  const CategorySet = () => {
    setCategories([
      {
        value: ''
      },
      ...Categories
    ])

    setTimeout(() => {
      Categoryref.current && Categoryref.current.focus();
    }, 0);
  }

  //new item on input
  const ItemSet = () => {
    setItems([
      {
        value: '',
        category: ''
      },
      ...Items
    ])

    setTimeout(() => {
      Itemref.current && Itemref.current.focus();
    }, 0);
  }


  //handle category input change
  const handleCategorychange = (e, i) => {
    const list = [...Categories];
    list[i].value = e.target.value;
    setCategories(list);
  }

  //handle item input change
  const handleItemchange = (e, i) => {
    const list = [...Items];
    list[i].value = e.target.value;
    setItems(list);
  }

  //handle removing category
  const handleRemovecategory = (i) => {
    const filteredData = Categories.filter((data, index) => index !== i);
    setCategories(filteredData);
  }

  //handle removing list
  const handleRemovelist = (i) => {
    const filteredData = Items.filter((data, index) => index !== i);
    setItems(filteredData);
  }

  //handle key-category list
  const keyCategory = (e, i) => {
    const list = [...Items];
    list[i].category = e.target.value;
    setItems(list);
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
                      <button onClick={()=>AddCategorize()}>
                        <i className="fas fa-plus"></i>
                      </button>
                      {index>0&&<button 
                      onClick={()=>DeleteCategorize(index)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>}
                    </div>
                  </div>
                  <div className='flex flex-row '>
                    <div className='w-1/2'>
                      <input className="appearance-none block  bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-3 mt-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 w-full" type="text" placeholder="Description" value={Description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className=' ml-2 flex flex-col justify-between '>
                    </div>
                  </div>
                </div>
                {/* Categories section */}
                <div className="flex flex-col mt-5">
                  <p className='text-lg font-semibold'>
                    Categories
                  </p>
                        <div
                          id='category'
                          className=''
                        >
                          {
                            Categories.map((data, index) => {
                              return (
                                      <div
                                        id={`${index}`}
                                        className={` flex flex-row gap-3 w-fit p-2`}
                                        
                                      >
                                        <i className="fas fa-caret-square-up my-auto"
                                        ></i>
                                        <input
                                          id={`${index}`}
                                          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                          type="text"
                                          value={data.value}
                                          onChange={(e) => handleCategorychange(e, index)}
                                          ref={index === 0 ? Categoryref : null} />

                                        <button className='' onClick={() => handleRemovecategory(index)}>
                                          <i className="fas fa-times"></i>
                                        </button>
                                      </div>                                   
                              )
                            })
                          }
                        </div>
                  <div className='my-1 mx-2'>
                    <input className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-7" type="text" value={''} placeholder={`Category ${Categories.length + 1}`} onInput={() => CategorySet()} />
                  </div>
                </div>
                {/* Item section */}
                <div className="flex flex-col mt-5">
                  <div className='flex flex-row w-full '>
                    <div className=' w-1/3'>
                      <p className='text-lg font-semibold'>
                        Item
                      </p>
                    </div>
                    <div className=''>
                      <p className='text-lg font-semibold'>
                        Item's Category
                      </p>
                    </div>
                  </div>
                        <div
                          id='item'
                          className=''
                        >
                          {
                            Items.map((data, index) => {
                              return (
                                <div index={index} key={index} className='flex flex-row gap-3'>
                                  <div className='w-1/3'>
                                          <div
                                            id={`${index}`}
                                            className={` flex flex-row gap-3  p-2 `}
                                          >
                                            <i className="fas fa-caret-square-up my-auto"
                                            ></i>
                                            <input
                                              id={`${index}`}
                                              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                              type="text"
                                              value={data.value}
                                              onChange={(e) => handleItemchange(e, index)}
                                              ref={index === 0 ? Itemref : null} />

                                            <button className='' onClick={() => handleRemovelist(index)}>
                                              <i className="fas fa-times"></i>
                                            </button>
                                          </div>
                                        
                                  </div>
                                  <div className='p-2'>
                                    <select id="select-category"
                                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                      value={data.category}
                                      onChange={(e) => keyCategory(e, index)}
                                    >
                                      {
                                        Categories.map((data, index) => {
                                          return (<option key={index} value={data.value}>{data.value}</option>)
                                        })
                                      }
                                    </select>
                                  </div>
                                </div>
                              )
                            })
                          }
                        </div>
                  
                  <div className='my-1 mx-2'>
                    <input className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-7" type="text" value={''} placeholder={`Item ${Items.length + 1}`} onInput={() => ItemSet()} />
                  </div>
                </div>
              </div>
            </div>
        
    </>
  )
}

export default Categorize