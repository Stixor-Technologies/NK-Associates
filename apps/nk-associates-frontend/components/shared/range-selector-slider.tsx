import ReactSlider from "react-slider";

type PropTypes = {
  min: number;
  max: number;
  thumbLabel: string;
  values: [number, number];
  onChange: (value: [number, number], index: number) => void;
  disableSlider: boolean;
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
      className={"w-full h-10 flex items-center cursor-pointer"}
      onChange={onChange}
      min={min}
      max={max}
      value={values}
      disabled={disableSlider}
      renderThumb={(prop, state) => {
        const isMax = state.index;
        let xPosition = isMax ? "right-8" : "left-8";
        return (
          <div data-thumb {...prop}>
            <span
              className={`px-2 bg-nk-white whitespace-nowrap capitalize font-metropolis-bold border rounded-full text-xs absolute -top-3 ${xPosition} ${
                disableSlider ? "text-gray-400" : ""
              }`}
            >
              {`${thumbLabel} ${state.valueNow}`}
            </span>
          </div>
        );
      }}
      thumbClassName={`w-8 h-8 border-[0.219rem] rounded-full bg-white cursor-grab border relative ${
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
