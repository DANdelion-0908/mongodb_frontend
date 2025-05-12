// import React from 'react'

// const Promo_card = ({ dish_img, dish_name, dish_price }) => {
//   return (
//     <>
//         <div className="card m-5 max-w-80 min-h-70 bg-base-100 shadow-sm cursor-pointer hover:scale-103 transition-all" onClick={() => {alert(`${dish_name}`)}}>
//             <span className='badge badge-warning absolute badge-md self-end text-md font-bold'>5%</span>
//             <figure>
//                 <img
//                 src={dish_img}
//                 className='w-[80%] h-[80%] object-cover'
//                 alt="Dish image" />
//             </figure>
//             <div className="flex flex-row card-body h-auto items-center justify-center">
//                 <h2 className="card-title text-3xl">{dish_name}</h2>
//                 <p className='text-3xl font-extralight text-gray-500'>Q{dish_price - (dish_price * 0.05)}</p>
//             </div>
//         </div>
//     </>
//   )
// }

// export default Promo_card

import React from 'react'

const Promo_card = ({ handleDish, dish_id, dish_img, dish_name, dish_rating, dish_price, dish_description }) => {
  const modalId = `modal-${dish_name.replace(/\s+/g, '-')}`; // ejemplo: "Pizza Suprema" => "modal-Pizza-Suprema"

  return (
    <>
      <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <img src={dish_img} alt="Imagen del platillo" className="w-full rounded-lg" />
          <h3 className="font-bold text-3xl mt-4">{dish_name}</h3>
          <p className="text-xl py-4">{dish_description}</p>
          <h3 className='font-extralight text-3xl'>Q{dish_price}</h3>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Cerrar</button>
            </form>
          </div>
        </div>
      </dialog>

      <div
        className="card max-w-100 min-h-80 max-h-80 m-5 bg-base-100 shadow-sm"
        onClick={() => document.getElementById(modalId).showModal()}
      >
        <figure>
          <img src={dish_img} width={"full"} alt="Imagen del platillo" />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-4xl">{dish_name}</h2>
          <h2 className="card-title text-3xl font-extralight text-gray-500">Q{dish_price}</h2>
          <div className="card-actions justify-center">
          </div>
        </div>
      </div>
    </>
  )
}

export default Promo_card
