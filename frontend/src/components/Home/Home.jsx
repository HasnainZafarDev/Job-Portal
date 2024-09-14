import { useContext } from 'react';
import {context} from '../../main'
import { Navigate } from 'react-router-dom';
import HeroSection from '../Home/HeroSection'
import HowItWorks from '../Home/HowItWorks'
import PopularCategories from '../Home/PopularCategories'
import PopularCompanies from '../Home/PopularCompanies'

const Home = () => {
  const {isAuthorized}= useContext(context)
  if(!isAuthorized){
    return <Navigate to={"/login"}/>
  }
  return (
    <section className='homepage page'>
      <HeroSection/>
      <HowItWorks/>
      <PopularCategories/>
      <PopularCompanies/>
    </section>
  )
}
export default Home;
