import React from 'react'

const Dish_card = ({ dish_img, dish_name, dish_rating, dish_price, dish_description }) => {
  return (
    <>
        <div className="card max-w-100 min-h-80 max-h-80 m-5 bg-base-100 shadow-sm cursor-pointer hover:scale-103 transition-all" onClick={() => {alert(`${dish_name}`)}}>
            <figure>
                <img
                src={dish_img}
                width={"full"}
                alt="Imagen del platillo" />
            </figure>
            <div className="card-body">
                <h2 className="card-title text-4xl">{dish_name}</h2>
                <h2 className='card-title text-3xl font-extralight text-gray-500'>Q{dish_price}</h2>
                <div className="card-actions justify-center">
                    <span className="w-full btn btn-sm btn-accent text-3xl">+</span>
                </div>
            </div>
        </div>
    </>
  )
}

export default Dish_card