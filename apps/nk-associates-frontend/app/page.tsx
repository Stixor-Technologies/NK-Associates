import Image from "next/image";
import HomeBanner from "../components/home-page/hero-banner/hero-banner";
import FeaturedProjects from "../components/home-page/featured-projects";
import FeaturedProperties from "../components/home-page/featured-properties";
import ServicesOverview from "../components/shared/service-overview";
import NkApp from "../components/home-page/mobile-app";
import PopularCategories from "../components/home-page/popular-categories/popular-categories";
import Offices from "../components/home-page/offices";

export default function Home() {
  return (
    <section className="overflow-hidden">
      <HomeBanner />
      <FeaturedProjects />
      <FeaturedProperties />
      <ServicesOverview />
      <NkApp />
      <PopularCategories />
      <Offices />
    </section>
  );
}
