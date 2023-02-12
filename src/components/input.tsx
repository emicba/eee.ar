import clsx from 'clsx';
import * as React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  prependEl?: React.ReactNode;
  appendEl?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, prependEl, appendEl, ...props }, ref) => {
    return (
      <div
        className={clsx(
          'flex h-10 w-full rounded-md border border-zinc-300 bg-transparent text-sm focus-within:ring-2 focus-within:ring-zinc-400 focus-within:ring-offset-2 dark:border-zinc-700 dark:text-zinc-50 dark:focus-within:ring-zinc-400 dark:focus-within:ring-offset-zinc-900 sm:text-lg',
          className
        )}
      >
        {prependEl ? <div className="flex items-center pl-3 text-gray-400">{prependEl}</div> : null}
        <input
          className="block w-full border-0 bg-transparent py-2 px-3 outline-none placeholder:text-zinc-400 disabled:cursor-not-allowed disabled:opacity-50"
          ref={ref}
          {...props}
        />
        {appendEl ? <div className="flex items-center pr-3 text-gray-400">{appendEl}</div> : null}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
