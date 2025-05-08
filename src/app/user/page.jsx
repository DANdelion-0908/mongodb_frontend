'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import Review_card from '@/components/review_card'
import Order_card from '@/components/order_card'
import { fetchUser, get_user_orders, get_user_reviews, put_user_info } from '../functions/user';
import Header from '@/components/header'

const User = () => {
    const [user, setUser] = useState({});
    const [reviews, setReviews] = useState([]);
    const [isSuccess, setIsSuccess] = useState("");
    const [orders, setOrders] = useState([]);
    const router = useRouter();

    const [newUsername, setNewUsername] = useState("");
    const [newImg, setNewImg] = useState("");
    const [newAddress, setNewAddress] = useState("");

    const toHome = () => {
        router.push("/dashboard");
    }

    const handleLogout = () => {
        localStorage.removeItem('user');
        alert("Sesión cerrada");
        router.push("/login");
    }

    const handleUserChange = () => {    
        put_user_info(user.user_id, newUsername, newImg)
            .then(() => setIsSuccess(true))
            .catch(() => setIsSuccess(false));
    
        setTimeout(() => {
            setIsSuccess("");
        }, 5000);
        localStorage.setItem('user', JSON.parse(fetchUser(newUsername)));
        setUser(JSON.parse(localStorage.getItem('user')));
        window.location.reload();
    }    

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')));
        get_user_orders(user.user_id).then(order_list => setOrders(order_list));
        get_user_reviews(user.user_id).then(review_list => setReviews(review_list));
    }, [])
    
    useEffect(() => {
        get_user_orders(user.user_id).then(order_list => setOrders(order_list));
        get_user_reviews(user.user_id).then(review_list => setReviews(review_list));
    }, [user])
    

  return (
    <>
    <Header toHome={toHome}/>
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {/* Page content here */}

                <div className='fixed top-0 left-0 w-screen h-screen -z-10'>
                        <img src={"https://wallpapers.com/images/hd/food-4k-1pf6px6ryqfjtnyr.jpg"}
                        className='w-full h-full object-cover'
                        alt="Banner" />
                </div>

                {/* Open the modal using document.getElementById('ID').showModal() method */}
                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Editar perfil</h3>
                    <fieldset className="fieldset p-4 mt-2">
                        <label className="label">Nombre de usuario</label>
                        <input type="text" className="input w-full" placeholder="Tyler1" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />

                        <label className="label">Imagen de perfil</label>
                        <input type="text" className="input w-full" placeholder="URL de la imagen" value={newImg} onChange={(e) => setNewImg(e.target.value)} />

                        {/* <label className="label">Dirección</label>
                        <input type="text" className="input w-full" placeholder="Dirección" value={newAddress} onChange={(e) => setNewAddress(e.target.value)} /> */}
                    </fieldset>
                    <div className="modal-action">
                    <form method="dialog" className="flex flex-row gap-5">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn">Close</button>
                        <button className="btn btn-primary" onClick={() => { handleUserChange(); setIsSuccess(true); }}>Guardar</button>
                    </form>
                    </div>
                </div>
                </dialog>
                {/* END MODAL */}

                { isSuccess === true ? (
                    <div className="toast absolute">
                        <div className="alert alert-success shadow-md">
                            <span>Perfil actualizado</span>
                        </div>
                    </div>
                ) : isSuccess === false && (
                    <div className="toast absolute">
                        <div className="alert alert-error shadow-md">
                            <span>Error al actualizar el perfil</span>
                        </div>
                    </div>
                )}

                <div className='mt-[10%] w-full'>
                    <div className='flex flex-col bg-base-100 justify-between gap-25 h-auto p-10 sm:w-[90%] sm:rounded-2xl shadow-sm m-auto'>
                        <div className='flex flex-row gap-15 w-full items-center'>
                            <div className="indicator indicator-bottom avatar cursor-pointer hover:scale-110 transition" onClick={()=>document.getElementById('my_modal_5').showModal()}>
                                <div className="w-24 rounded-full">
                                <img src={user.img || "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"} />
                                </div>
                                <span className='indicator-item badge badge-neutral w-auto'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg></span>
                            </div>
                            <h1 className='text-4xl font-bold text-center'>{user.user_name}</h1>
                            <p>{user.description}</p>
                        </div>
                        <div className='flex flex-col items-center'>
                            <h1 className='text-2xl font-bold self-start'>Reseñas</h1>
                            { reviews && reviews.length > 0 ? (
                                <div className="carousel rounded-box ml-auto mr-auto">
                                    <div className="carousel-item">
                                        {reviews.map((review, index) => (
                                            <div key={index} className="w-full">
                                                <Review_card
                                                    review_img={review.img}
                                                    review_name={user.name}
                                                    review_title={review.title}
                                                    review_rating={review.rate}
                                                    review_price={review.price}
                                                    review_description={review.comment}/>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col justify-center items-center">
                                    <h1 className='text-2xl font-bold text-center'>No tienes reseñas</h1>
                                    <p className='text-lg'>Realiza una reseña para ver tus compras</p>
                                </div>
                            )}
                        </div>
                        <div className='flex flex-col items-center'>
                            <h1 className='text-2xl font-bold self-start'>Órdenes</h1>
                            { orders && orders.length > 0 ? (
                                <div className="carousel rounded-box ml-auto mr-auto">
                                    <div className="carousel-item">
                                        {orders.map((order, index) => (
                                            <div key={index} className="w-full">
                                                <Order_card
                                                    order_state={order.state}
                                                    order_date={order.date} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col justify-center items-center">
                                    <h1 className='text-2xl font-bold text-center'>No tienes pedidos</h1>
                                    <p className='text-lg'>Realiza un pedido para ver tus compras</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="drawer-side shadow-sm">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-100 min-h-full w-70 pt-10 pb-10 flex flex-col items-center justify-between">
                    {/* Sidebar content here */}
                    <div className="flex flex-col gap-7 justify-center items-center avatar cursor-pointer" onClick={() => document.getElementById('my_modal_5').showModal()}>
                        <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2">
                            <img src={user.img || "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"} />
                        </div>
                        <span className='badge badge-ghost w-auto text-xl'>{user.user_name}</span>
                    </div>
                    <ul className='flex flex-col gap-5'>
                    </ul>
                    <li><div onClick={handleLogout} className='btn btn-primary'>Cerrar sesión</div></li>
                </ul>
            </div>
        </div>
    </>
  )
}

export default User