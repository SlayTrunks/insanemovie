'use client'
import Loading from '@/components/Loading'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaPlayCircle } from 'react-icons/fa'

const Page = ({params}) => {
    const [details,setDetails] = useState([])
    const [loading,setLoading] = useState(true)
    useEffect(() => {
    
        const url = `https://api.themoviedb.org/3/movie/${params.slug}`
      
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
        
      }, [params.slug]);
  return (
    <div>{ loading ? <Loading/> : <div className="movie-card overflow-x-hidden">
  
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
        <div className="font-bold text-3xl normaltext">{details.title}</div>
        <div className='flex justify-around'>
        <span >Released:  {details.release_date}</span>
        <span>Status:  {details.status}</span>
        </div>

  
          <p>{details.overview.slice(0,400)} </p>
          
          <Link href={`/playmovie/${details.id}`} title='play' className='text-4xl'><FaPlayCircle />
</Link>
          
          
          
        </div> 
      </div> 
      
     
    </div> 
  </div>}</div>
  )
}

export default Page