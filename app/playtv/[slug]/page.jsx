'use client'
import Navbar from '@/components/Navbar';
import React, { useEffect, useState } from 'react';

const Page = ({ params }) => {
  const [details, setDetails] = useState([]);
  const [season, setSeason] = useState(1);

  const [selectedOption, setSelectedOption] = useState(1);
  const [eps, setEps] = useState(1)
  useEffect(() => {
    const url = `https://api.themoviedb.org/3/tv/${params.slug}`;

    const headers = {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyN2U1MmVhNGY1ZWYzMTJmYzZiOTczMDZiZTJiMTAxNiIsInN1YiI6IjY1NjJiMGJjMzY3OWExMDk3NTI5MDU1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hIZQCtyFpQbpvj2WfI4A74CsUtVl05xKPNkEpXll3Tw',
      accept: 'application/json',
    };

    const fetchData = async () => {
      try {
        const response = await fetch(url, { headers });
        const data = await response.json();

        setDetails(data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, [params.slug]);
  useEffect(() => {
    const url = `https://api.themoviedb.org/3/tv/${params.slug}`;

    const headers = {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyN2U1MmVhNGY1ZWYzMTJmYzZiOTczMDZiZTJiMTAxNiIsInN1YiI6IjY1NjJiMGJjMzY3OWExMDk3NTI5MDU1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hIZQCtyFpQbpvj2WfI4A74CsUtVl05xKPNkEpXll3Tw',
      accept: 'application/json',
    };

    const fetchData = async () => {
      try {
        const response = await fetch(url, { headers });
        const data = await response.json();

        setEps(data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, [params.slug]);

  const handleChange = (event) => {
    const selectedId = parseInt(event.target.value, 10);
    setSelectedOption(selectedId);
    setSeason(selectedId);
  };




  return (
    <div className="bg-black text-white h-screen w-screen ">
      <Navbar />
      <div className='flex'>
        <iframe
          src={`https://vidsrc.xyz/embed/tv/${params.slug}`}
          className="h-[62vh] w-[50vw] ml-24 absolute top-20 overflow-hidden"
          height="auto"
          allowFullScreen
          allow="encrypted-media"
        ></iframe>
      </div>
    </div>
  );
};

export default Page;

