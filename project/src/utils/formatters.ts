import { format, parseISO } from 'date-fns';

export const formatDate = (dateString: string, formatStr: string = 'EEEE, MMM d'): string => {
  try {
    const date = parseISO(dateString);
    return format(date, formatStr);
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

export const formatTime = (timeString: string, formatStr: string = 'h:mm a'): string => {
  try {
    // Assuming timeString format is like '2023-07-17 14:00'
    const date = parseISO(timeString);
    return format(date, formatStr);
  } catch (error) {
    console.error('Error formatting time:', error);
    return timeString;
  }
};

export const getWeatherBackground = (condition: string, isDay: boolean): string => {
  // Simplified logic - in a real app, you'd have more conditions and transitions
  const lowerCondition = condition.toLowerCase();
  
  if (lowerCondition.includes('sun') || lowerCondition.includes('clear')) {
    return isDay 
      ? 'bg-gradient-to-br from-blue-400 to-blue-600' 
      : 'bg-gradient-to-br from-blue-950 to-indigo-950';
  } else if (lowerCondition.includes('cloud')) {
    return isDay 
      ? 'bg-gradient-to-br from-blue-300 to-gray-400' 
      : 'bg-gradient-to-br from-gray-800 to-blue-900';
  } else if (lowerCondition.includes('rain') || lowerCondition.includes('drizzle')) {
    return isDay 
      ? 'bg-gradient-to-br from-gray-400 to-blue-500' 
      : 'bg-gradient-to-br from-gray-800 to-blue-800';
  } else if (lowerCondition.includes('snow')) {
    return isDay
      ? 'bg-gradient-to-br from-blue-100 to-gray-300'
      : 'bg-gradient-to-br from-gray-700 to-blue-900';
  } else if (lowerCondition.includes('thunder') || lowerCondition.includes('storm')) {
    return isDay
      ? 'bg-gradient-to-br from-gray-500 to-gray-700'
      : 'bg-gradient-to-br from-gray-900 to-blue-950';
  } else if (lowerCondition.includes('fog') || lowerCondition.includes('mist')) {
    return isDay
      ? 'bg-gradient-to-br from-gray-300 to-gray-400'
      : 'bg-gradient-to-br from-gray-700 to-gray-800';
  } else {
    // Default fallback
    return isDay
      ? 'bg-gradient-to-br from-blue-400 to-blue-600'
      : 'bg-gradient-to-br from-blue-900 to-indigo-950';
  }
};