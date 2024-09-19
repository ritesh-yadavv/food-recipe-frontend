import React from 'react'
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import {Link} from 'react-router-dom'
const Searched = () => {
  const [searchedRecipes, setSearchedRecipes]=useState([]);
    let params=useParams();
    const getSeached = async (name) =>{
        const data= await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`);
        const recipes = await data.json();
        setSearchedRecipes(recipes.results);
    };
    useEffect(()=>{
getSeached(params.search);
},[params.search]);
if (searchedRecipes.length==0) return <div>wait</div>
  return  (
    <div className='flex flex-wrap w-full justify-center items-center'>
      {searchedRecipes.map((item)=>{
          return(
              <div key={item.id}>
                <Link to={'/recipe/'+item.id}>
                <div className="m-4 relative flex justify-center items-center w-80">
                <img src={item.image} alt="" className='w-80 h-48 rounded-md fill-neutral-500' />
           <h4 className='text-white text-center absolute bottom-0 text-sm z-10 px-3'>{item.title}</h4>
           <div className='gradient absolute top-0'></div>
           </div>
                </Link>
              </div>
          )
      })}
  </div>
)}
export default Searched
