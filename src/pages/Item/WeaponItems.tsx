import React, { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";
import { Divider, Image, Card, Spacer } from "@nextui-org/react";
import { Button } from "@/components/ui/button";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react";
import { Link } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
export default function WeaponItems() {
    const [images, setImages] = useState({});
    const [weapons, setWeapons] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function getData() {
            try {
                const { data, error } = await supabase
                    .from("Weapons")
                    .select("*");
                if (error) {
                    throw error;
                }

                console.log(data);
                setWeapons(data);

                const imageUrls = {};
                for (const weapon of data) {
                    const res = await supabase.storage
                        .from("weapon/picture")
                        .getPublicUrl(weapon.picture);
                    imageUrls[weapon.id] = res.data.publicUrl;
                }
                setImages(imageUrls);
            } catch (error) {
                console.error(error);
            }
        }
        getData();
    }, []);

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
                                        <BreadcrumbLink href="/items">
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
                                            Weapons
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
                            Weapon List
                        </h1>
                    </div>
                    <Divider className="p-[1px] bg-blue-600" />
                    <div className="grid sm:grid-cols-1 md:grid-cols-2  lg:xl:grid-cols-4 gap-6 mt-6">
                        {weapons.map((weapon) => (
                            <Link
                                key={weapon.id}
                                href={`/items/magic-items/weapons/${weapon.id}`}
                            >
                                <Card className="p-4 shadow-lg rounded-lg">
                                    {images[weapon.id] ? (
                                        <div className="mb-4">
                                            <Image
                                                src={images[weapon.id]}
                                                alt={weapon.name}
                                                className="object-contain"
                                            />
                                        </div>
                                    ) : (
                                        <div className="mb-4">
                                            <Image
                                                src="/magic-items.png" // Placeholder image or loading state
                                                alt={weapon.name}
                                                className="object-contain"
                                            />
                                        </div>
                                    )}
                                    <Divider />
                                    <h1 className="mt-2 text-xl font-semibold text-center">
                                        {weapon.name}
                                    </h1>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </section>
            </main>
        </>
    );
}
