import { fetchUser } from '@/app/functions/user'
import { report_user_review } from '@/controller/restaurant_controller'
import React from 'react'

const Review_card = ({ user_name, review_title, review_description, review_rating }) => {
  
  const handleReport = async () => {
    const user = await fetchUser(user_name)
    if(confirm('¿Quieres reportar esta reseña?')) {
      report_user_review(user.user_id)
    }
  }
  
  return (
    <>
        <div className="card m-2 w-auto bg-base-100 shadow-sm cursor-pointer hover:scale-103 transition-all" onClick={() => handleReport()}>
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

export default Review_card