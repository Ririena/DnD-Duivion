import { Button } from "../ui/button";
import { Home, Book, Box } from "lucide-react"; // Importing icons from Lucide
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/react";

const Header = () => {
    return (
        <>
            <Navbar shouldHideOnScroll className="shadow-md">
                <NavbarBrand>
                    <Link className="text-black" href="/">
                        <p className="font-bold text-inherit">D&D Duivion</p>
                    </Link>
                </NavbarBrand>
                <NavbarContent
                    className="hidden sm:flex gap-4"
                    justify="center"
                >
                    <NavbarItem>
                        <Link color="foreground" href="/campaign/1">
                            Story
                        </Link>
                    </NavbarItem>
                    <NavbarItem isActive>
                        <Link href="/plot" aria-current="page">
                            Chapter Lore
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link color="foreground" href="/items">
                            Item
                        </Link>
                    </NavbarItem>
                </NavbarContent>
                <NavbarContent justify="end">
                    <NavbarItem className="hidden lg:flex"></NavbarItem>
                    <NavbarItem>
                        <Button color="primary">Homebrew</Button>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>

            {/* Bottom Navigation for Mobile */}
            <div className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 shadow-lg lg:hidden z-50">
                <div className="flex justify-between items-center py-2 px-4 bg-gradient-to-t from-gray-100 to-white">
                    <Link
                        href="/"
                        className="text-center flex-1 flex flex-col items-center"
                    >
                        <Home className="text-gray-600" size={24} />
                        <p className="text-sm text-gray-600 mt-1">Home</p>
                    </Link>
                    <Link
                        href="/plot"
                        className="text-center flex-1 flex flex-col items-center"
                    >
                        <Book className="text-gray-600" size={24} />
                        <p className="text-sm text-gray-600 mt-1">Plot</p>
                    </Link>
                    <Link
                        href="/items"
                        className="text-center flex-1 flex flex-col items-center"
                    >
                        <Box className="text-gray-600" size={24} />
                        <p className="text-sm text-gray-600 mt-1">Items</p>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Header;
