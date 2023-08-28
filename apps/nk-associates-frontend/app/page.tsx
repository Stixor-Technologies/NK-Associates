import HomeBanner from "../components/home-page/home-banner/hero-banner";
import BannerSlider from "../components/home-page/home-banner/banner-slider";
import AboutSummary from "../components/home-page/about-summary";
import FeaturedProjects from "../components/home-page/featured-projects";
import FeaturedProperties from "../components/home-page/featured-properties";
import ServicesOverview from "../components/shared/service-overview";
import NkApp from "../components/home-page/mobile-app";
import PopularCategories from "../components/home-page/popular-categories/popular-categories";
import Offices from "../components/home-page/offices";
import { getHomeData, getSocials } from "../utils/api-calls";

export default async function Home() {
  const data = await getHomeData();
  const resp = await getSocials();

  const {
    featured_project1,
    featured_project2,
    featured_project3,
    featured_property1,
    featured_property2,
    featured_property3,
    popular_category1,
    popular_category1_image,
    popular_category2,
    popular_category2_image,
    popular_category3,
    popular_category3_image,
    about_summary,
    summary_image1,
    summary_image2,
    banner_images,
  } = data?.data?.attributes || {};

  const projectDataArray = [
    featured_project1?.data,
    featured_project2?.data,
    featured_project3?.data,
  ];

  const featuredProjects = projectDataArray.filter(
    (projectData) => projectData !== null,
  );

  const propertyDataArray = [
    featured_property1?.data,
    featured_property2?.data,
    featured_property3?.data,
  ];

  const featuredProperties = propertyDataArray.filter(
    (propertyData) => propertyData !== null,
  );

  const { playstore, appstore, appgallery } = resp?.data?.attributes || {};

  const storeLinks = [
    {
      name: "play-store-home",
      link: playstore,
    },
    {
      name: "app-store-home",
      link: appstore,
    },
    {
      name: "app-gallery-home",
      link: appgallery,
    },
  ];

  const popularCategories = [
    {
      category_name: popular_category1,
      category_image: popular_category1_image,
    },
    {
      category_name: popular_category2,
      category_image: popular_category2_image,
    },
    {
      category_name: popular_category3,
      category_image: popular_category3_image,
    },
  ];

  return (
    <section className="overflow-hidden">
      <HomeBanner>
        <BannerSlider banner_images={banner_images?.data} />
      </HomeBanner>
      <AboutSummary
        about_summary={about_summary}
        summary_image1={summary_image1}
        summary_image2={summary_image2}
      />
      <FeaturedProjects featuredProjects={featuredProjects} />
      <FeaturedProperties featuredProperties={featuredProperties} />
      <ServicesOverview />
      <NkApp storeLinks={storeLinks} />
      <PopularCategories popularCategories={popularCategories} />
      <Offices />
    </section>
  );
}
