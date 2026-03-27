"use client";

import Loader from "@/components/reusable/Loader/Loader";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

const Page = () => {
    const router = useRouter();

    useEffect(() => {
        router.replace("/login");
    }, [router]);

    return <Loader />;
};

export default Page;
