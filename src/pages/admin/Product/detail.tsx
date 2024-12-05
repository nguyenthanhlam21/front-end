import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '../../../contexts/theme';
import Trash from '../../../svg/trash';
import axios from 'axios';
import { useLoading } from '../../../contexts/loading';
import { TPcolor } from '../../../types/color';
import { TPsize } from '../../../types/size';
import { TPproducts } from '../../../types/products';
import { useForm } from 'react-hook-form';
import { Category } from '../../../types/categories';
import { TPbrand } from '../../../types/brand';

const Detail = () => {
    const { darkMode } = useTheme();
    const { id } = useParams<{ id: string }>();
    const { setLoading } = useLoading();
    const { register, handleSubmit } = useForm<TPproducts>();

    const [variant, setVariant] = useState<any[]>([{ id: 1 }]);
    const [colors, setColors] = useState<TPcolor[]>([]);
    const [sizes, setSizes] = useState<TPsize[]>([]);
    const [brands, setBrands] = useState<TPbrand[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedBrand, setSelectedBrand] = useState<string | undefined>();
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
    const [product, setProduct] = useState<TPproducts | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [newImageUrl, setNewImageUrl] = useState<string>('');

    const fetchData = async () => {
        setLoading(true);
        try {
            const [productResponse, brandsResponse, categoriesResponse, colorsResponse, sizesResponse] = await Promise.all([
                axios.get(`/api/products/${id}`),
                axios.get('/api/brand'),
                axios.get('/api/categories'),
                axios.get('/api/color'),
                axios.get('/api/size'),
            ]);
            setProduct(productResponse.data.data);
            setBrands(brandsResponse.data.data);
            setCategories(categoriesResponse.data.data);
            setColors(colorsResponse.data.data);
            setSizes(sizesResponse.data.data);
            setSelectedBrand(productResponse.data.data.brand?._id);
            setSelectedCategory(productResponse.data.data.category?._id);

            if (productResponse.data.data.variant) {
                setVariant(productResponse.data.data.variant.map((variant: any, index: number) => ({
                    id: index + 1,
                    color: variant.color,
                    size: variant.size,
                    price_import: variant.importPrice,
                    price_list: variant.listPrice,
                    price_selling: variant.salePrice,
                    quantity: variant.quantity,
                })));
            }
        } catch (error) {
            setErrorMessage('Could not fetch data. Please try again later.');
            console.error('Fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);
    
    return (
        <div className="pb-10">
            <div>
                <h1 className={`${darkMode ? 'text-white' : ''} text-3xl font-bold mb-2`}>Chi tiết sản phẩm</h1>
                <div className="flex gap-x-4">
                    <div className={`${darkMode ? 'bg-[#24303F]' : 'bg-white'} p-4 rounded-lg shadow-md mt-6 w-2/6`}>
                        <h2 className={`${darkMode ? 'text-white' : ''} text-xl font-semibold mb-4`}>Thông tin sản phẩm</h2>
                        <div className="flex gap-x-2">
                            {product?.images.map((url, index) => (
                                <img src={url} alt={`Product image ${index + 1}`} width="80" />
                            ))}
                        </div>
                        <div className="flex flex-col gap-4">
                            <label className="flex flex-col">
                                <span className={`${darkMode ? 'text-white' : 'text-gray-700'}`}>Tên sản phẩm</span>
                                <input
                                    type="text"
                                    placeholder="Tên sản phẩm"
                                    disabled
                                    defaultValue={product?.title}
                                    {...register('title', { required: true })}
                                    className={`${darkMode ? 'bg-[#2c3945] text-white' : 'bg-white text-black'} border p-2 rounded`}
                                />
                            </label>
                            <label className="flex flex-col">
                                <span className={`${darkMode ? 'text-white' : 'text-gray-700'}`}>Giá</span>
                                <input
                                    type="number"
                                    placeholder="Giá"
                                    disabled
                                    defaultValue={product?.price}
                                    {...register('price', { required: true })}
                                    className={`${darkMode ? 'bg-[#2c3945] text-white' : 'bg-white text-black'} border p-2 rounded`}
                                />
                            </label>
                            <label className="flex flex-col">
                                <span className={`${darkMode ? 'text-white' : 'text-gray-700'}`}>Thương hiệu</span>
                                <select
                                    value={selectedBrand}
                                    disabled
                                    onChange={(e) => {
                                        setSelectedBrand(e.target.value);
                                        register('brand').onChange(e); 
                                    }}
                                    className={`${darkMode ? 'bg-[#2c3945] text-white' : 'bg-white text-black'} border p-2 rounded`}
                                >
                                    <option value="" disabled hidden>Thương hiệu</option>
                                    {brands.map(brand => (
                                        <option key={brand._id} value={brand._id}>{brand.name}</option>
                                    ))}
                                </select>
                            </label>

                            <label className="flex flex-col">
                                <span className={`${darkMode ? 'text-white' : 'text-gray-700'}`}>Danh mục</span>
                                <select
                                    value={selectedCategory}
                                    disabled
                                    onChange={(e) => {
                                        setSelectedCategory(e.target.value);
                                        register('category').onChange(e);
                                    }}
                                    className={`${darkMode ? 'bg-[#2c3945] text-white' : 'bg-white text-black'} border p-2 rounded`}
                                >
                                    <option value="" disabled hidden>Danh mục</option>
                                    {categories.map(category => (
                                        <option key={category._id} value={category._id}>{category.name}</option>
                                    ))}
                                </select>
                            </label>
                        </div>
                    </div>

                    {/* Description Section */}
                    <div className={`${darkMode ? 'bg-[#24303F]' : 'bg-white'} p-4 rounded-lg shadow-md mt-6 w-4/6`}>
                        <h2 className={`${darkMode ? 'text-white' : ''} text-xl font-semibold mb-4`}>Mô tả</h2>
                        <div className="mb-4">
                            <h3 className={`${darkMode ? 'text-white' : ''} font-bold`}><div dangerouslySetInnerHTML={{ __html: product?.description }} /></h3>
                            <img src={product?.img_des} alt={product?.img_des} />
                        </div>
                    </div>
                </div>
                <div className={`${darkMode ? 'bg-[#24303F]' : 'bg-white'} p-4 rounded-lg shadow-md mt-6 pb-20`}>
                    <h2 className={`${darkMode ? 'text-white' : ''} text-xl font-semibold mb-4`}>Biến thể</h2>
                    <div className="mt-10">
                        {variant.map((variant, index) => (
                            <div key={index} className="flex justify-between mt-6">
                                <label className="flex flex-col">
                                    <span className={`${darkMode ? 'text-white' : 'text-gray-700'}`}>Màu</span>
                                    <select
                                        value={variant.color}
                                        disabled
                                        className={`${darkMode ? 'bg-[#2c3945] text-white' : 'bg-white text-black'} border p-2 rounded`}
                                    >
                                        <option value="" disabled hidden>Màu</option>
                                        {colors.map(color => (
                                            <option key={color._id} value={color._id}>{color.name}</option>
                                        ))}
                                    </select>
                                </label>

                                <label className="flex flex-col">
                                    <span className={`${darkMode ? 'text-white' : 'text-gray-700'}`}>Kích cỡ</span>
                                    <select
                                        value={variant.size}
                                        disabled
                                        className={`${darkMode ? 'bg-[#2c3945] text-white' : 'bg-white text-black'} border p-2 rounded`}
                                    >
                                        <option value="" disabled hidden>Kích cỡ</option>
                                        {sizes.map(size => (
                                            <option key={size._id} value={size._id}>{size.name}</option>
                                        ))}
                                    </select>
                                </label>

                                {/* Price Inputs */}
                                {[
                                    { label: 'Giá nhập', key: 'price_import' },
                                    { label: 'Giá niêm yết', key: 'price_list' },
                                    { label: 'Giá bán', key: 'price_selling' },
                                    { label: 'Số lượng', key: 'quantity' }
                                ].map(({ label, key }, i) => (
                                    <label key={i} className="flex flex-col">
                                        <span className={`${darkMode ? 'text-white' : 'text-gray-700'}`}>{label}</span>
                                        <input
                                            type="number"
                                            value={variant[key]} 
                                            disabled
                                            className={`${darkMode ? 'bg-[#2c3945] text-white' : 'bg-white text-black'} border p-2 rounded`}
                                        />
                                    </label>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detail;
