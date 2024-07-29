import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";
import { Button } from "@/components/ui/button"; // Adjust import as needed
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast"

export default function PlotEdit() {
    const { toast } = useToast()
    const { plotId } = useParams(); // Fixed variable name to plotId
    const navigate = useNavigate();
    const [chapter, setChapter] = useState({
        lore_title: '',
        lore_description: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChapter = async () => {
            try {
                const { data, error } = await supabase
                    .from("Lore")
                    .select("*")
                    .eq("id", plotId)
                    .single();

                if (error) {
                    throw error;
                }
                setChapter(data);

                setLoading(false);
            } catch (error) {
                setError(error); // Extract and set the error message
                setLoading(false);
            }
        };

        fetchChapter();
    }, [plotId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setChapter(prevChapter => ({
            ...prevChapter,
            [name]: value
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const { error } = await supabase
                .from("Lore")
                .update({
                    lore_title: chapter.lore_title,
                    lore_description: chapter.lore_description
                })
                .eq("id", plotId);

            if (error) {
                throw error;
            }
            toast({
                title: "200 Success",
                description: "You Successfully Edit The Chapter",
                variant: "default"
            })
            navigate(`/plot/${plotId}`);
        } catch (error) {
            setError(error); // Extract and set the error message
        }
    };

    if (loading) return <div className="text-center text-gray-600">Loading...</div>;
    if (error) return <div className="text-center text-red-600">{error}</div>;

    return (
        <main className="container mx-auto px-4 md:px-8 py-8">
            <div className="w-full lg:w-3/4 mx-auto">
                <h1 className="text-3xl font-bold mb-4">Edit Chapter</h1>
                <form onSubmit={handleSave}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Title
                        </label>
                        <Input
                            type="text"
                            name="lore_title"
                            value={chapter.lore_title}
                            onChange={handleChange}
                            className="w-full"
                            placeholder="Enter chapter title"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                        </label>
                        <Textarea
                            name="lore_description"
                            value={chapter.lore_description}
                            onChange={handleChange}
                            className="w-full h-72 resize-none border border-gray-300 rounded-lg p-2"
                            placeholder="Enter chapter description"
                        />
                    </div>
                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Save Changes
                        </Button>
                    </div>
                </form>
            </div>
        </main>
    );
}
