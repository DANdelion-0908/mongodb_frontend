'use client'

import React from 'react'
import Restaurant_card from '@/components/restaurant_card'
import {get_restaurants, get_dishes } from '@/controller/restaurant_controller'
import { useState, useEffect } from 'react'
import Promo_card from '@/components/promo_card'
import Header from '@/components/header'
import { useRouter } from 'next/navigation';
import Dish_card from '@/components/dish_card'
import Review_card from '@/components/review_card'

export default function Dashboard ({ handleAuth }) {
    const [restaurants, setRestaurants] = useState([]);
    const [isRestaurant, setIsRestaurant] = useState(false);
    const [selectedRestaurant, setSelectedRestaurant] = useState({});
    const [dishes, setDishes] = useState([]);
    const [selectedDishes, setSelectedDishes] = useState([]);
    const [user, setUser] = useState({});
    const router = useRouter();

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
        get_dishes("Pizza Hut").then(dish_list => setDishes(dish_list));
        setUser(JSON.parse(localStorage.getItem('user')))
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('user');
        alert("Sesión cerrada");
        router.push("/login");
    }

    const handleRestaurant = (img, name, rating, description) => {
        setSelectedRestaurant({ img, name, rating, description });
        get_dishes(name).then(dish_list => {
            setSelectedDishes(dish_list);
            setIsRestaurant(true);
        });
    }

    const toHome = () => {
        setIsRestaurant(false);
    }

    const handleUser = () => {
        router.push("/user");
    }
    

  return (
    <>
        <Header toHome={toHome}/>
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {/* Page content here */}

                <div className='fixed top-0 left-0 w-screen h-screen -z-10'>
                        <img src={"https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg"}
                        className='w-full h-full object-cover'
                        alt="Banner" />
                </div>
                { isRestaurant && selectedRestaurant ? (
                <div className='mt-[10%] w-full'>
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
                            <div className="rating rating-lg">
                                <input type="radio" name="rating-3" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-3" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-3" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-3" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-3" className="mask mask-star-2 bg-orange-400" />
                            </div>
                        </div>
                        <div className="carousel rounded-box ml-auto mr-auto">
                            <div className="carousel-item">
                                {selectedDishes.map((dish, index) => (
                                    <div key={index} className="w-full">
                                        <Dish_card
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
                            <div className="carousel-item">
                                {selectedDishes.map((dish, index) => (
                                    <div key={index} className="w-full">
                                        <Review_card
                                            user_name={dish.name}
                                            review_title={dish.name}
                                            review_description={dish.description}
                                            review_rating={dish.rating}
                                            />
                                    </div>
                                ))}
                            </div>
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
                <ul className="menu bg-base-100 min-h-full w-70 pt-10 pb-10 flex flex-col items-center justify-between">
                    {/* Sidebar content here */}
                    <div className="flex flex-col gap-7 justify-center items-center avatar cursor-pointer" onClick={() => handleUser()}>
                        <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2">
                            <img src={user.img || "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"} />
                        </div>
                        <span className='badge badge-ghost w-auto text-3xl'>{user.user_name}</span>
                    </div>
                    <ul className='flex flex-col gap-5'>
                        <li><div className='btn btn-neutral text-2xl'>Lorem Ipsum</div></li>
                        <li><div className='btn btn-neutral text-2xl'>El diablo, bro</div></li>
                        <li><div className='btn btn-neutral text-2xl'>No sé qué</div></li>
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