import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearMenuSearch, searchMenuItem } from '../../State/Menu/Action';
import { CarouselItem } from '../Home/CarouselItem';

export const Search = () => {
    const [keyword, setKeyword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { menu } = useSelector(store => store);
    const jwt = localStorage.getItem('jwt');

    useEffect(() => {
        const normalizedKeyword = keyword.trim();
        if (!normalizedKeyword) {
            dispatch(clearMenuSearch());
            return undefined;
        }

        const timer = window.setTimeout(() => {
            dispatch(searchMenuItem({ keyword: normalizedKeyword, jwt }));
        }, 325);

        return () => window.clearTimeout(timer);
    }, [dispatch, jwt, keyword]);

    const selectResult = (item) => {
        const city = encodeURIComponent(item.restaurantCity || 'city');
        const restaurantName = encodeURIComponent(item.restaurantName || 'restaurant');
        navigate(`/restaurant/${city}/${restaurantName}/${item.restaurantId}?food=${item.id}`);
    };

    return (
        <div className="px-5 lg:px-20 py-10 min-h-screen">
            <h1 className="text-2xl font-semibold mb-5 text-gray-400">Search Menu Items</h1>
            <input 
                type="text" 
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                placeholder="Search for pizza, burger, etc." 
                className="w-full p-4 rounded-md bg-[#1a1a1a] text-white border border-gray-700 focus:outline-none focus:border-[#e91e63] mb-10 transition-colors duration-300"
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {menu.searchLoading && <p className="text-gray-500">Searching…</p>}
                {!menu.searchLoading && menu.search.map((item) => (
                    <CarouselItem key={item.id} item={item} onSelect={() => selectResult(item)} />
                ))}
                {!menu.searchLoading && menu.hasSearched && menu.search.length === 0 && (
                    <p className="text-gray-500">No results found.</p>
                )}
            </div>
        </div>
    );
};
