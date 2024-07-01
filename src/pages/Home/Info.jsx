import Aos from "aos";
import { useEffect } from "react";
import { Parallax } from "react-parallax";

const Ingredients = () => {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <div className="relative w-full h-full  overflow-hidden mb-20 ">
      <Parallax
        bgImage="https://res.cloudinary.com/dfilp24nj/image/upload/f_auto,q_auto/v1/mazzakAgro/u2gtcw4asmfmunwdu5bg"
        bgImageAlt="the cat"
        className="w-full min-h-screen object-cover bg-no-repeat"
        strength={500}
      >
        <h1 className="text-white text-4xl font-bold mb-4">Heading</h1>
        <p className="text-white mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <button className="bg-white text-black py-2 px-4 rounded">
          Button
        </button>
      </Parallax>
    </div>
  );
};

export default Ingredients;
