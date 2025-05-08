export async function get_restaurants() {
    try {
        const response = await fetch("https://backend-mongo-lyart.vercel.app/api/restaurants", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Error fetching restaurants");
        }

        const restaurants = await response.json();

        if (restaurants.length === 0) {
            throw new Error("No restaurants found");
        }

        return restaurants;

    } catch (error) {
        console.log("Error fetching restaurants:", error);
        
    }
}

export async function get_dishes(restaurant) {
    try {
        const response = await fetch(`https://backend-mongo-lyart.vercel.app/api/restaurants/dishes/${restaurant}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Error fetching dishes");
        }

        const dishes = await response.json();

        if (dishes.length === 0) {
            throw new Error("No dishes found");
        }

        return dishes;

    } catch (error) {
        console.log("Error fetching dishes:", error);
    }
}

export async function set_restaurant(restaurant_img, restaurant_name, restaurant_rating) {

}

export async function get_restaurants_review(restaurant_id) {
    try {
        const response = await fetch(`https://backend-mongo-lyart.vercel.app/api/restaurant/reviews/${restaurant_id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Error fetching reviews");
        }

        const restaurants = await response.json();

        if (restaurants.length === 0) {
            throw new Error("No restaurants found");
        }

        console.log("XXXXXXX", restaurants)
        return restaurants;

    } catch (error) {
        console.log("Error fetching restaurants:", error);
        
    }
}

export async function report_user_review(user_id) {
    try {
        const response = await fetch(`https://backend-mongo-lyart.vercel.app/api/reviews/clear/${user_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.log("XXXXXXX", response)
        return response;

    } catch (error) {
        console.log("Error fetching restaurants:", error);
        
    }
}