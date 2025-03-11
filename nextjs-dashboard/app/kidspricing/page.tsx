import KidsPricing from '../home/HomePageComponents/KidsPricing'
import Nav from '../home/HomePageComponents/NavBar'
import Footer from '../home/HomePageComponents/Footer'
import Questions from '../home/HomePageComponents/QuestionsView'
import Compare from './compare'
import Head from 'next/head';


export default function HomePage() {
    return (
        <>
            <Nav />
            <KidsPricing />
            <Compare />
            <Questions />
            <Footer />
        </>
    );
}