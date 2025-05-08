import { fetchUser, post_user_order_reviews } from '@/app/functions/user';
import React, { useState } from 'react'

const Order_card = ({ user_name, order_id, order_address, order_dishes, order_total, order_state, order_date }) => {
    const [newTitle, setNewTitle] = useState("");
    const [newComment, setNewComment] = useState("");
    const [newRate, setNewRate] = useState(0);
    const [isRating, setIsrating] = useState(false);

    const handleReviewOrder = async () => {
        const user = await fetchUser(user_name);
        const data = JSON.stringify({
            user_id: user.user_id,
            title: newTitle,
            comment: newComment,
            rate: parseInt(newRate),
            reviewed_item_id: order_id
        })

        post_user_order_reviews(data);
  }
  

    return (
    <>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <dialog id="order_review" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box flex flex-col justify-center items-center">
                <h3 className="font-bold text-lg">Calificar pedido</h3>
                <fieldset className="fieldset">
                    <label className="label">Título</label>
                    <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="input"
                        placeholder="Nuevo título"
                    />

                    <label className="label">Comentario</label>
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="textarea"
                        placeholder="Nuevo comentario"
                    />

                    <label className="label font-medium">Puntuación</label>
                    <input
                        type="number"
                        name="rate"
                        placeholder="1-5"
                        value={newRate}
                        onChange={(e) => setNewRate(e.target.value)}
                        className="input input-bordered"
                    />
                </fieldset>

                <div className="modal-action">
                    <form method="dialog">
                        <div className="flex gap-10">
                            <button className="btn">Cancelar</button>
                            <button
                                className="btn btn-primary"
                                onClick={() => handleReviewOrder()}
                            >
                                Aceptar
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </dialog>

        <div className="card m-5 w-auto bg-base-100 shadow-sm cursor-pointer hover:scale-103 transition-all" onClick={()=>document.getElementById('order_review').showModal()}>
            <div className="card-body pt-[12%]">
                <div className='flex flex-row justify-between mb-2'>
                    <h2 className="card-title">Estado: {order_state}</h2>
                    <span className="badge badge-md badge-neutral">{order_date}</span>
                </div>
                <h2 className='self-start'>Dirección: {order_address}</h2>
                <div className="card-actions justify-center">
                    <ul className="list bg-base-100 w-full rounded-box shadow-md">
  
                        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Platillos ordenados</li>
                        
                        {order_dishes.map((dish, index) => {
                            return(
                                <li className="list-row" key={index}>
                                    <div><img className="size-10 rounded-box" src={dish.img}/></div>
                                    <div>
                                    <div>{dish.name}</div>
                                    <div className="text-xs uppercase font-semibold opacity-60">Q{dish.price}</div>
                                    </div>
                                </li>                        
                            )
                        })}
                    </ul>
                    <h2>Total: {order_total}</h2>
                </div>
            </div>
        </div>
    </>
  )
}

export default Order_card