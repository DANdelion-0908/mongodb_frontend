import { fetchUser, put_user_review } from '@/app/functions/user';
import React, { useState } from 'react'

const User_review_card = ({ user_name, review_id, review_title, review_description, review_rating }) => {

    const [newTitle, setNewTitle] = useState("");
    const [newComment, setNewComment] = useState("");
    const [newRate, setNewRate] = useState(1);

    const handleEdit = async () => {
        const user = await fetchUser(user_name);
        const data = JSON.stringify({
            user_id: user.user_id,
            title: newTitle,
            comment: newComment,
            rate: parseInt(newRate)
        })

        put_user_review(review_id, data)
  }
  
  return (
    <>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <dialog id="review_edit" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box flex flex-col justify-center items-center">
                <h3 className="font-bold text-lg">Editar review</h3>
                <fieldset className="fieldset">

                    <label className="label">Título</label>
                    <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)}  className="input" placeholder="Nuevo título" />

                    <label className="label">Comentario</label>
                    <textarea type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} className="textarea" placeholder="Nuevo comentario" />

                    <label className="label font-medium">Puntuación</label>
                    <input type="number" name="rate" placeholder="1-5" value={newRate} onChange={(e) => setNewRate(e.target.value)} className='input input-bordered' />

                </fieldset>
                <div className="modal-action">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <div className='flex gap-10'>
                        <button className="btn">Cancelar</button>
                        <button className='btn btn-primary' onClick={() => handleEdit()}>Aceptar</button>
                    </div>
                </form>
                </div>
            </div>
        </dialog>
        <div className="card m-2 w-auto bg-base-100 shadow-sm cursor-pointer hover:scale-103 transition-all" onClick={() => document.getElementById('review_edit').showModal()}>
            <div className="card-body">
                <h2 className="card-title">{review_title}</h2>
                <h3>De: {user_name}</h3>
                <p>{review_description}</p>
                <h2 className='card-title'>Rating: {review_rating}</h2>
                <div className="card-actions justify-center">
                </div>
            </div>
        </div>
    </>
  )
}

export default User_review_card