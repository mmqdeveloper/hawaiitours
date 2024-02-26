import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import AllProduct from "../../components/product/Product";
import "./home.css";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <Featured />
        {/* <h1 className="homeTitle">Product</h1> */}
        <AllProduct />
        <PropertyList />
        <FeaturedProperties />
        <MailList />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
