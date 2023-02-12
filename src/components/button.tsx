import * as React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, ...props }, ref) => {
  return (
    <button
      className="inline-flex h-10 items-center justify-center rounded-md bg-zinc-900 py-2 px-4 text-sm font-medium text-white hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 motion-safe:transition-colors dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 dark:focus:ring-zinc-400 dark:focus:ring-offset-zinc-900"
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = 'Button';

export { Button };
