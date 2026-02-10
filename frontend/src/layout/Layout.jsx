import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        <div style={{ padding: "20px", width: "100%" }}>
          {children}
        </div>
      </div>
    </>
  );
}

export default Layout;