import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import NewUser from "./pages/user/NewUser";
import Booking from "./pages/booking/booking"
import EditUser from "./pages/user/EditUser";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { categoryInputs, productInputs, userInputs, resourceInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { hotelColumns, roomColumns, userColumns, productColumns, categoryColumns, BookingColumns, resourceColumns } from "./datatablesource";
import NewHotel from "./pages/hotel/NewHotel";
import NewRoom from "./pages/room/NewRoom";
import NewProduct from "./pages/product/NewProduct";
import EditProduct from "./pages/product/EditProduct";
import NewCategory from "./pages/category/NewCategory";
import EditCategory from "./pages/category/EditCategory";
import NewResource from "./pages/resource/NewResource";
import EditResource from "./pages/resource/EditResource";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="users">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={userColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":userId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewUser inputs={userInputs} title="Add New User" />
                  </ProtectedRoute>
                }
              />
              <Route
                path="edit/:userId"
                element={
                  <ProtectedRoute>
                    <EditUser inputs={userInputs} title="Edit User" />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="hotels">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={hotelColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":productId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewHotel  />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="rooms">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={roomColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":productId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewRoom  />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="product">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={productColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":productId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewProduct />
                  </ProtectedRoute>
                }
              />
              <Route
                path="edit/:productId"
                element={
                  <ProtectedRoute>
                    <EditProduct inputs={productInputs} title="Edit Product" />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="category">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={categoryColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":categoryId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewCategory  />
                  </ProtectedRoute>
                }
              />
              <Route
                path="edit/:categoryId"
                element={
                  <ProtectedRoute>
                    <EditCategory inputs={categoryInputs} title="Edit Category" />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="booking">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={BookingColumns} />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="resource">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={resourceColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":productId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewResource />
                  </ProtectedRoute>
                }
              />
              <Route
                path="edit/:productId"
                element={
                  <ProtectedRoute>
                    <EditResource inputs={resourceInputs} title="Edit Resource" />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
