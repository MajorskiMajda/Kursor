import SectionLayout from "./SectionLayout";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import Head from 'next/head';

const pricingPlansKids = [
  {
    name: "10 Online Casova Mesecno",
    price: "$50",
    features: [
      "Dva casa po 45 min nedeljno",
      "Rad po skolskom programu",
      "Prilagodjeno svim uzrastima",
      "Personalni casovi 1 na 1",
    ],
    buttonLabel: "Prijavi se",
  },
  {
    name: "16 Online Casova Mesecno",
    price: "$60",
    features: [
      "Cetiri casa po 45 min nedeljno",
      "Rad po skolskom programu",
      "Prilagodjeno svim uzrastima",
      "Personalni casovi 1 na 1",
    ],
    buttonLabel: "Prijavi se",
  },
  {
    name: "24 Online Casova Mesecno",
    price: "$80",
    features: [
      "Sest casova po 45 min nedeljno",
      "Rad po skolskom programu",
      "Prilagodjeno svim uzrastima",
      "Personalni casovi 1 na 1",
    ],
    buttonLabel: "Prijavi se",
  },
];

const PricingKids = () => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="description" content="Your description goes here for SEO purposes" />
        <meta name="author" content="Your Name or Company" />
        <meta property="og:title" content="Your Page Title" />
        <meta property="og:description" content="Your Open Graph Description" />
        <meta property="og:image" content="URL to an image for social sharing" />
        <meta property="og:url" content="Your page URL" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@yourTwitterHandle" />
        <meta name="twitter:title" content="Your Page Title" />
        <meta name="twitter:description" content="Your Twitter description" />
        <meta name="twitter:image" content="URL to image for Twitter" />
        <title>Kids</title>
      </Head>

      <SectionLayout
        lgGridCols="lg:grid-cols-3"
        sectionId="pricing-kids"
        title="Kursevi za Decu"
        description="Izaberite najbolji kurs za decu"
        items={pricingPlansKids}
        type="pricing"
      />
    </>
  );
};

export default PricingKids;
