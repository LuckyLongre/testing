import React, { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "80vh", paddingBottom: "3rem" }}>
        <Suspense fallback={<div style={{padding:20}}>Loading…</div>}>
          <Outlet key={location.pathname} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

export default Layout;
