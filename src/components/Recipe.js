import React from 'react'
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import Loader from './Loader';

function Recipe() {
    let params = useParams();
    const [details,setDetails]=useState([]);
    const [activeTab, setActiveTab]=useState('instructions');
    const fetchDetails = async ()=>{
      const data= await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
      const detailData= await data.json();
      setDetails(detailData);
    }
    useEffect(()=>{
      fetchDetails();
    },[params.name])
    if ((details.length==0)) return <Loader/>
  return (
    <div className='w-full flex justify-center my-10 '>
        <div  className='w-1/3 items-center flex flex-col'>
        <h2  className='text-white text-lg py-4'>{details.title}</h2>
      <img className='w-100% h-64 rounded-md' src={details.image} alt={details.title} />
        </div>
        <div className='w-1/3 flex flex-col'>
          <div className='flex my-3 w-100% justify-center items-center'>
        <button className='mr-4 text-black outline-none border-none bg-white p-2 rounded-sm' 
      onClick={()=> setActiveTab('instructions')} style={{ backgroundColor: activeTab === 'instructions' ? 'gray' : 'white' }}>Instructions</button>
      <button className=' text-black outline-none border-none bg-white p-2 rounded-sm ' onClick={()=> setActiveTab('ingredients')}  style={{ backgroundColor: activeTab === 'ingredients' ? 'gray' : 'white' }}>Ingredients</button>
          </div>
        {activeTab === 'instructions' &&(
        <div>
        <h3 className='text-white text-sm' dangerouslySetInnerHTML={{__html:details.summary}}></h3>
                <h3 className='text-white text-sm' dangerouslySetInnerHTML={{__html:details.instructions}}></h3>
        </div>
        )}
         {activeTab ==='ingredients' && (

      <ul>
        {details.extendedIngredients.map((ingredient) => (
          <li className='text-white text-sm my-1' key={ingredient.id}>{ingredient.original}</li>
        ))}
      </ul>
      )}  
      </div>
    </div>
  )}
export default Recipe
