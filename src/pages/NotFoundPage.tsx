import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Ghost } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className='h-full bg-background text-foreground flex flex-col items-center justify-center text-center'>
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className='flex flex-col items-center mb-6'
      >
        <Ghost className='w-20 h-20 text-muted-foreground mb-4 animate-bounce' />
        <h1 className='text-5xl font-heading font-bold mb-4'>404</h1>
        <p className='text-3xl text-muted-foreground font-heading mb-2'>
          Page not found
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Link
          to='/'
          className='px-6 py-4 text-white rounded-full bg-gray-700 hover:bg-gray-800/80 transition'
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
