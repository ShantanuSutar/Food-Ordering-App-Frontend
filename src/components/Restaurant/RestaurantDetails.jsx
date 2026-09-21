import { Card, Chip, CircularProgress, Divider, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MenuCard from './MenuCard';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantById, getRestaurantsCategory } from '../../State/Restaurant/Action';
import { getMenuItemsByRestaurantId } from '../../State/Menu/Action';

const foodTypes = [
    { label: "All", value: "all" },
    { label: "Vegetarian Only", value: "vegetarian" },
    { label: "Non-Vegetarian", value: "non_vegetarian" },
    { label: "Seasonal", value: "seasonal" },
]

// const menu = [1, 1, 1, 1, 1, 1, 1];

const RestaurantDetails = () => {
    const [foodType, setFoodType] = useState("all");

    const dispatch = useDispatch();

    const jwt = localStorage.getItem("jwt")

    const { restaurant, menu } = useSelector(store => store)
    const [selectedCategory, setSelectedCategory] = useState("");

    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const selectedFoodParam = searchParams.get("food");
    const selectedFoodId = selectedFoodParam ? Number(selectedFoodParam) : null;

    const handleFilter = (e) => {
        setFoodType(e.target.value)
    }

    const handleFilterCategory = (e, value) => {
        setSelectedCategory(value)
    }

    useEffect(() => {
        dispatch(getRestaurantById({ jwt, restaurantId: id }))
        dispatch(getRestaurantsCategory({ jwt, restaurantId: id }))

    }, [dispatch, id, jwt])

    useEffect(() => {
        dispatch(getMenuItemsByRestaurantId({ jwt, restaurantId: id, vegetarian: foodType === "vegetarian", nonveg: foodType === "non_vegetarian", seasonal: foodType === "seasonal", foodCategory: selectedCategory }))
    }, [dispatch, foodType, id, jwt, selectedCategory])

    useEffect(() => {
        if (!selectedFoodId || !menu?.menuItems?.some((item) => item.id === selectedFoodId)) return;

        const selectedMeal = document.getElementById(`food-${selectedFoodId}`);
        selectedMeal?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, [menu?.menuItems, selectedFoodId]);

    return (
        <main className='page-shell py-6 sm:py-10'>
            <section>
                <p className='mb-4 text-sm text-slate-500'>Home / {restaurant?.restaurant?.address?.city || 'Restaurant'} / {restaurant?.restaurant?.name || 'Menu'}</p>
                <div>
                    <Grid container spacing={{ xs: 1, lg: 3 }}>

                        {restaurant?.restaurant?.images?.map((image, index) => (
                            <Grid
                                key={index}
                                size={{
                                    xs: 12,
                                    lg: index === 0 ? 12 : 6
                                }}
                            >
                                <img
                                    className={`w-full object-cover ${index === 0 ? 'h-[42vh] min-h-72 rounded-xl' : 'h-56 rounded-lg'}`}
                                    src={image}
                                    alt={`Restaurant ${index + 1}`}
                                />
                            </Grid>
                        ))}

                    </Grid>
                </div>

                <div className='py-7'>
                    <div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
                    <div>
                    <h1 className='!m-0 !text-3xl !font-bold sm:!text-4xl'>
                        {restaurant?.restaurant?.name}
                    </h1>

                    <p className='text-gray-500 mt-1'>
                        {restaurant?.restaurant?.description}
                    </p>

                    </div>
                    <Chip color={restaurant?.restaurant?.open ? 'success' : 'error'} label={restaurant?.restaurant?.open ? 'Open for orders' : 'Currently closed'} />
                    </div>
                    <div className='mt-5 grid gap-3 text-sm sm:grid-cols-2'>

                        <p className='flex items-center gap-3 text-slate-400'>
                            <LocationOnIcon />
                            <span>
                                {restaurant?.restaurant?.address?.city},{" "}
                                {restaurant?.restaurant?.address?.state},{" "}
                                {restaurant?.restaurant?.address?.country}
                            </span>
                        </p>

                        <p className='flex items-center gap-3 text-slate-400'>
                            <CalendarTodayIcon />
                            <span>
                                {restaurant?.restaurant?.openingHours}
                            </span>
                        </p>

                    </div>
                </div>
            </section>
            <Divider />
            <section className='relative grid gap-7 pt-8 lg:grid-cols-[250px_minmax(0,1fr)]'>
                <div className='filter'>
                    <Card className='space-y-5 rounded-xl p-5 lg:sticky lg:top-24'>
                        <div>
                            <Typography variant='h5' sx={{ paddingBottom: "1rem" }}>Food Type</Typography>

                            <FormControl className=' py-10 space-y-5' component={"fieldset"}>
                                <RadioGroup name='food_type' value={foodType} onChange={handleFilter}>
                                    {foodTypes.map((item) => <FormControlLabel key={item.value} value={item.value} control={<Radio />} label={item.label} />)}
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <Divider />
                        <div>
                            <Typography variant='h5' sx={{ paddingBottom: "1rem" }}>Food Category</Typography>

                            <FormControl className=' py-10 space-y-5' component={"fieldset"}>
                                <RadioGroup name='food_category'
                                    value={selectedCategory}
                                    onChange={handleFilterCategory}>
                                    <FormControlLabel value="" control={<Radio />} label="All categories" />
                                    {restaurant?.categories?.map((item) => <FormControlLabel key={item.id} value={item.name} control={<Radio />} label={item.name} />)}
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </Card>
                </div>
                <div className='min-w-0 space-y-4'>
                    {menu.loading && menu.menuItems.length === 0 && <div className='flex min-h-48 items-center justify-center'><CircularProgress /></div>}
                    {!menu.loading && menu.menuItems.length === 0 && <div className='empty-state px-6 py-12 text-center'>No menu items match these filters.</div>}
                    {menu.menuItems.map((item) => (
                        <div
                            id={`food-${item.id}`}
                            key={item.id}
                            className={selectedFoodId === item.id
                                ? "rounded-xl ring-2 ring-orange-500 ring-offset-4 ring-offset-[var(--color-bg)]"
                                : ""}
                        >
                            <MenuCard item={item} />
                        </div>
                    ))}
                </div>
            </section>
        </main>
    )
}

export default RestaurantDetails
