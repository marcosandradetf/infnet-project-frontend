'use client'

import Account from "@/components/account";
import AccountInput from "@/components/account_input";
import {useState} from "react";
import {auth} from "@/lib/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import {useRouter} from "next/navigation";

export default function AccountRecovery() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const router = useRouter();

    function handleKeyPress(e) {
        if (e.key === "Enter") {
            resetPassword();
        }
    }

    function resetPassword() {
        if (email.length > 0) {
            sendPasswordResetEmail(auth, email)
            .then(() => {
                setSuccess(true);
            })
            .catch((error) => {
                const message = error.message;
                setError(message)
            })
        }
    }

    return (
        <Account>
            { success ? (
                    <div className={"flex flex-col justify-center items-center"}>
                        <p className={"w-7/12"}>Caso o e-mail informado esteja cadastrado, um email com instruções para
                            redefinir a senha será enviado. Siga as instruções enviadas
                            para redefinir a sua senha. Caso não tenha acesso ao email, comunique ao seu superior para
                            recuperar a sua conta.
                        </p>
                        <p className={"mt-10"}>Após seguir as instruções e alterar a senha, clique em continuar.</p>
                        <button
                            className={`w-96 ${email.length > 0 ? "bg-blue-500 hover:bg-blue-400 shadow" : "bg-blue-300 cursor-default"} h-12 rounded-2xl text-white mt-2`}
                            onClick={() => router.push("/sign_in")}>Continuar
                        </button>
                    </div> ) : (

                    <div className={"flex flex-col"}>
                        <h1 className={"font-bold text-2xl mb-8"}>Redefinir sua senha</h1>
                        <p className="w-96 mb-4">Insira o seu endereço de e-mail que é utilizado para acessar a sua
                            conta para continuar.</p>
                        <AccountInput type={"text"} value={email} setValue={setEmail} handleKeyDown={handleKeyPress}
                                      placeholder={"Email"} rounded={"rounded-2xl"} height={"h-12"}/>
                        <button
                            className={`w-96 ${email.length > 0 ? "bg-blue-500 hover:bg-blue-400 shadow" : "bg-blue-300 cursor-default"} h-12 rounded-2xl text-white mt-2`}
                            onClick={resetPassword}>Continuar
                        </button>
                        <p className={"text-red-500"}>{error}</p>
                    </div>
            )}
        </Account>
    );
}