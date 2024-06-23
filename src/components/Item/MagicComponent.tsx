import React from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
    GiLockedChest,
    GiPiercingSword,
    GiChestArmor,
    GiWizardStaff,
} from "react-icons/gi";
import { Card } from "../ui/card";
import { Slash } from "lucide-react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Divider } from "@nextui-org/react";
import MagicButton from "./MagicButton";
import { useNavigate } from "react-router-dom";
export default function MagicComponent() {
    const navigate = useNavigate();

    const handleWeapons = () => {
        navigate("/items/magic-items/create");
    };

    const magicItems = [
        {
            id: 1,
            name: "All Items",
            icon: GiLockedChest,
            link: "/items/magic-items/all",
        },
        {
            id: 2,
            name: "Weapons",
            icon: GiPiercingSword,
            link: "/items/magic-items/weapons",
        },
        {
            id: 3,
            name: "Armor",
            icon: GiChestArmor,
            link: "/items/magic-items/armor",
        },
        {
            id: 4,
            name: "Staff",
            icon: GiWizardStaff,
            link: "/items/magic-items/staff",
        },
    ];

    return (
        <>
            <main className="mx-auto container px-4">
                <section className="mt-8">
                    <div className="mt-8 w-full">
                        <Card className="p-2 shadow-md rounded-[4px]">
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href="/">
                                            Home
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator>
                                        <Slash />
                                    </BreadcrumbSeparator>
                                    <BreadcrumbItem>
                                        <BreadcrumbPage className="font-bold">
                                            Items
                                        </BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </Card>
                    </div>
                </section>

                <section className="mt-16">
                    <div className="flex justify-between">
                        <h1 className="text-4xl font-sans font-bold mb-4">
                            Magic Items
                        </h1>
                        <div>
                            <Button
                                onClick={handleWeapons}
                                className="uppercase rounded-[4px] border-2 border-blue-600"
                            >
                                <div className="mr-2">
                                    <Plus />
                                </div>
                                Create Magic Items
                            </Button>
                        </div>
                    </div>
                    <Divider className="p-[1px] bg-blue-600" />
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                        {magicItems.map((item) => (
                            <Link to={item.link} key={item.id}>
                                <Card className="rounded-[4px] p-4 border border-gray-200 hover:shadow-lg cursor-pointer transition duration-300">
                                    <div className="flex items-center justify-center">
                                        <item.icon size="3em" />
                                    </div>
                                    <div className="text-center mt-2">
                                        {item.name}
                                    </div>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </section>
            </main>
        </>
    );
}
