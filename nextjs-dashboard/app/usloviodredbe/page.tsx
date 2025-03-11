import React from "react";
import Nav from '../home/HomePageComponents/NavBar';
import Footer from '../home/HomePageComponents/Footer';

const TermsAndConditions: React.FC = () => {
  return (
    <div className="bg-pattern">
      <Nav />
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg my-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">
          USLOVI I ODREDBE KORIŠĆENJA PLATFORME ZA ONLINE UČENJE JEZIKA
        </h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-neutral-300-800 border-b-2 border-gray-200 pb-2">1. OPŠTE INFORMACIJE</h2>
          <p className="text-neutral-300-700 leading-relaxed">
            Ovi Uslovi i odredbe ("Uslovi") regulišu korišćenje online platforme za učenje jezika ("Platforma"), kojom upravlja [Naziv Vaše Kompanije] ("Mi", "Naša Kompanija", "Usluga"). Pristupanjem i korišćenjem Platforme, korisnik ("Vi", "Korisnik") prihvata ove Uslove.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-neutral-300-800 border-b-2 border-gray-200 pb-2">2. USLUGE</h2>
          <ul className="list-disc list-inside text-neutral-300-700 space-y-2 pl-5">
            <li>Gledaju video-predavanja putem striminga, ali ih ne mogu preuzimati.</li>
            <li>Preuzimaju dostupne PDF materijale.</li>
            <li>Zakazuju online časove u skladu sa izabranim paketom.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-neutral-300-800 border-b-2 border-gray-200 pb-2">3. KORISNIČKI NALOZI</h2>
          <p className="text-neutral-300-700 leading-relaxed">
            3.1. Da biste koristili Platformu, morate kreirati korisnički nalog i pružiti tačne i potpune informacije.
          </p>
          <p className="text-neutral-300-700 leading-relaxed">
            3.2. Odgovorni ste za čuvanje poverljivosti svojih podataka za prijavu i ne smete ih deliti sa trećim licima.
          </p>
          <p className="text-neutral-300-700 leading-relaxed">
            3.3. Mi imamo pravo da suspendujemo ili ukinemo nalog u slučaju kršenja ovih Uslova.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-neutral-300-800 border-b-2 border-gray-200 pb-2">4. PLANOVI I PRETPLATE</h2>
          <p className="text-neutral-300-700 leading-relaxed">
            4.1. Platforma nudi pakete od 2 do 4 meseca, koji korisnicima omogućavaju pristup sadržaju u skladu sa njihovim planom.
          </p>
          <p className="text-neutral-300-700 leading-relaxed">
            4.2. Svi plaćeni paketi su lični i ne mogu se deliti sa drugim osobama.
          </p>
          <p className="text-neutral-300-700 leading-relaxed">
            4.3. Plaćanja su nepovratna, osim u izuzetnim slučajevima predviđenim ovim Uslovima.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-neutral-300-800 border-b-2 border-gray-200 pb-2">5. PRAVILA KORIŠĆENJA</h2>
          <p className="text-neutral-300-700 leading-relaxed">
            5.1. Korisnici ne smeju preuzimati, distribuirati, menjati ili deliti video-sadržaj na bilo koji način. (Zaštićeno Zakonom o autorskim i srodnim pravima, Član 20, 21, 22 Zakonika Republike Srbije)
          </p>
          <p className="text-neutral-300-700 leading-relaxed">
            5.2. Neovlašćeno kopiranje ili distribucija sadržaja predstavlja kršenje autorskih prava i može dovesti do pravnih posledica. (Krivični zakonik Republike Srbije, član 199 - Povreda autorskog prava)
          </p>
          <p className="text-neutral-300-700 leading-relaxed">
            5.3. Korisnici su odgovorni za poštovanje termina zakazanih online časova; otkazivanje ili promena termina mogući su samo u skladu sa pravilima Platforme.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-neutral-300-800 border-b-2 border-gray-200 pb-2">6. OGRANIČENJE ODGOVORNOSTI</h2>
          <p className="text-neutral-300-700 leading-relaxed">
            6.1. Mi ne garantujemo da će Platforma uvek biti dostupna bez prekida ili grešaka.
          </p>
          <p className="text-neutral-300-700 leading-relaxed">
            6.2. Nismo odgovorni za tehničke probleme ili gubitke podataka koji nastanu usled neispravnog korišćenja Platforme od strane korisnika.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-neutral-300-800 border-b-2 border-gray-200 pb-2">7. POVRAČAJ I OTKAZIVANJE</h2>
          <p className="text-neutral-300-700 leading-relaxed">
            7.1. Povraćaj sredstava nije moguć nakon kupovine pretplate, osim ako korisnik nije dobio pristup kupljenim sadržajima iz tehničkih razloga koji su došli s Naše strane.
          </p>
          <p className="text-neutral-300-700 leading-relaxed">
            7.2. Otkazivanje pretplate ne utiče na već kupljene periode i korisnik može nastaviti korišćenje do isteka paketa.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-neutral-300-800 border-b-2 border-gray-200 pb-2">8. ZAŠTITA PODATAKA</h2>
          <p className="text-neutral-300-700 leading-relaxed">
            8.1. Svi lični podaci korisnika biće zaštićeni u skladu sa važećim zakonima o zaštiti podataka i Našom Politikom privatnosti. (Zakon o zaštiti podataka o ličnosti, Član 8 i 12)
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-neutral-300-800 border-b-2 border-gray-200 pb-2">9. IZMENE USLOVA</h2>
          <p className="text-neutral-300-700 leading-relaxed">
            Mi zadržavamo pravo da u bilo kom trenutku izmenimo ove Uslove. Ažurirane verzije biće dostupne na Platformi, a nastavak korišćenja nakon izmene znači da se slažete sa novim Uslovima.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-neutral-300-800 border-b-2 border-gray-200 pb-2">10. KONTAKT</h2>
          <p className="text-neutral-300-700 leading-relaxed">
            Za sva pitanja u vezi sa ovim Uslovima možete nas kontaktirati na [Vaša Email Adresa].
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default TermsAndConditions;