'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquareIcon, LockIcon } from 'lucide-react';
import { getQuestionsAction } from '@/lib/actions';
import { LoadingSpinner } from '@/components/ui/Loading';
import { ResponseBlock } from './ResponseBlock';

type Question = {
  id: number;
  question: string;
  created_at: string;
};

export default function QuestionsList({ hasAnswered }: { hasAnswered: boolean }) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuestions = async () => {
      if (hasAnswered) {
        try {
          setIsLoading(true);
          const result = await getQuestionsAction();

          if (result.success) {
            setQuestions(result.questions as Question[] || []);
          } else {
            setError(result.error || 'Failed to load questions');
          }
        } catch (err) {
          setError('An error occurred while fetching questions');
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, [hasAnswered]);

  if (!hasAnswered) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.9 }}
        className="w-full max-w-xl mx-auto bg-card/50 backdrop-blur-sm rounded-lg shadow-md p-6 border border-border/50"
      >
        <div className="flex flex-col items-center justify-center text-center space-y-4 py-8">
          <div className="bg-muted/50 p-3 rounded-full">
            <LockIcon className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold">Questions are hidden</h3>
          <p className="text-muted-foreground max-w-md">
            Submit your own question first to unlock and view questions from other people.
          </p>
        </div>
      </motion.div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full max-w-xl mx-auto flex justify-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-xl mx-auto bg-card rounded-lg shadow-md p-6">
        <p className="text-destructive text-center">{error}</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="w-full max-w-xl mx-auto bg-card rounded-lg shadow-md p-6">
        <div className="flex flex-col items-center justify-center text-center space-y-4 py-8">
          <MessageSquareIcon className="h-12 w-12 text-muted-foreground/50" />
          <h3 className="text-xl font-semibold">No questions yet</h3>
          <p className="text-muted-foreground">
            Be the first to ask a question!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Recent Questions</h2>

      <div className="space-y-4">
        <AnimatePresence>
          {questions.map(({ id, question, created_at }, index) => (
            <ResponseBlock key={id} id={id} delay={index} question={question} created_at={created_at} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
