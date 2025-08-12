import { IconButton } from '@weave12/ui';
import { Settings, Trash2 } from 'lucide-react';

export default function NodeToolbar() {
  return (
    <div className="flex gap-1 p-1">
      <IconButton aria-label="delete"><Trash2 size={16} /></IconButton>
      <IconButton aria-label="settings"><Settings size={16} /></IconButton>
    </div>
  );
}
