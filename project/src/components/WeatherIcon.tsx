import React from 'react';
import { 
  Cloud, 
  CloudDrizzle, 
  CloudFog, 
  CloudLightning, 
  CloudRain, 
  CloudSnow, 
  Sun, 
  Moon,
  CloudSun,
  CloudMoon,
  Wind,
  Droplets
} from 'lucide-react';

interface WeatherIconProps {
  condition: string;
  isDay: boolean;
  className?: string;
  size?: number;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({ 
  condition, 
  isDay, 
  className = "", 
  size = 24 
}) => {
  // Simplified condition mapping logic
  const getIcon = () => {
    const lowerCondition = condition.toLowerCase();
    
    if (lowerCondition.includes('thunderstorm') || lowerCondition.includes('lightning')) {
      return <CloudLightning size={size} className={`text-warning-400 ${className}`} />;
    } else if (lowerCondition.includes('drizzle')) {
      return <CloudDrizzle size={size} className={`text-primary-300 ${className}`} />;
    } else if (lowerCondition.includes('rain')) {
      return <CloudRain size={size} className={`text-primary-400 ${className}`} />;
    } else if (lowerCondition.includes('snow')) {
      return <CloudSnow size={size} className={`text-gray-100 ${className}`} />;
    } else if (lowerCondition.includes('fog') || lowerCondition.includes('mist')) {
      return <CloudFog size={size} className={`text-gray-400 ${className}`} />;
    } else if (lowerCondition.includes('overcast') || lowerCondition === 'cloudy') {
      return <Cloud size={size} className={`text-gray-400 ${className}`} />;
    } else if (lowerCondition.includes('cloud') || lowerCondition.includes('partly')) {
      return isDay 
        ? <CloudSun size={size} className={`text-warning-400 ${className}`} />
        : <CloudMoon size={size} className={`text-gray-200 ${className}`} />;
    } else if (lowerCondition.includes('clear') || lowerCondition.includes('sunny')) {
      return isDay 
        ? <Sun size={size} className={`text-warning-400 ${className}`} />
        : <Moon size={size} className={`text-gray-200 ${className}`} />;
    } else if (lowerCondition.includes('wind')) {
      return <Wind size={size} className={`text-gray-400 ${className}`} />;
    } else if (lowerCondition.includes('humid')) {
      return <Droplets size={size} className={`text-primary-400 ${className}`} />;
    }
    
    // Default
    return isDay 
      ? <Sun size={size} className={`text-warning-400 ${className}`} />
      : <Moon size={size} className={`text-gray-200 ${className}`} />;
  };

  return (
    <div className="inline-flex items-center justify-center">
      {getIcon()}
    </div>
  );
};