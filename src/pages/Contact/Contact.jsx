import emailjs from "@emailjs/browser";
import { useRef } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";

const Contact = () => {
  const formRef = useRef(null);

  const sendEmail = (e) => {
    e.preventDefault();

    const serviceID = import.meta.env.VITE_PUBLIC_SERVICE_ID;
    const appTemplateId = import.meta.env.VITE_PUBLIC_TEMPLATE_ID;
    const appPublicId = import.meta.env.VITE_PUBLIC_USER_ID;

    emailjs
      .sendForm(serviceID, appTemplateId, formRef.current, appPublicId)
      .then(
        () => {
          toast.success("Message Sent!", {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        },
        () => {
          toast.error("Something went wrong!", {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      );
    reset;
    e.target.querySelector(".name").value = "";
    e.target.querySelector(".email").value = "";
    e.target.querySelector(".message").value = "";
  };
  return (
    <main>
      <Helmet>
        <title>Contact Us - Mazzak Agro</title>
        <meta
          name="description"
          content="Address: 52, New Eskaton Road, TMC Bhaban, 6th Floor, Dhaka, Bangladesh. Email: info@mazzakagro.com"
        />
        <meta
          name="keywords"
          content="Mazzak Agro, premium nuts, healthy snacks, contact us, New Eskaton Road, Dhaka, Bangladesh, contact, inquiries, feedback, assistance, nut products"
        />
        <link rel="canonical" href="https://www.mazzakagro.com/contact" />
      </Helmet>
      <div className="wrapper min-h-screen mt-28 lg:mt-40 mb-20">
        <h2 className="section-title">Contact Us</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 overflow-hidden mt-10">
          <form onSubmit={sendEmail} ref={formRef} className="flex flex-col">
            <div className="gap-3">
              <div className="mb-4">
                <label className="block text-gray-700 uppercase">
                  <span className="font-semibold">Name</span>
                  <input
                    type="text"
                    name="from_name"
                    placeholder="Write your name"
                    required
                    className="name mt-2 appearance-none w-full p-4 outline-none text-gray-700  border border-gray-300 focus:border-gray-600 duration-300"
                  />
                </label>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700   uppercase">
                  <span className="font-semibold">Email</span>
                  <input
                    type="email"
                    name="from_email"
                    placeholder="Write your email"
                    required
                    className="email appearance-none mt-2 w-full p-4 outline-none text-gray-700  border border-gray-300 focus:border-gray-600 duration-300"
                  />
                </label>
              </div>
            </div>
            <div>
              <label className="block text-gray-700 mb-4  uppercase">
                <span className="font-semibold">Message</span>
                <textarea
                  name="message"
                  placeholder="Write your message"
                  required
                  className="message appearance-none mt-2 w-full p-4 outline-none text-gray-700  border border-gray-300 focus:border-gray-600 duration-300 resize-none h-40"
                />
              </label>
            </div>
            <input
              required
              className="bg-black hover:opacity-80 text-white py-5 px-10 uppercase duration-300 cursor-pointer"
              type="submit"
              value="Submit"
            />
          </form>

          <div className="right flex flex-col gap-5 w-full h-[30rem] overflow-hidden ">
            <div>
              <p className="font-bold uppercase text-lg">Address:</p>
              <p>
                52, New Eskaton Road, TMC Bhaban, 6th Floor, Dhaka, Bangladesh.
              </p>
            </div>
            <div>
              <p className="font-bold uppercase text-lg">
                24/7 Hotline Number:
              </p>
              <p
                title=" Our Phone Numbers"
                className="text-rose-500 underline underline-offset-2"
              >
                01819-269213 <br /> 01881648061
              </p>
            </div>
            <div>
              <p className="font-bold uppercase text-lg">Email Adress:</p>
              <a
                href="mailto:info@mazzakagro.com"
                aria-label="Our Email Address"
                title="Our Email Address"
                className="text-rose-500 underline underline-offset-2"
              >
                info@mazzakagro.com
              </a>
            </div>
            <div>
              <p className="font-bold uppercase text-lg">Opening Hours:</p>
              <p>Mon-Sat: 10:00am - 8:00pm</p>
              <p>Sun: 11:00am - 9:00pm</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
