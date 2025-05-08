'use server';

import { addQuestion, getQuestions, initDatabase } from '@/lib/db';

// Initialize the database (call this during app initialization)
export async function initializeDatabaseAction() {
  await initDatabase();
  return { success: true };
}

// Submit a new question
export async function submitQuestionAction(formData: FormData) {
  try {
    const question = formData.get('question')?.toString();

    if (!question || question.trim() === '') {
      return { success: false, error: 'Question cannot be empty' };
    }

    await addQuestion(question);
    return { success: true };
  } catch (error) {
    console.error('Error submitting question:', error);
    return { success: false, error: 'Failed to submit question' };
  }
}

// Fetch all questions
export async function getQuestionsAction() {
  try {
    const questions = await getQuestions();
    return { success: true, questions };
  } catch (error) {
    console.error('Error fetching questions:', error);
    return { success: false, error: 'Failed to fetch questions', questions: [] };
  }
}

// Check password for authentication
export async function checkPasswordAction(formData: FormData) {
  const password = formData.get('password')?.toString();
  const sitePassword = process.env.SITE_PASS;

  if (!password || password !== sitePassword) {
    return { success: false, error: 'Invalid password' };
  }

  return { success: true, password: sitePassword };
}
