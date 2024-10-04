import { createBrowserRouter } from "react-router-dom";

// Components
import App from "../App";
import LoginPage from "../pages/LoginPage";
import ChatPage from "../pages/ChatPage";
import UserPage from "../pages/ChatBox";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "chat",
        element: <ChatPage />,
        children: [
          {
            path: "user",
            element: <UserPage />,
          }
        ]
      }
    ],
  },
]);

export default router;
