import { IconButton } from '@weave12/ui';
import { HelpCircle, Sun, User } from 'lucide-react';

export default function TopMenu() {
  return (
    <div className="fixed top-0 left-0 right-0 h-12 flex items-center justify-between px-4 backdrop-blur bg-white/10 dark:bg-slate-900/40">
      <span className="font-bold">Weave12</span>
      <div className="flex items-center gap-2">
        <IconButton aria-label="help"><HelpCircle size={18} /></IconButton>
        <IconButton aria-label="theme"><Sun size={18} /></IconButton>
        <IconButton aria-label="profile"><User size={18} /></IconButton>
      </div>
    </div>
  );
}
