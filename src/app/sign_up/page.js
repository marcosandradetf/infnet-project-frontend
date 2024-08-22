'use client'

import { useState } from "react";
import Footer from "@/components/footer";
import Link from "next/link";
import {signupWithEmailAndPassword} from "@/lib/firebase-auth";

export default function SignUp() {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorFields, setErrorFields] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);




    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            createUser();
        }
    }

    const createUser = () => {
        setIsSubmitted(true);
        if (validField() ) {
            try {
                signupWithEmailAndPassword({email, password, name, lastName})
            } catch (error) {
                const errorCode = error.code;
            }
        }
    }

    const validField = () => {
        let errors = {};
        let isValid = true;

        if (name.length === 0) {
            errors.name = 'Insira um nome.';
            isValid = false;
        }
        if (lastName.length === 0) {
            errors.lastName = 'Insira um sobrenome.';
            isValid = false;
        }

        if (email.length === 0) {
            errors.email = 'Insira um email válido.';
            isValid = false;
        }
        if (password.length === 0) {
            errors.password = 'Insira uma senha válida.';
            isValid = false;
        }
        if (confirmPassword.length === 0) {
            errors.confirmPassword = 'Insira uma confirmação de senha.';
            isValid = false;
        } else if (confirmPassword !== password) {
            errors.confirmPassword = 'As senhas não coincidem.';
            isValid = false;
        }

        setErrorFields(errors);
        return isValid;

    }

    
    
    return (
        <main className="bg-white w-screen h-screen flex justify-center items-center flex-col sign">
            <section className="shadow flex justify-center items-center flex-col w-1/2 h-1/2 bg-white rounded-lg">
                <div className="flex">
                    <div>
                        <input type="text"
                               className={`border h-14 w-44 p-4 rounded ${isSubmitted && name.length === 0 ? "border-red-600" : "border-gray-300"}`}
                               onChange={(e) => setName(e.target.value)} placeholder="Nome" required/>
                        <p className="text-red-600 font-light font-xs">{isSubmitted && name.length === 0 ? errorFields.name : ""}</p>
                    </div>
                    <div>
                        <input type="text" className={`ml-8 border h-14 w-44 p-4 rounded ${isSubmitted && lastName.length === 0 ? "border-red-600" : "border-gray-300"}`}
                               onChange={(e) => setLastName(e.target.value)} placeholder="Sobrenome" required/>
                        <p className="text-red-600 font-light font-xs ml-8">{isSubmitted && lastName.length === 0 ? errorFields.lastName : ""}</p>
                    </div>
                </div>
                <input type="text" className={`mt-8 border h-14  w-96 p-4 rounded ${isSubmitted && email.length === 0 ? "border-red-600 mt-4" : "border-gray-300"}`}
                       onChange={(e) => setEmail(e.target.value)} placeholder="Email" required/>
                <p className="text-red-600 font-light font-xs w-96">{isSubmitted && email.length === 0 ? errorFields.email : ""}</p>
                <input type="password" className={`mt-8 border h-14  w-96 p-4 rounded ${isSubmitted && password.length === 0 ? "border-red-600 mt-4" : "border-gray-300"}`}
                       onChange={(e) => setPassword(e.target.value)} placeholder="Senha" required/>
                <p className="text-red-600 font-light font-xs w-96">{isSubmitted && password.length === 0 ? errorFields.password : ""}</p>
                <input type="password" className={`mt-8 border h-14  w-96 p-4 rounded ${isSubmitted && confirmPassword.length === 0 ? "border-red-600 mt-4" : "border-gray-300"}`}
                       onChange={(e) => setConfirmPassword(e.target.value)} onKeyDown={handleKeyDown}
                       placeholder="Confirmar Senha" required/>
                <p className="text-red-600 font-light font-xs w-96">{isSubmitted && confirmPassword.length === 0 ? errorFields.confirmPassword: ""}</p>
                <div className="w-96 font-sans mt-8 flex justify-end">
                    <Link href="/">
                    <button className="rounded bg-gray-100 p-2 shadow mr-3 text-black w-24 border border-gray-200 hover:bg-white">
                        Cancelar
                    </button>
                    </Link>
                    <button className="rounded bg-blue-700 p-2 shadow text-white w-24 hover:bg-blue-600"
                            onClick={createUser}>
                        Cadastrar
                    </button>
                </div>

            </section>

            <Footer />

        </main>
    );
}