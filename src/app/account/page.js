'use client'

import Account from "@/components/account";
import AccountInput from "@/components/account_input";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

import {auth} from "@/lib/firebase";
import { onAuthStateChanged, updatePassword, updateProfile, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { FaLock, FaEdit } from "react-icons/fa";
import {Alert, Snackbar} from "@mui/material";
import * as React from "react";
import BasicModal from "@/components/basic_modal";
import Loading from "@/components/loading";


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

    const [openModalReautenticate, setOpenModalReautenticate] = useState(false);
    const handleOpenModalReautenticate = () => setOpenModalReautenticate(true);
    const handleCloseModalReautenticate = () => setOpenModalReautenticate(false);
    //

    const router = useRouter();

    useEffect(() => {
        return onAuthStateChanged(auth, (user) => {
            if (user) {
                setEmail(auth.currentUser.email);
                setDisplayName(auth.currentUser.displayName);
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            } else {
                router.push("/sign_in");
            }
        });
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
        const user = auth.currentUser;

        // TODO(you): prompt the user to re-provide their sign-in credentials
        // Cria credencial de email com a senha atual do usuário
        const credential = EmailAuthProvider.credential(user.email, password);

        reauthenticateWithCredential(user, credential).then(() => {
            setOpenModalReautenticate(false);
            setOpenModal(true);
            setError("");
        }).catch((error) => {
            setError(error.message);
        });
    }

    function handleChange() {


        if (changeNewPassword && newPassword === confirmNewPassword && newPassword.length > 0 && confirmNewPassword.length > 0) {

            updatePassword(auth.currentUser, newPassword)
                .then(() => {
                    setOpenModal(false);
                })
                .catch((error) => {
                    setError(error.message);
                });
        } else if (changeDisplayName && name.length > 0 && lastName.length > 0) {
            const newDisplayName = `${name} ${lastName}`;
            updateProfile(auth.currentUser, { displayName: newDisplayName })
                .then(() => {
                    setDisplayName(newDisplayName);
                    setOpenModal(false);
                })
                .catch((error) => {
                    setError(error.message);
                });
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
                                setOpenModalReautenticate(true);
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
                handleClose={handleCloseModalReautenticate}
                open={openModalReautenticate}
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