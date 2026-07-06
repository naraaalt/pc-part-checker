import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home.tsx";
import Builder from "../pages/Builder.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/builder",
        element: <Builder />,
    }
]);