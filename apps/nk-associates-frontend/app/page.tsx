import Image from "next/image";
import FeaturedProjects from "../components/home-page/featured-projects";
import FeaturedProperties from "../components/home-page/featured-properties";
import ServicesOverview from "../components/shared/service-overview";
import NkApp from "../components/home-page/mobile-app";
import Offices from "../components/home-page/offices";

export default function Home() {
  return (
    <section>
      {/* <FeaturedProjects /> */}
      {/* <FeaturedProperties /> */}

      <Offices />
      <ServicesOverview />
      <NkApp />
    </section>
  );
}
