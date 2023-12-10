'use client'
import Navbar from '@/components/Navbar';
import React, { useEffect, useState } from 'react';

const Page = ({ params }) => {
  const [details, setDetails] = useState([]);
  const [season, setSeason] = useState(1);
  const [episode, setEpisode] = useState(1);
  const [selectedOption, setSelectedOption] = useState(1);
  const [eps,setEps] = useState(1)
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
    const url = `https://api.themoviedb.org/3/tv/${params.slug}/season/${season}`;

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
    localStorage.setItem(`lastPlayedSeason_${params.slug}`, selectedId);
  };

  const handleEpisodeChange = (episodeNumber) => {
    setEpisode(episodeNumber);
    localStorage.setItem(`lastPlayedEpisode_${params.slug}`, episodeNumber);
  };

  useEffect(() => {
    const lastPlayedSeason = localStorage.getItem(`lastPlayedSeason_${params.slug}`);
    const lastPlayedEpisode = localStorage.getItem(`lastPlayedEpisode_${params.slug}`);
    if (lastPlayedSeason) {
      setSeason(parseInt(lastPlayedSeason, 10));
      setSelectedOption(parseInt(lastPlayedSeason, 10));
    }
    if (lastPlayedEpisode) {
      setEpisode(parseInt(lastPlayedEpisode, 10));
    }
  }, [params.slug]);
  return (
    <div className="bg-black text-white h-screen w-screen ">
    <Navbar />
    <div className='flex'>
      <iframe
        src={`https://vidsrc.to/embed/tv/${params.slug}/${season}/${episode}`}
        className="h-[62vh] w-[50vw] ml-24 absolute top-20 overflow-hidden"
        height="auto"
        allowFullScreen
        allow="encrypted-media"
      ></iframe>

      <div className="inline-block text-white relative top-[30rem] ml-14">
        <select
          id="dropdown"
          onChange={handleChange}
          value={selectedOption}
          className="block appearance-none bg-black border border-black text-white py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-black origin-bottom"
        >
          {details &&
            details.seasons?.map((option, i) => (
              <option
                className="text-black"
                key={option.id}
                value={i + 1}
              >
                {option.name}
              </option>
            ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M0 0h20v20H0z" fill="none" />
            <path
              d="M7 7l3-3 3 3M7 13l3 3 3-3"
              stroke="#000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className='absolute right-3 w-96 top-20  overflow-x-hidden  h-full'>
        {eps?.episodes?.map((item, i) => (
          <button
            key={item.id}
            onClick={() => handleEpisodeChange(item.episode_number)}
            className='h-10 w-full mt-2 rounded-xl bg-[#0a1929] transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none'
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  </div>
  );
};

export default Page;

