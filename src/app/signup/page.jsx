'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { registerUser } from '../functions/user';

export default function Signup() {
    const [user_name, setusername] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const router = useRouter();

    const handleAuth = () => {
        router.push("/login")
    }
    
    const handleSignup = async () => {
        if (password === verifyPassword) {
            const body = JSON.stringify({ user_name, password, "admin": 0 })
            const response = await registerUser(body);
            console.log(response?.status);

            if (response?.ok) {
                handleAuth();
            }

        } else {
            alert("Las contraseñas no coinciden.")
        }
    }

    const handleLogin= () => {
        router.push("/login")
    }

    return (
        <>
            <div className="hero min-h-screen justify-center">
                <div className="hero-content w-[60%] h-auto flex-col">
                    <div className="card w-full h-full">
                        <div className='flex flex-col text-start gap-10'>
                            <img src="favicon.png" className='self-center' alt="Logo de WTP" width={"100vh"}/>
                            <h1 className="text-3xl font-bold">Regístrate con tus datos</h1>
                        </div>
                        <form className="card-body w-full" action={() => handleSignup()}>
                            <div className="form-control">
                            <label className="label">
                                <span className="badge badge-ghost">Nombre de usuario</span>
                            </label>
                            <input type="text" value={user_name} onChange={(e) => setusername(e.target.value)} placeholder="nombre de usuario" className="input input-bordered w-full mb-5" required />
                            </div>
                            <div className="form-control">
                            <label className="label">
                                <span className="badge badge-ghost">Contraseña</span>
                            </label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="contraseña" className="input input-bordered w-full" required />
                            <label className="label">
                                <span className="badge badge-ghost">Verifica tu contraseña</span>
                            </label>
                            <input type="password" value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)} placeholder="verificación de contraseña" className="input input-bordered w-full" required />
                            <label className="label">
                            </label>
                            </div>
                            <div className="form-control flex flex-col items-center mt-6">
                            <button type='submit' className="btn w-full btn-primary">Registrarse</button>
                            <div className='divider'>O</div>
                            <button type='button' className='btn w-full btn-soft' onClick={handleLogin}>Iniciar sesión</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}