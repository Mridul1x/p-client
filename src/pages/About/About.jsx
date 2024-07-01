import React from "react";
import { Helmet } from "react-helmet";

const img4 =
  "https://res.cloudinary.com/dfilp24nj/image/upload/f_auto,q_auto/v1/mazzakAgro/v5j84y3uumd2qzqfbj4m";
const img3 =
  "https://res.cloudinary.com/dfilp24nj/image/upload/f_auto,q_auto/v1/mazzakAgro/eynfzfa234hwtbmfnhyx";
const img1 =
  "https://res.cloudinary.com/dfilp24nj/image/upload/f_auto,q_auto/v1/mazzakAgro/kizvyhzjwkcdjyyfxvxj";

const img5 =
  "https://res.cloudinary.com/dfilp24nj/image/upload/f_auto,q_auto/v1/mazzakAgro/s40yyzozv4xz8v8ovpqf";

const img2 =
  "https://res.cloudinary.com/dfilp24nj/image/upload/f_auto,q_auto/v1/mazzakAgro/v5j84y3uumd2qzqfbj4m";

const About = () => {
  return (
    <main>
      <Helmet>
        <title>About Us - Mazzak Agro</title>
        <meta
          name="description"
          content="At Mazzak Agro, we believe that snacking should be an experience that tantalizes the taste buds and nourishes the soul."
        />
        <meta
          name="keywords"
          content="Mazzak Agro, premium nuts, healthy snacks, about us"
        />
        <link rel="canonical" href="https://www.mazzakagro.com/about" />
      </Helmet>
      <section className="py-16 container mx-auto px-5 md:px-0">
        <div
          data-aos="fade-up"
          data-aos-delay="100"
          data-aos-duration="1000"
          className="heading text-3xl sm:text-5xl lg:text-7xl w-4/6 font-semibold leading-tight  sm:leading-tight lg:leading-tight"
        >
          <span className="text-design-left relative">About Us</span>
        </div>
        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          className="space-y-4 border-b pb-5 mt-5"
        >
          <p className="text-xl ">
            At Mazzak Agro, we believe that snacking should be an experience
            that tantalizes the taste buds and nourishes the soul. Our journey
            began with a simple yet profound love for nuts, seeds, and
            everything crunchy and delicious. What started as a humble family
            tradition of roasting nuts with care and attention to detail has now
            blossomed into a premier destination for nut enthusiasts worldwide.
            We take immense pride in sourcing only the finest quality nuts from
            trusted growers around the globe. From the rich soils of California
            to the exotic plantations of the Mediterranean, each nut in our
            collection is handpicked to ensure superior taste, texture, and
            freshness. Our commitment to quality means that every batch is
            carefully inspected to meet our rigorous standards before it reaches
            your doorstep.
          </p>
        </div>
        {/* image section */}
        <div
          data-aos-delay="200"
          data-aos-duration="2000"
          className="h-auto md:h-[80rem] lg:h-[30rem] grid md:grid-cols-2 lg:grid-cols-5 gap-5 my-14"
        >
          <div className="flex items-start md:col-span-1 lg:col-span-1">
            <img
              data-aos="fade-right"
              data-aos-duration="1000"
              src={img1}
              alt={"image"}
              height={50}
              width={50}
              className="h-[20rem] w-full object-cover"
            />
          </div>
          <div className="flex items-end md:col-span-1 lg:col-span-1">
            <img
              data-aos="fade-up"
              data-aos-duration="1000"
              src={img2}
              alt={"image"}
              height={50}
              width={50}
              className="h-[20rem] w-full object-cover"
            />
          </div>
          <div className="flex items-center md:col-span-1 lg:col-span-1">
            <img
              data-aos="fade-down"
              data-aos-duration="1000"
              src={img3}
              alt={"image"}
              height={50}
              width={50}
              className="h-[20rem] w-full object-cover"
            />
          </div>
          <div className="flex items-start md:col-span-1 lg:col-span-1">
            <img
              data-aos="fade-up"
              data-aos-duration="1000"
              src={img4}
              alt={"image"}
              height={50}
              width={50}
              className="h-[20rem] w-full object-cover"
            />
          </div>
          <div className="flex items-center md:col-span-1 lg:col-span-1">
            <img
              data-aos="fade-left"
              data-aos-duration="1000"
              src={img5}
              alt={"image"}
              height={50}
              width={50}
              className="h-[20rem] w-full object-cover"
            />
          </div>
        </div>
        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          className="space-y-4 border-b pb-5"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl w-4/6 font-semibold leading-tight  sm:leading-tight lg:leading-tight">
            Indulge in Nutty Delights: Discover the Irresistible Flavors of
            Mazzak Agro!
          </h1>
          <p className="text-xl">
            At Mazzak Agro, we invite you to embark on a culinary adventure
            where every bite is a celebration of flavor and quality. Our
            exquisite selection of premium nuts is carefully curated to delight
            your senses and satisfy your cravings. Indulge in the rich, buttery
            goodness of our roasted cashews, or savor the satisfying crunch of
            our perfectly seasoned almonds. Craving something sweet? Dive into
            our delectable assortment of chocolate-covered nuts, featuring
            irresistible combinations like dark chocolate almonds and milk
            chocolate hazelnuts.
          </p>
        </div>
        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          className="my-16 space-y-4"
        >
          <h1 className="text-3xl sm:text-5xl lg:text-7xl w-4/6 font-semibold leading-tight  sm:leading-tight lg:leading-tight">
            <span className="text-design-left relative">Mazzak Agro</span> - 5
            Things we value
          </h1>
          <p className="text-3xl font-semibold">
            Storng values that unite our exceptional team
          </p>
        </div>
        <div
          data-aos="fade-up"
          data-aos-delay="100"
          data-aos-duration="1000"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 md:gap-10 gap-5 pb-16 text-3xl font-medium "
        >
          <div className="card flex items-center p-5">
            <h1 className="">Always be nice and respectful</h1>
          </div>
          <div className="card flex items-center p-5">Quality Excellence</div>
          <div className="card flex items-center p-5">
            Delivering Excellence Locally
          </div>
          <div className="card flex items-center p-5">
            Integrity and Transparency
          </div>
          <div className="card flex items-center p-5">
            Sustainability and Responsibility
          </div>
        </div>
        <div
          data-aos="fade-up"
          data-aos-delay="100"
          data-aos-duration="1000"
          className="my-10 lg:my-16 space-y-5"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-semibold leading-tight  sm:leading-tight lg:leading-tight relative text-design-left inline-block">
            The uniqueness of our approach
          </h1>

          <p className="text-gray-500 font-semibold">
            {`We take pride in our ability to customize according to
        our customers' requirements.`}
          </p>
          <p className="text-xl">
            We take immense pride in our ability to tailor solutions precisely
            to your requirements. Our core strength lies in our dedication to
            providing bespoke solutions that meet your specific needs. Our
            distinctive feature is our personalized and high-quality service
            tailored to individual requirements and preferences. We take immense
            pride in assisting you in keeping your equipment running smoothly
            and ensuring a hassle-free experience that will leave a lasting
            impression.
          </p>
          <p className="text-xl">
            What distinguishes us from others in our industry is our unwavering
            commitment to attention to detail and personalized food. We make it
            our mission to understand your needs thoroughly, allowing us to
            recommend the perfect nuts.
          </p>
        </div>
      </section>
    </main>
  );
};

export default About;
