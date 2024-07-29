import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Image, Divider } from "@nextui-org/react";

const CharacterSheet = () => {
    const { characterId } = useParams();

    const [character, setCharacter] = useState(null);
    const [image, setImage] = useState(null);

    useEffect(() => {
        async function getData() {
            try {
                const { data, error } = await supabase
                    .from("Characters")
                    .select("*")
                    .eq("id", characterId)
                    .single();

                if (error) {
                    throw error;
                }

                setCharacter(data);

                if (data) {
                    const res = await supabase.storage
                        .from("picture/images")
                        .getPublicUrl(data.char_full_picture);

                    setImage(res.data.publicUrl);
                }
            } catch (error) {
                console.error(error);
            }
        }

        getData();
    }, [characterId]);

    if (!character) {
        return <div>Loading...</div>;
    }

    return (
        <main className="container mx-auto px-4 md:px-8 py-8">
            <section className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-4">Character Sheets</h1>
            </section>
            <section className="flex flex-col lg:flex-row items-start gap-8">
                {/* Left Column */}
                <div className="w-full lg:w-3/12">
                    <Card className="p-6 shadow-lg rounded-lg h-full">
                        {image && (
                            <Image
                                className="rounded-lg mb-4"
                                src={image}
                                alt="Character"
                            />
                        )}
                        <Divider />
                        <h2 className="font-serif text-2xl mt-4 mb-2">
                            {character.char_fullname}
                        </h2>
                        <p className="text-lg mb-2">
                            <strong>Gender:</strong> {character.char_gender}
                        </p>
                        <p className="text-lg mb-2">
                            <strong>Race:</strong> {character.char_race}
                        </p>
                        <Divider className="my-4" />
                        <h2 className="text-2xl font-bold mb-4">
                            Alignment & Status
                        </h2>
                        <div className="mb-4">
                            <h3 className="font-serif text-lg mb-2">
                                Alignment:
                            </h3>
                            <p className="text-lg">
                                {character.char_allignment}
                            </p>
                            <Divider className="my-4" />
                            <h3 className="font-serif text-lg mb-2">Status:</h3>
                            <p className="text-lg">{character.char_status}</p>
                        </div>
                    </Card>
                </div>

                {/* Middle Column */}
                <div className="w-full lg:w-1/3 flex flex-col gap-8">
                    <Card className="p-6 shadow-lg rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">
                            Class Information
                        </h2>
                        <Divider />
                        <p className="text-lg mt-4">
                            <strong>Class:</strong> {character.char_firstclass}
                        </p>
                    </Card>

                    <Card className="p-6 shadow-lg rounded-lg h-[490px]">
                        <h2 className="text-2xl font-bold mb-4">
                            Ability Information
                        </h2>
                        <div className="grid grid-cols-3 gap-4 p-2">
                            <Card>
                                <h1>Strenght</h1>
                            </Card>
                            <Card>
                                <h1>Dexterity</h1>
                            </Card>
                            <Card>
                                <h1>Constitution</h1>
                            </Card>
                        </div>
                        <Divider />
                    </Card>
                </div>

                {/* Right Column */}
                <div className="w-full lg:w-1/3 flex flex-col gap-8">
                    <Card className="p-6 shadow-lg rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">Background</h2>
                        <Divider />
                        <p className="text-lg mt-4">
                            {character.char_background}
                        </p>
                        <Divider className="my-4" />
                        <h3 className="font-serif text-lg">Character Origin</h3>
                        <p className="text-lg">
                            {character.char_homeland || "Unknown"}
                        </p>
                    </Card>
                </div>
            </section>
        </main>
    );
};

export default CharacterSheet;
