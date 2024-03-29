import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import './SearchPage.css';
import { useDebounce } from '../../hooks/useDebounce';

export default function SearchPage() {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  const debouncedSearchTerm = useDebounce(query.get('q'), 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchSearchMovie(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const fetchSearchMovie = async (searchTerm) => {
    try {
      const request = await axios.get(`/search/multi?include_adult=false&query=${searchTerm}`);
      setSearchResults(request.data.results);
    } catch (error) {
      console.log('error', error);
    }
  };

  const renderSearchResults = () => {
    return searchResults.length > 0 ? (
      <section className='search-container'>
        {searchResults.map((movie) => {
          if (movie.backdrop_path !== null && movie.media_type !== 'person') {
            const movieImageUrl = 'https://image.tmdb.org/t/p/w500' + movie.backdrop_path;
            return (
              <div key={movie.id} className='movie'>
                <div
                  onClick={() => navigate(`/${movie.id}`)}
                  onKeyDown={() => navigate(`/${movie.id}`)}
                  role='presentation'
                  className='movie__column-poster'
                >
                  <img src={movieImageUrl} alt='movie' className='movie__poster' />
                </div>
              </div>
            );
          }
        })}
      </section>
    ) : (
      <section>
        <div className='no-results'>
          <p>찾고자하는 검색어 &quot;{debouncedSearchTerm}&quot;에 대한 결과가 없습니다.</p>
        </div>
      </section>
    );
  };
  return renderSearchResults();
}
