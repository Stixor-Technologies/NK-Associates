import HomeBanner from "../components/home-page/home-banner/hero-banner";
import BannerSlider from "../components/home-page/home-banner/banner-slider";
import HomeSearch from "../components/home-page/home-search";
import AboutSummary from "../components/home-page/about-summary";
import FeaturedProjects from "../components/home-page/featured-projects";
import FeaturedProperties from "../components/home-page/featured-properties";
import ServicesOverview from "../components/shared/service-overview";
import Booklet from "../components/home-page/booklet";
import NkApp from "../components/home-page/mobile-app";
import PopularCategories from "../components/home-page/popular-categories/popular-categories";
import Offices from "../components/home-page/offices";
import { getHomeData, getSocials } from "../utils/api-calls";
import { extractObjectsWithPrefix } from "../utils/utils";

export default async function Home() {
  const data = await getHomeData();
  const resp = await getSocials();

  const {
    about_summary,
    summary_image1,
    summary_image2,
    banner_images,
    featured_projects,
    featured_properties,
    popular_categories,
  } = data?.data?.attributes || {};

  const propertyPrefix = "featured_property";
  const featuredProperties = extractObjectsWithPrefix(
    featured_properties,
    propertyPrefix,
  );

  const projectPrefix = "featured_project";
  const featuredProjects = extractObjectsWithPrefix(
    featured_projects,
    projectPrefix,
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

  const categoryData = [
    {
      category_name: popular_categories?.popular_category1,
      category_image: popular_categories?.popular_category1_image,
    },
    {
      category_name: popular_categories?.popular_category2,
      category_image: popular_categories?.popular_category2_image,
    },
    {
      category_name: popular_categories?.popular_category3,
      category_image: popular_categories?.popular_category3_image,
    },
  ];

  const popularCategories = categoryData?.filter(
    (category) => category.category_name && category.category_image,
  );

  return (
    <section className="overflow-hidden">
      <HomeBanner>
        <BannerSlider banner_images={banner_images?.data} />
      </HomeBanner>

      <HomeSearch />

      <AboutSummary
        about_summary={about_summary}
        summary_image1={summary_image1}
        summary_image2={summary_image2}
      />
      <FeaturedProjects featuredProjects={featuredProjects} />
      <FeaturedProperties featuredProperties={featuredProperties} />
      {/* <ServicesOverview /> */}
      <Booklet />
      <NkApp storeLinks={storeLinks} />
      <PopularCategories popularCategories={popularCategories} />
      <Offices />
    </section>
  );
}
