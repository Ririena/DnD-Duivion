import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { supabase } from "@/utils/supabase";
const CreateChapter = () => {
    const [chapters, setChapters] = useState([
        { id: 1, title: "Chapter 1: The Beginning" },
        { id: 2, title: "Chapter 2: The Journey" },
        { id: 3, title: "Chapter 3: The Conflict" },
        // Add more chapters as needed
    ]);

    const [title, setTitle] = useState("")
    const [plot, setPlot] = useState("")


    const handleSave = async(e) => {
        e.preventDefault()

        const newData = {

        }
    }

    const previousChapters = chapters.slice(-2);

    return (
        <>
            <main className="container mx-auto px-4 md:px-8 py-8">
                <section className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-4">Create Chapter</h1>
                </section>
                <section className="flex flex-col lg:flex-row items-start gap-8">
                    <div className="w-full lg:w-2/3">
                        <Card className="p-6 shadow-lg rounded-lg">
                            <h2 className="text-2xl font-bold mb-4">Chapter Form</h2>
                            <form>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                                    <Input
                                        type="text"
                                        placeholder="Enter chapter title"
                                        className="w-full"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                    <Textarea
                                        placeholder="Enter chapter description"
                                        className="w-full h-72 resize-none border border-gray-300 rounded-lg p-2"
                                    />
                                </div>
                                <Button className="w-full bg-blue-500 hover:bg-blue-700 text-white">
                                    Create Chapter
                                </Button>
                            </form>
                        </Card>
                    </div>
                    <div className="w-full lg:w-1/3 flex flex-col gap-8">
                        <Card className="p-6 shadow-lg rounded-lg">
                            <h2 className="text-2xl font-bold mb-4">Chapter Information</h2>
                            <div className="mb-4">
                                <p className="text-sm font-medium">Total Chapters</p>
                                <p className="text-lg font-bold">{chapters.length}</p>
                            </div>
                        </Card>
                        <Card className="p-6 shadow-lg rounded-lg">
                            <h3 className="text-xl font-bold mb-2">Previous Chapters</h3>
                            {previousChapters.map((chapter) => (
                                <div key={chapter.id} className="mb-2">
                                    <p className="text-sm font-medium">{chapter.title}</p>
                                </div>
                            ))}
                        </Card>
                    </div>
                </section>


            </main>
        </>
    );
};

export default CreateChapter;
