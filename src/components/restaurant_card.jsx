import React from 'react'

const Restaurant_card = ({ restaurant_img, restaurant_name, restaurant_rating }) => {
  return (
    <>
        <div className="card max-w-100 min-h-80 max-h-80 mt-50 m-5 bg-base-100 shadow-sm cursor-pointer hover:scale-103 transition-all" onClick={() => {alert(`${restaurant_name}`)}}>
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
                        <div className="mask mask-star" aria-label="1 star"></div>
                        <div className="mask mask-star" aria-label="2 star"></div>
                        <div className="mask mask-star" aria-label="3 star"></div>
                        <div className="mask mask-star" aria-label="4 star" aria-current="true"></div>
                        <div className="mask mask-star" aria-label="5 star"></div>
                    </div>
                    <span className="badge badge-md badge-neutral">{restaurant_rating}</span>
                </div>
            </div>
        </div>
    </>
  )
}

export default Restaurant_card