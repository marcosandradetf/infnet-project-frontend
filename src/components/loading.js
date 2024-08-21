import Image from "next/image";
import CircularProgress from "@mui/material/CircularProgress";

export default function Loading() {
    return (
        <div className="flex items-center justify-center h-screen flex-col loading">
            <Image src="/lumos_animation.gif" width={200} height={200} alt="logo" className={"ml-1 mb-5"}/>
            <CircularProgress/>
        </div>
    );
}