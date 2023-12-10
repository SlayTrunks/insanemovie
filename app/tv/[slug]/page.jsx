'use client'
import Loading from '@/components/Loading'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaPlayCircle } from "react-icons/fa";

const Page = ({params}) => {
    const [details,setDetails] = useState([])
    const [loading,setLoading] = useState(true)
    useEffect(() => {
    
        const url = `https://api.themoviedb.org/3/tv/${params.slug}`
      
        const headers = {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyN2U1MmVhNGY1ZWYzMTJmYzZiOTczMDZiZTJiMTAxNiIsInN1YiI6IjY1NjJiMGJjMzY3OWExMDk3NTI5MDU1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hIZQCtyFpQbpvj2WfI4A74CsUtVl05xKPNkEpXll3Tw',
          accept: 'application/json',
        };
      
        
        const fetchData = async () => {
          try {
            const response = await fetch(url, { headers });
            const data = await response.json();
          
            setDetails(data)
            setLoading(!loading)
            
            
            
          } catch (error) {
            console.error('Error fetching data:', error.message);
          }
        };
      
        fetchData();
        
      }, []);
  return (
    <div className='overflow-x-hidden'>
      <Navbar/>
      { loading ? <Loading/> : <div className="movie-card">
  
    <div className="container">
      
      <img  src={`https://image.tmdb.org/t/p/original${details.poster_path}`} alt="cover" className="cover" />
          
      <div className="hero">
              <img  src={`https://image.tmdb.org/t/p/original${details.backdrop_path}`} alt="" />
        <div className="details">
        
             
          
          
          
          
          
        </div> 
        
      </div> 
      
      <div className="description">
        
        <div className="column1">
          {details.genres && details.genres.map(item=>(
            <div key={item.id}>
            <span key={item.id} className="tag">{item.name}</span>
            
            </div>
            
          ))}
        </div> 
        
        <div className="column2">
        <div className="font-bold text-3xl normaltext1">{details.name}</div>
        <div className='flex justify-between gap-2 text-[14px]'>
        <span >Released:  {details.seasons[0].air_date}</span>
        <span>Status:  {details.status}</span>
        <span>Total Season{details.number_of_seasons > 1 && "s"}:  {details.number_of_seasons} ({details.number_of_episodes}eps)</span>
        </div>

  
          <p>{details.overview.slice(0,400)} </p>
          
         <Link href={`/playtv/${details.id}`} title='play' className='text-4xl'><FaPlayCircle />
</Link>
          
          
          
        </div> 
      </div> 
      
     
    </div> 
  </div>}</div>
  )
}

export default Page