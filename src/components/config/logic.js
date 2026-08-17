export const isPresentinFavourites = (favourites, restaurant) => {
    for(let item of favourites){
        if(restaurant.id == item.id){
            return true;
        }
    }
    return false;
}

