import React, { useEffect, useState } from 'react'
import MenuNews from '../../components/user/menuNews'
import DetailNews from '../../components/user/detailNews'
import Brand from '../../components/user/brand'
import Loading from '../../theme/loading'



const detailNews = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const newsDetail = async () => {
    try {
      setLoading(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    newsDetail();
  }, []);
  return (
    <>
    <Loading isShow={loading} />
    <div className="xs:flex-none md:flex-none lg:flex py-8">
        <div className="xs:w-full lg:w-3/4 pr-5"><DetailNews/></div>
        <div className="xs:mt-5  xs:w-full lg:w-1/4 pl-6"><MenuNews/></div>
    </div>
    <Brand/>
    </>
  )
}

export default detailNews