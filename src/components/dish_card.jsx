import React from 'react'

const Dish_card = ({ handleDish, dish_id, dish_img, dish_name, dish_rating, dish_price, dish_description }) => {
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
              <button className="btn btn-primary ml-5" onClick={() => handleDish(dish_id, dish_img, dish_name, dish_price, dish_description)}>Agregar</button>
            </form>
          </div>
        </div>
      </dialog>

      <div
        className="card max-w-100 min-h-80 max-h-80 m-5 bg-base-100 shadow-sm cursor-pointer hover:scale-103 transition-all"
        onClick={() => document.getElementById(modalId).showModal()}
      >
        <figure>
          <img src={dish_img} width={"full"} alt="Imagen del platillo" />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-4xl">{dish_name}</h2>
          <h2 className="card-title text-3xl font-extralight text-gray-500">Q{dish_price}</h2>
          <div className="card-actions justify-center">
            <span className="w-full btn btn-sm btn-accent text-3xl">+</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dish_card
