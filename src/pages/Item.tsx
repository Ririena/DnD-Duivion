import { Button } from "@/components/ui/button";
import { CardHeader, Divider, Image } from "@nextui-org/react";
import { Slash } from "lucide-react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardBody } from "@nextui-org/react";
import { motion } from "framer-motion";
import { Link } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
const Item = () => {
    const navigate = useNavigate();

    const redirectMagic = () => {
        navigate("/items/magic-items");
    };

    const redirectEquipment = () => {
        navigate("/items/equipment");
    };
    return (
        <>
            <main className="mx-auto container px-4">
                <section className="flex justify-between">
                    <div className="mt-8 w-[1270px]">
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
                <section className="mt-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Card
                            className="sm:w-full lg:xl:w-[580px] rounded-sm"
                            radius="sm"
                        >
                            <motion.div whileHover={{ scale: 1.05 }}>
                                <Image
                                    onClick={redirectEquipment}
                                    src="/equipment.png"
                                    className="cursor-pointer z-0 w-full object-cover"
                                    alt="Equipment"
                                    radius="sm"
                                />
                            </motion.div>
                            <Divider />
                            <CardBody>
                                <h1 className="font-sans text-xl text-center">
                                    Equipment
                                </h1>
                            </CardBody>
                        </Card>
                        <Card
                            className="sm:w-full lg:xl:w-[580px] rounded-sm"
                            radius="sm"
                        >
                            <motion.div whileHover={{ scale: 1.05 }}>
                                <Image
                                    src="/magic-items.png"
                                    onClick={redirectMagic}
                                    className="cursor-pointer z-0 w-full object-cover"
                                    alt="Magic"
                                    radius="sm"
                                />
                            </motion.div>
                            <Divider />
                            <CardBody>
                                <h1 className="font-sans text-xl text-center">
                                    Magic Items
                                </h1>
                            </CardBody>
                        </Card>
                    </div>
                </section>
            </main>
        </>
    );
};

export default Item;
