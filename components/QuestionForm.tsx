'use client';

import { useState, useTransition } from 'react';
import { motion } from 'framer-motion';
import { SendIcon } from 'lucide-react';
import { LoadingDots } from '@/components/ui/Loading';
import { submitQuestionAction } from '@/lib/actions';
import { setAnsweredCookie } from '@/lib/auth';

export default function QuestionForm({ siteQuestion, sitePassword }: { siteQuestion: string, sitePassword: string }) {
  const [question, setQuestion] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!question.trim()) {
      setError('Please enter a question');
      return;
    }

    startTransition(async () => {
      try {
        // Create form data
        const formData = new FormData();
        formData.append('question', question);
        
        // Submit the question
        const result = await submitQuestionAction(formData);
        
        if (result.success) {
          // Mark user as having answered a question
          setAnsweredCookie(sitePassword);
          // Show success message and reset form
          setSuccess(true);
          setQuestion('');
          
          // Reset success message after 3 seconds
          setTimeout(() => {
            setSuccess(false);
          }, 3000);
          
          // Reload page to show questions
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          setError(result.error || 'Failed to submit question');
        }
      } catch (err) {
        setError('An error occurred. Please try again.');
      }
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-xl mx-auto mb-8"
    >
      <div className="bg-card rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label 
              htmlFor="question" 
              className="block text-lg font-medium text-card-foreground"
            >
              {siteQuestion}
            </label>
            <textarea
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={4}
              className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Type your question here..."
              disabled={isPending}
            />
          </div>
          
          {error && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-destructive"
            >
              {error}
            </motion.p>
          )}
          
          {success && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-green-600 dark:text-green-400"
            >
              Question submitted successfully!
            </motion.p>
          )}
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isPending}
              className="flex items-center gap-2 h-10 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:pointer-events-none transition-colors"
            >
              {isPending ? <LoadingDots /> : (
                <>
                  <span>Submit Question</span>
                  <SendIcon className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}