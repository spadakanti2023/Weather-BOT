import { useState, useEffect } from 'react';
import { WeatherData } from '../types/weather';
import { fetchWeatherData, getCurrentLocation } from '../services/weatherService';

interface UseWeatherReturn {
  weatherData: WeatherData | null;
  loading: boolean;
  error: string | null;
  fetchWeather: (location: string) => Promise<void>;
}

export const useWeather = (): UseWeatherReturn => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (location: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchWeatherData(location);
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initWeather = async () => {
      try {
        const defaultLocation = await getCurrentLocation();
        await fetchWeather(defaultLocation);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to get location');
        setLoading(false);
      }
    };

    initWeather();
  }, []);

  return { weatherData, loading, error, fetchWeather };
};