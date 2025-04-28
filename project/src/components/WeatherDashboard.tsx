import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useWeather } from '../hooks/useWeather';
import { SearchBar } from './SearchBar';
import { CurrentWeather } from './CurrentWeather';
import { WeatherForecast } from './WeatherForecast';
import { LoadingState } from './LoadingState';
import { ErrorState } from './ErrorState';
import { getWeatherBackground } from '../utils/formatters';

export const WeatherDashboard: React.FC = () => {
  const { weatherData, loading, error, fetchWeather } = useWeather();
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = (location: string) => {
    fetchWeather(location);
    setSearchPerformed(true);
  };

  // Determine background based on current weather conditions
  const backgroundClass = weatherData 
    ? getWeatherBackground(weatherData.current.condition.text, !!weatherData.location.is_day)
    : 'bg-gradient-to-br from-blue-600 to-blue-800';

  const containerClasses = `min-h-screen ${backgroundClass} transition-colors duration-1000 p-4 md:p-8`;

  return (
    <div className={containerClasses}>
      <div className="max-w-6xl mx-auto">
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Weather AI
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
            Get accurate weather forecasts and beautiful visualizations for any location
          </p>
          
          <SearchBar onSearch={handleSearch} />
        </motion.header>

        <main>
          {loading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState 
              message={error} 
              onRetry={() => searchPerformed ? fetchWeather('London') : null} 
            />
          ) : weatherData && (
            <>
              <CurrentWeather 
                current={weatherData.current} 
                location={weatherData.location} 
              />
              
              <WeatherForecast 
                forecast={weatherData.forecast.forecastday} 
                isDay={!!weatherData.location.is_day}
              />
            </>
          )}
        </main>

        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center text-white/60 text-sm"
        >
          <p>Weather data provided by WeatherAPI.com</p>
        </motion.footer>
      </div>
    </div>
  );
};