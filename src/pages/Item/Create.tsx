import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card } from "@/components/ui/card";
import { Slash } from "lucide-react";
import { Divider } from "@nextui-org/react";
import {
    GiLockedChest,
    GiPiercingSword,
    GiChestArmor,
    GiWizardStaff,
} from "react-icons/gi";
import { Link } from "react-router-dom";
const Create = () => {
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
            link: "/items/magic-items/create/weapons",
        },
        {
            id: 3,
            name: "Armor",
            icon: GiChestArmor,
            link: "/items/magic-items/create/armor",
        },
        {
            id: 4,
            name: "Staff",
            icon: GiWizardStaff,
            link: "/items/magic-items/create/staff",
        },
    ];
    return (
        <>
            <main className="mx-auto container">
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
                                        <BreadcrumbLink
                                            className=""
                                            href="/items"
                                        >
                                            Items
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator>
                                        <Slash />
                                    </BreadcrumbSeparator>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href="/items/magic-items">
                                            Magic Items
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator>
                                        <Slash />
                                    </BreadcrumbSeparator>
                                    <BreadcrumbItem>
                                        <BreadcrumbPage className="font-bold">
                                            Create
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
                            Create Items
                        </h1>
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
};

export default Create;
