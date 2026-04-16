"use client";

/* import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

export default function Dashboard() {
    const { user, logout } = useContext(AuthContext);

    if (!user) return <p>Please Login</p>

    return (
        <div style={{ padding: "20"}}>
            <h2>Welcome, {user.name}</h2>
            <p>Email: {user.email}</p>

            <button onClick={logout}>Logout</button>
        </div>
    )
} */

    // src/app/dashboard/page.js
"use client";

import { useEffect, useState, useContext } from "react";
import { apiRequest } from "../../services/api";
import { AuthContext } from "../../context/authContext.js";
import {
  Container,
  Card,
  Status,
  Button,
} from "../../components/dashboard/DashboardStyles";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await apiRequest(
          "/bookings",
          "GET",
          null,
          user?.token
        );
        setBookings(data);
      } catch (err) {
        setError(err.message);
      }
    };

    if (user) fetchBookings();
  }, [user]);

  if (!user) return <p>Please login</p>;

  return (
    <Container>
      <h2>Dashboard</h2>
      <button onClick={logout}>Logout</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {bookings.length === 0 ? (
        <p>No bookings yet</p>
      ) : (
        bookings.map((booking) => (
          <Card key={booking._id}>
            <h3>Booking ID: {booking._id}</h3>

            <p>
              Pickup: {booking.pickupLocation?.address}
            </p>
            <p>
              Delivery: {booking.deliveryLocation?.address}
            </p>

            <Status status={booking.status}>
              {booking.status}
            </Status>

            <br />

            <Button
              onClick={() =>
                window.location.href = `/tracking/${booking._id}`
              }
            >
              Track
            </Button>
          </Card>
        ))
      )}
    </Container>
  );
}