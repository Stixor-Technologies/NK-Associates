type PropTypes = {
  ariaLabel: string;
  active?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
};

const FilterButton = ({ ariaLabel, active, onClick, children }: PropTypes) => {
  let classes = "bg-white hover:bg-nk-red hover:text-white";

  if (active) {
    classes = "bg-nk-red text-white hover:bg-white hover:text-nk-red";
  }

  return (
    <button
      className={`w-full p-4 rounded-lg mb-3 md:mb-0 md:max-w-[10rem] ${classes}`}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default FilterButton;
