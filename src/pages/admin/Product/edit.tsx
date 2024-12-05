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
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { toast } from 'react-toastify';

const Edit = () => {
    const { darkMode } = useTheme();
    const { id } = useParams<{ id: string }>();
    const nav = useNavigate();
    const { setLoading } = useLoading();
    const { register, handleSubmit,setValue } = useForm<TPproducts>();

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

    const addVariant = () => {
        setVariant([...variant, { id: variant.length + 1 }]);
    };

    const removeVariant = (index: number) => {
        if (variant.length > 1) {
            setVariant(variant.filter((_, i) => i !== index));
        } else {
            alert('At least one variant is required.');
        }
    };

    const handleVariantChange = (index: number, field: string, value: any) => {
        const updatedVariants = variant.map((variant, i) => {
            if (i === index) {
                return { ...variant, [field]: value };
            }
            return variant;
        });
    
        const hasMissingColor = updatedVariants.some(variant => !variant.color);
        if (hasMissingColor) {
            setErrorMessage('Please fill in all required fields for variants.');
        } else {
            setVariant(updatedVariants);
        }
    };
    

    const handleAddImageURL = () => {
        if (newImageUrl) {
            if (product && product.images.length < 4) {
                setProduct(prev => ({ ...prev, images: [...prev.images, newImageUrl]}));
                setNewImageUrl('');
            } else {
                setErrorMessage("You can only add up to 4 images.");
            }
        }
    };

    const handleRemoveImage = (index: number) => {
        if (product) {
            const updatedImages = product.images.filter((_, i) => i !== index);
            setProduct({ ...product, images: updatedImages });
        }
    };

    const handleUpdate = async (values: TPproducts) => {
        const token = localStorage.getItem('token');
        const { _id, createdAt, updatedAt, ...updatedValues } = values;

        updatedValues.brand = selectedBrand;
        updatedValues.category = selectedCategory;
    
        if (variant && variant.length > 0) {
            updatedValues.variant = variant.map(variant => ({
                color: variant.color,
                size: variant.size,
                quantity: variant.quantity,
                importPrice: variant.price_import,
                listPrice: variant.price_list,
                salePrice: variant.price_selling,
            }));
        }
    
        if (product?.images) {
            updatedValues.images = product.images;
        }
    
        console.log('Dữ liệu gửi đi:', updatedValues);
    
        try {
            await axios.put(`/api/products/update/${id}`, updatedValues, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success("Sửa sản phẩm thành công");
            nav("/admin/product/list");
        } catch (error) {
            toast.error('Cập nhật sản phẩm thất bại. Vui lòng thử lại.');
            console.error('Lỗi cập nhật:', error.response?.data || error);
        }
    };
    
    
    
    
    return (
        <div className="pb-10">
            <form onSubmit={handleSubmit(handleUpdate)} action="">
                <h1 className={`${darkMode ? 'text-white' : ''} text-3xl font-bold mb-2`}>Sua sản phẩm</h1>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                <div className="flex gap-x-4">
                    <div className={`${darkMode ? 'bg-[#24303F]' : 'bg-white'} p-4 rounded-lg shadow-md mt-6 w-2/6`}>
                        <h2 className={`${darkMode ? 'text-white' : ''} text-xl font-semibold mb-4`}>Thông tin sản phẩm</h2>
                        <div className="flex flex-col gap-4">
                            <label className="flex flex-col">
                                <span className={`${darkMode ? 'text-white' : 'text-gray-700'}`}>Tên sản phẩm</span>
                                <input
                                    type="text"
                                    placeholder="Tên sản phẩm"
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
                                    defaultValue={product?.price}
                                    {...register('price', { required: true })}
                                    className={`${darkMode ? 'bg-[#2c3945] text-white' : 'bg-white text-black'} border p-2 rounded`}
                                />
                            </label>
                            <label className="flex flex-col">
                                <span className={`${darkMode ? 'text-white' : 'text-gray-700'}`}>Thương hiệu</span>
                                <select
                                    value={selectedBrand}
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

                            <label className="flex flex-col">
                                <span className={`${darkMode ? 'text-white' : 'text-gray-700'}`}>Image URL</span>
                                <input
                                    type="text"
                                    value={newImageUrl}
                                    onChange={(e) => setNewImageUrl(e.target.value)}
                                    placeholder="Image URL"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleAddImageURL();
                                            e.preventDefault();
                                        }
                                    }}
                                    className={`${darkMode ? 'bg-[#2c3945] text-white' : 'bg-white text-black'} border p-2 rounded`}
                                />
                            </label>
                            <div className="text-sm text-gray-500">Enter image URL and press Enter</div>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {product?.images.map((url, index) => (
                                    <div key={index} className="relative">
                                        <img src={url} alt={`Image ${index + 1}`} className="h-16 w-16 object-cover rounded" />
                                        <button type="button" onClick={() => handleRemoveImage(index)} className="absolute top-0 right-0 text-red-500">&times;</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                   {/* Description Section */}
                   <div className={`${darkMode ? 'bg-[#24303F]' : 'bg-white'} p-4 rounded-lg shadow-md mt-6 w-4/6`}>
                        <h2 className={`${darkMode ? 'text-white' : ''} text-xl font-semibold mb-4`}>Mô tả</h2>
                        <div className="mb-4">
                            <h3 className={`${darkMode ? 'text-white' : ''} font-bold`}><div dangerouslySetInnerHTML={{ __html: product?.description }} /></h3>
                            <img src={product?.img_des} alt={product?.img_des} />
                        </div>
                        
                        {/* CKEditor*/}
                        <CKEditor
                            editor={ClassicEditor}
                            data={product?.description}  
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setValue('description', data); 
                            }}
                            config={{
                                placeholder: 'Mô tả...',
                                
                            }}
                            className={`${darkMode ? 'bg-[#2c3945] text-white' : 'bg-white text-black'} block w-full h-32 p-2 border rounded`}
                        />

                        <input
                            type="text"
                            placeholder="Link ảnh"
                            defaultValue={product?.img_des}
                            {...register('img_des', { required: true })}
                            className={`${darkMode ? 'bg-[#2c3945] text-white' : 'bg-white text-black'} mt-2 w-full p-2 border border-gray-300 rounded`}
                            required
                        />
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
                                        required
                                        onChange={(e) => handleVariantChange(index, 'color', e.target.value)}
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
                                        required
                                        onChange={(e) => handleVariantChange(index, 'size', e.target.value)}
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
                                            required
                                            onChange={(e) => handleVariantChange(index, key, e.target.value)} 
                                            className={`${darkMode ? 'bg-[#2c3945] text-white' : 'bg-white text-black'} border p-2 rounded`}
                                        />
                                    </label>
                                ))}
                                <button type="button" onClick={() => removeVariant(index)}><Trash /></button>
                            </div>
                        ))}
                        <div className="mt-4">
                            <button type="button" onClick={addVariant} className={`${darkMode ? 'text-amber-500 border border-amber-500' : 'text-blue-700 border border-blue-700'} px-3 py-1 rounded-md mr-2`}>+ Thêm biến thể</button>
                        </div>  
                    </div>
                </div>
                <button type="submit" className={`${darkMode ? 'bg-blue-400 text-white' : 'bg-blue-500 text-white'} px-3 py-3 mt-6 rounded-md`}>
                    Cập nhật
                </button>
            </form>
        </div>
    );
};

export default Edit;
