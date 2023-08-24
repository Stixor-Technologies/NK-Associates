import Image from "next/image";
import FeaturedProjects from "../components/home-page/featured-projects";
import FeaturedProperties from "../components/home-page/featured-properties";
import Offices from "../components/home-page/offices";

export default function Home() {
  return (
    <section>
      {/* <FeaturedProjects /> */}
      {/* <FeaturedProperties /> */}
      <Offices />
    </section>
  );
}
