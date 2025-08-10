import * as React from 'react';

export const IconButton = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className = '', ...props }, ref) => (
    <button
      ref={ref}
      className={`inline-flex items-center justify-center rounded-2xl bg-white/10 dark:bg-slate-900/40 backdrop-blur px-2 py-2 hover:bg-white/20 ${className}`}
      {...props}
    />
  )
);
IconButton.displayName = 'IconButton';
