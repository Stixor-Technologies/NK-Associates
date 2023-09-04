import Image from "next/image";
import ChooseUs from "../components/choose-us/choose-us";
import ClientCard from "../components/clients/client-card";
import ClientList from "../components/clients/client-list";
import ContactComponent from "../components/contact/contact-component";
import HomeList from "../components/home/home-list";
import ServicesList from "../components/services/services-list";
export default function Home() {
  return (
    <main className="bg-nk-white">
      <ContactComponent />
      <HomeList />
      <ChooseUs />
      <ServicesList />
      <ClientList />
    </main>
  );
}
