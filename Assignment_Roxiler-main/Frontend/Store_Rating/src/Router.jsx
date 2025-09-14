import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import UpdatePassword from "./components/UpdatePassword";
import Admin from "./pages/admin/Admin";
import AdminWelcome from "./components/admin/AdminWelcome";
import AdminDashboardOverview from "./components/admin/AdminDashboardOverview";

const appRouter = createBrowserRouter(
    [
        {
            path: "/",
            element: <App />,
            children:
                [
                    {
                        index: true,
                        element: <Login />
                    },
                    {
                        path: "/register",
                        element: <Register />
                    }, {
                        path: "/home",
                        element: <Home />
                    },
                    {
                        path: "/update-password",
                        element: <UpdatePassword />
                    },
                    {
                        path: "/admin",
                        element: <Admin />,
                        children: [
                            {
                                index: true, // this makes it default route for /admin
                                element: <AdminWelcome />,
                            },
                            {
                                path: "dashboard",
                                element: <AdminDashboardOverview />
                            },
                        ]
                    }


                ]

        }
    ]

)



export default appRouter;