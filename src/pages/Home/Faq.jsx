import React, { useState } from "react";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: "What types of agricultural products do you offer?",
      answer:
        "We offer a wide variety of agricultural products, including seeds, fertilizers, pesticides, tools, and equipment. Our selection includes products from both local and international brands.",
    },
    {
      question: "How can I place an order?",
      answer:
        "Placing an order is easy! Simply browse our product catalog, add the items you need to your cart, and proceed to checkout. You can choose to pay online or cash on delivery.",
    },
    {
      question: "What are your delivery options?",
      answer:
        "We offer delivery across Bangladesh. Delivery times may vary depending on your location. You can also track your order status online.",
    },
    {
      question: "What are the payment methods available?",
      answer:
        "We accept both online payments (through secure payment gateways) and cash on delivery (COD).",
    },
    {
      question: "Can I return or exchange a product?",
      answer:
        "Yes, you can return or exchange a product within [number] days of purchase, provided it is unused and in its original packaging. Please refer to our return policy for more details.",
    },
    {
      question: "How can I contact customer support?",
      answer:
        "You can reach our customer support team by phone, email, or through the live chat on our website. We are available [business hours] to assist you.",
    },
    // Add more FAQ items as needed
  ];

  const handleClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Frequently Asked Questions
        </h2>

        <div className="flex flex-col md:flex-row items-center">
          {/* Image Section */}
          <div className="md:w-1/2 mb-8 md:mb-0 md:mr-8">
            <img
              src="https://images.pexels.com/photos/5428835/pexels-photo-5428835.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="FAQ"
              className="w-full h-auto max-h-[400px] object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Accordion Section */}
          <div className="md:w-1/2">
            <div className="w-full">
              {faqData.map((faq, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg mb-4"
                  onClick={() => handleClick(index)}
                >
                  <div className="flex justify-between items-center p-5 cursor-pointer">
                    <h3 className="font-medium text-lg">{faq.question}</h3>
                    <span
                      className={`transition-transform duration-300 ${
                        activeIndex === index ? "rotate-180" : ""
                      }`}
                    >
                      &#9660;
                    </span>
                  </div>
                  {activeIndex === index && (
                    <div className="p-5 border-t border-gray-200">
                      <p className="text-gray-700">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
