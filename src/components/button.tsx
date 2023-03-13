import clsx from 'clsx';
import Link from 'next/link';
import * as React from 'react';

const BUTTON_CLASSES =
  'inline-flex h-10 items-center justify-center rounded-md bg-zinc-900 py-2 px-4 text-sm font-medium text-white hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 aria-disabled:pointer-events-none aria-disabled:opacity-50 motion-safe:transition-colors dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 dark:focus:ring-zinc-400 dark:focus:ring-offset-zinc-900';

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'aria-disabled'> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, disabled, ...props }, ref) => {
    return (
      <button
        className={clsx(BUTTON_CLASSES, className)}
        aria-disabled={disabled}
        disabled={disabled}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export interface ButtonLinkProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Link>, 'aria-disabled'> {
  disabled?: boolean;
}

const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ className, disabled, href, ...props }, ref) => {
    if (disabled) {
      // HTML doesn't allow the use of the `disabled` attribute on anchor elements AND
      // next/link doesn't allow the use of undefined `href` 🙃
      // https://w3c.github.io/html-aria/#el-a
      return (
        <a
          className={clsx(BUTTON_CLASSES, className)}
          aria-disabled="true"
          role="link"
          ref={ref}
          {...props}
        />
      );
    }
    return <Link className={clsx(BUTTON_CLASSES, className)} href={href} ref={ref} {...props} />;
  }
);
ButtonLink.displayName = 'ButtonLink';

export { Button, ButtonLink };
