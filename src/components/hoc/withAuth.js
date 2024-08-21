import {useRouter} from "next/navigation";
import {useEffect} from "react";


import {onAuthStateChanged} from "firebase/auth";
import {auth} from "@/lib/firebase";

export default function withAuth(WrappedComponent) {
    // eslint-disable-next-line react/display-name
    return  (props) => {
        const [loading, setLoading] = React.useState(true);
        const [authenticated, setAuthenticated] = React.useState(false);
        const router = useRouter();

        useEffect(() => {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                if (user) {
                    setAuthenticated(true);
                } else {
                    router.push("/signin");
                }
                setLoading(false);
            });
            return () => unsubscribe();
        }, [router]);

        if(loading) return <div>loading...</div>


        return <WrappedComponent {...props} />
    }
}