import { Routes, Route } from "react-router-dom";
import HomeLayout from "./layout/HomeLayout";
import Home from "./pages/Home";
import "./App.css";
import Item from "./pages/Item";
import MagicItems from "./pages/MagicItems";
import Create from "./pages/Item/Create";
import Weapon from "./pages/Item/Weapons";
import WeaponItems from "./pages/Item/WeaponItems";
import WeaponItemsId from "./pages/Item/WeaponItemsId";
import CreateCharacter from "./pages/Function/CreateCampaign";
import Story from "./pages/Item/Story";
import CampaignId from "./pages/Item/CampaignId";
import CreateChar from "./pages/Function/CreateChar";
import Plot from "./pages/Plot";
import CreateChapter from "./pages/Function/CreateChapter";

function App() {
    const withLayout = (LayoutComponent: any, ChildComponent: any) => {
        return (props: any) => (
            <LayoutComponent>
                <ChildComponent {...props}></ChildComponent>
            </LayoutComponent>
        );
    };
    const HomeWithLayout = withLayout(HomeLayout, Home);
    return (
        <>
            <Routes>
                <Route path="/" element={<HomeWithLayout />}>
                    <Route index element={<Home />} />
                    <Route path="campaign">
                        <Route index element={<Story />} />
                        <Route path=":campaignId">
                            <Route index element={<CampaignId />} />
                        </Route>
                    </Route>
                    <Route path="plot">
                        <Route index element={<Plot />} />
                    </Route>
                    <Route path="items">
                        <Route index element={<Item />} />
                        <Route path="magic-items">
                            <Route index element={<MagicItems />} />
                            <Route path="weapons">
                                <Route index element={<WeaponItems />} />
                                <Route path=":weaponId">
                                    <Route index element={<WeaponItemsId />} />
                                </Route>
                            </Route>

                            <Route path="create">
                                <Route index element={<Create />} />
                                <Route path="weapons">
                                    <Route index element={<Weapon />} />
                                </Route>
                            </Route>
                        </Route>
                    </Route>

                    <Route path="create">
                        <Route path="create-char">
                            <Route index element={<CreateChar />} />
                        </Route>
                        <Route path="create-weapons">
                            <Route index element={<Weapon />} />
                        </Route>
                        <Route path="create-chapter">
                            <Route index element={<CreateChapter />} />
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </>
    );
}

export default App;
