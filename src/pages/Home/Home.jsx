import React from "react";
import Banner from "./Banner";
import Ingredients from "./Ingredients";
import Delivered from "./Delivered";
import LatestProducts from "./LatestProducts";
import Info from "./Info";
import { Helmet } from "react-helmet";
import FAQ from "./Faq";

const Home = () => {
  return (
    <main>
      <Helmet>
        <title>AgroMart</title>
        <meta
          name="description"
          content="আমাদের অঙ্গীকার নিরাপদ খাদ্য হোক সবার অধিকার।"
        />
        <meta
          name="keywords"
          content="AgroMart, nut products, premium nuts, roasted nuts, berries, dates, powder"
        />
        <link rel="canonical" href="https://www.agromart.com/" />
      </Helmet>
      <Banner></Banner>
      <Ingredients></Ingredients>
      <Delivered></Delivered>
      <LatestProducts></LatestProducts>
      <FAQ></FAQ>
    </main>
  );
};

export default Home;
