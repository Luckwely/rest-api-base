import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";

import HomePage from "../pages/HomePage";
import FormTestPage from "../pages/FormTestPage";
import Navigation from "../components/navigation";
import FoodPage from "../pages/FoodPage";
import type { FoodCart } from "../components/navigation";
import { foodFaker } from "../data/data";
import type { Food } from "../types/Food";
import TaskPage from "../pages/TaskPage";
import PostPage from "../pages/PostPage";


export default function AppRouter() {

  const [cart, setCart] = useState<FoodCart[]>([]);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [foods, setFoods] = useState<Food[]>(foodFaker);
  const openModal = () => {
    setIsOpenModal((old: boolean) => !old);
  }

  return (
    <>
      <BrowserRouter>
        <Navigation cart={cart} setCart={setCart} />
        <Routes>
          <Route index element={
            <HomePage />
          } />
          <Route path='/form' element={
            <FormTestPage />
          } />
          <Route path='/foods' element= {
            <FoodPage
              openModal={openModal}
              isOpenModal={isOpenModal}
              foods={foods}
              setFoods={setFoods}
              cart={cart}
              setCart={setCart}
              setIsOpenModal={setIsOpenModal}
            />
          }/>
          <Route path='/tasks' element={
            <TaskPage />
          } />
          <Route path='/posts' element={
            <PostPage />
          } />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toasterId="default"
        toastOptions={{
          // Define default options
          className: '',
          duration: 5000,
          removeDelay: 1000,
          style: {
            background: '#fff',
            color: '#363636',
          },

          // Default options for specific types
          success: {
            duration: 3000,
            iconTheme: {
              primary: 'green',
              secondary: 'white',
            },
          },
        }}
      />
    </>
  )
}
