import React, { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";
import { Divider, Image, Card } from "@nextui-org/react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react";
import { useParams } from "react-router-dom";

export default function WeaponItems() {
    const { weaponId } = useParams();
    const [weapon, setWeapon] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        async function getData() {
            try {
                const { data, error } = await supabase
                    .from("Weapons")
                    .select("*")
                    .eq("id", parseInt(weaponId))
                    .single();
                if (error) {
                    throw error;
                }

                console.log(data);
                setWeapon(data);

                const res = await supabase.storage
                    .from("weapon/picture")
                    .getPublicUrl(data.picture);
                setImageUrl(res.data.publicUrl);
            } catch (error) {
                console.error(error);
            }
        }
        getData();
    }, [weaponId]);

    if (!weapon) {
        return null; // or display a loading indicator
    }

    return (
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
                        {weapon.name}
                    </h1>
                </div>
                <Divider className="p-[1px] bg-blue-600" />
                <div className="grid grid-cols-1 gap-6 mt-6">
                    <Card className="p-4 shadow-md rounded-lg">

                        <div className="flex">

                            <div className="ml-6">
                                <div>
                                {imageUrl && (
                                <div className="size-full">
                                    <Image

                                        src={imageUrl}
                                        alt={weapon.name}
                                    />
                                </div>
                            )}
                                </div>
                                <Divider className="mt-2"/>
                                <p className="text-gray-600 mb-2">
                                    {weapon.type} - {weapon.rarity}
                                </p>
                                <p className="text-gray-800 mb-4">
                                    {weapon.description}
                                </p>
                                <h3 className="text-xl font-semibold">
                                    Damage
                                </h3>
                                <p className="text-gray-700 mb-4">
                                    {weapon.damage}
                                </p>
                                <h3 className="text-xl font-semibold">
                                    Abilities
                                </h3>
                                <p className="text-gray-700 mb-2">
                                    {weapon.abilities}
                                </p>
                                <p className="text-gray-700 mb-2">
                                    {weapon.abilities_2}
                                </p>
                                <p className="text-gray-700 mb-2">
                                    {weapon.abilities_3}
                                </p>
                                {weapon.abilities_4 && (
                                    <p className="text-gray-700 mb-2">
                                        {weapon.abilities_4}
                                    </p>
                                )}
                                <h3 className="text-xl font-semibold">
                                    Passive Abilities
                                </h3>
                                <p className="text-gray-700">
                                    {weapon.p_abilities}
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
            </section>
        </main>
    );
}
