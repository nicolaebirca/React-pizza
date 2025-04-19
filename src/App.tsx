import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "./components/Loader/Loader";

import Home from "./pages/Home";
// import Cart from "./pages/Cart";
// import NotFound from "./pages/NotFound";
// import FullPizza from "./pages/FullPizza";


import "./scss/app.scss";
import MainLayout from "./layouts/MainLayout";

const Cart = lazy(() => import(/* webpackChunkName: "Cart" */'./pages/Cart'));
const NotFound = lazy(() => import(/* webpackChunkName: "NotFound" */'./pages/NotFound'));
const FullPizza = lazy(() => import(/* webpackChunkName: "FullPizza" */'./pages/FullPizza'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />}></Route>
        <Route path="cart" element={
          <Suspense fallback={<Loader />}>
          <Cart />
        </Suspense>
      } />
        <Route path="pizza/:id" element={
          <Suspense fallback={<Loader />}>
          <FullPizza />
        </Suspense>
        } />
        <Route path="*" element={
          <Suspense fallback={<Loader />}>
          <NotFound />
        </Suspense>
        } />
      </Route>
    </Routes>
  );
}

export default App;
