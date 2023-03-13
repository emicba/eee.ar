import clsx, { type ClassValue } from 'clsx';
import Link from 'next/link';
import * as React from 'react';

const BUTTON_CLASSES =
  'active:scale-95 inline-flex h-10 items-center justify-center rounded-md py-2 px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 aria-disabled:pointer-events-none aria-disabled:opacity-50 motion-safe:transition-colors dark:hover:bg-zinc-800 dark:hover:text-zinc-100 dark:focus:ring-zinc-400 dark:focus:ring-offset-zinc-900';

const BUTTON_VARIANTS = {
  default: 'bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900',
  outline:
    'bg-transparent border border-zinc-200 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100',
};

export type ButtonVariant = keyof typeof BUTTON_VARIANTS;

function getButtonClasses(variant: ButtonVariant, ...inputs: ClassValue[]) {
  return clsx(BUTTON_CLASSES, BUTTON_VARIANTS[variant], ...inputs);
}

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'aria-disabled'> {
  variant?: ButtonVariant;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, disabled, variant = 'default', ...props }, ref) => {
    return (
      <button
        className={getButtonClasses(variant, className)}
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
  variant?: ButtonVariant;
}

const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ className, disabled, href, variant = 'default', ...props }, ref) => {
    if (disabled) {
      // HTML doesn't allow the use of the `disabled` attribute on anchor elements AND
      // next/link doesn't allow the use of undefined `href` 🙃
      // https://w3c.github.io/html-aria/#el-a
      return (
        <a
          className={getButtonClasses(variant, className)}
          aria-disabled="true"
          role="link"
          ref={ref}
          {...props}
        />
      );
    }
    return (
      <Link className={getButtonClasses(variant, className)} href={href} ref={ref} {...props} />
    );
  }
);
ButtonLink.displayName = 'ButtonLink';

export { Button, ButtonLink };
