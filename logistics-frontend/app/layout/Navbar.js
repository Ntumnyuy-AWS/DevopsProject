"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{ padding: "20px", background: "#eee" }}>
      <Link href="/">Home</Link> |{" "}
      <Link href="/login">Login</Link> |{" "}
      <Link href="/register">Register</Link> |{" "}
      <Link href="/dashboard">Dashboard</Link>
    </nav>
  );
}