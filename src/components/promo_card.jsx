import React from 'react'

const Promo_card = ({ dish_img, dish_name, dish_price }) => {
  return (
    <>
        <div className="card m-5 max-w-80 min-h-70 bg-base-100 shadow-sm cursor-pointer hover:scale-103 transition-all" onClick={() => {alert(`${dish_name}`)}}>
            <span className='badge badge-warning absolute badge-md self-end text-md font-bold'>5%</span>
            <figure>
                <img
                src={dish_img}
                className='w-[80%] h-[80%] object-cover'
                alt="Dish image" />
            </figure>
            <div className="flex flex-row card-body h-auto items-center justify-center">
                <h2 className="card-title text-3xl">{dish_name}</h2>
                <p className='text-3xl font-extralight text-gray-500'>Q{dish_price - (dish_price * 0.05)}</p>
            </div>
        </div>
    </>
  )
}

export default Promo_card