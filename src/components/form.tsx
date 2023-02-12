import { useToast } from '@/hooks/use-toast';
import { trpc } from '@/utils/trpc';
import * as React from 'react';
import { Button } from './button';
import { Input } from './input';
import { Clipboard } from 'lucide-react';
import { ToastAction } from './toast';

export default function Form() {
  const { dismiss, toast, toasts } = useToast();
  const createUrl = trpc.createUrl.useMutation({
    onMutate: () => dismiss(),
    onError: (err) => {
      toast({
        title: 'Something went wrong',
        description: err.message,
        variant: 'destructive',
      });
    },
    onSuccess: (data) => {
      const url = `${window.location.href}${data.slug}`;
      toast({
        title: 'Successfully created',
        description: (
          <>
            Your URL is{' '}
            <a
              className="font-medium text-zinc-900 underline underline-offset-4 dark:text-zinc-50"
              href={url}
              rel="noreferrer"
              target="_blank"
            >
              {url}
            </a>
          </>
        ),
        action: (
          <ToastAction
            altText="Copy to clipboard"
            onClick={() => navigator.clipboard.writeText(url)}
          >
            <Clipboard className="h-5 w-5" />
          </ToastAction>
        ),
      });
    },
  });

  const [slug, setSlug] = React.useState('');
  const [destination, setDestination] = React.useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUrl.mutate({ slug, url: destination });
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="grid w-full max-w-sm items-center gap-2">
        <label className="text-sm font-medium leading-none" htmlFor="slug">
          Slug
        </label>
        <Input
          required
          autoComplete="off"
          className="[&>input]:pl-0"
          id="slug"
          prependEl={
            <span className="pointer-events-none whitespace-nowrap">{window.location.host}/</span>
          }
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />
      </div>

      <div className="grid w-full max-w-sm items-center gap-2">
        <label className="text-sm font-medium leading-none" htmlFor="destination">
          Destination
        </label>
        <Input
          required
          id="destination"
          placeholder="https://..."
          type="url"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>

      <Button disabled={toasts.length !== 0}>Create</Button>
    </form>
  );
}
