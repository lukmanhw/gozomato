import React, { useState, useEffect } from 'react';
import { getCityDetails, searchRestaurants } from './utils/repository';
import CitySuggestions from './components/city-suggestions';
import Restaurants from './components/restaurants';

const ApiCall = () => {
  const cityQuery = 'jakarta';
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    const searchRestaurantsFromCity = async () => {
      try {
        const cities = await getCityDetails(cityQuery);
        setCitySuggestions(cities);

        if (cities.length > 0) {
          const restaurants = await searchRestaurants(cities[0].id);
          setRestaurants(restaurants);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    searchRestaurantsFromCity();
  }, []);

  return (
    <div>
      {error && <div>Error: {error}</div>}
      <div>
        City suggestions with query {cityQuery} are:
        <div>
          {citySuggestions.map(e => (
            <CitySuggestions key={e.id} data={e} />
          ))}
        </div>
      </div>
      {citySuggestions.length > 0 ? (
        <div>
          Restaurants with city entity id 74 are:
          <div>
            {restaurants.map(e => (
              <Restaurants key={e.id} data={e} />
            ))}
          </div>
        </div>
      ) : (
        <div>No cities found</div>
      )}
    </div>
  );
};

export default ApiCall;
