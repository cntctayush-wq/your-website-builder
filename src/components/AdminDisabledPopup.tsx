import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface AdminDisabledPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminDisabledPopup({ isOpen, onClose }: AdminDisabledPopupProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Modal Container - flexbox for proper centering on all devices */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-sm pointer-events-auto"
            >
              <div className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
                {/* Header with icon */}
                <div className="bg-destructive/10 p-5 sm:p-6 flex justify-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-destructive/20 flex items-center justify-center">
                    <AlertTriangle className="w-7 h-7 sm:w-8 sm:h-8 text-destructive" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-5 sm:p-6 text-center space-y-3 sm:space-y-4">
                  <h2 className="text-lg sm:text-xl font-semibold text-foreground">
                    Access Denied
                  </h2>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    The Admin Has Disabled This Service.
                  </p>
                  
                  <Button 
                    onClick={onClose}
                    className="w-full mt-3 sm:mt-4"
                    size="lg"
                  >
                    Ok
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
