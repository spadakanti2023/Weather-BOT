import React from 'react';
import { motion } from 'framer-motion';
import { WeatherCard } from './WeatherCard';
import { ForecastDay } from '../types/weather';

interface WeatherForecastProps {
  forecast: ForecastDay[];
  isDay: boolean;
}

export const WeatherForecast: React.FC<WeatherForecastProps> = ({ forecast, isDay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full mt-8"
    >
      <h2 className="text-2xl font-semibold text-white mb-4">7-Day Forecast</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
        {forecast.map((day, index) => (
          <WeatherCard 
            key={day.date}
            forecast={day}
            index={index}
            isDay={isDay}
          />
        ))}
      </div>
    </motion.div>
  );
};