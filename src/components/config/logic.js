export const isPresentinFavourites = (favourites, restaurant) => {
    for(let item of favourites){
        console.log("logggin")
        console.log("asd", item)
        console.log("restauratn", restaurant)

        if(restaurant.id == item.id){
            return true;
        }
    }
    return false;
}

