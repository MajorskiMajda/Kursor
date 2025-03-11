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
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="description" content="Testirajte svoje znanje engleskog jezika uz besplatne online testove, prilagođene za korisnike sa Balkana, uključujući Srbiju, Hrvatsku, Bosnu i Hercegovinu." />
        <meta name="keywords" content="engleski jezik, testiranje engleskog, Balkan, testovi za Balkance, Srbija, Hrvatska, Bosna i Hercegovina" />
        <meta name="author" content="Kursor" />
        
        <meta property="og:title" content="Online Testiranje Engleskog Jezika za Balkance" />
        <meta property="og:description" content="Besplatni testovi engleskog jezika prilagođeni Balkanu. Proverite svoj nivo i unapredite jezičke veštine." />
        <meta property="og:image" content="URL do slike koja predstavlja testiranje" />
        <meta property="og:url" content="https://www.vasastranicatestiranje.com" />
        <meta property="og:type" content="website" />

        <meta name="geo.region" content="RS" />
        <meta name="geo.region" content="HR" />
        <meta name="geo.region" content="BA" />
        <meta name="geo.placename" content="Balkan" />
        <meta name="robots" content="index, follow" />
        <title>Testovi</title>
      </head>
      <body className={`${roboto.variable} ${poppins.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}