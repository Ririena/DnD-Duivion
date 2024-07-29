import { Outlet } from "react-router-dom";
import Header from "@/components/Navigation/Header";
import Footer from "@/components/Navigation/Footer";
import BottomNavigation from "@/components/Navigation/BottomNavigation";

export default function HomeLayout() {
    return (
        <>
            <Header />
            {/* Add padding-top to ensure content doesn't overlap with Header */}
            <div className=" pb-16 hide-scrollbar"> {/* Adjust the padding-top based on Header height */}
                <Outlet />
            </div>
            <BottomNavigation />

        </>
    );
}
