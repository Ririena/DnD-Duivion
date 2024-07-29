import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Divider, Image } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { Slash } from "lucide-react";
import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const Plot = () => {
    const [chapterData, setChapterData] = useState([]);

    useEffect(() => {
        async function init() {
            const { data, error } = await supabase
                .from("Lore")
                .select("*")
                .order("id", { ascending: true }); // Order by id in ascending order
            if (error) {
                console.error(error);
            } else {
                setChapterData(data);
                console.log(data);
            }
        }
        init();
    }, []);

    const navigate = useNavigate();

    const truncateText = (text: any, limit: any) => {
        if (text.length > limit) {
            return text.substring(0, limit) + "...";
        }
        return text;
    };

    return (
        <>
            <main className="mx-auto container px-4">
                <div className="flex justify-between">
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
                                            Plot
                                        </BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </Card>
                    </div>
                </div>

                <section>
                    <h1 className="text-center mt-8 text-2xl font-semibold">
                        Chapter List
                    </h1>
                </section>
                <div className="mt-4">
                    <Divider />
                </div>

                <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {chapterData.map((chapter) => (
                        <Card
                            key={chapter.id}
                            className="p-4 shadow-md rounded-lg"
                        >
                            <Image
                                src="/Map.jpeg"
                                className="rounded-t-lg"
                                width="100%"
                                height={150}
                            />
                            <div className="p-4">
                                <h2 className="text-lg font-bold">
                                    {chapter.lore_title}
                                </h2>
                                <p className="text-sm text-gray-600">
                                    {truncateText(
                                        chapter.lore_description,
                                        100
                                    )}
                                </p>
                                <Button
                                    className="mt-4 w-full"
                                    onClick={() =>
                                        navigate(`/plot/${chapter.id}`)
                                    }
                                >
                                    View Details
                                </Button>
                            </div>
                        </Card>
                    ))}
                </section>

                <Button
                    className="fixed bottom-20 right-8 bg-blue-500 hover:bg-blue-700 text-white text-4xl rounded-full w-16 h-16 flex justify-center items-center shadow-lg z-50"
                    onClick={() => navigate("/create/create-chapter")}
                >
                    +
                </Button>
            </main>
        </>
    );
};

export default Plot;
