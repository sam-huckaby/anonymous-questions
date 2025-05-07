'use client';

import { useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import QuestionForm from '@/components/QuestionForm';
import QuestionsList from '@/components/QuestionsList';
import { FullPageLoader } from '@/components/ui/Loading';

export default function ClientPage({ 
  sitePassword, 
  siteQuestion 
}: { 
  sitePassword: string;
  siteQuestion: string;
}) {
  const { isAuth, hasUserAnswered } = useAuth(sitePassword);
  
  // If auth state is still loading
  if (isAuth === null) {
    return <FullPageLoader />;
  }
  
  return (
    <div className="flex flex-col gap-8 py-4">
      <QuestionForm 
        siteQuestion={siteQuestion} 
        sitePassword={sitePassword} 
      />
      
      <QuestionsList 
        hasAnswered={!!hasUserAnswered} 
      />
    </div>
  );
}