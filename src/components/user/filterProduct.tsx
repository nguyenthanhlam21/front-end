import React, { useState, useEffect, useCallback } from 'react';
import ButtonReset from '../../theme/ButtonReset';
import useCategory from '../../hook/useCategory';
import useBrand from '../../hook/useBrand';
import useSize from '../../hook/useSize';
import useColor from '../../hook/useColor';

function FilterProduct({ onApplyFilters }) {
    const [checkedItems, setCheckedItems] = useState({});
    const { categories } = useCategory();
    const { brand } = useBrand();
    const { size } = useSize();
    const { color } = useColor();

    const menuFilter = [
        { id: "1", title: "Danh mục sản phẩm", subMenu: categories },
        { id: "2", title: "Size", subMenu: size },
        { id: "3", title: "Màu sắc", subMenu: color },
        { id: "4", title: "Thương hiệu", subMenu: brand },
    ];

    const handleCheckboxChange = useCallback((key) => {
        setCheckedItems(prev => ({
            ...prev,
            [key]: !prev[key],
        }));
    }, []);

    const resetFilters = useCallback(() => {
        setCheckedItems({});
        onApplyFilters({ category: [], brand: [], size: {}, color: {} });
    }, [onApplyFilters]);

    const createSelectedFilters = useCallback(() => {
        const selectedFilters = {
            category: [],
            brand: [],
            size: {},
            color: {},
        };

        Object.keys(checkedItems).forEach(key => {
            if (checkedItems[key]) {
                const category = categories.find(cat => cat._id === key);
                const brandItem = brand.find(b => b._id === key);
                const sizeItem = size.find(s => s._id === key);
                const colorItem = color.find(c => c._id === key);

                if (category) selectedFilters.category.push(category._id);
                if (brandItem) selectedFilters.brand.push(brandItem._id);
                if (sizeItem) selectedFilters.size[sizeItem._id] = true;
                if (colorItem) selectedFilters.color[colorItem._id] = true;
            }
        });

        return selectedFilters;
    }, [checkedItems, categories, brand, size, color]);

    useEffect(() => {
        const selectedFilters = createSelectedFilters();
        onApplyFilters(selectedFilters);
    }, [checkedItems, createSelectedFilters, onApplyFilters]);

    return (
        <div className="pr-4">
            {Object.values(checkedItems).some(value => value) && (
                <div className="mb-9">
                    <ButtonReset onReset={resetFilters} />
                </div>
            )}
            {/* Render Filter Options */}
            {menuFilter.map((menu) => (
                <div key={menu.id}>
                    <h2 className='w-full px-2 border-l-[#FF6634] border-l-8 py-1 text-xl font-bold bg-[#F5F5F5]'>{menu.title}</h2>
                    <div className="flex flex-wrap gap-x-2">
                        {menu.subMenu.map((subMenu) => (
                            <label key={subMenu._id} className="flex items-center cursor-pointer mr-4 py-4">
                                <input
                                    type="checkbox"
                                    name={subMenu._id}
                                    checked={!!checkedItems[subMenu._id]}
                                    onChange={() => handleCheckboxChange(subMenu._id)}
                                    className="hidden peer"
                                />
                                <span className="w-6 h-6 border border-gray-300 rounded-sm flex items-center justify-center mr-2 peer-checked:border-red-500 peer-checked:bg-red-500 hover:border-red-500 transition text-white">X</span>
                                <span className='font-semibold'>{subMenu.name}</span>
                            </label>
                        ))}

                    </div>
                </div>
            ))}
        </div>
    );
}

export default FilterProduct;
