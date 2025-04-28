/*
  # Weather Cache Schema

  1. New Tables
    - `weather_cache`
      - `id` (uuid, primary key)
      - `location` (text)
      - `data` (jsonb)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `weather_cache` table
    - Add policy for public read access
*/

CREATE TABLE IF NOT EXISTS weather_cache (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  location text NOT NULL,
  data jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE weather_cache ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access"
  ON weather_cache
  FOR SELECT
  TO public
  USING (true);

CREATE INDEX IF NOT EXISTS weather_cache_location_idx ON weather_cache (location);