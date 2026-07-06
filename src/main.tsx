import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router.tsx";
import { BuildProvider } from "./context/BuildContext";

import "./styles/global.css";
import "./styles/home.css";
import "./styles/animations.css";
import "./styles/builder.css";
import "./styles/builderHeader.css";

ReactDOM.createRoot(document.getElementById("root")!).render(

  <BuildProvider>
    <RouterProvider router={router} />
  </BuildProvider>
);