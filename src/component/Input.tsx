export default function Input({
  type = "text",
  name,
  label,
}: {
  type?: string;
  name: string;
  label: string;
}) {
  return (
    <div>
      <label htmlFor="userName" className="sr-only">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        className="border border-solid border-black p-[10px] w-full"
        placeholder={label}
      />
    </div>
  );
}
