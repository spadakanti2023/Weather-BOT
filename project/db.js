import postgres from 'postgres'

// Using environment variables for database connection
const sql = postgres(process.env.SUPABASE_DB_URL)

export default sql