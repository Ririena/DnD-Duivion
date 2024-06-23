import { Outlet } from "react-router-dom";
import Header from "@/components/Navigation/Header";
import Footer from "@/components/Navigation/Footer";
export default function HomeLayout() {
    return (
        <>
            <Header />
            <Outlet />

        </>
    );
}
