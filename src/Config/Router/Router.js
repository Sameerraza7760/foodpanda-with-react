import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";



import Account from '../../pages/AccountSigin/Account'
import Home from "../../Components/Home";
import Signup from "../../pages/AccountSigin/Signup";
import Login from '../../pages/AccountSigin/Login'
import SignupResturent from '../../pages/AccountSigin/SignupResturent'
import RestaurantShow from "../../pages/Resturents/ResturentShow";
import Additem from "../../pages/Resturents/Additem";
import ResturentsDetail from "../../pages/Resturents/ResturentsDetail";
import RestCity from "../../pages/Resturents/RestCity";
import Tabs from "../../Components/Header/Tabs";
import Tabuser from "../../Components/Header/Tabuser";
import Chat from "../../pages/Resturents/Chat";
import Adminchat from "../../pages/Resturents/Adminchat";

function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
    },
    {
      path: "/account",
      element: <Account />,
    },
    {
        path: "/Signup",
        element: <Signup />,
      },
      {
        path:"/Login",
         element:<Login/>
      },
      {
        path:"/SignupR",
        element:<SignupResturent/>
      },
      {
        path:"/showResturent",
        element:<RestaurantShow/>
      },
      {
      path:"/additem",
      element:<Additem/>
      },
    {
      path:"/detail/:id",
      element:<ResturentsDetail/>
    },
    {
      path:"/restCity",
      element:<RestCity/>
    },
   {
    path:"/tabs",
    element:<Tabs/>
   },
  {
    path:'tabuser',
    element:<Tabuser/>
  },{
    path:'chatpage',
   element:<Chat/>
  },{
    path:'/adminchat',
    element:<Adminchat/>
  }
    
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
