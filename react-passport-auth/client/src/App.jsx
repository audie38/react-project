/* eslint-disable no-unused-vars */
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { useState, useEffect } from "react";

import Root from "./components/layout/Root";
import Home from "./pages/Home";

import "./app.css";
import PostDetails from "./pages/PostDetails";
import Login from "./pages/Login";
import Private from "./components/layout/Private";
import Public from "./components/layout/Public";

const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL;

function App() {
  const [user, setUser] = useState(null);
  const [post, setPost] = useState([
    {
      id: 1,
      title: "5 Premium Theme for React",
      img: "https://images.pexels.com/photos/7963572/pexels-photo-7963572.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit ad optio magnam veniam nihil, quasi in architecto dignissimos rerum, soluta ipsa nobis eos mollitia eligendi adipisci possimus pariatur dolorem ea?",
      longDesc:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit ad optio magnam veniam nihil, quasi in architecto dignissimos rerum, soluta ipsa nobis eos mollitia eligendi adipisci possimus pariatur dolorem ea? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit ad optio magnam veniam nihil, quasi in architecto dignissimos rerum, soluta ipsa nobis eos mollitia eligendi adipisci possimus pariatur dolorem ea? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit ad optio magnam veniam nihil, quasi in architecto dignissimos rerum, soluta ipsa nobis eos mollitia eligendi adipisci possimus pariatur dolorem ea? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit ad optio magnam veniam nihil, quasi in architecto dignissimos rerum, soluta ipsa nobis eos mollitia eligendi adipisci possimus pariatur dolorem ea?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit ad optio magnam veniam nihil, quasi in architecto dignissimos rerum, soluta ipsa nobis eos mollitia eligendi adipisci possimus pariatur dolorem ea? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit ad optio magnam veniam nihil, quasi in architecto dignissimos rerum, soluta ipsa nobis eos mollitia eligendi adipisci possimus pariatur dolorem ea? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit ad optio magnam veniam nihil, quasi in architecto dignissimos rerum, soluta ipsa nobis eos mollitia eligendi adipisci possimus pariatur dolorem ea? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit ad optio magnam veniam nihil, quasi in architecto dignissimos rerum, soluta ipsa nobis eos mollitia eligendi adipisci possimus pariatur dolorem ea?",
    },
    {
      id: 2,
      title: "How to Animate Elements?",
      img: "https://images.pexels.com/photos/1742370/pexels-photo-1742370.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit ad optio magnam veniam nihil, quasi in architecto dignissimos rerum, soluta ipsa nobis eos mollitia eligendi adipisci possimus pariatur dolorem ea?",
      longDesc:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit ad optio magnam veniam nihil, quasi in architecto dignissimos rerum, soluta ipsa nobis eos mollitia eligendi adipisci possimus pariatur dolorem ea? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit ad optio magnam veniam nihil, quasi in architecto dignissimos rerum, soluta ipsa nobis eos mollitia eligendi adipisci possimus pariatur dolorem ea? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit ad optio magnam veniam nihil, quasi in architecto dignissimos rerum, soluta ipsa nobis eos mollitia eligendi adipisci possimus pariatur dolorem ea? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit ad optio magnam veniam nihil, quasi in architecto dignissimos rerum, soluta ipsa nobis eos mollitia eligendi adipisci possimus pariatur dolorem ea?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit ad optio magnam veniam nihil, quasi in architecto dignissimos rerum, soluta ipsa nobis eos mollitia eligendi adipisci possimus pariatur dolorem ea? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit ad optio magnam veniam nihil, quasi in architecto dignissimos rerum, soluta ipsa nobis eos mollitia eligendi adipisci possimus pariatur dolorem ea? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit ad optio magnam veniam nihil, quasi in architecto dignissimos rerum, soluta ipsa nobis eos mollitia eligendi adipisci possimus pariatur dolorem ea? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit ad optio magnam veniam nihil, quasi in architecto dignissimos rerum, soluta ipsa nobis eos mollitia eligendi adipisci possimus pariatur dolorem ea?",
    },
    {
      id: 3,
      title: "learn JS in 30 days",
      img: "https://images.pexels.com/photos/1161547/pexels-photo-1161547.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit ad optio magnam veniam nihil, quasi in architecto dignissimos rerum, soluta ipsa nobis eos mollitia eligendi adipisci possimus pariatur dolorem ea?",
      longDesc:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit ad optio magnam veniam nihil, quasi in architecto dignissimos rerum, soluta ipsa nobis eos mollitia eligendi adipisci possimus pariatur dolorem ea? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit ad optio magnam veniam nihil, quasi in architecto dignissimos rerum, soluta ipsa nobis eos mollitia eligendi adipisci possimus pariatur dolorem ea? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit ad optio magnam veniam nihil, quasi in architecto dignissimos rerum, soluta ipsa nobis eos mollitia eligendi adipisci possimus pariatur dolorem ea? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit ad optio magnam veniam nihil, quasi in architecto dignissimos rerum, soluta ipsa nobis eos mollitia eligendi adipisci possimus pariatur dolorem ea?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit ad optio magnam veniam nihil, quasi in architecto dignissimos rerum, soluta ipsa nobis eos mollitia eligendi adipisci possimus pariatur dolorem ea? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit ad optio magnam veniam nihil, quasi in architecto dignissimos rerum, soluta ipsa nobis eos mollitia eligendi adipisci possimus pariatur dolorem ea? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit ad optio magnam veniam nihil, quasi in architecto dignissimos rerum, soluta ipsa nobis eos mollitia eligendi adipisci possimus pariatur dolorem ea? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit ad optio magnam veniam nihil, quasi in architecto dignissimos rerum, soluta ipsa nobis eos mollitia eligendi adipisci possimus pariatur dolorem ea?",
    },
  ]);

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(`${API_BASE_URL}/auth/login/success`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      });
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error("Login Failed");
      }
      setUser(responseData?.user);
    };
    getUser().catch((err) => console.log(err));
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root userData={user} />,
      children: [
        {
          path: "/",
          index: true,
          element: (
            <Private userData={user}>
              <Home data={post} />,
            </Private>
          ),
        },
        {
          path: "/post/:id",
          element: (
            <Private userData={user}>
              <PostDetails />
            </Private>
          ),
          loader: async ({ params }) => {
            return post.filter((item) => item.id == params.id);
          },
        },
        {
          path: "/login",
          element: (
            <Public userData={user}>
              <Login />
            </Public>
          ),
        },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/" />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
