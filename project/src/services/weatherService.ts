import { WeatherData } from '../types/weather';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const fetchWeatherData = async (location: string): Promise<WeatherData> => {
  try {
    // First try to get cached data
    const { data: cachedData, error: cacheError } = await supabase
      .from('weather_cache')
      .select('data, updated_at')
      .eq('location', location.toLowerCase())
      .maybeSingle();

    if (cacheError) {
      console.error('Error fetching cached data:', cacheError);
    }

    // Check if we have fresh cached data (less than 30 minutes old)
    const now = new Date();
    const cacheTime = cachedData?.updated_at ? new Date(cachedData.updated_at) : null;
    const cacheIsValid = cacheTime && (now.getTime() - cacheTime.getTime() < 30 * 60 * 1000);

    if (cachedData?.data && cacheIsValid) {
      return cachedData.data as WeatherData;
    }

    // Fetch from the weather API through our Edge Function
    const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/weather`;
    const response = await fetch(
      `${apiUrl}?location=${encodeURIComponent(location)}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Weather API responded with status ${response.status}`);
    }

    const weatherData = await response.json();

    // Cache the new data
    const { error: upsertError } = await supabase
      .from('weather_cache')
      .upsert({
        location: location.toLowerCase(),
        data: weatherData,
        updated_at: new Date().toISOString(),
      });

    if (upsertError) {
      console.error('Error caching weather data:', upsertError);
    }

    return weatherData as WeatherData;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export const getCurrentLocation = (): Promise<string> => {
  return new Promise((resolve) => {
    // Default to London for demo purposes
    resolve('London');
  });
};