import { useDebounce } from '@/hooks/use-debounce';
import { useToast } from '@/hooks/use-toast';
import { trpc } from '@/utils/trpc';
import { useQueryClient } from '@tanstack/react-query';
import { getQueryKey } from '@trpc/react-query';
import { AlertCircle, Clipboard, Shuffle } from 'lucide-react';
import * as React from 'react';
import { Button } from './button';
import { Input } from './input';
import { ToastAction } from './toast';

// Consider generating the slug server-side, as there's a chance that the
// generated slug is already taken. Anyway, the checkAvailability query will
// do it's job.
function getRandomSlug() {
  const buf = new Uint8Array(4);
  crypto.getRandomValues(buf);
  return buf.reduce((a, b) => a + b.toString(36), '');
}

export default function Form() {
  const [slug, setSlug] = React.useState('');
  const [destination, setDestination] = React.useState('');

  const queryClient = useQueryClient();
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
      setSlug('');
      setDestination('');
      queryClient.invalidateQueries({
        queryKey: getQueryKey(trpc.checkAvailability, data.slug, 'query'),
      });
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

  const isAvailable = slug === '' || checkAvailability.data?.isAvailable;

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="grid w-full max-w-sm items-center gap-2">
        <div className="flex justify-between text-sm font-medium leading-none">
          <label htmlFor="slug">Slug</label>
          <button
            className="flex items-center gap-1 text-gray-500 active:scale-95 dark:text-slate-400"
            type="button"
            onClick={() => setSlug(getRandomSlug())}
            aria-label="Generate a random slug"
          >
            <Shuffle className="h-3 w-3" />
            Randomize
          </button>
        </div>
        <Input
          autoFocus
          required
          appendEl={
            !isAvailable ? <AlertCircle aria-hidden className="h-5 w-5 text-red-500" /> : null
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
        {!isAvailable ? (
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

      <Button disabled={!checkAvailability.data?.isAvailable}>Create</Button>
    </form>
  );
}
