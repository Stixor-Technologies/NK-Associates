import ComponentOne from "../components/landing/first-component";
import ComponentTwo from "../components/landing/how-works";
import ClientList from "../components/landing/client-section/client-list";
import ComponentOneV2 from "../components/landing/choose-us";

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
        />
      </div>
      <div>
        <ComponentOneV2 />
      </div>
      <div>
        <ComponentTwo
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
