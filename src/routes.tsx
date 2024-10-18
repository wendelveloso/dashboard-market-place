import Login from "./pages/login";
import Register from "./pages/register";
import {
  LoaderFunctionArgs,
  Outlet,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Products } from "./pages/produtcs";
import { Navbar } from "./components/Navbar";
import { makeRequest } from "./utils/makeRequest";
import { Profile } from "./pages/profile";
import { NewProducts } from "./pages/produtcs_new";
import { EditProfile } from "./pages/profile_edit";
import { EditProducts } from "./pages/produtcs_edit";

export const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />} />
      <Route path="/usuarios" element={<Register />} />

      <Route element={<CreatePage />}>
        <Route
          path="/produtos"
          loader={productsLoader}
          element={<Products />}
        />
        <Route
          path="/produtos/:id/editar"
          loader={editProductLoader}
          element={<EditProducts />}
        />
        <Route path="/produtos/novo" element={<NewProducts />} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="/perfil/editar" element={<EditProfile />} />
      </Route>
    </>
  )
);

function productsLoader() {
  return makeRequest("/produtos", "GET");
}

function editProductLoader({ params }: LoaderFunctionArgs) {
  const { id } = params;
  return makeRequest(`/produtos/${id}`, "GET");
}

function CreatePage() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
