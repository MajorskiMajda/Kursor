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

        <meta name="description" content="Prijavite se na Kursor i započnite svoje online učenje engleskog jezika. Pristupite testovima, lekcijama i materijalima prilagođenim za korisnike sa Balkana." />

        <meta name="keywords" content="prijava, učenje engleskog, ucenje engleskog, online kurs, online predavanja, Srbija, Hrvatska, Bosna, Balkanci, engleski jezik, Kursor" />

        <meta name="author" content="Kursor" />

        <meta property="og:title" content="Prijavite se za učenje engleskog jezika" />
        <meta property="og:description" content="Pristupite besplatnim testovima i lekcijama engleskog jezika sa Kursor platforme. Prijavite se i unapredite svoje jezičke veštine!" />
        <meta property="og:image" content="URL to an image representing login" />
        <meta property="og:url" content="https://www.vasastranicatestiranje.com/login" />
        <meta property="og:type" content="website" />


        <meta name="geo.region" content="RS" />
        <meta name="geo.region" content="HR" />
        <meta name="geo.region" content="BA" />
        <meta name="geo.placename" content="Balkan" />
        <meta name="robots" content="index, follow" />

        <title>Prijavite se na Kursor - Učenje Engleskog Jezika</title>
      </head>
      <body className={`${roboto.variable} ${poppins.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}