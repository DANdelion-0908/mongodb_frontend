import React from 'react'

const Restaurant_card = ({ handleRestaurant, restaurant_img, restaurant_name, restaurant_rating, restaurant_description }) => {
    return (
    <>
        <div className="card max-w-100 min-h-80 max-h-80 mt-50 m-5 bg-base-100 shadow-sm cursor-pointer hover:scale-103 transition-all" onClick={() => { handleRestaurant(restaurant_img, restaurant_name, restaurant_rating, restaurant_description); }}>
            
            <figure>
                <img
                src={restaurant_img}
                width={"full"}
                alt="Imagen del restaurante" />
            </figure>
            <div className="card-body pt-[12%]">
                <h2 className="card-title">{restaurant_name}</h2>
                <div className="card-actions justify-center">
                    <div className="rating" id={restaurant_name}>
                        <div className="mask mask-star bg-orange-400" aria-label="1 star"></div>
                        <div className="mask mask-star bg-orange-400" aria-label="2 star"></div>
                        <div className="mask mask-star bg-orange-400" aria-label="3 star"></div>
                        <div className="mask mask-star bg-orange-400" aria-label="4 star" aria-current="true"></div>
                        <div className="mask mask-star bg-orange-400" aria-label="5 star"></div>
                    </div>
                    <span className="badge badge-md badge-neutral">{restaurant_rating}</span>
                </div>
            </div>
        </div>
    </>
  )
}

export default Restaurant_card