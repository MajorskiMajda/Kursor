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

                <meta name="description" content="Online časovi engleskog jezika za decu, prilagođeni svim uzrastima. Naučite engleski na zabavan i interaktivan način, uz podršku instruktora sa Balkana." />

                <meta name="keywords" content="online časovi za decu,casovi engleskog za decu, oline casovi za decu, časovi engleskog za decu, učenje engleskog, online edukacija, online nastava za decu, engleski jezik za decu, Balkan" />

                <meta name="author" content="Kursor" />

                <meta property="og:title" content="Online Časovi Engleskog Jezika za Decu - Kursor" />
                <meta property="og:description" content="Online časovi engleskog jezika za decu svih uzrasta. Prilagodite učenje na osnovu nivoa i uzrasta, sa iskusnim učiteljima sa Balkana." />
                <meta property="og:image" content="URL to an image representing kids learning English" />
                <meta property="og:url" content="https://www.vasastranicatestiranje.com/online-casovi-za-decu" />
                <meta property="og:type" content="website" />

                <meta name="geo.region" content="RS" />
                <meta name="geo.region" content="HR" />
                <meta name="geo.region" content="BA" />
                <meta name="geo.placename" content="Balkan" />
                <meta name="robots" content="index, follow" />
                <title>Casovi Engleskog za Decu</title>
            </head>
            <body className={`${roboto.variable} ${poppins.variable} antialiased`}>
                {children}
            </body>
        </html>
    );
}