import '@/app/ui/global.css';
import { roboto, poppins } from '@/app/ui/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sr">
    <head>
    <meta charSet="UTF-8" />
    <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

                <meta name="description" content="Online kursevi engleskog jezika koje mozete gledati 24h, bilo kada i bilo gde! Naučite engleski uz vec snimljena predavanja i uz podršku instruktora sa Balkana." />

                <meta name="keywords" content="online kurs engleskog, online kurs za odrasle, kurs engleskog za odrasle, oline predavanja za odrasle, online predavanja , online casovi engleskog, video materijali engleskog, video materijali engleskog za odrasle, kurs engleskog, kursevi engleskog, poslovni engleski, učenje engleskog, online edukacija, online nastava za odrasle, online nastava, engleski jezik, Balkan" />

                <meta name="author" content="Kursor" />

                <meta property="og:title" content="Kursevi Engleskog Za Odrasle - Kursor" />
                <meta property="og:description" content="Online kursevi engleskog jezika za odrasle, prilagođeni svima. Naučite engleski uz vec snimljena predavanja gledajte bilo kada i bilo gde, uz podršku instruktora sa Balkana." />
                <meta property="og:image" content="URL to an image representing kids learning English" />
                <meta property="og:url" content="https://www.vasastranicatestiranje.com/online-casovi-za-decu" />
                <meta property="og:type" content="website" />

                <meta name="geo.region" content="RS" />
                <meta name="geo.region" content="HR" />
                <meta name="geo.region" content="BA" />
                <meta name="geo.placename" content="Balkan" />
                <meta name="robots" content="index, follow" />
                <title>Kursevi Engleskog</title>
      </head>
      <body className={`${roboto.variable} ${poppins.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}