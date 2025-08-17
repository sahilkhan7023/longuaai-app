import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff, Wifi } from 'lucide-react';

const OfflineIndicator = ({ isOnline }) => {
  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
        >
          <div className="glass-card px-4 py-2 rounded-full shadow-lg">
            <div className="flex items-center space-x-2 text-sm">
              <WifiOff className="w-4 h-4 text-red-500" />
              <span className="text-muted-foreground">You're offline</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OfflineIndicator;

