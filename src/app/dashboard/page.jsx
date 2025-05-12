'use client'

import React from 'react'
import Restaurant_card from '@/components/restaurant_card'
import {get_restaurants, get_dishes, get_restaurants_review } from '@/controller/restaurant_controller'
import { useState, useEffect } from 'react'
import Promo_card from '@/components/promo_card'
import Header from '@/components/header'
import { useRouter } from 'next/navigation';
import Dish_card from '@/components/dish_card'
import Review_card from '@/components/review_card'
import { post_user_orders, post_user_restaurant_reviews } from '../functions/user'

export default function Dashboard ({ handleAuth }) {
    const [restaurants, setRestaurants] = useState([]);
    const [isRestaurant, setIsRestaurant] = useState(false);
    const [selectedRestaurant, setSelectedRestaurant] = useState([]);
    const [selectedRestaurantReviews, setSelectedRestaurantReviews] = useState([]);
    const [dishes, setDishes] = useState([]);
    const [selectedDishes, setSelectedDishes] = useState([]);
    const [user, setUser] = useState({});
    const router = useRouter();
    const [shoppingCart, setShoppingCart] = useState([]);

    const [title, setTitle] = useState("");
    const [rate, setRate] = useState(1);
    const [comment, setComment] = useState("");

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (!userData) {
          router.push("/login");
        } else {
          setUser(JSON.parse(userData));
        }
      }, []);
      

    useEffect(() => {
        get_restaurants().then(restaurant_list => setRestaurants(restaurant_list));
        get_dishes("Heladeria Sarita").then(dish_list => setDishes(dish_list));
        setUser(JSON.parse(localStorage.getItem('user')))
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('user');
        alert("Sesión cerrada");
        router.push("/login");
    }

    const handleRestaurant = (id, img, name, rating, description) => {
        setSelectedRestaurant({ id, img, name, rating, description });
    
        get_dishes(name).then(dish_list => {
            setSelectedDishes(dish_list);
            setIsRestaurant(true);
        });
    
        get_restaurants_review(id).then(reviews_list => {
            setSelectedRestaurantReviews(reviews_list);
        });
    };
    

    useEffect(() => {
        console.log(selectedRestaurantReviews)
    }, [selectedRestaurantReviews])

    const toHome = () => {
        setIsRestaurant(false);
    }

    const handleDish = (id, img, name, price, description) => {
        const existingDish = shoppingCart.find(item => item.name === name);
        if (existingDish) {
          setShoppingCart(shoppingCart.map(item =>
            item.name === name ? { ...item, quantity: item.quantity + 1 } : item
          ));
        } else {
          setShoppingCart([...shoppingCart, { id, img, name, price, description, quantity: 1 }]);
        }
    }
      
    const removeDish = (indexToRemove) => {
        setShoppingCart(shoppingCart.filter((_, index) => index !== indexToRemove));
    }

    const handleUser = () => {
        router.push("/user");
    }

    const submitReview = async (e) => {
        const reviewData = {
            user_id: user.user_id,
            type: "restaurant",
            rate: parseInt(rate),
            title,
            comment,
            reviewed_item_id: selectedRestaurant.id,
        };
    
        await post_user_restaurant_reviews(reviewData); // reemplaza con tu función real
        document.getElementById("restaurant_review").close();
        alert("¡Gracias por tu reseña!");
    };

    const handleOrder = () => {
        const order_info = {
            user_id: user.user_id,
            order: {
                address: user.address,
                dishes: shoppingCart.map(dish => ({
                    dish_id: dish.id,
                    quantity: dish.quantity || 1
                })),
                state: "In Process",
                date: new Date().toISOString().split("T")[0],
                total: shoppingCart.reduce((acc, dish) => acc + (dish.price * (dish.quantity || 1)), 0)
            }
        };

        
    
        console.log(order_info);
        setShoppingCart([]);
        post_user_orders(order_info);
    };  
    

  return (
    <>
        <Header toHome={toHome}/>

        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <button className="btn" onClick={()=>document.getElementById('admin_modal').showModal()}>open modal</button>
        <dialog id="admin_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">Press ESC key or click the button below to close</p>
            <div className="modal-action">
            <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
            </form>
            </div>
        </div>
        </dialog>
        
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <dialog id="shopping_cart" className="modal modal-bottom w-full">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Carrito de compras</h3>
                <ul className="list bg-base-100 rounded-box shadow-md">
                    { shoppingCart.map((item, index) => (                    
                        <li className="list-row flex justify-between h-50" key={index}>
                            <div className='flex flex-row gap-10 justify-center align-middle items-center'>
                                <div><img className="avatar max-w-20 rounded-box" src={item.img}/></div>
                                <div>
                                    <div className='w-auto text-md'>{item.name}</div>
                                    <div className="w-auto text-md uppercase font-semibold opacity-60">Q{item.price}</div>
                                </div>
                                <p className="list-col-wrap text-md">{item.description}</p>
                            </div>
                            <div className='flex flex-row gap-2 justify-center align-middle items-center'>                                
                            <button onClick={() => {
                                setShoppingCart(cart =>
                                    cart.map((item, i) =>
                                    i === index && item.quantity > 1
                                        ? { ...item, quantity: item.quantity - 1 }
                                        : item
                                    )
                                );
                                }} className="btn btn-square btn-ghost">–</button>

                                <p className='text-center w-5'>{item.quantity}</p>

                                <button onClick={() => {
                                setShoppingCart(cart =>
                                    cart.map((item, i) =>
                                    i === index
                                        ? { ...item, quantity: item.quantity + 1 }
                                        : item
                                    )
                                );
                                }} className="btn btn-square btn-ghost">+</button>

                                <button
                                onClick={() => removeDish(index)}
                                className="btn btn-square self-start btn-error text-white"
                                aria-label="Eliminar platillo"
                                >
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="currentColor">
                                    <path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-4.5l-1-1z"/>
                                </svg>
                                </button>

                            </div>
                        </li>
                    ))}                
                </ul>

                <div className="flex justify-between mt-10 ml-10 mr-10">
                <span className="font-bold text-xl">Total:</span>
                <span className="text-xl font-semibold">
                    Q{shoppingCart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                </span>
                </div>

                <div className="modal-action">
                    <button className='btn btn-ghost mr-5'>{user.address}</button>
                    <form method="dialog" className='flex flex-row gap-5 justify-center align-middle items-center'>
                    {/* if there is a button in form, it will close the modal */}
                        <button className="btn">Cerrar</button>
                        <button disabled={shoppingCart.length === 0} className="btn btn-primary" onClick={() => handleOrder()}>Comprar</button>
                    </form>
                </div>
            </div>
        </dialog>

        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <dialog id="restaurant_review" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box flex flex-col justify-center items-center">
                <h3 className="font-bold text-lg mb-4">Califica este restaurante</h3>

                <form
                    onSubmit={e => {
                        e.preventDefault();
                        submitReview()
                    }}
                    className="space-y-4"
                >
                    <div className="form-control">
                        <label className="label font-medium">Puntuación</label>
                        <input type="number" name="rate" placeholder="1-5" value={rate} onChange={(e) => setRate(e.target.value)} className='input input-bordered' />
                    </div>

                    <label className="label font-medium">Título</label>
                    <div className="form-control">
                        <input
                            name="title"
                            type="text"
                            className="input input-bordered"
                            placeholder="Título de tu reseña"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <label className="label font-medium">Comentario</label>
                    <div className="form-control">
                        <textarea
                            name="comment"
                            className="textarea textarea-bordered"
                            placeholder="Escribe tu comentario..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    <div className="modal-action flex justify-between">
                        <form method="dialog">
                            <button className="btn">Cerrar</button>
                        </form>
                        <button type="submit" className="btn btn-primary">
                            Enviar reseña
                        </button>
                    </div>
                </form>
            </div>
        </dialog>

        <div className="drawer lg:drawer-open ab fixed">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {/* Page content here */}

                <div className='fixed top-0 left-0 w-screen h-screen -z-10'>
                        <img src={"https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg"}
                        className='w-full h-full object-cover'
                        alt="Banner" />
                </div>
                { isRestaurant && selectedRestaurant ? (
                    <div className='w-full'>
                    <div className='fixed top-0 left-0 w-screen h-screen -z-10'>
                        <img src={selectedRestaurant.banner_img || "https://images.unsplash.com/photo-1543353071-10c8ba85a904?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZCUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D"}
                        className='w-full h-full object-cover'
                        alt="Banner" />
                    </div>

                    <div className='flex flex-col bg-base-100 h-screen p-10 sm:w-[90%] sm:rounded-2xl shadow-sm m-auto'>
                        <div className='flex flex-row justify-between w-full items-center'>
                            <div className="avatar">
                                <div className="w-24 rounded-full">
                                    <img src={selectedRestaurant.img} alt="Restaurant" />
                                </div>
                            </div>
                            <h1 className='text-6xl font-bold text-center'>{selectedRestaurant.name}</h1>
                            <p>{selectedRestaurant.description}</p>
                            <button className='btn btn-neutral' onClick={()=>document.getElementById('restaurant_review').showModal()}>Calificar</button>
                        </div>
                        <div className="carousel rounded-box ml-auto mr-auto">
                            <div className="carousel-item">
                                {selectedDishes.map((dish, index) => (
                                    <div key={index} className="w-full">
                                        <Dish_card
                                            handleDish={handleDish}
                                            dish_id={dish.dish_id}
                                            dish_img={dish.img}
                                            dish_name={dish.name}
                                            dish_rating={dish.rating}
                                            dish_price={dish.price}
                                            dish_description={dish.description}
                                            />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="carousel rounded-box ml-auto mr-auto">
                            {selectedRestaurantReviews.slice(0,5).map((review, index) => (
                                <div className="carousel-item">
                                    <div key={index} className="w-full">
                                        <Review_card
                                            user_name={review.user_info.user_name}
                                            review_title={review.title}
                                            review_description={review.comment}
                                            review_rating={review.rate}
                                            />
                                    </div>
                                </div>
                                ))}
                        </div>
                    </div>
                </div>
                ) : (
                    <div className='mt-auto bg-base-100 ml-auto xl:h-[85%] w-auto sm:h-screen'>
                        <div className="carousel rounded-box ml-auto mr-auto">
                            {restaurants.map((restaurant, index) => (
                                <div className="carousel-item" key={index}>
                                <div className="w-full">
                                <Restaurant_card
                                    handleRestaurant={handleRestaurant}
                                    restaurant_id={restaurant.restaurant_id}
                                    restaurant_img={restaurant.img}
                                    restaurant_name={restaurant.restaurant_name}
                                    restaurant_rating={restaurant.rating}
                                    restaurant_description={restaurant.description}
                                />
                                </div>
                            </div>
                            ))}
                        </div>
                        <div className="carousel rounded-box ml-auto mr-auto">
                            {dishes.map((dish, index) => (
                            <div className="carousel-item" key={index}>
                                <div className="w-full">
                                <Promo_card
                                    dish_img={dish.img}
                                    dish_name={dish.name}
                                    dish_price={dish.price}
                                />
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <div className="drawer-side shadow-sm">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-100 min-h-full w-70 pt-10 pb-10 flex flex-col items-center justify-around">
                    {/* Sidebar content here */}
                    <div className="flex flex-col gap-7 justify-center items-center avatar cursor-pointer" onClick={() => handleUser()}>
                        <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2">
                            <img src={user.img || "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"} />
                        </div>
                        <span className='badge badge-ghost w-auto text-3xl'>{user.user_name}</span>
                    </div>
                    <ul className='flex flex-col gap-5'>
                        { user.admin === 1 && (
                            <li><div className='btn btn-neutral text-2xl'>Agregar restaurante</div></li>
                        )}
                    </ul>
                    <li><div onClick={handleLogout} className='h-10 btn btn-primary text-2xl'>Cerrar sesión</div></li>
                </ul>
            </div>
        </div>
    </>
  )
}