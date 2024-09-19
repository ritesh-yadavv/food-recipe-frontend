import React,{useEffect,useState} from 'react'
import '@splidejs/splide/dist/css/splide.min.css'
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Link } from "react-router-dom";
const VegetarianRow = () => {
    const [Vegg, setVegg]=useState([])
    const [populer, setPopuler]=useState([])

const getCuisinev = async () =>{
      const check = localStorage.getItem("veggie");
      if(check){
        setVegg(JSON.parse(check));
      }
      else{
          const api= await fetch(
              `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`);
              const data = await api.json();
              localStorage.setItem("veggie",JSON.stringify(data.recipes));
              console.log(data.recipes)
              setVegg(data.recipes)
      }
    };
  const getCuisinenon = async () =>{
    const check = localStorage.getItem("populer");
    if(check){
        setPopuler(JSON.parse(check));
    }
    else{
        const api= await fetch(
            `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`);
            const data = await api.json();
            localStorage.setItem("populer",JSON.stringify(data.recipes));
            // console.log(data.recipes)
            setPopuler(data.recipes)
    }
};
  useEffect(()=>{
    getCuisinev();
    getCuisinenon();
  },[]);

if ((Vegg.length==0) || (populer.length==0)) return <div>wait</div>
  return (
    <div className='w-full flex flex-col justify-center items-center'>
     <div className='w-full flex flex-col justify-center items-center'>
      <h1 className='text-3xl text-white'>Vegetarian Dishes</h1>
    <Splide className='w-2/3' options={{
        perPage:3,
        breakpoints: {
          1032: {
              perPage: 2,
          },
          626: {
            perPage:1,
            // gap:"2rem",
        }
    },  
        perMove:1,
        arrows:false,
        paginations: false,
        drag: 'free',
        snap:true,
        gap:"10px",
        pagination:false,
        
    }}>
          {Vegg.map((item) => (
       <SplideSlide key={item.id}>
       <Link to={'/recipe/'+item.id}>
       <div className="m-4 relative flex justify-center items-center ">
           <img src={item.image} alt="" className='w-full sm:w-72 h-48 rounded-md fill-neutral-500' />
           <p className='text-white text-center absolute bottom-0 text-sm z-10 px-3'>{item.title}</p>
           <div className='gradient absolute top-0'></div>
       </div>
       </Link>
       </SplideSlide> 
      ))}
        </Splide>
           </div>
        <div className='w-full mt-5 flex flex-col justify-center items-center'>
        <h1 className='text-3xl text-white'>Populer Dishes</h1>
    <Splide className='w-2/3 ' options={{
        perPage:3,
        // perPage: 4,
        perMove:1,
        breakpoints: {
          1032: {
              perPage: 2,
          },
          626: {
            perPage:1,
            // gap:"2rem",
        }
    },  
        arrows:false,
        paginations: false,
        drag: 'free',
        snap:true,
        gap:"10px",
        pagination:false,
        
    }}>
          {populer.map((item) => (
       <SplideSlide key={item.id}>
       <Link to={'/recipe/'+item.id}>
       <div className="m-4 relative flex justify-center items-center">
           <img src={item.image} alt="" className='w-72 h-48 rounded-md fill-neutral-500' />
           <p className='text-white text-center absolute bottom-0 text-sm z-10 px-3'>{item.title}</p>
           <div className='gradient absolute top-0'></div>
       </div>
       </Link>
       </SplideSlide> 
      ))}
        </Splide>

        </div>
    </div>
  )
}

export default VegetarianRow
