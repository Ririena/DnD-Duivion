import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";

const CreateChapter = () => {
    const [chapterData, setChapterData] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        async function init() {
            const { data, error } = await supabase.from("Lore").select("*");
            if (error) {
                console.error(error);
            } else {
                setChapterData(data);
                console.log(data);
            }
        }
        init();
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();

        const newData = {
            lore_title: title,
            lore_description: description,
        };

        const { data, error } = await supabase.from("Lore").insert([newData]);
        if (error) {
            console.error("Error saving data:", error.message);
        } else {
            alert("Data saved successfully");
            // Optionally, you can reset the form or update the chapter data state here
        }
    };

    const previousChapters = chapterData.slice(-2);

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
                            <form onSubmit={handleSave}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Title
                                    </label>
                                    <Input
                                        type="text"
                                        placeholder="Enter chapter title"
                                        className="w-full"
                                        name="lore_title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Description
                                    </label>
                                    <Textarea
                                        value={description}
                                        name="lore_description"
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Enter chapter description"
                                        className="w-full h-72 resize-none border border-gray-300 rounded-lg p-2"
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full bg-blue-500 hover:bg-blue-700 text-white"
                                >
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
                                <p className="text-lg font-bold">{chapterData.length}</p>
                            </div>
                        </Card>
                        <Card className="p-6 shadow-lg rounded-lg">
                            <h3 className="text-xl font-bold mb-2">Previous Chapters</h3>
                            {previousChapters.map((chapter) => (
                                <div key={chapter.id} className="mb-2">
                                    <p className="text-sm font-medium">{chapter.lore_title}</p>
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
