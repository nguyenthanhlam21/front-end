import Brand from '../../components/user/brand'
import Content2Product from '../../components/user/content2Product'
import ContentProduct from '../../components/user/contentProduct'
import NewsNoText from '../../components/user/newsNoText'
import NewsText from '../../components/user/newsText'
import ProductNew from '../../components/user/productNew'
import TabSUport from '../../components/user/tabSUport'
const homePage = () => {
  return (
    <> 
      <TabSUport/>
      <NewsNoText />
      <ProductNew />
      <div className="mt-4"><ContentProduct /></div>
      <div className="mt-4"><Content2Product /></div>
      <div className="mt-11"><NewsText/></div>
      <div className="mt-20"><Brand/></div>
    </>
  )
}

export default homePage