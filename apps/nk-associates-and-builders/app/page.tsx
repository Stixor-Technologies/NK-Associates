import ComponentOne from "../components/landing/comp1";
import ComponentTwo from "../components/landing/comp2";
import ClientList from "../components/landing/client-section/client-list";
import ComponentOneV2 from "../components/landing/comp1v2";

export default function Home() {
  return (
    <div className="container ">
      <div>
        <ComponentOne />
      </div>
      <div className="pt-2 overflow-x-hidden">
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
