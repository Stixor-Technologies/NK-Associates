import Banner from "../components/landing/Banner";
import HowWorks from "../components/landing/how-works";
import ClientList from "../components/landing/client-section/client-list";
import ChooseUs from "../components/landing/choose-us";

export default function Home() {
  return (
    <div className="container ">
      <div className="">
        <Banner />
      </div>
      <div className="pt-2">
        <HowWorks
          title1="How it works."
          title2="This is how our products work."
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
