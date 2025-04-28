import React from 'react';
import { motion } from 'framer-motion';
import { WeatherIcon } from './WeatherIcon';
import { ForecastDay } from '../types/weather';
import { formatDate } from '../utils/formatters';

interface WeatherCardProps {
  forecast: ForecastDay;
  index: number;
  isDay: boolean;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ forecast, index, isDay }) => {
  const { date, day } = forecast;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index, duration: 0.4 }}
      className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-white flex flex-col items-center transition-all hover:bg-white/20"
      whileHover={{ y: -5 }}
    >
      <div className="font-medium mb-2">{formatDate(date, 'EEE, MMM d')}</div>
      
      <WeatherIcon 
        condition={day.condition.text} 
        isDay={isDay} 
        size={40} 
        className="my-2" 
      />
      
      <div className="text-lg font-semibold">{Math.round(day.maxtemp_c)}°</div>
      <div className="text-sm text-white/70">{Math.round(day.mintemp_c)}°</div>
      
      <div className="mt-2 text-xs text-center text-white/80 line-clamp-1">
        {day.condition.text}
      </div>
      
      <div className="mt-3 text-xs text-white/70 flex items-center gap-4">
        <div>Rain: {day.daily_chance_of_rain}%</div>
        <div>Humidity: {day.avghumidity}%</div>
      </div>
    </motion.div>
  );
};