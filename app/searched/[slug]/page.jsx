'use client'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Page = ({params}) => {
  const [details,setDetails] = useState()
  useEffect(() => {
    const url = `https://api.themoviedb.org/3/search/multi?query=${params.slug}&include_adult=true&language=en-US&Page=1`;

    const headers = {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyN2U1MmVhNGY1ZWYzMTJmYzZiOTczMDZiZTJiMTAxNiIsInN1YiI6IjY1NjJiMGJjMzY3OWExMDk3NTI5MDU1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hIZQCtyFpQbpvj2WfI4A74CsUtVl05xKPNkEpXll3Tw',
      accept: 'application/json',
    };

    const fetchData = async () => {
      try {
        const response = await fetch(url, { headers });
        const data = await response.json();

        setDetails(data.results);
       
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, [params.slug]);
  return (
    <div className='overflow-x-hidden'>
        <Navbar className='absolute  top-0'/>
        <div>
        {
          details?.map(item=>(
            <div key={item.id} className="movie_card" id="bright">
  <div className="info_section">
    <div className="movie_header">
      <img className="locandina" src={`https://image.tmdb.org/t/p/original${item.poster_path}`}/>
      <h1>{item.name || item.title}</h1>
      <h4>{item.first_air_date || item.release_date}</h4>
      <span className="minutes">{item.media_type}</span>
      
    </div>
    <div className="movie_desc">
      <p className="text">
        {item.overview?.slice(0,200)}...<Link className='text-blue-800' href={item.media_type == 'tv' ? `/tv/${item.id}` : `/detail/${item.id}`}>see more</Link>
      </p>
    </div>
   
  </div>
  <div className="blur_back bright_back"></div>
</div>
          ))
        }


  <div className="blur_back ave_back"></div>
    </div>
    </div>
  )
}

export default Page