import React from "react";
import { Button } from "../ui/button";
import {
    GiCrescentStaff,
    GiLockedChest,
    GiOrbWand,
    GiPiercingSword,
    GiPotionBall,
    GiTiedScroll,
    GiWizardStaff,
} from "react-icons/gi";
import { Shield } from "lucide-react";
import { FaRing } from "react-icons/fa";
export default function MagicButton() {
    return (
        <>
            <Button className="py-6 bg-blue-600 hover:bg-blue-700">
                <GiLockedChest size="2em" />
            </Button>
            <Button className="py-6 bg-sky-600 hover:bg-sky-700">
                <Shield size="2em" />
            </Button>
            <Button className="py-6 bg-green-600 hover:bg-green-700">
                <GiPotionBall size="2em" color="" />
            </Button>
            <Button className="py-6 bg-yellow-500 hover:bg-yellow-600">
                <FaRing size="2em" />
            </Button>
            <Button className="py-6 bg-red-600 hover:bg-red-700">
                <GiCrescentStaff size="2em" />
            </Button>
            <Button className="py-6 bg-orange-600 hover:bg-orange-700">
                <GiTiedScroll size="2em" />
            </Button>
            <Button className="py-6 bg-cyan-600 hover:bg-cyan-700">
                <GiWizardStaff size="2em" />
            </Button>
            <Button className="py-6 bg-purple-600 hover:bg-purple-700">
                <GiOrbWand size="2em" />
            </Button>
            <Button className="py-6 bg-rose-600  hover:bg-rose-700">
                <GiPiercingSword size="2em" />
            </Button>
            <Button className="py-6 bg-gray-600 hover:bg-gray-700">
                <GiLockedChest size="2em" />
            </Button>
        </>
    );
}
