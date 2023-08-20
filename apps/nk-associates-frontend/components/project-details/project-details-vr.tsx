"use client";

import VRModel from "./vr-model";

type PropTypes = {
  modelURL: string | undefined;
};

const ProjectDetailsVR = ({ modelURL = undefined }: PropTypes) => {
  return (
    <section className="transition-all relative w-full flex-shrink-0 h-[16.625rem] xs:h-[18.625rem] sm:h-[23.625rem] md:h-[28.625rem] lg:min-h-[35.375rem] xl:h-[39.375rem]">
      <VRModel modelURL={modelURL} />
    </section>
  );
};

export default ProjectDetailsVR;
