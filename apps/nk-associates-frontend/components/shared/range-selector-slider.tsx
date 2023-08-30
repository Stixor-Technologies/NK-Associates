import ReactSlider from "react-slider";

type PropTypes = {
  min: number;
  max: number;
  thumbLabel: string;
  values: [number, number];
  onChange: (value: [number, number], index: number) => void;
};

const RangeSelectorSlider = ({
  min,
  max,
  thumbLabel,
  values,
  onChange,
}: PropTypes) => {
  return (
    <ReactSlider
      className={"w-full h-10 flex items-center cursor-pointer"}
      onChange={onChange}
      min={min}
      max={max}
      value={values}
      renderThumb={(prop, state) => {
        // const elements = document.querySelectorAll("[data-thumb]");
        // const minThumbPosition = elements[0].getBoundingClientRect();
        // const maxThumbPosition = elements[1].getBoundingClientRect();
        const isMax = state.index;
        // if (!isMax) {
        //   console.log({ minThumbPosition });
        // }
        let xPosition = isMax ? "right-8" : "left-8";
        return (
          <div data-thumb {...prop}>
            <span
              className={`px-2 bg-white whitespace-nowrap font-metropolis-bold border rounded-full text-xs absolute -top-2 ${xPosition}`}
            >
              {`${thumbLabel} ${state.valueNow}`}
            </span>
          </div>
        );
      }}
      thumbClassName="w-8 h-8 rounded-full bg-white cursor-grab border border-nk-red relative"
      trackClassName="h-2 bg-nk-gray rounded-full"
    />
  );
};

export default RangeSelectorSlider;
