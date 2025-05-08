import React from 'react'

const Order_card = ({ order_state, order_date }) => {
    return (
    <>
        <div className="card m-5 w-auto bg-base-100 shadow-sm cursor-pointer hover:scale-103 transition-all">
            <div className="card-body pt-[12%]">
                <h2 className="card-title">Estado: {order_state}</h2>
                <div className="card-actions justify-center">
                    <span className="badge badge-md badge-neutral">{order_date}</span>
                </div>
            </div>
        </div>
    </>
  )
}

export default Order_card