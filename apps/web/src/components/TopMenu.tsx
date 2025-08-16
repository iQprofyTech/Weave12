import { IconButton } from '@weave12/ui';
import { HelpCircle, Sun, User, LayoutGrid, Wand2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function TopMenu() {
  const { pathname } = useLocation();
  const linkCls = (p: string) => `flex items-center gap-1 px-2 py-1 text-xs rounded transition-colors ${pathname.startsWith(p) ? 'bg-slate-900/60 text-white' : 'hover:bg-slate-800/40 text-slate-300'}`;
  return (
    <div className="fixed top-0 left-0 right-0 h-12 flex items-center justify-between px-4 backdrop-blur bg-slate-900/40 border-b border-white/10 z-50">
      <div className="flex items-center gap-4">
        <Link to="/workspace" className="font-bold tracking-wide">Weave12</Link>
        <nav className="hidden md:flex items-center gap-1">
          <Link to="/workspace" className={linkCls('/workspace')}><LayoutGrid size={14}/> Холсты</Link>
          <Link to="/w/demo" className={linkCls('/w/')}><Wand2 size={14}/> Канва</Link>
        </nav>
      </div>
      <div className="flex items-center gap-2">
        <IconButton aria-label="help"><HelpCircle size={18} /></IconButton>
        <IconButton aria-label="theme"><Sun size={18} /></IconButton>
        <IconButton aria-label="profile"><User size={18} /></IconButton>
      </div>
    </div>
  );
}
