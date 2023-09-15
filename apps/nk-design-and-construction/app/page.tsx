import ClientList from "../components/landing/client-section/client-list";
import rectangle18 from "../public/assets/icons/rectangle-18.svg";
import rectangle19 from "../public/assets/icons/rectangle-19.svg";
import rectangle20 from "../public/assets/icons/rectangle-20.svg";
import rectangle9 from "../public/assets/icons/rectangle-9.svg";
import rectangle10 from "../public/assets/icons/rectangle-10.svg";
import rectangle11 from "../public/assets/icons/rectangle-11.svg";
import Banner from "../components/landing/banner";
import HowWorks from "../components/landing/how-works";
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
          title2="NK Design and Construction is a real estate development company that
          specializes in providing bespoke services for residential and
          commercial properties in Pakistan. The company's mastery of
          architecture, construction, and interior design results in spectacular
          outcomes that prioritize client satisfaction. NK Design and
          Construction is committed to providing its clients with the highest
          quality real estate development services, and its team of experienced
          professionals is dedicated to creating beautiful and functional
          spaces. NK Design and Construction company has a proven track record
          of delivering exceptional outcomes for its clients, and its team of
          experienced professionals is dedicated to creating spaces that are
          both beautiful and functional."
          src1={rectangle9}
          src2={rectangle10}
          src3={rectangle11}
        />
      </div>
      <div>
        <ChooseUs />
      </div>
      <div>
        <HowWorks
          title1="Our Services."
          title2="One of our biggest product to be featured and that has sold out the most."
          src1={rectangle18}
          src2={rectangle19}
          src3={rectangle20}
        />
      </div>
      <div>
        <ClientList />
      </div>
    </div>
  );
}
