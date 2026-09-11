import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";

import CustomerList from "./pages/customers/CustomerList";
import AddressList from "./pages/addresses/AddressList";
import HotelList from "./pages/hotels/HotelList";
import RoomList from "./pages/rooms/RoomList";
import EmployeeList from "./pages/employees/EmployeeList";
import ReservationList from "./pages/reservations/ReservationList";
import PaymentList from "./pages/payments/PaymentList";

import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";


function App() {

    return (

        <Routes>

            {/* =========================================
                AUTH ROUTES
            ========================================= */}

            <Route
                path="/"
                element={<LoginPage />}
            />

            <Route
                path="/login"
                element={<LoginPage />}
            />

            <Route
                path="/signup"
                element={<SignupPage />}
            />


            {/* =========================================
                APPLICATION ROUTES
            ========================================= */}

            <Route
                path="/*"
                element={

                    <Layout>

                        <Routes>

                            <Route
                                path="/dashboard"
                                element={<Dashboard />}
                            />

                            <Route
                                path="/customers"
                                element={<CustomerList />}
                            />

                            <Route
                                path="/addresses"
                                element={<AddressList />}
                            />

                            <Route
                                path="/hotels"
                                element={<HotelList />}
                            />

                            <Route
                                path="/rooms"
                                element={<RoomList />}
                            />

                            <Route
                                path="/employees"
                                element={<EmployeeList />}
                            />

                            <Route
                                path="/reservations"
                                element={<ReservationList />}
                            />

                            <Route
                                path="/payments"
                                element={<PaymentList />}
                            />

                        </Routes>

                    </Layout>

                }
            />

        </Routes>

    );

}

export default App;