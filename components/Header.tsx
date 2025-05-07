import { MessageCircleIcon } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full py-6 mb-4 border-b border-border/50">
      <div className="container flex justify-center items-center">
        <div className="flex items-center gap-2">
          <MessageCircleIcon className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold tracking-tight">Free Questions</h1>
        </div>
      </div>
    </header>
  );
}