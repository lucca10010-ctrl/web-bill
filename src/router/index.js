import LayOut from "@/pages/Layout";
import Me from "@/pages/Me";
import Month from "@/pages/Month";
import New from "@/pages/New";
import Year from "@/pages/Year";
import { createHashRouter } from "react-router-dom";

const router = createHashRouter([
    {
        path: "/",
        element: <LayOut />,
        children: [
            {
                index: true,
                // path: "/month",
                element: <Month />,
            },
            {
                path: "/year",
                element: <Year />,
            },
            {
                path: "/me",
                element: <Me />,
            },
        ],
    },
    {
        path: "newBill",
        element: <New />,
    },
]);

export default router;