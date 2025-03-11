import Pricing from '../home/HomePageComponents/PricingView';
import Nav from '../home/HomePageComponents/NavBar'
import Footer from '../home/HomePageComponents/Footer'
import Compare from './compare'
import Questions from '../home/HomePageComponents/QuestionsView'

export default function HomePage() {
    return (
        <>
            <Nav />
            <Pricing />
            <Compare />
            <Questions />
            <Footer />
        </>
    );
}