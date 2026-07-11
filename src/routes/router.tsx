import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home.tsx";
import Builder from "../pages/Builder.tsx";
import Builds from "../pages/Builds.tsx";
import NotFound from "../pages/NotFound.tsx";

export const router = createBrowserRouter([
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
        path: "/docs",
        element: <NotFound />,
    },
    {
        path: "*",
        element: <NotFound />,
    }
]);