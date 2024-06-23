import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Divider,
} from "@nextui-org/react";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/utils/supabase";

const Weapon = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [damage, setDamage] = useState("");
    const [rarity, setRarity] = useState("");
    const [abilities, setAbilities] = useState("");
    const [abilities_2, setAbilities_2] = useState("");
    const [abilities_3, setAbilities_3] = useState("");
    const [abilities_4, setAbilities_4] = useState("");
    const [p_abilities, setPAbilities] = useState("");
    const [picture, setPicture] = useState(null);

    const handleSave = async (e) => {
        e.preventDefault();
        let imageName = null;

        if (picture) {
            imageName = `${uuidv4()}.${picture.name.split(".").pop()}`;

            const { data: pictureData, error: pictureError } =
                await supabase.storage
                    .from("weapon")
                    .upload(`picture/${imageName}`, picture);

            if (pictureError) {
                console.error("Error Uploading", pictureError);
                return;
            }
        }

        const newWeapon = {
            name: name,
            description: description,
            type: type,
            damage: damage,
            abilities: abilities,
            abilities_2: abilities_2,
            abilities_3: abilities_3,
            abilities_4: abilities_4,
            p_abilities: p_abilities,
            rarity: rarity,
            picture: imageName,
        };
        const { data, error } = await supabase
            .from("Weapons")
            .insert([newWeapon]);
        if (error) {
            console.log(error.message);
        } else {
            console.log("Data successfully saved");
        }
    };

    return (
        <main className="mx-auto container px-4">
            <section className="flex justify-center items-center mt-8">
                <Card className="w-[800px]" radius="sm">
                    <CardHeader>
                        <h1 className="text-2xl">Create Weapons</h1>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <form onSubmit={handleSave}>
                            {/* General Section */}
                            <section className="mb-2">
                                <h2 className="text-lg font-semibold mb-2">
                                    General
                                </h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label>Name:</Label>
                                        <Input
                                            type="text"
                                            name="name"
                                            value={name}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div>
                                        <Label>Description:</Label>
                                        <Textarea
                                            name="description"
                                            value={description}
                                            onChange={(e) =>
                                                setDescription(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                            </section>
                            <div className="mb-4">
                                <Label>Picture:</Label>
                                <Input
                                    type="file"
                                    name="picture"
                                    onChange={(e) => setPicture(e.target.files[0])}
                                />
                            </div>
                            <Divider />
                            <section>
                                <h2 className="text-lg font-semibold mb-2">
                                    Properties
                                </h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label>Type:</Label>
                                        <Input
                                            type="text"
                                            name="type"
                                            value={type}
                                            onChange={(e) =>
                                                setType(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div>
                                        <Label>Damage:</Label>
                                        <Input
                                            type="text"
                                            name="damage"
                                            value={damage}
                                            onChange={(e) =>
                                                setDamage(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label>Rarity:</Label>
                                    <Input
                                        type="text"
                                        name="rarity"
                                        value={rarity}
                                        onChange={(e) =>
                                            setRarity(e.target.value)
                                        }
                                    />
                                </div>
                            </section>
                            <Divider className="mt-2" />
                            <section>
                                <h2 className="text-lg font-semibold mb-2">
                                    Magical Abilities
                                </h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label>Abilities:</Label>
                                        <Textarea
                                            name="abilities"
                                            value={abilities}
                                            onChange={(e) =>
                                                setAbilities(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div>
                                        <Label>Abilities 2:</Label>
                                        <Textarea
                                            name="abilities_2"
                                            value={abilities_2}
                                            onChange={(e) =>
                                                setAbilities_2(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div>
                                        <Label>Abilities 3:</Label>
                                        <Textarea
                                            name="abilities_3"
                                            value={abilities_3}
                                            onChange={(e) =>
                                                setAbilities_3(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div>
                                        <Label>Abilities 4:</Label>
                                        <Textarea
                                            name="abilities_4"
                                            value={abilities_4}
                                            onChange={(e) =>
                                                setAbilities_4(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label>Passive Abilities:</Label>
                                    <Textarea
                                        name="p_abilities"
                                        value={p_abilities}
                                        onChange={(e) =>
                                            setPAbilities(e.target.value)
                                        }
                                    />
                                </div>
                                <Divider className="mt-2" />
                            </section>
                            <div className="mt-2">
                                <section className="grid grid-cols-1">
                                    <Button type="submit">
                                        Submit
                                    </Button>
                                </section>
                            </div>
                        </form>
                    </CardBody>
                </Card>
            </section>
        </main>
    );
};

export default Weapon;
