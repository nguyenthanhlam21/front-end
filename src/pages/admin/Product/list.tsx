import React, { useEffect, useState } from 'react';
import { useTheme } from '../../../contexts/theme';
import { Link } from 'react-router-dom';
import { useLoading } from '../../../contexts/loading';
import { TPproducts } from '../../../types/products';
import axios from 'axios';
import { Category } from '../../../types/categories';
import { TPbrand } from '../../../types/brand';
import { toast } from 'react-toastify';

const List = () => {
    const { darkMode } = useTheme();
    const { setLoading } = useLoading();
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<TPproducts[]>([]);
    const [brands, setBrands] = useState<TPbrand[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [minPrice, setMinPrice] = useState<number | "">(""); 
    const [maxPrice, setMaxPrice] = useState<number | "">("");
    const [selectedCategory, setSelectedCategory] = useState<string>("default");
    const [selectedBrand, setSelectedBrand] = useState<string>("default");


    const getAllBrand = async () => {
        try {
          setLoading(true);
          const { data } = await axios.get("/api/brand");
          setBrands(data.data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/categories");
            setCategories(response.data.data || []);
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setLoading(false);
        }
    };

    const getAllProduct = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get("/api/products");
            setProducts(data.data);
            console.log(data.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error response:', error.response?.data);
            } else {
                console.error('Error:', error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async (id: string) => {
        const token = window.localStorage.getItem('token');
    
        if (!token) {
            console.error("No token found!");
            return;
        }
    
        if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
            try {
                setLoading(true);
                await axios.delete(`/api/products/delete/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                toast.warning(`Đã xóa sản phẩm ${id}`);
                getAllProduct();
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error('Error response:', error.response?.data);
                    setErrorMessage(error.response?.data.message || "Error occurred");
                } else {
                    console.error('Error:', error.message);
                }
            } finally {
                setLoading(false);
            }
        }
    };
    

    useEffect(() => {
        getAllProduct();
        fetchCategories();
        getAllBrand();
    }, []);

    const normalizeString = (str: string) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    };

    const filteredProducts = products.filter((product) => {
        const normalizedTitle = normalizeString(product.title);
        const normalizedQuery = normalizeString(searchQuery);
    
        const matchesSearch = normalizedTitle.includes(normalizedQuery);
        const matchesPrice =
            (minPrice === "" || product.price >= Number(minPrice)) &&
            (maxPrice === "" || product.price <= Number(maxPrice));
        const matchesCategory =
            selectedCategory === "default" || product.category?._id === selectedCategory;
        const matchesBrand =
            selectedBrand === "default" || product.brand?._id === selectedBrand;
    
        return matchesSearch && matchesPrice && matchesCategory && matchesBrand;
    });
    

    return (
        <>
            <div className={`${darkMode ? 'bg-[#24303F]' : 'bg-white'} p-4 rounded-lg shadow-md mt-6`}>
                <div className="flex justify-between">
                    <h2 className={`${darkMode ? 'text-white' : ''} text-xl font-semibold mb-4`}>Lọc sản phẩm</h2>
                </div> 
                <div className="w-full flex gap-x-2">
                    <div className="w-1/3">
                        <input
                            type="search"
                            placeholder="Tìm kiếm sản phẩm..."
                            className="border p-2 rounded w-full"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-between w-2/3 gap-x-2">
                        <input
                            type="number"
                            placeholder="Giá tối thiểu"
                            className="border p-2 rounded w-40"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : "")}
                        />
                        <input
                            type="number"
                            placeholder="Giá tối đa"
                            className="border p-2 rounded w-40"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : "")}
                        />
                        <select
                            className={`${darkMode ? 'bg-[#2c3945] text-white' : 'bg-white text-black'} border w-full p-2 rounded`}
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="default">Danh mục</option>
                            {categories.map((cate) => (
                                <option key={cate._id} value={cate._id}>
                                    {cate.name}
                                </option>
                            ))}
                        </select>
                        <select
                            className={`${darkMode ? 'bg-[#2c3945] text-white' : 'bg-white text-black'} border w-full p-2 rounded`}
                            value={selectedBrand}
                            onChange={(e) => setSelectedBrand(e.target.value)}
                        >
                            <option value="default">Thương hiệu</option>
                            {brands.map((brand) => (
                                <option key={brand._id} value={brand._id}>
                                    {brand.name}
                                </option>
                            ))}
                        </select>
                        <button
                            className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            onClick={() => {
                                setSearchQuery("");
                                setMinPrice("");
                                setMaxPrice("");
                                setSelectedCategory("default");
                                setSelectedBrand("default");
                            }}
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div>
            <div className="pb-10">
                <div className={`${darkMode ? 'bg-[#24303F]' : 'bg-white'} p-4 rounded-lg shadow-md mt-6`}>
                    <div className="flex justify-between">
                        <h2 className={`${darkMode ? 'text-white' : ''} text-xl font-semibold mb-4`}>Danh sách sản phẩm</h2>
                        <button className={`${darkMode ? 'bg-gray-500 text-white' : 'bg-gray-500 text-white'} px-3 py-1 rounded-md hover:bg-gray-600`}>
                            <Link to={'../product/add'}>Thêm sản phẩm</Link>
                        </button>
                    </div> 
                    <table className="min-w-full mt-4">
                        <thead>
                            <tr className={`${darkMode ? 'bg-[#313D4A] text-[rgb(174,183,192)] ' : 'bg-gray-200'}`}>
                                <th className="py-2 px-4 text-left">Id</th>
                                <th className="py-2 px-4 text-left">Tên</th>
                                <th className="py-2 px-4 text-left">Giá</th>
                                <th className="py-2 px-4 text-left">Thương hiệu</th>
                                <th className="py-2 px-4 text-left">Danh mục</th>
                                <th className="py-2 px-4 text-left">Hình ảnh</th>
                                <th className="py-2 px-4 text-left"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map((product,index) => (
                                <tr className={`${darkMode ? 'text-meta-3' : ''}`} key={index}>
                                    <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b py-2 px-4`}>{index+1}</td>
                                    <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b py-2 px-4`}>{product.title}</td>
                                    <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b py-2 px-4`}>{product.price}</td>
                                    <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b py-2 px-4`}>
                                        {product.brand ? product.brand.name : 'N/A'}
                                    </td>
                                    <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b py-2 px-4`}>
                                        {product.category ? product.category.name : 'N/A'}
                                    </td>
                                    <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b py-2 px-4`}>
                                        <div className="flex space-x-2">
                                            {product.images.map((img, index) => (
                                                <img key={index} src={img} alt={product.title} className="w-16 h-16 object-cover" />
                                            ))}
                                        </div>
                                    </td>
                                    <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b gap-x-1 py-2 px-4 flex`}>
                                        <button 
                                            onClick={() => deleteProduct(product._id)} 
                                            className={`${darkMode ? 'bg-[#E94E77] text-white' : 'bg-red-500 text-white'} px-3 py-1 rounded-md  hover:bg-red-600`}
                                        >
                                            Xóa
                                        </button>
                                        <Link to={`../product/edit/${product._id}`}>
                                            <button className={`${darkMode ? 'bg-[#4CAF50] text-white' : 'bg-green-500 text-white'} px-3 py-1 rounded-md hover:bg-green-600`}>
                                                Sửa
                                            </button>
                                        </Link>
                                        <Link to={`../product/detail/${product._id}`}>
                                            <button className={`${darkMode ? 'bg-[#4CAF50] text-white' : 'bg-green-500 text-white'} px-3 py-1 rounded-md hover:bg-green-600`}>
                                                Chi tiết
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default List;
