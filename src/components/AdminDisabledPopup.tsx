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
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-md"
          >
            <div className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
              {/* Header with icon */}
              <div className="bg-destructive/10 p-6 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-destructive/20 flex items-center justify-center">
                  <AlertTriangle className="w-8 h-8 text-destructive" />
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6 text-center space-y-4">
                <h2 className="text-xl font-semibold text-foreground">
                  Access Denied
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed">
                  The Admin Has Disabled This Service.
                </p>
                
                <Button 
                  onClick={onClose}
                  className="w-full sm:w-auto min-w-[120px] mt-4"
                  size="lg"
                >
                  Ok
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
