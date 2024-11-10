import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AboutUs from "../Pages/AboutUs/AboutUs";
import ContactUs from "../Pages/ContactUs/ContactUs";
import SignUp from "../Pages/SignUp/SignUp";
import RoomDetails from "../Pages/Room/RoomDetails";
import CreateRoom from "../Pages/admin/RoomManagement/CreateRoom";
import ManageRoom from "../Pages/admin/RoomManagement/ManageRoom";
import UpdateRoom from "../Pages/admin/RoomManagement/UpdateRoom";
import CreateSlot from "../Pages/admin/SlotManagement/CreateSlot";
import UpdateSlot from "../Pages/admin/SlotManagement/UpdateSlot";
import ManageBooking from "../Pages/admin/BookingManagement/ManageBooking";
import RoomBooking from "../Pages/Booking/RoomBooking";
import BookingSummary from "../Pages/Booking/BookingSummary";
import ManageSlot from "../Pages/admin/SlotManagement/ManageSlot";
import ManageUsers from "../Pages/user/ManageUsers";
import MyBookings from "../Pages/user/MyBookings";
import AllMeetingRoom from "../Pages/Room/AllMeetingRoom";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Login from "../Pages/login/Login";
import ProtectedRoute from "../Layout/ProtectedRoute";
import AdminLayout from "../Layout/AdminLayout";
import MainLayout from "../Layout/MainLayout";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/my-bookings",
        element: <MyBookings />,
      },
      {
        path: "/meeting-rooms",
        element: <AllMeetingRoom />,
      },
      {
        path: "/meeting-rooms/room-details/:id",
        element: <RoomDetails />,
      },
      {
        path: "/meeting-rooms/room-booking/:roomId",
        element: (
          <ProtectedRoute>
            <RoomBooking />
          </ProtectedRoute>
        ),
      },
      {
        path: "/booking-summary",
        element: <BookingSummary />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "add-rooms",
        element: <CreateRoom />,
      },
      {
        path: "manage-rooms",
        element: <ManageRoom />,
      },
      {
        path: "manage-rooms/update-rooms/:id",
        element: <UpdateRoom />,
      },
      {
        path: "add-slots",
        element: <CreateSlot />,
      },
      {
        path: "manage-slots",
        element: <ManageSlot />,
      },
      {
        path: "manage-slots/update-slots/:id",
        element: <UpdateSlot />,
      },
      {
        path: "manage-bookings/",
        element: <ManageBooking />,
      },
    ],
  },
  {
    path: "/user",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "manage-user",
        element: <ManageUsers />,
      },
      {
        path: "my-booking",
        element: <MyBookings />,
      },
    ],
  },
]);
export default router;
