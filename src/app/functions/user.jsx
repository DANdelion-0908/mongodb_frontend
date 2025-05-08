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
            body: JSON.stringify(body)
        });    

        return response;

    } catch (error) {
        console.error("Error al hacer la solicitud:", error);
    
    }
}

export async function get_user_orders(user_id) {
    try {
        const response = await fetch(`https://backend-mongo-lyart.vercel.app/api/user/orders/${user_id}`);    
    
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

export async function post_user_orders(order) {
    try {
        const response = await fetch(`https://backend-mongo-lyart.vercel.app/api/user/order`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: 'POST',
            body: JSON.stringify(order)
        });    

        console.log("BBBBB", response);
        return response;
    
    } catch (error) {
        console.error("Error al hacer la solicitud:", error);

    }
}

export async function get_user_reviews(user_id) {
    try {
        const response = await fetch(`https://backend-mongo-lyart.vercel.app/api/users/${user_id}/reviews`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "GET"
        });    
    
        const reviews = await response.json();
    
        console.log("PPPPPP", reviews)
        return reviews;

    } catch (error) {
        console.error("Error al hacer la solicitud:", error);

    }
}

export async function put_user_info(user_id, user_name, img) {
    try {
        const response = await fetch(`https://backend-mongo-lyart.vercel.app/api/users/${user_id}`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: 'PUT',
            body: JSON.stringify({ user_name, img })
        });    

        console.log("AAAAAA", user_id, user_name, img, response)
        return response;
    
    } catch (error) {
        console.error("Error al hacer la solicitud:", error);

    }
}

export async function post_user_restaurant_reviews(body) {
    try {
        const response = await fetch(`https://backend-mongo-lyart.vercel.app/api/user/review_restaurant`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: 'POST',
            body: JSON.stringify(body)
        });
    
        console.log("OOOOOO", body)
        return response;

    } catch (error) {
        console.error("Error al hacer la solicitud:", error);

    }
}

export async function post_user_order_reviews(body) {
    try {
        const response = await fetch(`https://backend-mongo-lyart.vercel.app/api/reviews/order`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: 'POST',
            body: body
        });
    
        console.log("ZZZZZZZZZZZZZ", body, response)
        return response;

    } catch (error) {
        console.error("Error al hacer la solicitud:", error);

    }
}

export async function put_user_review(review_id, body) {
    try {
        const response = await fetch(`https://backend-mongo-lyart.vercel.app/api/reviews/${review_id}`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: 'PUT',
            body: body
        });    

        console.log("ÑÑÑÑÑÑÑ", review_id, response)
        return response;
    
    } catch (error) {
        console.error("Error al hacer la solicitud:", error);

    }
}