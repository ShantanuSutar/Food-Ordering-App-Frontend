import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchMenuItem } from '../../State/Menu/Action';
import MenuCard from '../Restaurant/MenuCard';

export const Search = () => {
    const [keyword, setKeyword] = useState('');
    const dispatch = useDispatch();
    const { menu } = useSelector(store => store);
    const jwt = localStorage.getItem('jwt');

    const handleSearch = (e) => {
        setKeyword(e.target.value);
        if (e.target.value) {
            dispatch(searchMenuItem({ keyword: e.target.value, jwt }));
        }
    };

    return (
        <div className="px-5 lg:px-20 py-10 min-h-screen">
            <h1 className="text-2xl font-semibold mb-5 text-gray-400">Search Menu Items</h1>
            <input 
                type="text" 
                value={keyword}
                onChange={handleSearch}
                placeholder="Search for pizza, burger, etc." 
                className="w-full p-4 rounded-md bg-[#1a1a1a] text-white border border-gray-700 focus:outline-none focus:border-[#e91e63] mb-10 transition-colors duration-300"
            />
            <div className="flex flex-col gap-5">
                {menu?.search?.length > 0 ? (
                    menu.search.map(item => <MenuCard key={item.id} item={item} />)
                ) : (
                    keyword && <p className="text-gray-500 text-center">No results found.</p>
                )}
            </div>
        </div>
    );
};
