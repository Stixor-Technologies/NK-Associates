// 'use client'
import React, { FC } from "react";
import Image from "next/image";
import { getPropertyDetail } from "../../../utils/api-calls";
import DetailSlider from "../../../../components/properties/property-detail/detail-slider";
import Bath_Icon from "../../../../public/assets/icons/bath-icon.svg";
import Bedroom_Icon from "../../../../public/assets/icons/bedrooms-icon.svg";
import Tour_Icon from "../../../../public/assets/icons/360-icon.svg";
import Area_Icon from "../../../../public/assets/icons/area-icon.svg"
import LinkButton from "../../../../components/button/link-button";
import "./slider-styles.css";

interface PropertyDetailProps {
  params: {
    id: string;
  };
}

// const PropertyDetail: FC<PropertyDetailProps> = ({ params: { id } }) => {
//   console.log(id);
//   return (
//     <section className="container mx-auto h-screen">
//       <div>
//         <div className="md:flex md:items-center md:justify-between">
//           <div className="flex lg:gap-10 xl:gap-20">
//             <h2 className="font-metropolis-semibold text-4xl">
//               DHA-III Residential Plots
//             </h2>

//             <div className="flex gap-4">
//               <div className="flex items-center gap-1">
//                 <Image src={Bath_Icon} width={27} height={27} alt="" />
//                 <span className="text-nk-grey font-metropolis-medium text-lg">
//                   7
//                 </span>
//               </div>

//               <div className="flex items-center gap-1">
//                 <Image src={Bedroom_Icon} width={27} height={27} alt="" />
//                 <span className="text-nk-grey font-metropolis-medium text-lg">
//                   6
//                 </span>
//               </div>

//               <div className="flex items-center gap-1">
//                 <Image src={Bath_Icon} width={27} height={27} alt="" />
//                 <span className="text-nk-grey font-metropolis-medium text-lg">
//                   4500 sq.ft
//                 </span>
//               </div>
//             </div>
//           </div>

//           <LinkButton
//             text="Inquires"
//             type="solid"
//             navigateTo="#"
//             className="w-44 text-lg"
//           />
//         </div>

//         <div>
//           <h2>NK Associates Services</h2>
//           <p>
//             Archito Group se présente comme un outil pluridisciplinaire et
//             complet regroupant diverses maitrises et compétences utiles à
//             l’investissement immobilier. OWN Group se positionne toujours et
//             exclusivement du côté des investisseurs. Uncommonly spacious and
//             handsomely appointed.
//           </p>

//           <LinkButton text="Explore all" type="inverted" navigateTo="#" />
//         </div>
//       </div>
//     </section>
//   );
// };

async function PropertyDetail({ params: { id } }) {
  const data = await getPropertyDetail(id);

  return (
    <section className="">
      <DetailSlider />

      {/* <button className="hidden bg-white md:flex items-center gap-2 py-2 px-4 rounded-l-md ml-auto mt-3 shadow-lg">
      <Image src={Tour_Icon} width={55} height={34} alt="360-tour" />
      <span className="text-nk-black text-[1.375rem]">View</span>
     </button> */}

      <div className="bg-right-top bg-no-repeat md:bg-nk-bg">

        <button className="ml-auto mt-3 hidden items-center gap-2 rounded-l-md bg-white px-4 py-2 shadow-lg md:flex">
          <Image src={Tour_Icon} width={55} height={34} alt="360-tour" />
          <span className="text-[1.375rem] text-nk-black">View</span>
        </button>

        <div className="container mx-auto h-[2000px] py-4">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex lg:gap-10 xl:gap-20">
              <h2 className="font-metropolis-semibold text-4xl">
                DHA-III Residential Plots
              </h2>

              <div className="flex gap-6">
                <div className="flex items-center gap-1">
                  <Image src={Bath_Icon} width={27} height={27} alt="bath-icon" />
                  <span className="font-metropolis-medium text-lg text-nk-black">
                    7
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <Image src={Bedroom_Icon} width={27} height={27} alt="bed-icon" />
                  <span className="font-metropolis-medium text-lg text-nk-black">
                    6
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <Image src={Area_Icon} width={27} height={27} alt="" />
                  <span className="font-metropolis-medium text-lg text-nk-black">
                    4500 sq.ft
                  </span>
                </div>
              </div>
            </div>

            <LinkButton
              text="Inquires"
              type="solid"
              navigateTo="#"
              className="w-[11.75rem] text-lg md:w-[11.75rem]"
            />
          </div>

          {/* <div>
          <h2>NK Associates Services</h2>
          <p>
            Archito Group se présente comme un outil pluridisciplinaire et
            complet regroupant diverses maitrises et compétences utiles à
            l’investissement immobilier. OWN Group se positionne toujours et
            exclusivement du côté des investisseurs. Uncommonly spacious and
            handsomely appointed.
          </p>

          <LinkButton text="Explore all" type="inverted" navigateTo="#" />
        </div> */}
        </div>
      </div>
    </section>
  );
}

export default PropertyDetail;
