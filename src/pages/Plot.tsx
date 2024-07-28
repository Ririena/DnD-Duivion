import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Divider, Image } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { Slash } from "lucide-react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const Plot = () => {
    const navigate = useNavigate();
    const chapters = [
        {
            id: 1,
            title: "Chapter 1: The Beginning",
            description: "Description of chapter 1.",
        },
        {
            id: 2,
            title: "Chapter 2: The Journey",
            description: "Description of chapter 2.",
        },
        {
            id: 3,
            title: "Chapter 3: The Conflict",
            description: "Description of chapter 3.",
        },
        // Add more chapters as needed
    ];

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
                    {chapters.map((chapter) => (
                        <Card
                            key={chapter.id}
                            className="p-4 shadow-md rounded-lg"
                        >
                            <Image
                                alt={chapter.title}
                                className="rounded-t-lg"
                                width="100%"
                                height={150}
                            />
                            <div className="p-4">
                                <h2 className="text-lg font-bold">
                                    {chapter.title}
                                </h2>
                                <p className="text-sm text-gray-600">
                                    {chapter.description}
                                </p>
                                <Button className="mt-4">View Details</Button>
                            </div>
                        </Card>
                    ))}
                </section>

                {/* Floating Action Button */}
                <Button
                    className="fixed bottom-8 right-8 bg-blue-500 hover:bg-blue-700 text-white text-4xl rounded-full w-16 h-16 flex justify-center items-center shadow-lg"
                    onClick={() => navigate("/create/create-chapter")}
                >
                    +
                </Button>
            </main>
        </>
    );
};

export default Plot;
