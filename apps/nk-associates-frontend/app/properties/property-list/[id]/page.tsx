import React, { FC } from "react";
import Image from "next/image";
import { getPropertyDetail } from "../../../utils/api-calls";
import Bath_Icon from "../../../../public/assets/icons/bath-icon.svg";
import Bedroom_Icon from "../../../../public/assets/icons/bedrooms-icon.svg";
import LinkButton from "../../../../components/button/link-button";

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



async function PropertyDetail({params: {id}}) {
  const data = await getPropertyDetail();

  return <main>{/* Use the 'data' here in your component */}</main>;
}

export default PropertyDetail;
