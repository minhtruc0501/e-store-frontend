import Navbar from "@/components/navbar"
import HeroSection from "@/components/home"
import FeaturesSection from "@/components/brands"
import UseCasesSection from "@/components/users"
import PricingSection from "@/components/categories"
import TestimonialsSection from "@/components/products"
import CtaSection from "@/components/cta-section"
import Footer from "@/components/footer"
import Btn from "@/components/btn-download"






export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <UseCasesSection />
        <TestimonialsSection />
        <PricingSection />
        <CtaSection />
        
      </main>
      <Footer />
    </div>
  )
}
