import React, { useState, useEffect } from "react";
import AOS from 'aos';

const Faq = () => {
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const initialFaqs = [
    {
      question: "How do I schedule a parcel pickup?",
      answer:
        'You can schedule a pickup by logging into your account and clicking on "Book a Pickup" from your dashboard. Fill in the required details and confirm the request.',
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We currently support Cash on Delivery (COD), mobile banking, and online payments for SME & corporate clients.",
    },
    {
      question: "How can I track my parcel?",
      answer:
        "After booking, you’ll receive a tracking ID. You can use it to track your parcel status in real-time on our website’s tracking page.",
    },
    {
      question:
        "Do you offer delivery services for businesses or bulk shipments?",
      answer:
        "Yes, we provide tailored delivery solutions for SMEs and corporate clients. Please contact our business support team to get started.",
    },
    {
      question: "Is there a customer support team I can reach out to?",
      answer:
        "Absolutely. Our support team is available 7 days a week via phone, live chat, or email to assist with any inquiries.",
    },
  ];

  const extraFaqs = [
    {
      question: "What areas do you cover for delivery?",
      answer:
        "We currently cover all 64 districts across Bangladesh with both urban and rural service availability.",
    },
    {
      question: "How long does delivery usually take?",
      answer:
        "Delivery times vary by location, but most packages are delivered within 1–3 business days.",
    },
    {
      question: "Can I change the delivery address after booking?",
      answer:
        "Yes, contact support as soon as possible to update your delivery information before dispatch.",
    },
    {
      question: "Do you support return shipments?",
      answer:
        "Yes, we offer easy return solutions for eligible parcels within a specified time window.",
    },
    {
      question: "Are there any size or weight limits?",
      answer:
        "We handle packages up to 30kg. For heavier or oversized shipments, contact us for a custom quote.",
    },
    {
      question: "Is insurance available for my parcels?",
      answer:
        "We offer optional insurance coverage for high-value shipments. You can add it during booking.",
    },
    {
      question: "Can I schedule recurring deliveries for my business?",
      answer:
        "Yes, our SME & Corporate plans include automated scheduling and logistics coordination.",
    },
    {
      question: "Will I receive proof of delivery?",
      answer:
        "Yes, we provide digital proof of delivery including recipient signature and delivery timestamp.",
    },
    {
      question: "Do you offer API access for businesses?",
      answer:
        "Yes, we offer API access for business clients to integrate our delivery system into their platforms.",
    },
    {
      question: "How can I become a delivery partner?",
      answer:
        'We welcome reliable partners! Apply through our website’s "Become a Partner" section.',
    },
  ];

  const faqsToShow = showMore ? [...initialFaqs, ...extraFaqs] : initialFaqs;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-8" data-aos="fade-down">
        <h1 className="text-3xl font-bold mb-2">
          Frequently Asked Questions (FAQ)
        </h1>
        <p className="text-gray-600">
          Find quick answers to the most commonly asked questions about our
          parcel delivery and logistics services.
        </p>
      </div>

      <div className="space-y-4">
        {faqsToShow.map((faq, index) => (
          <div
            key={index}
            className="collapse collapse-arrow bg-base-100 border border-base-300"
            data-aos="fade-up"
            data-aos-delay={index * 50}
          >
            <input type="radio" name={`faq-accordion-${index}`} />
            <div className="collapse-title font-semibold">{faq.question}</div>
            <div className="collapse-content text-sm text-gray-700">
              {faq.answer}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8" data-aos="zoom-in">
        <button
          onClick={() => setShowMore(!showMore)}
          className="text-black btn btn-primary"
        >
          {showMore ? "Show Less" : "See More FAQ's"}
        </button>
      </div>
    </div>
  );
};

export default Faq;
