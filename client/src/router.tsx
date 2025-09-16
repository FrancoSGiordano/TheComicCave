import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/Home/Home";
import FavoritesView from "./views/FavoritesView/FavoritesView";
import AppLayout from "./layouts/AppLayout/AppLayout";
import LandingPage from "./views/LandingPage/LandingPage";
import SearchView from "./views/SearchView/SearchView";


export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout/>}>
                    <Route path="/" element={<LandingPage/>} index></Route>
                    <Route path="/comics" element={<Home/>} ></Route>
                    <Route path="/comics/favorites" element={<FavoritesView/>}></Route>
                    <Route path="/comics/search" element={<SearchView/>}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
