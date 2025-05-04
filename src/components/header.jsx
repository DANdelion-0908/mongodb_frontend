import Router from 'next/router'
import React from 'react'

const Header = ({ toHome }) => {
  return (
    <div className="navbar bg-base-100 shadow-sm fixed top-0 z-1">
            <div className="navbar-start">
                <label htmlFor="my-drawer-2" className="btn btn-ghost btn-md drawer-button lg:hidden" aria-label="open sidebar">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-6 w-6 stroke-current"
                    >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                </svg>
            </label>
        </div>
        <div className="navbar-center">
            <a className="btn btn-ghost text-4xl" onClick={toHome}>Sabor 2</a>
        </div>
        <div className="navbar-end">
        <svg className='btn btn-ghost btn-md' onClick={()=>document.getElementById('shopping_cart').showModal()} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"/></svg>
        </div>
    </div>
  )
}

export default Header