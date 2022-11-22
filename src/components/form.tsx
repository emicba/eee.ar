import Input from '../components/input';

export default function Form() {
  return (
    <form className="flex flex-col gap-2">
      <label htmlFor="slug">Slug</label>
      <Input
        type="text"
        id="slug"
        name="slug"
        placeholder="enter-a-slug"
        prependEl={<span className="pointer-events-none">{window.location.origin}/</span>}
      />

      <label htmlFor="url">Destination</label>
      <Input type="url" id="url" name="url" placeholder="enter a url" />

      <button className="rounded border border-violet-700 bg-violet-600 px-4 py-2 text-lg font-medium text-white shadow-sm hover:border-violet-800 hover:bg-violet-700">
        Create
      </button>
    </form>
  );
}
