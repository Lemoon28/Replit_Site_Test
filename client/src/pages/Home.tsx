import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedProjects from "@/components/FeaturedProjects";
import AboutMe from "@/components/AboutMe";
import GetInTouch from "@/components/GetInTouch";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header showAdminLink={true} />
      <Hero />
      <FeaturedProjects />
      <AboutMe />
      <GetInTouch />
      <Footer />
    </div>
  );
}
