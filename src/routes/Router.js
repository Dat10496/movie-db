import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import DetailPage from "../pages/DetailPage";
import SignInPage from "../pages/SignInPage";
import FavoriteMoviePage from "../pages/FavoriteMoviePage";
import CategoryPage from "../pages/CategoryPage";
import AuthRequire from "./AuthRequire";
import MainLayout from "../layouts/MainLayout";

const Router = () => {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            index
            element={
              <AuthRequire>
                <HomePage />
              </AuthRequire>
            }
          />
          <Route index element={<HomePage />} />
          <Route path="/page/:page" element={<HomePage />} />
          <Route path="/page/:page/movies/:id" element={<DetailPage />} />
          <Route path="/genres/:name/movies/:id" element={<DetailPage />} />
          <Route path="/genres/:name" element={<HomePage />} />
          <Route path="/genres/:name/page/:page" element={<HomePage />} />
          <Route path="/favorite-movie" element={<FavoriteMoviePage />} />
          <Route path="/category/:value" element={<CategoryPage />} />
        </Route>

        <Route path="/category/:value/movies/:id" element={<DetailPage />} />
        <Route path="/favorite-movie/movies/:id" element={<DetailPage />} />
        <Route path="/movies/:id" element={<DetailPage />} />

        <Route>
          <Route path="/log-in" element={<SignInPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default Router;
