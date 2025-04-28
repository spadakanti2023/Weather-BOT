import React from 'react';
import { motion } from 'framer-motion';
import { WeatherIcon } from './WeatherIcon';
import { CurrentWeather as CurrentWeatherType, Location } from '../types/weather';
import { Wind, Droplets, Thermometer, Waves } from 'lucide-react';

interface CurrentWeatherProps {
  current: CurrentWeatherType;
  location: Location;
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({ current, location }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full rounded-3xl overflow-hidden backdrop-blur-md bg-white/10 text-white shadow-lg"
    >
      <div className="p-8 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
        {/* Location and temperature */}
        <div className="text-center md:text-left">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mb-1"
          >
            {location.name}
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/80 mb-6"
          >
            {location.country}
          </motion.p>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center md:justify-start gap-3"
          >
            <WeatherIcon 
              condition={current.condition.text} 
              isDay={!!location.is_day} 
              size={72}
              className="drop-shadow-lg"
            />
            <div className="text-left">
              <div className="text-5xl md:text-6xl font-bold">{Math.round(current.temp_c)}°</div>
              <div className="text-lg text-white/80">{current.condition.text}</div>
            </div>
          </motion.div>
        </div>

        {/* Weather details grid */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 gap-4 md:gap-6 w-full max-w-xs"
        >
          <div className="bg-white/10 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2 text-white/80">
              <Thermometer size={18} />
              <span>Feels like</span>
            </div>
            <div className="text-2xl font-semibold">{Math.round(current.feelslike_c)}°</div>
          </div>
          
          <div className="bg-white/10 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2 text-white/80">
              <Wind size={18} />
              <span>Wind</span>
            </div>
            <div className="text-2xl font-semibold">{Math.round(current.wind_kph)} km/h</div>
          </div>
          
          <div className="bg-white/10 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2 text-white/80">
              <Droplets size={18} />
              <span>Humidity</span>
            </div>
            <div className="text-2xl font-semibold">{current.humidity}%</div>
          </div>
          
          <div className="bg-white/10 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2 text-white/80">
              <Waves size={18} />
              <span>Pressure</span>
            </div>
            <div className="text-2xl font-semibold">{Math.round(current.pressure_mb)} mb</div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};