'use client'

import {onAuthStateChanged} from "firebase/auth";
import '@/app/sign_up/signUp.css'

import {GoSignOut} from "react-icons/go";
import {RiContractFill} from "react-icons/ri";
import {FaUsers} from "react-icons/fa";
import {LuSendToBack} from "react-icons/lu";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import Loading from "@/components/loading";
import {Avatar, ListItemIcon, Menu, MenuItem} from "@mui/material";
import Logout from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {deepOrange} from "@mui/material/colors";
import {verifyLogin} from "@/lib/firebase-auth";


export default function Home() {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState("");

    //account button mui
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    //

    // router
    const router = useRouter();

    useEffect(() => {
        return verifyLogin(router, setAuthenticated, setUser, setLoading);
    }, [router]);

    function handleSignOut() {
        auth.signOut();
        setLoading(true);
        setTimeout(() => {
            router.push("/sign_in");
        }, 1000);
    }

    if (loading) {
        return (
            <Loading />
        );
    }


    return (
    <main className="container_grid">
        <div className="grid_sidebar">
            <div className="grid_sidebar_credenciais">
                <div>
                    <div
                        className="grid_sidebar_user"
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}>{user[0]}</div>

                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={() => router.push("/account")}>
                            <ListItemIcon>
                                <AccountCircleIcon fontSize="medium" />
                            </ListItemIcon>
                            Minha Conta
                        </MenuItem>
                        <MenuItem onClick={handleSignOut}>
                            <ListItemIcon>
                                <Logout fontSize="medium" />
                            </ListItemIcon>
                            Sair
                        </MenuItem>
                    </Menu>
                </div>


                <p>{user}</p>
                <div className="grid_sidebar_out cursor-pointer" onClick={handleSignOut}>
                    <GoSignOut/>
                </div>

            </div>

            <div className="mb-8">
                <button className="flex items-center p-0.5"><span className="mr-1"><RiContractFill /></span>Controle de saldo</button>
            </div>

            <div className="grid_sidebar_gerenciar">
                <p>Gerenciar</p>
                <button className="flex items-center p-0.5"><span className="mr-1"><RiContractFill /></span>Contratos</button>
                <button className="flex items-center p-0.5"><span className="mr-1"><FaUsers /></span>Equipes</button>
            </div>

            <div className="grid_sidebar_equipes">
                <p className="mt-5">Equipes</p>
                <button className="flex items-center p-0.5"><span className="mr-1"><LuSendToBack /></span>Equipe norte
                </button>
                <button className="flex items-center p-0.5"><span className="mr-1"><LuSendToBack /></span>Equipe sul
                </button>
                <button className="flex items-center p-0.5"><span className="mr-1"><LuSendToBack /></span>Equipe
                    triângulo
                </button>

            </div>

        </div>
        <div className="grid_main">

        </div>


    </main>
  );
}
