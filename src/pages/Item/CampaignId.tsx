import { Card } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { Divider, Image, Link } from "@nextui-org/react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react";
import ClipLoader from "react-spinners/ClipLoader"; // Import the spinner

export default function CampaignId() {
    const [campaignData, setCampaignData] = useState(null);
    const [image, setImage] = useState(null);
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const { campaignId } = useParams();

    useEffect(() => {
        async function fetchCharacterData() {
            try {
                const { data, error } = await supabase
                    .from("Characters")
                    .select("*")
                    .eq("id_campaign", campaignId);

                if (error) {
                    console.error(error.message);
                } else {
                    const updatedData = await Promise.all(
                        data.map(async (character) => {
                            const { data: imageData } = await supabase.storage
                                .from("picture/images")
                                .getPublicUrl(character.char_full_picture);

                            return {
                                ...character,
                                imageUrl: imageData.publicUrl,
                            };
                        })
                    );
                    setCharacters(updatedData);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false); // Set loading to false after data is fetched
            }
        }

        if (campaignId) {
            fetchCharacterData();
        }
    }, [campaignId]);

    useEffect(() => {
        async function fetchCampaignData() {
            try {
                const { data, error } = await supabase
                    .from("campaign")
                    .select("*")
                    .eq("id", campaignId)
                    .single();

                if (error) {
                    console.error(error.message);
                    return;
                }

                setCampaignData(data);

                if (data.photo_campaign) {
                    const res = await supabase.storage
                        .from("picture/images")
                        .getPublicUrl(data.photo_campaign);
                    setImage(res.data.publicUrl);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false); // Set loading to false after data is fetched
            }
        }

        if (campaignId) {
            fetchCampaignData();
        }
    }, [campaignId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <ClipLoader size={150} color={"#123abc"} loading={loading} />
            </div>
        );
    }

    return (
        <main className="container mx-auto px-4 font-violet">
            <section className="flex justify-between">
                <div className="mt-8 w-full">
                    <Card className="p-2 shadow-md rounded-[4px]">
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator>
                                    <Slash />
                                </BreadcrumbSeparator>
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Campaign</BreadcrumbPage>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator>
                                    <Slash />
                                </BreadcrumbSeparator>
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="font-bold">
                                        Terra Infiria
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </Card>
                </div>
            </section>
            <div className="text-center my-8">
                <h1 className="text-4xl font-bold mb-4">Campaign Details</h1>
            </div>

            <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-between gap-8">
                <div className="flex-1">
                    <Card className="p-6 shadow-lg rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">
                            {campaignData ? campaignData.nama_campaign : "Loading..."}
                        </h2>
                        <Divider className="my-4" />
                        <div className="flex justify-center mb-4">
                            <Image
                                src={image || "No image"}
                                width={600}
                                height={400}
                                alt="Campaign Image"
                                className="rounded-md shadow-lg"
                            />
                        </div>
                        <Divider className="my-4" />
                        <div className="whitespace-pre">
                            <p className="text-lg">
                                {campaignData
                                    ? campaignData.deskripsi_campaign
                                    : "No description available"}
                            </p>
                        </div>
                    </Card>
                </div>

                <div className="flex-1">
                    <h2 className="text-3xl font-bold text-center mb-6">
                        Characters List
                    </h2>
                    <Divider className="mb-4" />
                    <div className="grid gap-4 grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
                        {characters.map((character) => (
                            <Link
                                key={character.id}
                                href={`/campaign/${character.id_campaign}/character/${character.id}`}
                            >
                                <Card className="hover:cursor-pointer p-4 bg-white shadow-lg rounded-lg transition-transform transform hover:scale-105">
                                    <div className="flex justify-center items-center mb-4">
                                        <Image
                                            src={character.imageUrl || "No image"}
                                            alt="Character Image"
                                            width={100}
                                            height={100}
                                            className="rounded-full"
                                        />
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-lg font-bold mb-2">
                                            {character.char_shortname}
                                        </h3>
                                        <p className="text-sm text-gray-500 mb-2">
                                            {character.char_firstclass}
                                        </p>
                                        <p className="text-gray-700">
                                            {character.char_description}
                                        </p>
                                    </div>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
