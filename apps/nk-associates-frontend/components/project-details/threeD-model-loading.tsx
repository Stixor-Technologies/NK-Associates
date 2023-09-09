import Spinner from "../spinner";

const threeDModelLoading = () => {
  return (
    <section
      className="bg-nk-gray transition-all relative w-full flex-shrink-0 h-[16.625rem] 
      xs:h-[18.625rem] sm:h-[23.625rem] md:h-[28.625rem] lg:min-h-[35.375rem] xl:h-[39.375rem]"
    >
      <Spinner />
    </section>
  );
};

export default threeDModelLoading;
