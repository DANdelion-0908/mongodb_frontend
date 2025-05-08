import React from 'react'

const Review_card = ({ user_name, review_title, review_description, review_rating }) => {
  return (
    <>
        <div className="card m-2 w-auto bg-base-100 shadow-sm cursor-pointer hover:scale-103 transition-all" onClick={() => {alert(`${review_title}`)}}>
            <div className="card-body">
                <h2 className="card-title">{review_title}</h2>
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