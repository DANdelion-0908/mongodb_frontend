'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { registerUser } from '../functions/user';

export default function Signup() {
    const [email, setEmail] = useState("");
    const [username, setusername] = useState("");
    const [born, setBorn] = useState("");
    const [first_name, setfirst_name] = useState("");
    const [last_name, setlast_name] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [gender, setgender] = useState("M");
    const router = useRouter();

    const handleAuth = () => {
        router.push("/login")
    }
    
    const handleSignup = async () => {
        if (password === verifyPassword) {
            const body = JSON.stringify({ username, password, email, born, first_name, last_name, gender })
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
                        <form className="card-body" action={() => handleSignup()}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-primary">Nombre</span>
                            </label>
                            <input type="text" value={first_name} onChange={(e) => setfirst_name(e.target.value)} placeholder="nombre de usuario" className="input input-bordered" required />   
                            <label className="label">
                                <span className="label-text text-primary">Apellido</span>
                            </label>
                            <input type="text" value={last_name} onChange={(e) => setlast_name(e.target.value)} placeholder="nombre de usuario" className="input input-bordered" required />
                        </div>
                            <div className="form-control">
                            <label className="label">
                                <span className="label-text text-primary">Nombre de usuario</span>
                            </label>
                            <input type="text" value={username} onChange={(e) => setusername(e.target.value)} placeholder="nombre de usuario" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                            <label className="label">
                                <span className="label-text text-primary">Correo electrónico</span>
                            </label>
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="correo electrónico" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                            <label className="label">
                                <span className="label-text text-primary">Fecha de nacimiento</span>
                            </label>
                            <input type="date" value={born} onChange={(e) => setBorn(e.target.value)} placeholder="nombre de usuario" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                            <label className="label">
                                <span className="label-text text-primary">Género</span>
                            </label>
                            <div className='flex items-center gap-5'>
                                <div className='flex items-center gap-2'>
                                <label className='label-text text-primary'>M</label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="M"
                                    checked={gender === "M"}
                                    onChange={(e) => setgender(e.target.value)}
                                    className="radio radio-primary"
                                />
                                </div>
                                <div className='flex items-center gap-2'>
                                <label className='label-text text-secondary'>F</label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="F"
                                    checked={gender === "F"}
                                    onChange={(e) => setgender(e.target.value)}
                                    className="radio radio-secondary"
                                />
                                </div>
                            </div>
                            </div>
                            <div className="form-control">
                            <label className="label">
                                <span className="label-text text-primary">Contraseña</span>
                            </label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="contraseña" className="input input-bordered" required />
                            <label className="label">
                                <span className="label-text text-primary">Verifica tu contraseña</span>
                            </label>
                            <input type="password" value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)} placeholder="verificación de contraseña" className="input input-bordered" required />
                            <label className="label">
                            </label>
                            </div>
                            <div className="form-control flex flex-col items-center mt-6">
                            <button type='submit' className="btn btn-soft w-full btn-primary">Registrarse</button>
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