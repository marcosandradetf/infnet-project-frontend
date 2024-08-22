'use client'

import Account from "@/components/account";
import AccountInput from "@/components/account_input";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import { FaLock, FaEdit } from "react-icons/fa";
import {Alert, Snackbar} from "@mui/material";
import * as React from "react";
import BasicModal from "@/components/basic_modal";
import Loading from "@/components/loading";
import {reauthenticateCurrentUser, updateAccount} from "@/lib/firebase-account";
import {verifyLogin} from "@/lib/firebase-auth";


export default function MyAccount(){
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayNome, setDisplayName] = useState("");
    const [error, setError] = useState("");

    // change display name
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [changeDisplayName, setChangeDisplayName] = useState(false);
    //

    // change password
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [changeNewPassword, setChangeNewPassword] = useState(false);
    //

    // snackbar mui
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    //

    // modal
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const [openModalReauthenticate, setOpenModalReauthenticate] = useState(false);
    const handleOpenModalReauthenticate = () => setOpenModalReauthenticate(true);
    const handleCloseModalReauthenticate = () => setOpenModalReauthenticate(false);
    //

    const router = useRouter();

    useEffect(() => {
        return verifyLogin({setEmail, setDisplayName, setLoading, router}, true)
    }, [router]);


    function handleKeyDown(e) {
        if (e.key === "Enter") {
            handleChange();
        }
    }

    function handleKeyDownReautenticate(e) {
        if (e.key === "Enter") {
            reauthenticate();
        }
    }

    function reauthenticate() {
        reauthenticateCurrentUser({password, setOpenModalReauthenticate, setOpenModal, setError});
    }

    function handleChange() {


        if (changeNewPassword && newPassword === confirmNewPassword && newPassword.length > 0 && confirmNewPassword.length > 0) {
            updateAccount({newPassword, setOpenModal, setError}, true);           
        } else if (changeDisplayName && name.length > 0 && lastName.length > 0) {
            const newDisplayName = `${name} ${lastName}`;
            updateAccount({newDisplayName, setDisplayName, setError}, false);
        }
    }


    if(loading) {
        return(
            <Loading />
        );
    }

    return (
        <Account>
            <h1 className={"mb-10"}>Gerencie seus dados cadastrais e de acesso</h1>
            <div className={"relative flex justify-end sm:w-96"}>
                <label>
                    Email
                    <AccountInput type={"text"} handleKeyDown={handleKeyDown} height={"h-12"} placeholder={"Email"}
                                  rounded={"rounded-2xl"} value={email} setValue={setEmail} readOnly={true}/>
                </label>

                <div
                    className="text-gray-600 absolute cursor-pointer p-1 text-xl mr-4 top-1/2 transform -translate-y-1"
                    onClick={handleClick}>
                    <FaLock/>
                </div>
            </div>

            <div className={"relative flex justify-end sm:w-96 mt-2"}>
                <label>
                    Nome
                    <AccountInput type={"text"} handleKeyDown={handleKeyDown} height={"h-12"} placeholder={"Nome"}
                                  rounded={"rounded-2xl"} value={displayNome} setValue={setDisplayName}
                                  readOnly={true}/>
                </label>

                <div
                    className="text-gray-600 absolute cursor-pointer p-1 text-xl mr-4 top-1/2 transform -translate-y-1" onClick={() => {handleOpenModal(); setChangeDisplayName(true); }}>
                    <FaEdit/>
                </div>
            </div>

            <div className={"flex flex-col mt-2"}>
                <label>
                    Senha
                </label>
                    <button className="rounded-2xl bg-white p-2 text-black border w-96 hover:bg-gray-300 h-12"
                            onClick={() => {
                                setPassword("");
                                setNewPassword("");
                                setConfirmNewPassword("");
                                setChangeNewPassword(true);
                                setOpenModalReauthenticate(true);
                            }}>
                        Alterar Senha
                    </button>

            </div>

            <button className="rounded-2xl bg-red-700 p-2 shadow text-white w-96 hover:bg-red-600 h-12 mt-6"
                    onClick={() => router.back()}>
                Cancelar
            </button>


            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{width: '100%'}}
                >
                    Para alterar o email, comunique ao seu superior!
                </Alert>
            </Snackbar>


            <BasicModal handleClose={handleCloseModal} open={openModal}>
                {changeNewPassword ? (
                    <div>
                        <div className="flex flex-col items-center">
                            <div className={"mb-5"}>
                                <AccountInput
                                    type="password"
                                    handleKeyDown={handleKeyDown}
                                    height="h-12"
                                    placeholder="Nova senha"
                                    rounded="rounded-2xl"
                                    value={newPassword}
                                    setValue={setNewPassword}
                                    readOnly={false}
                                />
                            </div>
                            <p className={"w-11/12 mt-8 mb-8 sm:w-96"}>
                                Nível de segurança da senha:
                                Use pelo menos 8 caracteres. Não use a senha de outro site ou algo muito óbvio, como o
                                nome do seu animal de estimação.
                            </p>
                            <p className={"w-11/12 mt-4 mb-4 sm:w-96 text-red-500"}>
                                {error}
                            </p>
                            <div>
                                <AccountInput
                                    type="password"
                                    handleKeyDown={handleKeyDown}
                                    height="h-12"
                                    placeholder="Confirmar nova senha"
                                    rounded="rounded-2xl"
                                    value={confirmNewPassword}
                                    setValue={setConfirmNewPassword}
                                    readOnly={false}
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col">
                        <div className={"mb-5"}>
                            <AccountInput
                                type="text"
                                handleKeyDown={handleKeyDown}
                                height="h-12"
                                placeholder="Nome"
                                rounded="rounded-2xl"
                                value={name}
                                setValue={setName}
                                readOnly={false}
                            />
                        </div>
                        <div>
                            <AccountInput
                                type="text"
                                handleKeyDown={handleKeyDown}
                                height="h-12"
                                placeholder="Sobrenome"
                                rounded="rounded-2xl"
                                value={lastName}
                                setValue={setLastName}
                                readOnly={false}
                            />
                        </div>
                    </div>
                )}
                <button className="rounded-2xl bg-blue-700 p-2 shadow text-white w-96 hover:bg-blue-600 h-12 mt-6"
                        onClick={handleChange}>
                    Alterar
                </button>
            </BasicModal>


            <BasicModal
                handleClose={handleCloseModalReauthenticate}
                open={openModalReauthenticate}
            >
                <div className="flex flex-col items-center">
                    <h1 className={"mb-5"}>Para continuar insira sua senha atual.</h1>
                    <div className={"mb-5"}>
                        <AccountInput
                            type="password"
                            handleKeyDown={handleKeyDownReautenticate}
                            height="h-12"
                            placeholder="Senha"
                            rounded="rounded-2xl"
                            value={password}
                            setValue={setPassword}
                            readOnly={false}
                        />
                    </div>

                    <p className={"w-11/12 mt-4 mb-4 sm:w-96 text-red-500"}>
                        {error}
                    </p>

                    <button className="rounded-2xl bg-blue-700 p-2 shadow text-white w-96 hover:bg-blue-600 h-12 mt-6"
                            onClick={reauthenticate}>
                        Continuar
                    </button>
                </div>
            </BasicModal>



        </Account>

    );
}