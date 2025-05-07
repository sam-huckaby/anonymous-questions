import { neon } from '@neondatabase/serverless';

// Initialize database with schema if necessary
export async function initDatabase() {
  if (!process.env.DATABASE_URL) {
    console.error('Missing DATABASE_URL environment variable');
    return;
  }

  const sql = neon(process.env.DATABASE_URL);
  
  try {
    // Create questions table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS questions (
        id SERIAL PRIMARY KEY,
        question TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database:', error);
  }
}

// Get all questions from the database
export async function getQuestions() {
  if (!process.env.DATABASE_URL) {
    throw new Error('Missing DATABASE_URL environment variable');
  }

  const sql = neon(process.env.DATABASE_URL);
  
  try {
    // Get all questions, sorted by newest first
    const questions = await sql`
      SELECT * FROM questions 
      ORDER BY created_at DESC
    `;
    return questions;
  } catch (error) {
    console.error('Failed to fetch questions:', error);
    throw error;
  }
}

// Add a new question to the database
export async function addQuestion(question: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Missing DATABASE_URL environment variable');
  }

  const sql = neon(process.env.DATABASE_URL);
  
  try {
    // Insert the question
    const result = await sql`
      INSERT INTO questions (question) 
      VALUES (${question})
      RETURNING id, question, created_at
    `;
    return result[0];
  } catch (error) {
    console.error('Failed to add question:', error);
    throw error;
  }
}