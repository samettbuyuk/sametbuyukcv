import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { LogIn } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function Login() {
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bento-card max-w-md w-full p-10 bg-white text-center relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-16 -mt-16" />
        
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-8 shadow-xl shadow-primary/20">
          CV
        </div>

        <h1 className="text-3xl font-bold text-slate-800 tracking-tighter mb-2">Hoş Geldiniz</h1>
        <p className="text-slate-500 mb-10 font-medium">Lütfen yönetici olarak giriş yapın.</p>

        <button
          onClick={handleLogin}
          className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-center gap-4 hover:border-primary hover:bg-indigo-50 transition-all font-bold text-slate-700 active:scale-95 group"
        >
          <div className="w-6 h-6 bg-slate-50 rounded-lg flex items-center justify-center group-hover:bg-white transition-colors">
            <LogIn className="w-4 h-4 text-slate-400 group-hover:text-primary" />
          </div>
          Google ile Giriş Yap
        </button>

        <div className="mt-6">
          <Link 
            to="/" 
            className="inline-block text-sm font-bold text-slate-400 hover:text-primary transition-colors uppercase tracking-widest"
          >
            View My CV
          </Link>
        </div>

        <div className="mt-10 pt-10 border-t border-slate-50">
          <Link to="/" className="text-sm font-bold text-primary hover:underline">
            ← SİTEYE GERİ DÖN
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
