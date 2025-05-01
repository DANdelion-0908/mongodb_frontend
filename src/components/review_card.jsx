import React from 'react'

const Review_card = ({ user_name, review_title, review_description, review_rating }) => {
  return (
    <>
        <div className="card max-w-100 min-h-50 max-h-80 m-5 bg-base-100 shadow-sm cursor-pointer hover:scale-103 transition-all" onClick={() => {alert(`${review_title}`)}}>
            <div className="card-body">
                <h2 className="card-title">{review_title}</h2>
                <p>{review_description}</p>
                <h2 className='card-title'>Rating: {review_rating}</h2>
                <div className="card-actions justify-center">
                    <div className="rating" id={user_name}>
                            <div className="mask mask-star bg-orange-400" aria-label="1 star"></div>
                            <div className="mask mask-star bg-orange-400" aria-label="2 star"></div>
                            <div className="mask mask-star bg-orange-400" aria-label="3 star"></div>
                            <div className="mask mask-star bg-orange-400" aria-label="4 star" aria-current="true"></div>
                            <div className="mask mask-star bg-orange-400" aria-label="5 star"></div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Review_card