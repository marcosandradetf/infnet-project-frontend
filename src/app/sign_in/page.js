'use client'

import Footer from "@/components/footer";
import { FaLongArrowAltRight } from "react-icons/fa";

import {useState} from "react";
import {useRouter} from "next/navigation";
import Account from "@/components/account";
import Loading from "@/components/loading";
import {loginWithEmailAndPassword} from "@/lib/firebase-auth";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const login = () => {
        if (email.length > 0 && password.length > 0) {
                setLoading(true);
          loginWithEmailAndPassword({router, email, password, setLoading, setError})
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            login();
        }
    }

    if(loading) {
        return(
          <Loading />
        );
    }



    return (
        <Account>
            <h1 className="text-center font-bold mb-5 mt-5 text-xl">Entre com seu email e senha</h1>
            <input type="text" className="border h-8 sm:w-96 rounded-t-2xl p-5" placeholder="Insira seu email"
                   onChange={(e) => setEmail(e.target.value)} onKeyDown={handleKeyDown}/>
            <div className="relative flex justify-end sm:w-96">
                <div
                    className="text-gray-600 absolute cursor-pointer border border-gray-600 rounded-2xl p-1 text-xl mr-14 top-1/2 transform -translate-y-1/2"
                    onClick={login}>
                    <FaLongArrowAltRight/>
                </div>
                <input type="password" className="border h-8 sm:w-96 rounded-b-2xl p-5" placeholder="Insira sua senha"
                       onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKeyDown}/>
            </div>
            <p className="text-red-600">{error}</p>

            <button className="mt-20 text-blue-600 hover:underline" onClick={() => router.push("/account_recovery")}>Esqueceu a senha?</button>
        </Account>
    );
}