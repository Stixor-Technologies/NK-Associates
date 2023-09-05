import ComponentOne from "../components/landing/first-component";
import ComponentTwo from "../components/landing/how-works";
import ClientList from "../components/landing/client-section/client-list";
import ComponentThree from "../components/landing/choose-us";
import rectangle18 from "../public/assets/icons/rectangle-18.svg";
import rectangle19 from "../public/assets/icons/rectangle-19.svg";
import rectangle20 from "../public/assets/icons/rectangle-20.svg";
import rectangle9 from "../public/assets/icons/rectangle-9.svg";
import rectangle10 from "../public/assets/icons/rectangle-10.svg";
import rectangle11 from "../public/assets/icons/rectangle-11.svg";

export default function Home() {
  return (
    <div className="container ">
      <div>
        <ComponentOne />
      </div>
      <div className="pt-2">
        <ComponentTwo
          title1="How it works."
          title2="This is how our products work."
          src1={rectangle9}
          src2={rectangle10}
          src3={rectangle11}
        />
      </div>
      <div>
        <ComponentThree />
      </div>
      <div>
        <ComponentTwo
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
