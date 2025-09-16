'use client';

import Link from 'next/link';
import { SignOut } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import Logo from '@/components/icons/Logo';
import { usePathname, useRouter } from 'next/navigation';
import { getRedirectMethod } from '@/utils/auth-helpers/settings';
import { motion } from 'framer-motion';

interface NavlinksProps {
  user?: any;
}

export default function Navlinks({ user }: NavlinksProps) {
  const router = getRedirectMethod() === 'client' ? useRouter() : null;
  const pathname = usePathname();

  return (
    <div className="relative flex flex-row justify-between items-center py-3 w-full">
      {/* Logo Section */}
      <motion.div 
        className="flex items-center"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link href="/" className="flex items-center space-x-3 group" aria-label="Logo">
          <div className="relative">
            <Logo />
            <div className="absolute inset-0 bg-gradient-to-r from-db-cyan/20 to-blue-500/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-white to-db-cyan bg-clip-text text-transparent">
            Proofly
          </span>
        </Link>
      </motion.div>

      {/* Navigation Links */}
      <motion.nav 
        className="hidden lg:flex items-center space-x-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Link 
          href="/" 
          className="relative px-3 py-2 text-sm font-medium text-white/80 hover:text-white transition-all duration-300 group"
        >
          <span className="relative z-10">Home</span>
          <div className="absolute inset-0 bg-gradient-to-r from-db-cyan/10 to-blue-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300" />
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-db-cyan to-blue-500 group-hover:w-full transition-all duration-300" />
        </Link>

        <Link 
          href="/developer" 
          className="relative px-3 py-2 text-sm font-medium text-white/80 hover:text-white transition-all duration-300 group"
        >
          <span className="relative z-10">For Developers</span>
          <div className="absolute inset-0 bg-gradient-to-r from-db-cyan/10 to-blue-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300" />
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-db-cyan to-blue-500 group-hover:w-full transition-all duration-300" />
        </Link>

        <Link 
          href="/company" 
          className="relative px-3 py-2 text-sm font-medium text-white/80 hover:text-white transition-all duration-300 group"
        >
          <span className="relative z-10">For Companies</span>
          <div className="absolute inset-0 bg-gradient-to-r from-db-cyan/10 to-blue-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300" />
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-db-cyan to-blue-500 group-hover:w-full transition-all duration-300" />
        </Link>

        <Link 
          href="/developer?tab=events" 
          className="relative px-3 py-2 text-sm font-medium text-white/80 hover:text-white transition-all duration-300 group"
        >
          <span className="relative z-10">Events</span>
          <div className="absolute inset-0 bg-gradient-to-r from-db-cyan/10 to-blue-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300" />
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-db-cyan to-blue-500 group-hover:w-full transition-all duration-300" />
        </Link>

        <Link 
          href="/community" 
          className="relative px-3 py-2 text-sm font-medium text-white/80 hover:text-white transition-all duration-300 group"
        >
          <span className="relative z-10">Community</span>
          <div className="absolute inset-0 bg-gradient-to-r from-db-cyan/10 to-blue-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300" />
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-db-cyan to-blue-500 group-hover:w-full transition-all duration-300" />
        </Link>
        
        <Link 
          href="/about" 
          className="relative px-3 py-2 text-sm font-medium text-white/80 hover:text-white transition-all duration-300 group"
        >
          <span className="relative z-10">About</span>
          <div className="absolute inset-0 bg-gradient-to-r from-db-cyan/10 to-blue-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300" />
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-db-cyan to-blue-500 group-hover:w-full transition-all duration-300" />
        </Link>

        <Link 
          href="/contact" 
          className="relative px-3 py-2 text-sm font-medium text-white/80 hover:text-white transition-all duration-300 group"
        >
          <span className="relative z-10">Contact</span>
          <div className="absolute inset-0 bg-gradient-to-r from-db-cyan/10 to-blue-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300" />
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-db-cyan to-blue-500 group-hover:w-full transition-all duration-300" />
        </Link>

        {user && (
          <Link 
            href="/account" 
            className="relative px-3 py-2 text-sm font-medium text-white/80 hover:text-white transition-all duration-300 group"
          >
            <span className="relative z-10">Account</span>
            <div className="absolute inset-0 bg-gradient-to-r from-db-cyan/10 to-blue-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300" />
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-db-cyan to-blue-500 group-hover:w-full transition-all duration-300" />
          </Link>
        )}
      </motion.nav>

      {/* Right Section */}
      <motion.div 
        className="flex items-center space-x-4"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {user ? (
          <form onSubmit={(e) => handleRequest(e, SignOut, router)}>
            <input type="hidden" name="pathName" value={pathname || ''} />
            <button 
              type="submit" 
              className="relative px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/30 rounded-lg hover:from-red-500/30 hover:to-red-600/30 hover:border-red-400/50 transition-all duration-300 group overflow-hidden"
            >
              <span className="relative z-10">Sign out</span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </form>
        ) : (
          <Link 
            href="/signin" 
            className="relative px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-db-cyan/20 to-blue-500/20 border border-db-cyan/30 rounded-lg hover:from-db-cyan/30 hover:to-blue-500/30 hover:border-db-cyan/50 transition-all duration-300 group overflow-hidden"
          >
            <span className="relative z-10">Sign In</span>
            <div className="absolute inset-0 bg-gradient-to-r from-db-cyan/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        )}

        {/* Mobile Menu Button */}
        <button className="lg:hidden p-2 text-white/80 hover:text-white transition-colors duration-300">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </motion.div>
    </div>
  );
}
