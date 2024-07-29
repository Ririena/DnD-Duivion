import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";
import { Card } from "@/components/ui/card";
import { Divider } from "@nextui-org/react";
import { Button } from "@/components/ui/button";

export default function PlotId() {
    const { plotId } = useParams();
    const navigate = useNavigate();
    const [getOneChapter, setGetOneChapter] = useState(null);
    const [prevChapter, setPrevChapter] = useState(null);
    const [nextChapter, setNextChapter] = useState(null);

    useEffect(() => {
        const init = async () => {
            try {
                // Fetch current chapter
                const { data, error } = await supabase
                    .from("Lore")
                    .select("*")
                    .eq("id", plotId)
                    .single();
                if (error) {
                    throw error;
                }
                setGetOneChapter(data);

                // Fetch all chapters
                const { data: chapters, error: chaptersError } = await supabase
                    .from("Lore")
                    .select("*")
                    .order('id', { ascending: true });
                if (chaptersError) {
                    throw chaptersError;
                }

                // Find the current chapter index
                const currentIndex = chapters.findIndex(chapter => chapter.id === parseInt(plotId));
                if (currentIndex !== -1) {
                    setPrevChapter(chapters[currentIndex - 1] || null);
                    setNextChapter(chapters[currentIndex + 1] || null);
                }
            } catch (error) {
                console.error(error);
            }
        };
        init();
    }, [plotId]);

    console.log("Current Chapter ID:", plotId);
    console.log("Previous Chapter:", prevChapter);
    console.log("Next Chapter:", nextChapter);

    return (
        <main className="container mx-auto px-4 md:px-8 py-8 ">
            {getOneChapter ? (
                <div className="w-full lg:w-3/4 mx-auto">
                    <Card className="p-6 shadow-lg rounded-lg">
                        <h1 className="text-3xl font-bold mb-4">{getOneChapter.lore_title}</h1>
                        <Divider className="my-4" />
                        <p className="text-sm text-gray-600 whitespace-pre-line">
                            {getOneChapter.lore_description}
                        </p>
                        <div className="flex justify-end mt-4">
                            <Button
                                onClick={() => navigate(`/plot/edit/${plotId}`)}
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Edit
                            </Button>
                        </div>
                    </Card>

                    <div className="flex justify-between mt-4">
                        {prevChapter ? (
                            <button
                                onClick={() => navigate(`/plot/${prevChapter.id}`)}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Previous Chapter
                            </button>
                        ) : (
                            <div className="flex-1"></div>  // To align buttons correctly
                        )}
                        {nextChapter ? (
                            <button
                                onClick={() => navigate(`/plot/${nextChapter.id}`)}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Next Chapter
                            </button>
                        ) : (
                            <div className="flex-1"></div>  // To align buttons correctly
                        )}
                    </div>
                </div>
            ) : (
                <div className="text-center text-gray-600">Loading...</div>
            )}
        </main>
    );
}
