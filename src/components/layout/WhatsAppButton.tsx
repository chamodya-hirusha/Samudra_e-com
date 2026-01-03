import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const WHATSAPP_NUMBER = "+94722890068";
const DEFAULT_MESSAGE = "Hello! I'm interested in your Buddha statues and sculptures.";

interface WhatsAppButtonProps {
  message?: string;
  productName?: string;
}

export function WhatsAppButton({ message, productName }: WhatsAppButtonProps) {
  const whatsappMessage = message || (productName 
    ? `Hello! I'm interested in the ${productName}. Can you provide more details?`
    : DEFAULT_MESSAGE
  );

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200 }}
      whileHover={{ rotate: [0, -10, 10, -10, 0] }}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-8 h-8 text-white" fill="white" />
      <motion.span
        className="absolute -top-2 -right-2 w-5 h-5 bg-destructive rounded-full flex items-center justify-center"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="text-xs text-white font-bold">1</span>
      </motion.span>
    </motion.a>
  );
}
