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

                <meta name="description" content="Pročitajte uslove i odredbe korišćenja Kursor platforme. Saznajte prava i obaveze korisnika prilikom pristupa testovima i sadržajima na sajtu." />

                <meta name="keywords" content="uslovi i odredbe, pravila korišćenja, Kursor, korisnička prava, legalni uslovi, balkanske platforme" />

                <meta name="author" content="Kursor" />

                <meta property="og:title" content="Uslovi i Odredbe Korišćenja - Kursor" />
                <meta property="og:description" content="Pročitajte uslove i odredbe za korišćenje Kursor platforme. Upoznajte se sa pravima i obavezama korisnika." />
                <meta property="og:image" content="URL to an image representing terms and conditions" />
                <meta property="og:url" content="https://www.vasastranicatestiranje.com/uslovi-i-odredbe" />
                <meta property="og:type" content="website" />

                <meta name="geo.region" content="RS" />
                <meta name="geo.region" content="HR" />
                <meta name="geo.region" content="BA" />
                <meta name="geo.placename" content="Balkan" />
                <meta name="robots" content="index, follow" />
                <title>Uslovi i odredbe</title>
            </head>
            <body className={`${roboto.variable} ${poppins.variable} antialiased`}>
                {children}
            </body>
        </html>
    );
}