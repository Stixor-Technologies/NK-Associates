import { useRef, useState, useMemo, useEffect } from "react";
import useFilters from "../../../utils/useFilters";

type PropTypes = {
  areaUnitsList: { id: number; name: string }[];
};

const AreaDropdown = ({ areaUnitsList }: PropTypes) => {
  const [filtersState, filtersDispatch] = useFilters();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<boolean>(false);
  const [scroll, setScroll] = useState(0);

  const dropDownPosition = useMemo(() => {
    if (buttonRef.current) {
      const containerPosition = buttonRef.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;

      const tooCloseToTheEdge = windowWidth - containerPosition.left < 400;

      return {
        x: tooCloseToTheEdge
          ? containerPosition.right - 360
          : containerPosition.left + 10,
        y:
          windowWidth > 1024
            ? containerPosition.top + containerPosition.height
            : containerPosition.top + 10,
        tooCloseToTheEdge,
      };
    }

    return {
      x: 0,
      y: 0,
      tooCloseToTheEdge: false,
    };
  }, [active, scroll]);

  const handleOptionClick = (option: string) => {
    filtersDispatch({ type: "setSelectedAreaUnit", payload: option });
    filtersDispatch({ type: "setFilterIsSelected", payload: true });
  };

  const handleButtonClick = () => {
    setActive(!active);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setActive(false);
    }
  };

  const handleScroll = (e) => {
    setScroll(window.scrollY);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className="inline">
      <button ref={buttonRef} onClick={handleButtonClick}>
        <svg
          className="w-3 h-3 ml-2"
          viewBox="0 0 28 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.25293 2.0625L14.1061 13.9154L25.959 2.0625"
            stroke="#333333"
            stroke-width="4"
          />
        </svg>
      </button>

      {active && (
        <div
          className="w-[12.5rem] fixed z-10"
          style={{
            left: dropDownPosition.x,
            top: dropDownPosition.y + 10,
          }}
        >
          <div
            className={`w-full bg-nk-white px-4 py-3 shadow-lg ${
              !dropDownPosition.tooCloseToTheEdge
                ? "rounded-r-[1.25rem] rounded-bl-[1.25rem]"
                : "rounded-l-[1.25rem] rounded-br-[1.25rem]"
            }`}
          >
            <ul>
              {areaUnitsList.map((unit, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center mb-2 last-of-type:mb-0 cursor-pointer group"
                  onClick={() => handleOptionClick(unit.name)}
                >
                  <p className="text-sm group-hover:text-nk-red">{unit.name}</p>
                  <span
                    className={`rounded-full w-2.5 h-2.5 border border-nk-gray ${
                      filtersState.selectedAreaUnit === unit.name
                        ? "bg-nk-red border-nk-red"
                        : "bg-white"
                    }`}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default AreaDropdown;
