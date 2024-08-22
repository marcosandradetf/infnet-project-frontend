import {FaLongArrowAltRight} from "react-icons/fa";
import Footer from "@/components/footer";
import Image from "next/image";
import {useRouter} from "next/navigation";

export default function Account({children}) {
    const router = useRouter();

    return (
        <main className="flex flex-col justify-between items-center h-screen bg-white">
            <header className="flex justify-between items-center w-screen">
                <h1 className="text-xl text-emerald-950 mr-4 line cursor-default">
                    to <span className={"underline font-bold"}>Projeto de Bloco</span>
                </h1>
            </header>

            <section className="w-screen flex justify-center items-center">
                <div
                    className="flex flex-col shadow w-full rounded-2xl justify-center h-96 items-center lg:w-1/2 md:w-2/3 sm:w-1/2">
                    {children}
                </div>
            </section>

            <Footer/>
        </main>
);
}