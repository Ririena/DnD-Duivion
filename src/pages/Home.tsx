import { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import { Card } from "@/components/ui/card";
import { Divider } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { Image } from "@nextui-org/react";
import { supabase } from "@/utils/supabase";

const Home = () => {
    const [characterData, setCharacterData] = useState([]);

    useEffect(() => {
        const fetchCharacters = async () => {
            const { data, error } = await supabase
                .from("Characters")
                .select("*");

            if (error) {
                console.error(error);
            } else {
                const charactersWithImages = await Promise.all(
                    data.map(async (character) => {
                        const { data: imageData } = await supabase.storage
                            .from("picture/images")
                            .getPublicUrl(character.char_full_picture);

                        return { ...character, image_url: imageData.publicUrl };
                    })
                );

                setCharacterData(charactersWithImages);
            }
        };

        fetchCharacters();
    }, []);

    return (
        <main className="container mx-auto px-4 py-8 font-violet">
            <section className="text-center my-8">
                <h1 className="text-5xl font-bold mb-4">
                    Welcome to Terra Infiria
                </h1>
                <p className="text-xl text-gray-700 mb-8">
                    Embark on an epic adventure in the world of Terra Infiria.
                    Join forces with heroes, battle mythical creatures, and
                    uncover ancient secrets.
                </p>
                <Button
                    as={Link}
                    to="/campaign/1"
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700"
                >
                    Explore Campaigns
                </Button>
            </section>

            <Divider />

            <section className="my-16">
                <h2 className="text-3xl font-bold text-center mb-8">
                    Meet the Characters
                </h2>
                <div className="grid gap-8 grid-cols-2 lg:grid-cols-4">
                    {characterData.map((character) => (
                        <Card
                            key={character.id}
                            className="p-4 shadow-lg rounded-lg flex flex-col items-center"
                        >
                            <Image
                                src={character.image_url}
                                alt={`Character Image ${character.id}`}
                                width={150}
                                height={150}
                                className="rounded-full mb-4 mx-auto"
                            />
                            <div className="text-center">
                                <h3 className="text-xl font-bold">
                                    {character.char_fullname}
                                </h3>
                                <p className="text-gray-500">
                                    {character.char_firstclass}
                                </p>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>

            <Divider />

            <section className="my-16 bg-gray-100 p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-8">
                    DnD Elements
                </h2>
                <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    <div className="p-4 shadow-lg rounded-lg bg-white">
                        <h3 className="text-xl font-bold mb-2">Classes</h3>
                        <p className="text-gray-700">
                            Explore various classes such as Warrior, Mage,
                            Rogue, and more. Each class offers unique abilities
                            and skills to enhance your gameplay.
                        </p>
                    </div>
                    <div className="p-4 shadow-lg rounded-lg bg-white">
                        <h3 className="text-xl font-bold mb-2">Races</h3>
                        <p className="text-gray-700">
                            Discover the diverse races in Terra Infiria
                            including Elves, Dwarves, Humans, and Orcs. Each
                            race brings its own strengths and lore.
                        </p>
                    </div>
                    <div className="p-4 shadow-lg rounded-lg bg-white">
                        <h3 className="text-xl font-bold mb-2">Magic</h3>
                        <p className="text-gray-700">
                            Delve into the world of magic with spells,
                            enchantments, and magical artifacts that offer
                            endless possibilities for adventurers.
                        </p>
                    </div>
                </div>
            </section>

            <Divider />

            <section className="text-center my-16">
                <h2 className="text-3xl font-bold mb-4">Join Us Now</h2>
                <p className="text-xl text-gray-700 mb-8">
                    Ready to start your adventure? Join our community and create
                    your own legend in Terra Infiria.
                </p>
                <Button
                    as={Link}
                    to="https://whatsapp.com/channel/0029VabWmgQ59PwTZ5ivF00O"
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700"
                >
                    Click Me
                </Button>
            </section>
        </main>
    );
};

export default Home;
