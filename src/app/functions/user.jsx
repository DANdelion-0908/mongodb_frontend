export async function fetchUser(username) {
    try {
        const response = await fetch(`https://backend-mongo-lyart.vercel.app/api/user/${username}`);    
    
        const user = await response.json();
    
        if (!user || Object.keys(user).length === 0) {
            console.log("Error al buscar usuario");
            return null;
        }
    
        return user;

    } catch (error) {
        console.error("Error al hacer la solicitud:", error);

    }
}

export async function registerUser(body) {
    console.log(body);
    try {
        const response = await fetch(`https://backend-mongo-lyart.vercel.app/api/user`, {
            headers: {
                "Content-Type": "application/json",
              },
            method: 'POST',
            body: body
        });    

        return response;

    } catch (error) {
        console.error("Error al hacer la solicitud:", error);
    
    }
}

export async function get_user_orders(username) {
    try {
        const response = await fetch(`https://backend-mongo-lyart.vercel.app/api/user/orders/${username}`);    
    
        const orders = await response.json();
    
        if (!orders || Object.keys(orders).length === 0) {
            console.log("Error al buscar usuario");
            return null;
        }
    
        return orders;

    } catch (error) {
        console.error("Error al hacer la solicitud:", error);

    }
}

export async function get_user_reviews(username) {
    try {
        const response = await fetch(`https://backend-mongo-lyart.vercel.app/api/user/reviews/${username}`);    
    
        const reviews = await response.json();
    
        if (!reviews || Object.keys(reviews).length === 0) {
            console.log("Error al buscar usuario");
            return null;
        }
    
        return reviews;

    } catch (error) {
        console.error("Error al hacer la solicitud:", error);

    }
}