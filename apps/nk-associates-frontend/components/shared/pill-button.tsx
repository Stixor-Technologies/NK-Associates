type PropTypes = {
  ariaLabel: string;
  children: React.ReactNode;
  active?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "default" | "tertiary" | "secondary";
};

const PillButton = ({
  ariaLabel,
  active,
  onClick,
  type = "default",
  children,
}: PropTypes) => {
  let classes = "";

  switch (type) {
    case "secondary":
      classes = "bg-nk-gray text-nk-black hover:bg-nk-red hover:text-white";
      break;
    default:
      classes = "bg-white hover:bg-nk-red hover:text-white";
  }

  if (active) {
    classes = "bg-nk-red text-white hover:bg-white hover:text-nk-red";
  }

  return (
    <button
      className={`py-1 px-4 mr-3 mb-2 rounded-full transition-colors ${classes}`}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default PillButton;
