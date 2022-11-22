import clsx from 'clsx';
import { forwardRef, ReactElement } from 'react';

type InputProps = React.ComponentPropsWithoutRef<'input'> & {
  prependEl?: ReactElement;
  appendEl?: ReactElement;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ prependEl, appendEl, className, ...rest }, ref) => {
    return (
      <div
        className={clsx(
          'flex rounded-md border border-gray-700 px-1 shadow-sm focus-within:border-violet-500 focus-within:ring-1 focus-within:ring-violet-500',
          className
        )}
      >
        {prependEl ? (
          <div className="flex items-center pl-2 text-gray-400 sm:text-lg">{prependEl}</div>
        ) : null}
        <input
          {...rest}
          className="block w-full border-0 bg-transparent p-2 outline-none focus:ring-0 sm:text-lg"
          ref={ref}
        />
        {appendEl ? (
          <div className="flex items-center pr-2 text-gray-400 sm:text-lg">{appendEl}</div>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
