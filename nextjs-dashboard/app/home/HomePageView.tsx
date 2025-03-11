import MainPage from './HomePageComponents/MainView';
import Hello from './HomePageComponents/HelloAnimation';
import Rest from './HomePageComponents/BenefitsView';
import Questions from './HomePageComponents/QuestionsView';
import FeatureSection from './HomePageComponents/FeaturesView';
import HowItWorks from './HomePageComponents/StepsView';
import TestForm from './HomePageComponents/ContactView'
import Nav from './HomePageComponents/NavBar'
import Footer from './HomePageComponents/Footer'
import CustomerReviews from './HomePageComponents/CustomerReviews';

const gg = "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum  by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."


export default function HomePage() {
    return (
        <>
            <Nav/>
            <MainPage image={"/hero.jpg"} opis={gg} showButton={true}  showButton2={false}  subH={
        <>
            <span className="text-[#0771d3]">Bilo kada</span> <span className="text-[#D8315B]">Bilo gde</span>
        </>
    }  hideImageOnMobile={true} textSizeClass="lg:text-8xl text-6xl"   text="Naučite Engleski" subHColor='#D8315B' className='order-last'></MainPage>
            <Hello className="hidden md:block" />
            <Rest />
            <FeatureSection />
            <HowItWorks />
            {/* <Pricing /> */}
            <MainPage image={"/girl.jpg"} hideImageOnMobile={false} textSizeClass="lg:text-5xl text-3xl" opis={gg} subH=''  showButton2={true} showButton={false} text="Naucite" className='order-first'></MainPage>
            <MainPage image={"/boy.jpg"} hideImageOnMobile={false} textSizeClass="lg:text-5xl text-3xl" opis={gg} subH='' showButton2={false} showButton={false} text="Naucite" className='lg:order-last order-first'></MainPage>
            <CustomerReviews />
            {/* <PricingKids /> */}
            <MainPage image={"/dad.jpg"} hideImageOnMobile={false} textSizeClass="lg:text-5xl text-3xl" opis={gg} subH='' showButton2={false} showButton={false} text="Naucite" className='order-first'></MainPage>
            <TestForm />
            <Questions />
            <Footer /> 
        </>
    );
}