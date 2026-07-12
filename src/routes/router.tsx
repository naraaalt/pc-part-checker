import { createBrowserRouter } from "react-router-dom";

import App from "../App.tsx";
import Home from "../pages/Home.tsx";
import Builder from "../pages/Builder.tsx";
import Builds from "../pages/Builds.tsx";
import About from "../pages/About.tsx";
import Compare from "../pages/Compare.tsx";
import NotFound from "../pages/NotFound.tsx";

export const router = createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/builder",
                element: <Builder />,
            },
            {
                path: "/builds",
                element: <Builds />,
            },
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/compare",
                element: <Compare />,
            },
            {
                path: "*",
                element: <NotFound />,
            }
        ],
    },
]);