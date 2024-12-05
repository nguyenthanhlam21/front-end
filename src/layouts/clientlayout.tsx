import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/user/header";
import Banner from "../components/user/Banner";
import FilterSlect from "../theme/filterSlect";
import LoginFixed from "../components/user/LoginFixed";
import FooterFixed from "../components/user/footerFixed";
import Footer from "../components/user/footer";
import { useLoading } from "../contexts/loading";
import Loading from "../theme/loading";

function ClientLayout() {
    const location = useLocation();
    const { loading } = useLoading();

    const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
    const isHomePage = location.pathname === '/';
  return (
    <>
      <Loading isShow={loading} />
      {!isAuthPage && <Header />}
      {isHomePage && <Banner />}
      {!isAuthPage && !isHomePage && <FilterSlect style={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} id={`filter`}/>}
      <div  className='xs:px-[20px] xl:px-[150px]'><Outlet /></div>
      {!isAuthPage && <FooterFixed />}
      {!isAuthPage && <Footer />}
    </>
  );
}

export default ClientLayout;
