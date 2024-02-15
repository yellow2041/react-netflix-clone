import axios from '../api/axios';
import React, { useEffect, useState } from 'react';
import './Row.css';

export default function Row({ isLargeRow, fetchUrl, title, id }) {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetchMovieData();
  }, []);

  const fetchMovieData = async () => {
    const request = await axios.get(fetchUrl);
    setMovies(request.data.results);
  };

  const handleScroll = (isRight) => {
    const move = isRight ? window.innerWidth - 80 : 80 - window.innerWidth;
    document.getElementById(id).scrollLeft += move;
  };
  return (
    <section className='row'>
      <h2>{title}</h2>
      <div className='slider'>
        <div className='slider__arrow-left'>
          <span
            className='arrow'
            onClick={() => handleScroll(false)}
            onKeyDown={() => handleScroll(false)}
            role='presentation'
          >
            {'<'}
          </span>
        </div>

        <div id={id} className='row__posters'>
          {movies.map((movie) => (
            <img
              key={movie.id}
              className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
              alt={movie.name}
              src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
            />
          ))}
        </div>
        <div className='slider__arrow-right'>
          <span
            className='arrow'
            onClick={() => handleScroll(true)}
            onKeyDown={() => handleScroll(true)}
            role='presentation'
          >
            {'>'}
          </span>
        </div>
      </div>
    </section>
  );
}
