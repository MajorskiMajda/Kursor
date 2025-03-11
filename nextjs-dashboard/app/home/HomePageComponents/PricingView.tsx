import SectionLayout from "./SectionLayout";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import Head from 'next/head';

const pricingPlansAdults = [
  {
    name: "Pocetni Nivo",
    price: "$50",
    features: [
      "Pristup A1/A2 video i PDF materijalima 6 meseci",
      "Mogucnost zakazivanja 4 casa mesecno besplatno",
      "",
    ],
    buttonLabel: "Prijavi se",
  },
  {
    name: "Srednji Nivo",
    price: "$60",
    features: [
      "Pristup B1/B2 video i PDF materijalima 6 meseci",
      "Mogucnost zakazivanja 4 casa mesecno besplatno",
      "Email support",
    ],
    buttonLabel: "Prijavi se",
  },
  {
    name: "Visoki Nivo",
    price: "$80",
    features: [
      "Pristup C1 video i PDF materijalima 6 meseci",
      "Mogucnost zakazivanja 4 casa mesecno besplatno",
      "Community support",
    ],
    buttonLabel: "Prijavi se",
  },
  {
    name: "Kompletan kurs",
    price: "$150",
    features: [
      "Pristup svim video i PDF materijalima godinu dana",
      "Mogucnost zakazivanja 2 casa nedeljno besplatno",
      "Community support",
    ],
    buttonLabel: "Prijavi se",
  },
];

const PricingAdults = () => {
  return (
    <>
      <Head>
        <title>Kursevi za Odrasle - Online Časovi Engleskog</title>
        <meta name="description" content="Izaberite najbolji kurs za odrasle sa različitim nivoima koji uključuju pristup video i PDF materijalima, kao i besplatne časove." />
        <meta property="og:title" content="Kursevi za Odrasle - Online Časovi Engleskog" />
        <meta property="og:description" content="Izaberite najbolji kurs za odrasle sa različitim nivoima. Nudimo časove prilagođene svakom nivou engleskog jezika." />
        <meta property="og:image" content="URL_TO_YOUR_IMAGE" />
        <meta property="og:url" content="URL_TO_THIS_PAGE" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@yourTwitterHandle" />
        <meta name="twitter:title" content="Kursevi za Odrasle - Online Časovi Engleskog" />
        <meta name="twitter:description" content="Izaberite najbolji kurs za odrasle sa različitim nivoima. Nudimo časove prilagođene svakom nivou engleskog jezika." />
        <meta name="twitter:image" content="URL_TO_YOUR_IMAGE" />
      </Head>
      
      <SectionLayout
        lgGridCols="lg:grid-cols-4"  // This will define the grid for large screens
        sectionId="pricing-adults"
        title="Kursevi za Odrasle"
        description="Izaberite najbolji kurs za odrasle"
        items={pricingPlansAdults}
        type="pricing"
      />
    </>
  );
};

export default PricingAdults;
