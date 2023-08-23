import Image from "next/image";
import FeaturedProjects from "../components/home-page/featured-projects";
import FeaturedProperties from "../components/home-page/featured-properties";

export default function Home() {
  return (
    <section>
      <FeaturedProjects />
      <FeaturedProperties />
    </section>
  );
}
