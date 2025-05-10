import { motion } from 'framer-motion';
import { formatDistance } from 'date-fns';
import { useEffect, useRef, useState } from 'react';

interface ResponseBlockProps {
  created_at: string;
  delay: number;
  id: number;
  question: string;
};

export const ResponseBlock = ({ created_at, delay, id, question }: ResponseBlockProps) => {
  const [collapsed, setCollapsed] = useState(true);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  // Check if text overflows on mount or text change
  useEffect(() => {
    const element = textRef.current;
    if (element) {
      setIsOverflowing(element.scrollHeight > element.clientHeight);
    }
  }, [question]);

  return <motion.div
    key={id}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: delay * 0.1 }}
    className={`bg-card rounded-lg shadow-sm p-4 border border-border/50`}
  >
    <p ref={textRef} className={`text-card-foreground mb-2 ${collapsed ? "max-h-[100px] overflow-hidden" : ""}`}>{question}</p>
    <div className='flex flex-row items-center justify-between'>
      <p className="text-xs text-muted-foreground">
        {formatDistance(new Date(created_at), new Date(), { addSuffix: true })}
      </p>
      {
        isOverflowing && <div>
          {collapsed ? (<div onClick={() => setCollapsed(false)}>show more</div>) : (<div onClick={() => setCollapsed(true)}>show less</div>)}
        </div>
      }
    </div>
  </motion.div >
};
