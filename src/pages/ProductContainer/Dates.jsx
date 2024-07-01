import React from "react";
import ComingSoon from "../../component/ComingSoon";
import { Helmet } from "react-helmet";

const Dates = () => {
  return (
    <div>
      <Helmet>
        <title>Dates - Mazzak Agro</title>
        <meta
          name="description"
          content="Explore our wide range of premium nut products at Mazzak Agro. From roasted cashews to chocolate-covered almonds, indulge in the finest nutty delights."
        />
        <meta
          name="keywords"
          content="Mazzak Agro, nut products, premium nuts, roasted nuts, berries, dates, powder"
        />
        <link
          rel="canonical"
          href="https://www.mazzakagro.com/products/dates"
        />
      </Helmet>
      <ComingSoon></ComingSoon>
    </div>
  );
};

export default Dates;
