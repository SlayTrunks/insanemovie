'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Loading from '@/components/Loading'
import Navbar from '@/components/Navbar'

export default function Home() {
  const [api,setApi] = useState([])
  const [movies,setMovies] = useState(true)
  const [artist,setArtist] = useState([])
  const [loading,setLoading] = useState(true)
  useEffect(() => {
   
    const url = movies ? 'https://api.themoviedb.org/3/trending/movie/day?language=en-US' : "https://api.themoviedb.org/3/trending/tv/day?language=en-US"
  
    const headers = {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyN2U1MmVhNGY1ZWYzMTJmYzZiOTczMDZiZTJiMTAxNiIsInN1YiI6IjY1NjJiMGJjMzY3OWExMDk3NTI5MDU1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hIZQCtyFpQbpvj2WfI4A74CsUtVl05xKPNkEpXll3Tw',
      accept: 'application/json',
    };
  
    
    const fetchData = async () => {
      try {
        const response = await fetch(url, { headers });
        const data = await response.json();
      
        setApi(data.results)
        setLoading(false)
       
        
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };
  
    fetchData();
    
  }, [movies,api]);
  useEffect(() => {
    
    const url = 'https://api.themoviedb.org/3/trending/person/day?language=en-US' 
  
    const headers = {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyN2U1MmVhNGY1ZWYzMTJmYzZiOTczMDZiZTJiMTAxNiIsInN1YiI6IjY1NjJiMGJjMzY3OWExMDk3NTI5MDU1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hIZQCtyFpQbpvj2WfI4A74CsUtVl05xKPNkEpXll3Tw',
      accept: 'application/json',
    };
  
    
    const fetchData = async () => {
      try {
        const response = await fetch(url, { headers });
        const data = await response.json();
      
        setArtist(data.results)
        setLoading(false)
       
     
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };
  
    fetchData();
    // console.log(artist)
  }, [artist]);
  
  const handleClick = ()=>{
    setMovies(!movies)
    setLoading(true)
  }
  
  return (
   <div className='bg-black h-full overflow-x-hidden'>
    <Navbar/>
     <div className='flex  overflow-x-hidden '>
      
      <div>
        <div className='flex w-[70vw]  overflow-hidden  max-lg:mx-auto justify-center flex-col pt-16  items-center pb-5'>
        <h1 className='font-bold text-4xl text-white  pb-4 normaltext1'>Trending today</h1>
        <input id="checkbox_toggle" type="checkbox" className="check " onClick={handleClick}/>
<div className="checkbox">
  <label className="slide" htmlFor="checkbox_toggle">
    <label className="toggle" htmlFor="checkbox_toggle"></label>
    <label className="text" htmlFor="checkbox_toggle">movies</label>
    <label className="text" htmlFor="checkbox_toggle">series</label>
  </label>
</div>
        </div>
     {loading ? <Loading/> : 
      <div className='h-auto pb-6  max-lg:h-screen w-[70vw] max-lg:w-full justify-center  flex flex-wrap '>
       
      {api?.map((item)=>(
  <Link href={movies ? `details/${item.id}` : `tv/${item.id}` } key={item.id} className="card  cursor-pointer ">
  <div className="card-inner">
    <div className="card-front">
    {item.backdrop_path ? <Image className='rotate-2 rounded-lg' sizes='auto' priority='auto' fill src={`https://image.tmdb.org/t/p/original${item.backdrop_path || item.poster_path}`} alt='' /> : <div class="loader"></div>}
    
    </div>
    <div className="card-back">
      <p className='normaltext1 '>{movies ? item.title : item.name}</p>
    </div>
  </div>
</Link>
 ))}
      </div>}
      </div>
      <div className='h-[63.5rem] pt-16 w-[30vw] flex flex-col justify-start items-center fixed right-0 overflow-y-hidden max-lg:hidden bg-black'>
        <h1 className='font-bold text-4xl normaltext1'>Trending Artists</h1>
      {artist?.slice(0,5).map((item,index)=>(
         <div key={item.id} className='bg-[#0a1929] my-[0.4rem] rounded-2xl w-[28vw] flex'>
          <Image className='rotate-2 rounded-3xl'   width={50} height={50}  src={`https://image.tmdb.org/t/p/original${item.profile_path}`} alt='' />
          <div className='pl-3'>
          <p  className=' my-2 w-full py-2px-4 normaltext1 ' key={item.id}>{index+1}.  {item.name} ({item.known_for_department})</p>
          
            
              <p className=' normaltext1'>{item.known_for_department} </p>
            
         
          </div>
         </div>
        ))}
      </div>
        
    </div>
   </div>
  )
}
