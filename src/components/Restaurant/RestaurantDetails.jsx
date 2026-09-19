import { Divider, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material'
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
    const [selectedCategory, setSelectedCategory] = useState(null);

    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const selectedFoodParam = searchParams.get("food");
    const selectedFoodId = selectedFoodParam ? Number(selectedFoodParam) : null;

    const handleFilter = (e) => {
        setFoodType(e.target.value)
        console.log(e.target.value, e.target.name)
    }

    const handleFilterCategory = (e, value) => {
        setSelectedCategory(value)
        console.log(e.target.value, e.target.name)
    }


    console.log("restaurant", restaurant)


    useEffect(() => {
        dispatch(getRestaurantById({ jwt, restaurantId: id }))
        dispatch(getRestaurantsCategory({ jwt, restaurantId: id }))

    }, [dispatch, id, jwt])

    useEffect(() => {
        dispatch(getMenuItemsByRestaurantId({ jwt, restaurantId: id, vegetarian: foodType == "vegetarian", nonveg: foodType == "non_vegetarian", seasonal: foodType == "seasonal", foodCategory: selectedCategory }))
    }, [dispatch, foodType, id, jwt, selectedCategory])

    useEffect(() => {
        if (!selectedFoodId || !menu?.menuItems?.some((item) => item.id === selectedFoodId)) return;

        const selectedMeal = document.getElementById(`food-${selectedFoodId}`);
        selectedMeal?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, [menu?.menuItems, selectedFoodId]);

    return (
        <div className=' px-5 lg:px-20'>
            <section>
                <h3 className=' text-gray-500 py-2 mt-10'>Home/India/Indian Fast Food/3</h3>
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
                                    className="w-full h-[40vh] object-cover"
                                    src={image}
                                    alt={`Restaurant ${index + 1}`}
                                />
                            </Grid>
                        ))}

                    </Grid>
                </div>

                <div className='pt-3 pb-5'>
                    <h1 className='text-4xl font-semibold'>
                        {restaurant?.restaurant?.name}
                    </h1>

                    <p className='text-gray-500 mt-1'>
                        {restaurant?.restaurant?.description}
                    </p>

                    <div className='space-y-3 mt-3'>

                        <p className='text-gray-500 flex items-center gap-3'>
                            <LocationOnIcon />
                            <span>
                                {restaurant?.restaurant?.address?.city},{" "}
                                {restaurant?.restaurant?.address?.stateProvince},{" "}
                                {restaurant?.restaurant?.address?.country}
                            </span>
                        </p>

                        <p className='text-gray-500 flex items-center gap-3'>
                            <CalendarTodayIcon />
                            <span>
                                {restaurant?.restaurant?.openingHours}
                            </span>
                        </p>

                        <p className='text-gray-500'>
                            Status:{" "}
                            <span
                                className={
                                    restaurant?.restaurant?.open
                                        ? "text-green-600"
                                        : "text-red-600"
                                }
                            >
                                {restaurant?.restaurant?.open ? "Open" : "Closed"}
                            </span>
                        </p>

                    </div>
                </div>
            </section>
            <Divider />
            <section className=' pt-[2rem] lg:flex relative'>
                <div className=' space-y-10 lg:w-[20%] filter '>
                    <div className=' box space-y-5 lg:sticky top-28'>
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
                                    {restaurant?.categories?.map((item) => <FormControlLabel key={item.id} value={item.name} control={<Radio />} label={item.name} />)}
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>
                </div>
                <div className=' space-y-5 lg:w-[80%] lg:pl-10'>
                    {menu?.menuItems?.map((item) => (
                        <div
                            id={`food-${item.id}`}
                            key={item.id}
                            className={selectedFoodId === item.id
                                ? "rounded-2xl ring-2 ring-pink-500 ring-offset-4 ring-offset-[#16171d]"
                                : ""}
                        >
                            <MenuCard item={item} />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default RestaurantDetails
