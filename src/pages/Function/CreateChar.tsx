import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabase";
import { Divider } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { v4 as uuidv4 } from "uuid";

const CreateCharacter = () => {
    const [selectedCampaignId, setSelectedCampaignId] = useState("");
    const [campaigns, setCampaigns] = useState([]);
    const [gambar, setGambar] = useState(null);
    const [charName, setCharName] = useState("");
    const [charShortName, setCharShortName] = useState("");
    const [charGender, setCharGender] = useState("");
    const [charRace, setCharRace] = useState("");
    const [charStatus, setCharStatus] = useState("");
    const [charAllignment, setCharAllignment] = useState("");
    const [charFirstClass, setCharFirstClass] = useState("");
    const [charSecondClass, setCharSecondClass] = useState("");
    const [charSubClass, setCharSubClass] = useState("");
    const [charSecondSubClass, setCharSecondSubClass] = useState("");
    const [charBackground, setCharBackground] = useState("");
    const [charShortPicture, setCharPicture] = useState("");
    const [charFullDescription, setCharFullDescription] = useState("");
    const [charShortDescription, setCharDescription] = useState("");
    const [charHomeland, setCharHomeland] = useState("");

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const { data: campaigns, error } = await supabase
                    .from("campaign")
                    .select("*");

                if (error) {
                    throw new Error(error.message);
                }
                setCampaigns(campaigns);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCampaigns();
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();

        if (!gambar) {
            console.error("No image selected.");
            return;
        }

        const imageName = `${uuidv4()}.${gambar.name.split(".").pop()}`;

        const { data: fileData, error: fileError } = await supabase.storage
            .from("picture")
            .upload(`images/${imageName}`, gambar);
        if (fileError) {
            console.error("Error uploading file:", fileError.message);
            return;
        }

        const newData = {
            char_fullname: charName,
            char_shortname: charShortName,
            char_gender: charGender,
            char_race: charRace,
            char_status: charStatus,
            char_allignment: charAllignment,
            char_firstclass: charFirstClass,
            char_secondclass: charSecondClass,
            char_subclass: charSubClass,
            char_secondsubclass: charSecondSubClass,
            char_background: charBackground,
            char_short_picture: charShortPicture,
            char_full_picture: imageName,
            char_full_description: charFullDescription,
            char_short_description: charShortDescription,
            char_homeland: charHomeland,
            id_campaign: selectedCampaignId,
        };

        const { data, error } = await supabase
            .from("Characters")
            .insert([newData]);
        if (error) {
            console.error("Error saving data:", error.message);
        } else {
            console.log("Data saved successfully:", data);
        }
    };

    return (
        <main className="mx-auto container font-violet py-8">
            <section className="flex justify-center items-center">
                <form onSubmit={handleSave} className="w-full max-w-4xl">
                    <Card className="bg-white p-6 rounded-lg shadow-lg">
                        <section className="text-center font-semibold text-2xl text-blue-600 mb-4">
                            Create Character
                            <Divider className="my-2" />
                        </section>

                        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <select
                                className="input px-4 py-2 border rounded-md"
                                value={selectedCampaignId}
                                onChange={(e) =>
                                    setSelectedCampaignId(e.target.value)
                                }
                            >
                                <option value="">Select Campaign</option>
                                {campaigns.map((campaign) => (
                                    <option key={campaign.id} value={campaign.id}>
                                        {campaign.nama_campaign}
                                    </option>
                                ))}
                            </select>
                            <Input
                                className="input px-4 py-2 border rounded-md"
                                placeholder="Character Name"
                                value={charName}
                                onChange={(e) => setCharName(e.target.value)}
                            />
                            <Input
                                className="input px-4 py-2 border rounded-md"
                                placeholder="Short Name"
                                value={charShortName}
                                onChange={(e) => setCharShortName(e.target.value)}
                            />
                            <Input
                                className="input px-4 py-2 border rounded-md"
                                placeholder="Gender"
                                value={charGender}
                                onChange={(e) => setCharGender(e.target.value)}
                            />
                            <Input
                                className="input px-4 py-2 border rounded-md"
                                placeholder="Race"
                                value={charRace}
                                onChange={(e) => setCharRace(e.target.value)}
                            />
                            <Input
                                className="input px-4 py-2 border rounded-md"
                                placeholder="Status"
                                value={charStatus}
                                onChange={(e) => setCharStatus(e.target.value)}
                            />
                            <Input
                                className="input px-4 py-2 border rounded-md"
                                placeholder="Alignment"
                                value={charAllignment}
                                onChange={(e) => setCharAllignment(e.target.value)}
                            />
                            <Input
                                className="input px-4 py-2 border rounded-md"
                                placeholder="First Class"
                                value={charFirstClass}
                                onChange={(e) => setCharFirstClass(e.target.value)}
                            />
                            <Input
                                className="input px-4 py-2 border rounded-md"
                                placeholder="Second Class"
                                value={charSecondClass}
                                onChange={(e) => setCharSecondClass(e.target.value)}
                            />
                            <Input
                                className="input px-4 py-2 border rounded-md"
                                placeholder="Sub Class"
                                value={charSubClass}
                                onChange={(e) => setCharSubClass(e.target.value)}
                            />
                            <Input
                                className="input px-4 py-2 border rounded-md"
                                placeholder="Second Sub Class"
                                value={charSecondSubClass}
                                onChange={(e) => setCharSecondSubClass(e.target.value)}
                            />
                            <Input
                                className="input px-4 py-2 border rounded-md"
                                placeholder="Background"
                                value={charBackground}
                                onChange={(e) => setCharBackground(e.target.value)}
                            />
                            <Input
                                className="input px-4 py-2 border rounded-md"
                                placeholder="Short Picture URL"
                                value={charShortPicture}
                                onChange={(e) => setCharPicture(e.target.value)}
                            />
                            <Input
                                className="input px-4 py-2 border rounded-md"
                                placeholder="Homeland"
                                value={charHomeland}
                                onChange={(e) => setCharHomeland(e.target.value)}
                            />
                            <label htmlFor="phcp" className="cursor-pointer col-span-1 md:col-span-2">
                                <div className="bg-sky-600 py-2 px-4 text-white text-center rounded-md">
                                    Select File
                                </div>
                            </label>
                            <input
                                className="hidden"
                                type="file"
                                id="phcp"
                                onChange={(e) => setGambar(e.target.files[0])}
                            />
                        </section>

                        <Divider className="my-4" />
                        <Textarea
                            className="input px-4 py-2 border rounded-md w-full"
                            placeholder="Full Description"
                            value={charFullDescription}
                            onChange={(e) => setCharFullDescription(e.target.value)}
                        />
                        <Textarea
                            className="input px-4 py-2 border rounded-md w-full mt-4"
                            placeholder="Short Description"
                            value={charShortDescription}
                            onChange={(e) => setCharDescription(e.target.value)}
                        />
                        <Divider className="my-4" />
                        <Button type="submit" className="w-full py-2">
                            Save
                        </Button>
                    </Card>
                </form>
            </section>
        </main>
    );
};

export default CreateCharacter;
