import { Button } from './button';
import { Input } from './input';

export default function Form() {
  return (
    <form className="flex flex-col gap-4">
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
        />
      </div>

      <div className="grid w-full max-w-sm items-center gap-2">
        <label className="text-sm font-medium leading-none" htmlFor="destination">
          Destination
        </label>
        <Input required id="destination" placeholder="https://..." type="url" />
      </div>

      <Button disabled>Create</Button>
    </form>
  );
}
