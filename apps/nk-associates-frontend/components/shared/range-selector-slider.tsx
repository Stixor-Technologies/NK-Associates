import ReactSlider from "react-slider";

type PropTypes = {
  min: number;
  max: number;
  thumbLabel: string;
  values: [number, number];
  onChange: (value: [number, number], index: number) => void;
  disableSlider?: boolean;
};

const RangeSelectorSlider = ({
  min,
  max,
  thumbLabel,
  values,
  onChange,
  disableSlider,
}: PropTypes) => {
  return (
    <ReactSlider
      className={
        "w-full h-10 flex items-center cursor-pointer md:w-[90%] mx-auto"
      }
      onChange={onChange}
      min={min}
      max={max}
      value={values}
      disabled={disableSlider}
      renderThumb={(prop, state) => {
        const isMax = state.index;
        let xPosition = isMax ? "-top-4 -right-0" : "top-10 -left-0";
        return (
          <div data-thumb {...prop}>
            <p
              className={`whitespace-nowrap capitalize font-metropolis-bold rounded-full text-[0.625rem] absolute ${xPosition} ${
                disableSlider ? "text-gray-400" : ""
              }`}
            >
              <span className="relative">
                <span className="absolute bottom-2 w-full">
                  {`${thumbLabel}`}
                </span>
                <span>{`${state.valueNow}`}</span>
              </span>
            </p>
          </div>
        );
      }}
      thumbClassName={`!z-0 w-8 h-8 border-[0.219rem] rounded-full cursor-grab border relative ${
        disableSlider
          ? "!bg-gray-200 border-gray-300"
          : "bg-nk-white border-nk-red"
      }`}
      trackClassName={`h-2 rounded-full ${
        disableSlider ? "!bg-gray-200" : "bg-nk-range-slider range-slider-track"
      }`}
    />
  );
};

export default RangeSelectorSlider;
