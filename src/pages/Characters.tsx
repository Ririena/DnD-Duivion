import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Divider } from "@nextui-org/react";

const Characters = () => {
    return (
        <>
            <main className="mx-auto container">
                <section className="flex justify-center items-center">
                    <Card className="w-[1500px] p-4 mt-8 shadow-md">
                        <section className="flex justify-between">
                            <div>
                                <h1 className="text-xl">
                                    Create Your Own Characters
                                </h1>
                            </div>
                            <div>
                                <Button>Create Now</Button>
                            </div>
                        </section>
                    </Card>
                </section>
                <div className="mt-12">
                    <Divider />
                </div>
                <section className="mt-6">
                    <div className="grid grid-cols-4 gap-4">
                        <Card>
                            <h1>Hello</h1>
                        </Card>
                        <Card>
                            <h1>Hello</h1>
                        </Card>
                        <Card>
                            <h1>Hello</h1>
                        </Card>
                        <Card>
                            <h1>Hello</h1>
                        </Card>
                    </div>
                </section>
            </main>
        </>
    );
};

export default Characters;
