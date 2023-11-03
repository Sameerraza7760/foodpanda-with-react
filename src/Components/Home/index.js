import "./../style.css";
import Header from "../Header/Header";
import Image from "../Image/Image";
import Image2 from "../Image/Image2";
import Image3 from "../Image/Image3";
import Image4 from "../Image/Image4";
import Image5 from "../Image/Image5";
import Paragraph from "../Paragraph/Paragraph";
import Footer from "../Footer/Footer";
function Home() {
  return (
    <div className="App">
      <Header />
      <Image />
      <Image2 />
      <Image3 />
      <Image4 />
      <Image5 />
      <Paragraph />
      <Footer />
    </div>
  );
}
export default Home;
