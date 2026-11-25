import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnnouncementBar from "@/components/layout/AnnouncementBar";

export default function StoreLayout({ children }) {
  return (
    <>
      <AnnouncementBar />
      <Navbar />

      <main>{children}</main>

      <Footer />
    </>
  );
}