import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-20 sm:py-24">
      <h1 className="text-3xl font-extrabold mb-6 tracking-tight text-left">
        About NoaShip
      </h1>

      {/* Intro */}
      <section className="mb-16">
        <p className="text-lg text-gray-800 leading-relaxed">
          <strong>NoaShip</strong> delivers a superior shipping experience
          tailored to meet the demands of both urban and rural Bangladesh.
          Whether you’re an entrepreneur, a thriving online marketplace, or an
          individual sending a gift, NoaShip guarantees your parcel’s safe and
          timely arrival.
        </p>
      </section>

      {/* Mission */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4 tracking-wide">
          Our Mission
        </h2>
        <p className="text-gray-700 leading-relaxed text-base md:text-lg">
          At NoaShip, our mission transcends traditional parcel delivery. We
          empower individuals and businesses throughout Bangladesh by
          establishing a reliable, accessible, and efficient delivery ecosystem.
          From the bustling heart of Dhaka to the remotest corners of the
          Chittagong Hill Tracts, we envision parcel shipping as effortless as
          sending a message. By leveraging innovative technology and a dedicated
          rider network, we break down logistical barriers to seamlessly connect
          communities nationwide.
        </p>
      </section>

      {/* Story & Vision */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4 tracking-wide">
          Our Story & Vision
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4 text-base md:text-lg">
          NoaShip was established to address a critical gap in Bangladesh’s
          logistics sector — bridging the divide between urban and rural
          delivery accessibility. While metro areas benefited from strong parcel
          networks, many districts, especially rural ones, remained underserved.
          Starting in Noakhali, NoaShip rapidly expanded its footprint to cover
          all 64 districts, earning nationwide trust through exceptional
          service.
        </p>
        <p className="text-gray-700 leading-relaxed text-base md:text-lg">
          Our founders, a team of logistics veterans, tech innovators, and
          community champions, designed NoaShip for scalability and inclusivity.
          By integrating advanced route optimization, rider assignment
          algorithms, and an intuitive interface, we ensure that geography never
          hinders connectivity or commerce. Our vision: to make every parcel
          reachable and every delivery experience world-class.
        </p>
      </section>

      {/* Looking Ahead */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4 tracking-wide">
          Looking Ahead
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4 text-base md:text-lg">
          NoaShip’s future is fueled by continuous innovation and community
          engagement. We are committed to enhancing our technology stack, rider
          management, and user experience through your valuable feedback and
          emerging trends. Exciting features on the horizon include AI-powered
          delivery forecasts, expanded payment options, and intuitive mobile
          applications.
        </p>
        <p className="text-gray-700 leading-relaxed text-base md:text-lg">
          Our ultimate goal is not just parcel delivery but delivering trust,
          convenience, and economic growth across Bangladesh — building an
          unprecedented bridge between people and places.
        </p>
      </section>

      {/* Core Offerings */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 tracking-wide">
          What We Offer
        </h2>
        <ul className="list-disc pl-6 space-y-6 text-gray-700 text-base md:text-lg">
          <li className="flex items-start gap-3">
            <span className="text-2xl leading-none" role="img" aria-label="package">
              📦
            </span>
            <div>
              <strong>Effortless Parcel Booking:</strong> Seamlessly book
              shipments online with transparent pricing and real-time tracking
              from pickup to delivery.
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-2xl leading-none" role="img" aria-label="delivery bike">
              🚴‍♂️
            </span>
            <div>
              <strong>Dedicated Rider Network:</strong> Professional riders
              committed to timely and secure deliveries, reaching even the most
              remote locations.
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-2xl leading-none" role="img" aria-label="secure payment">
              🔒
            </span>
            <div>
              <strong>Secure Payment Processing:</strong> Powered by Stripe, we
              offer multiple safe payment options for your convenience.
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-2xl leading-none" role="img" aria-label="map">
              📍
            </span>
            <div>
              <strong>Nationwide Coverage:</strong> Comprehensive service across
              all 64 districts of Bangladesh, connecting urban centers and rural
              communities alike.
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-2xl leading-none" role="img" aria-label="dashboard">
              📊
            </span>
            <div>
              <strong>Role-Based Dashboards:</strong> Tailored interfaces for
              Admins, Riders, and Customers designed to optimize workflow and
              visibility.
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-2xl leading-none" role="img" aria-label="support">
              💬
            </span>
            <div>
              <strong>Responsive Customer Support:</strong> Dedicated support
              channels to assist with inquiries, ensuring a smooth and worry-free
              shipping experience.
            </div>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default About;
