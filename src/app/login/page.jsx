'use client'

import React, { useEffect, useState } from 'react'
import Dashboard from '../dashboard/page';
import { fetchUser } from '../functions/user';
import { useRouter } from 'next/navigation';

export default function Login() {
    const [isUserAuth, setUserAuth] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleAuth = () => {
        if (localStorage.getItem("user")) {
            setUserAuth(true);

        } else {
            setUserAuth(false);
        }
    }

    const handleLogin = async () => {
        try {
            const response = await fetchUser(userName);            
    
            if (response) {                
                if (response.user_name && response.password === password) {
                    // Convertir el objeto user a JSON y almacenarlo en localStorage
                    localStorage.setItem("user", JSON.stringify(response));
                    setUserAuth(true);
                    setError("");

                } else {
                    setError("Contraseña incorrecta");
                }
            } else if (response.message === "User not found") {
                setError("Usuario no encontrado");
            } else {
                setError("Respuesta inesperada del servidor");
            }
        } catch (error) {
            console.error("Error al buscar el usuario:", error);
            setError("Error al buscar el usuario. Inténtalo de nuevo.");
        }
    };

    const handleSignUp = () => {
        router.push("/signup")
    }

    useEffect(() => {
        handleAuth();

    }, [isUserAuth])

    return (
        <>
            {isUserAuth === false ? (
                <div className="hero justify-center min-h-screen">
                    <div className="hero-content w-[60%] h-auto flex-col">
                        <div className="card w-full h-full">
                            <div className='flex flex-col text-start gap-10'>
                                <img src="favicon.ico" className='self-center' alt="Logo de WTP" width={"100vh"} />
                                <h1 className="text-5xl font-bold">Ingresa tus credenciales</h1>
                            </div>
                            <form className="card-body" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="badge badge-ghost">Nombre de usuario</span>
                                    </label>
                                    <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Nombre de usuario" className="input input-bordered" required />
                                    </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="badge badge-ghost">Contraseña</span>
                                    </label>
                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" className="input input-bordered" required />
                                    <label className="label">
                                    </label>
                                </div>
                                {error && ( // Mostrar mensaje de error si existe
                                    <div className="text-red-500 text-sm mb-4">
                                        {error}
                                    </div>
                                )}
                                <div className="form-control flex flex-col items-center mt-6">
                                    <button type='submit' className="w-full btn btn-primary">Iniciar sesión</button>
                                    <div className='divider'>O</div>
                                    <button type='button' className='w-full btn btn-soft' onClick={handleSignUp}>Crear una cuenta</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            ) : (
                <Dashboard handleAuth={handleAuth} />
            )}
        </>
    )
}