import ComponentOne from "../components/landing/comp1";
import ComponentTwo from "../components/landing/comp2";
import ClientList from "../components/landing/client-section/client-list";
import ComponentOneV2 from "../components/landing/comp1v2";
import Rectangle18 from "../public/assets/icons/Rectangle 18.svg";
import Rectangle19 from "../public/assets/icons/Rectangle 19.svg";
import Rectangle20 from "../public/assets/icons/Rectangle 20.svg";
import Rectangle9 from "../public/assets/icons/Rectangle 9.svg";
import Rectangle10 from "../public/assets/icons/Rectangle 10.svg";
import Rectangle11 from "../public/assets/icons/Rectangle 11.svg";

export default function Home() {
  return (
    <div className="container ">
      <div className="">
        <ComponentOne />
      </div>
      <div className="pt-2">
        <ComponentTwo
          title1="How it works."
          title2="This is how our products work."
          src1={Rectangle9}
          src2={Rectangle10}
          src3={Rectangle11}
        />
      </div>
      <div>
        <ComponentOneV2 />
      </div>
      <div>
        <ComponentTwo
          title1="Our Services."
          title2="One of our biggest product to be featured and that has sold out the most."
          src1={Rectangle18}
          src2={Rectangle19}
          src3={Rectangle20}
        />
      </div>
      <div>
        <ClientList />
      </div>
    </div>
  );
}
