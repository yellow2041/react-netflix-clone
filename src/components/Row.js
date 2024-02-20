import axios from '../api/axios';
import React, { useEffect, useState } from 'react';
import './Row.css';
import MovieModal from './MovieModal';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function Row({ isLargeRow, fetchUrl, title, id }) {
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});
  useEffect(() => {
    fetchMovieData();
  }, []);

  const fetchMovieData = async () => {
    const request = await axios.get(fetchUrl);
    setMovies(request.data.results);
    console.log(request.data);
  };

  const handleClick = (movie) => {
    setMovieSelected(movie);
    setModalOpen(true);
  };
  return (
    <section className='row'>
      <h2>{title}</h2>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        breakpoints={{
          1378: { slidePerView: 6, slidesPerGroup: 6 },
          998: { slidesPerView: 5, slidesPerGroup: 5 },
          625: { slidesPerView: 4, slidesPerGroup: 4 },
          0: { slidesPerView: 3, slidesPerGroup: 3 },
        }}
      >
        <div id={id} className='row__posters'>
          {movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <img
                className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
                style={{ padding: '25px 0' }}
                alt={movie.name}
                src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                onClick={() => handleClick(movie)}
                onKeyDown={() => handleClick(movie)}
                role='presentation'
              />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>

      {modalOpen && <MovieModal {...movieSelected} setModalOpen={setModalOpen} />}
    </section>
  );
}
