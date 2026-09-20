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
        <main className="page-shell min-h-screen py-10 sm:py-14">
            <p className="eyebrow">Discover</p>
            <h1 className="!mb-6 !mt-2 !text-3xl !font-bold">Search menu items</h1>
            <input 
                type="text" 
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                placeholder="Search for pizza, burger, etc." 
                className="mb-10 w-full rounded-lg border border-slate-400/25 bg-[var(--color-surface-2)] p-4 text-white outline-none transition placeholder:text-slate-500 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/25"
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {menu.searchLoading && [1, 2, 3, 4].map((item) => <div key={item} className="h-72 animate-pulse rounded-xl bg-slate-700/35" />)}
                {!menu.searchLoading && menu.search.map((item) => (
                    <CarouselItem key={item.id} item={item} onSelect={() => selectResult(item)} />
                ))}
                {!menu.searchLoading && menu.hasSearched && menu.search.length === 0 && (
                    <div className="empty-state col-span-full px-6 py-12 text-center">No meals match your search.</div>
                )}
            </div>
        </main>
    );
};
