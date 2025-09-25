import Image from "next/image";
import Header from "./_Components/Header";
import Herosection from "./_Components/Herosection";
import Footer from "./_Components/Footer";


export default function Home() {
  return (
    <div>
      
      {/*Header*/}
        <Header />
        {/*Hero section*/}
        <Herosection />
        {/*Footer section*/}
           <Footer />
    </div>
  );
}
