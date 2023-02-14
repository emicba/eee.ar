import { useDebounce } from '@/hooks/use-debounce';
import { useToast } from '@/hooks/use-toast';
import { trpc } from '@/utils/trpc';
import { AlertCircle, Clipboard } from 'lucide-react';
import * as React from 'react';
import { Button } from './button';
import { Input } from './input';
import { ToastAction } from './toast';

export default function Form() {
  const [slug, setSlug] = React.useState('');
  const [destination, setDestination] = React.useState('');

  const { dismiss, toast, toasts } = useToast();
  const debouncedSlug = useDebounce(slug, 350);
  const checkAvailability = trpc.checkAvailability.useQuery(debouncedSlug, {
    enabled: Boolean(debouncedSlug),
    placeholderData: () => ({ isAvailable: true }),
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60,
  });
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
          autoFocus
          required
          appendEl={
            !checkAvailability.data?.isAvailable ? (
              <AlertCircle aria-hidden className="h-5 w-5 text-red-500" />
            ) : null
          }
          aria-describedby="slug-error"
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
        {!checkAvailability.data?.isAvailable ? (
          <p className="text-sm text-red-500" id="slug-error">
            Slug is already in use.
          </p>
        ) : null}
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

      <Button disabled={toasts.length !== 0 || !checkAvailability.data?.isAvailable}>Create</Button>
    </form>
  );
}
