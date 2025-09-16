import { createClient } from '@/utils/supabase/server';
import Navlinks from './Navlinks';

export default async function Navbar() {
  const supabase = createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-black/20 backdrop-blur-xl border-b border-white/10 transition-all duration-300">
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <div className="w-full px-6 mx-auto">
        <Navlinks user={user} />
      </div>
    </nav>
  );
}
