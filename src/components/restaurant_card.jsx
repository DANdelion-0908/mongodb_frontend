import React from 'react'

const Restaurant_card = ({ handleRestaurant, restaurant_id, restaurant_img, restaurant_name, restaurant_rating, restaurant_description }) => {
    return (
    <>
        <div className="card max-w-80 min-h-60 max-h-70 m-5 bg-base-100 shadow-sm cursor-pointer hover:scale-103 transition-all" onClick={() => { handleRestaurant(restaurant_id, restaurant_img, restaurant_name, restaurant_rating, restaurant_description); }}>
            
            <figure>
                <img
                src={restaurant_img}
                width={"full"}
                alt="Imagen del restaurante" />
            </figure>
            
            <div className="card-body pt-[5%]">
                <h2 className="card-title text-4xl">{restaurant_name}</h2>
                <div className="card-actions justify-center">
                    <div className="rating" id={restaurant_name}>
                        <div className="mask mask-star bg-orange-400" aria-label="1 star"></div>
                        <div className="mask mask-star bg-orange-400" aria-label="2 star"></div>
                        <div className="mask mask-star bg-orange-400" aria-label="3 star" aria-current="true"></div>
                        <div className="mask mask-star bg-orange-400" aria-label="4 star"></div>
                        <div className="mask mask-star bg-orange-400" aria-label="5 star"></div>
                    </div>
                    <span className="badge badge-md badge-neutral">{Math.round(restaurant_rating)}</span>
                </div>
            </div>
        </div>
    </>
  )
}

export default Restaurant_card