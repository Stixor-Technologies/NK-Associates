import Banner from "../components/landing/Banner";
import HowWorks from "../components/landing/how-works";
import ClientList from "../components/landing/client-section/client-list";
import ChooseUs from "../components/landing/choose-us";

export default function Home() {
  return (
    <div className="container ">
      <div>
        <Banner />
      </div>
      <div className="pt-2">
        <HowWorks
          title1="How it works."
          title2="The company specializes in the bulk acquisition and sales of properties within Bahria Town and DHA and is a trailblazing Proptech company with a real estate license. NK Associates & Builders Pvt Ltd is committed to providing its clients with the highest quality real estate services, and its team of experienced professionals is dedicated to helping them achieve their real estate goals.
          "
        />
      </div>
      <div>
        <ChooseUs />
      </div>
      <div>
        <HowWorks
          title1="Our Services."
          title2="One of our biggest product to be featured and that has sold out the most."
        />
      </div>
      <div>
        <ClientList />
      </div>
    </div>
  );
}
