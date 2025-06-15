import Layout from "../../Layout";
import loginBg from "../../assets/images/search.jpg";

const HeroBanner = ({ title }) => (
  <div
    className="inset-0 mt-20 md:h-54 h-64 text-white w-screen"
    style={{
      background: `url(${loginBg})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    }}
  >
    <div className="pt-20 px-5 md:px-20">
      <h3 className="text-3xl font-bold">{title}</h3>
    </div>
  </div>
);

export const AboutUs = () => (
  <Layout>
    <HeroBanner title="About Us" />
    <div className="px-5 md:px-20 py-10 text-gray-700 space-y-4">
      <p>
        We are a passionate team committed to making travel booking effortless.
        Whether you're planning a holiday, a business trip, or a spontaneous
        getaway, our platform provides seamless booking experiences across
        flights, hotels, and bus routes.
      </p>
      <p>
        Our mission is to empower travelers with reliable choices, affordable
        options, and memorable journeys. Join thousands of happy travelers who
        trust us with their plans.
      </p>
      <p>
        Our team consists of experienced developers, travel enthusiasts, and
        customer service professionals dedicated to bringing innovation to the
        travel industry.
      </p>
      <p>
        We partner with trusted airlines, hotel chains, and bus operators to
        ensure you receive the best service every time you book with us.
      </p>
      <p>
        WanderSphere isn't just a platform – it's your travel companion for
        discovering new places, connecting with cultures, and creating
        unforgettable experiences.
      </p>
    </div>
  </Layout>
);

export const PrivacyPolicy = () => (
  <Layout>
    <HeroBanner title="Privacy Policy" />
    <div className="px-5 md:px-20 py-10 text-gray-700 space-y-4">
      <p>
        Your privacy is important to us. We collect minimal personal information
        required for booking and service purposes only. We never sell or share
        your data without consent.
      </p>
      <p>
        All transactions are encrypted and stored securely. Users can contact us
        anytime to request data deletion or updates.
      </p>
      <p>
        We adhere to international privacy laws including GDPR and CCPA. You
        have full control over your personal information and may access, modify,
        or delete your data upon request.
      </p>
      <p>
        Cookies are used only to enhance user experience. We do not track you
        across websites or sell behavioral data to third parties.
      </p>
      <p>
        Our team conducts regular audits to ensure the highest level of data
        protection standards.
      </p>
    </div>
  </Layout>
);

export const TermsAndServices = () => (
  <Layout>
    <HeroBanner title="Terms & Services" />
    <div className="px-5 md:px-20 py-10 text-gray-700 space-y-4">
      <p>
        By using our platform, you agree to comply with our booking policies.
        Misuse of services, including fraudulent transactions or abusive
        behavior, may result in account suspension.
      </p>
      <p>
        Prices and availability may change. We are not responsible for
        third-party service disruptions but will assist in resolving any issues
        promptly.
      </p>
      <p>
        You are responsible for reviewing the terms and conditions associated
        with each travel service provider before completing a booking.
      </p>
      <p>
        Refund policies vary depending on airlines, hotels, and bus services. We
        facilitate refunds but do not control the processing time.
      </p>
      <p>
        We reserve the right to modify these terms at any time. Continued use of
        our services implies acceptance of the most recent version.
      </p>
    </div>
  </Layout>
);

export const FAQ = () => (
  <Layout>
    <HeroBanner title="FAQs" />
    <div className="px-5 md:px-20 py-10 text-gray-700 space-y-6">
      <div>
        <h4 className="text-xl font-semibold">1. How do I book a trip?</h4>
        <p>
          You can search and book flights, hotels, or buses directly from our
          homepage.
        </p>
      </div>
      <div>
        <h4 className="text-xl font-semibold">2. Can I cancel my booking?</h4>
        <p>
          Yes, cancellations are allowed based on the service provider's policy.
          Check your booking details for eligibility.
        </p>
      </div>
      <div>
        <h4 className="text-xl font-semibold">3. Is payment secure?</h4>
        <p>
          All payments are processed through secure, encrypted gateways ensuring
          complete safety.
        </p>
      </div>
      <div>
        <h4 className="text-xl font-semibold">
          4. Can I modify my booking after payment?
        </h4>
        <p>
          Modifications depend on the provider. Some allow date changes or
          upgrades, while others may charge a fee or restrict changes.
        </p>
      </div>
      <div>
        <h4 className="text-xl font-semibold">
          5. What should I do if I face issues during my trip?
        </h4>
        <p>
          Contact our 24/7 support team immediately. We will coordinate with
          service providers to resolve issues as quickly as possible.
        </p>
      </div>
      <div>
        <h4 className="text-xl font-semibold">
          6. Are there any hidden charges?
        </h4>
        <p>
          No. All prices shown include applicable taxes and fees. Optional
          add-ons are always clearly listed before checkout.
        </p>
      </div>
    </div>
  </Layout>
);
