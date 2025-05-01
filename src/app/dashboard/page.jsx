'use client'

import React from 'react'
import Restaurant_card from '@/components/restaurant_card'
import get_restaurants, { get_dishes } from '@/controller/restaurant_controller'
import { useState, useEffect } from 'react'
import Promo_card from '@/components/promo_card'
import Header from '@/components/header'
import { useRouter } from 'next/navigation';

export default function Dashboard ({ handleAuth }) {
    const [restaurants, setRestaurants] = useState([]);
    const [dishes, setDishes] = useState([]);
    const [user, setUser] = useState({});
    const router = useRouter();

    useEffect(() => {
        get_restaurants().then(restaurant_list => setRestaurants(restaurant_list));
        get_dishes("Pizza Hut").then(dish_list => setDishes(dish_list));
        setUser(JSON.parse(localStorage.getItem('user')))
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('user');
        router.push('/login');
        alert("Sesión cerrada");
    }

  return (
    <>
        <Header />
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {/* Page content here */}
                <div className="carousel rounded-box ml-auto mr-auto">
                    <div className="carousel-item">
                        {restaurants.map((restaurant, index) => (
                            <div key={index} className="w-full">
                                <Restaurant_card
                                    restaurant_img={restaurant.img}
                                    restaurant_name={restaurant.restaurant_name}
                                    restaurant_rating={restaurant.rating}
                                    />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="carousel rounded-box ml-auto mr-auto">
                <div className="carousel-item">
                    {dishes.map((dish, index) => (
                        <div key={index} className="w-full">
                            <Promo_card
                                dish_img={dish.img}
                                dish_name={dish.name}
                                dish_price={dish.price}
                                />
                        </div>
                    ))}
                </div>
                </div>
            </div>
            <div className="drawer-side shadow-sm">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-100 min-h-full w-70 pt-10 pb-10 flex flex-col items-center justify-between">
                    {/* Sidebar content here */}
                    <div className="flex flex-col gap-7 justify-center items-center avatar cursor-pointer" onClick={() => {alert("Perfil")}}>
                        <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2">
                            <img src={user.image || "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"} />
                        </div>
                        <span className='badge badge-ghost w-auto text-xl'>{user.user_name}</span>
                    </div>
                    <ul className='flex flex-col gap-5'>
                        <li><div className='btn btn-neutral'>Lorem Ipsum</div></li>
                        <li><div className='btn btn-neutral'>El diablo, bro</div></li>
                        <li><div className='btn btn-neutral'>No sé qué poner</div></li>
                    </ul>
                    <li><div onClick={handleLogout} className='btn btn-primary'>Cerrar sesión</div></li>
                </ul>
            </div>
        </div>
    </>
  )
}