type PropTypes = {
  label: string;
  name: string;
  checked: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "default" | "tertiary" | "secondary";
  id?: string | number;
  value?: string | number;
};

const PillRadio = ({
  label,
  name,
  checked,
  onChange,
  type = "default",
  id,
  value,
}: PropTypes) => {
  let classes = "";

  switch (type) {
    case "secondary":
      classes = "bg-nk-gray text-nk-black hover:bg-nk-red hover:text-white";
      break;
    default:
      classes = "bg-white hover:text-nk-red";
  }

  return (
    <div>
      <input
        id={`${id ? id : label}`}
        type="radio"
        value={value ? value : label}
        name={name}
        checked={checked}
        className="peer hidden"
        onChange={onChange}
      />

      <label
        htmlFor={`${id ? id : label}`}
        className={`block py-1 px-4 mr-3 mb-2 rounded-full transition-colors ${classes} peer-checked:bg-nk-red peer-checked:text-white cursor-pointer`}
      >
        {label}
      </label>
    </div>
  );
};

export default PillRadio;
