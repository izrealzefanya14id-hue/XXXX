import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useApp } from '../context';

export default function WhatsAppButton() {
  const { settings } = useApp();

  if (!settings?.whatsapp) return null;

  return (
    <motion.a
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      href={`https://wa.me/${settings.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-[100] w-16 h-16 bg-emerald-500 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-emerald-400 transition-colors group"
    >
      <MessageCircle size={32} />
      <div className="absolute right-full mr-4 bg-white text-gray-900 px-4 py-2 rounded-xl text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Chat with us
      </div>
    </motion.a>
  );
}
