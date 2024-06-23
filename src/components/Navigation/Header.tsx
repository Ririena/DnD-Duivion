import { Button } from "../ui/button";
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
        <Navbar shouldHideOnScroll className="shadow-md">
            <NavbarBrand>
                <p className="font-bold text-inherit">D&D Duivion</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Story
                    </Link>
                </NavbarItem>
                <NavbarItem isActive>
                    <Link href="/characters" aria-current="page">
                        Characters
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="/items">
                        Item
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                    <Link href="#">Login</Link>
                </NavbarItem>
                <NavbarItem>
                    <Button color="primary">Sign Up</Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
};

export default Header;
