type InputProps = {
  type: string;
  id: string;
  label: string;
  placeholder?: string;
  name?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  error?: string;
  checked?: boolean;
};

const Input = ({ type, id, label, error, ...rest }: InputProps) => {
  return (
    <div className="mb-6">
      <dl
        className={`flex items-center ${
          type === "radio" ? "flex-row-reverse gap-[5px]" : ""
        }`}
      >
        <dt className={`${type === "radio" ? "" : "w-16"} font-bold`}>
          <label className="whitespace-nowrap" htmlFor={id}>
            {label}
          </label>
        </dt>
        <dd className="w-full">
          <input
            className="w-full border border-gray-300 p-3 rounded placeholder:text-gray-300"
            id={id}
            type={type}
            {...rest}
          />
        </dd>
      </dl>
      {error && <p className="text-red-500 text-xs mt-1 ml-16">{error}</p>}
    </div>
  );
};

export default Input;
