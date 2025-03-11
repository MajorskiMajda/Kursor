"use client";

import SectionLayout from "./SectionLayout";
import { CalendarDaysIcon, LanguageIcon, PlayCircleIcon, CurrencyEuroIcon } from "@heroicons/react/24/solid";

const FeatureSection = () => {
  const features = [
    {
      title: "Usavršite Engleski",
      description: "Ukoliko vam engleski treba za razvoj karijere ili ličnu upotrebu naša platforma će Vam pomoći da ga sa sigurnošću naučite i počnete govorit!",
      icon: LanguageIcon,
    },
    {
      title: "Video predavanja",
      description: "Na našoj platformi imate mogućnost gledanja video predavanja bilo kada i bilo gde. Predavanja možete gldati neograničeno puta.",
      icon: PlayCircleIcon,
    },
    {
      title: "Online Časovi",
      description: "Nudimo Vam mogućnost zakazivanja online časova sa našim predavačima. Ukolio imate pitanja vezana za neku lekciju ili Vam je potrebno da ih sa nekime ponovite ovo je prava opcija za VAs",
      icon: CalendarDaysIcon,
    },
    {
      title: "Pristpačne cene",
      description: "Poslednje ali ne i manje bitno, nudimo pristupačne cene kurseva i online časova. Tako da svako ima priliku da nauči engleski jezik. ",
      icon: CurrencyEuroIcon,
    },
  ];

  return (
    <SectionLayout
    
    lgGridCols="lg:grid-cols-4" 
      sectionId="feature-section"
      title="Benefiti naše platforme"
      description="Naša platforma Vam nudi sve što Vam je potrebno za usavršavanje engleskog jezika, gledanje video predavanja, zakazivanje online časova, pristupačne cene i najvažnije dostupnost 24-7. Znamo koliko je teško uskladiti svakodnevne obaveze sa rasporedom predavača, zato smo mi za Vas napravili online kurseve gde ćete moći da gledate video predavanja kada god to Vama odgovara i puštate ih onoliko puta koliko Vam je to potrebno."
      items={features}
      type="features" // Pass 'features' to render the feature layout
    />
  );
};

export default FeatureSection;
