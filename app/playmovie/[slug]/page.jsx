'use client'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Page = ({ params }) => {
  const [api, setApi] = useState([])
  useEffect(() => {

    const url = `https://api.themoviedb.org/3/movie/${params.slug}/recommendations`

    const headers = {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyN2U1MmVhNGY1ZWYzMTJmYzZiOTczMDZiZTJiMTAxNiIsInN1YiI6IjY1NjJiMGJjMzY3OWExMDk3NTI5MDU1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hIZQCtyFpQbpvj2WfI4A74CsUtVl05xKPNkEpXll3Tw',
      accept: 'application/json',
    };


    const fetchData = async () => {
      try {
        const response = await fetch(url, { headers });
        const data = await response.json();

        setApi(data.results)



      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();

  }, [api, params.slug]);
  return (
    <div className='overflow-x-hidden ' >
      <Navbar />
      <div className='h-screen w-screen flex '>
        <div>
          <iframe
            src={`https://vidsrc.xyz/embed/movie/${params.slug}`}
            className="h-[62vh] w-[50vw] relative top-20 ml-14 overflow-hidden max-md:w-[80vw] max-sm:w-[80vw] max-lg:w-[80vw]"
            height="auto"
            allowFullScreen
            allow="encrypted-media"
          ></iframe>
        </div>
        <div className='h-full w-96 mr-3 mt-3 right-0 absolute max-sm:hidden max-md:hidden max-lg:hidden  '>
          {api?.map((item) => (
            <div key={item.id} className='flex bg-[#0a1929] justify-start rounded-xl mt-3 '>
              <img src={`https://image.tmdb.org/t/p/original${item.poster_path}`} className='locandina h-20 w-20' alt="" />
              <Link
                href={`/details/${item.id}`}
                key={item.id}
                className='h-10 w-full mt-2 rounded-xl  normaltext1 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none'
              >

                {item.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Page