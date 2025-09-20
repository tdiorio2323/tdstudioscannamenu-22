import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CustomerApp from "./components/CustomerApp";
import { AuthPage } from "./components/AuthPage";
import { CheckoutFlow } from "./components/CheckoutFlow";
import SuperAdminDashboard from "./components/SuperAdminDashboard";
import BrandDashboard from "./components/BrandDashboard";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Shop from "./pages/Shop";
import Checkout from "./pages/Checkout";
import Admin from "./pages/Admin";
import Brand from "./pages/Brand";
import Builder from "./pages/Builder";
import AuthBuilder from "./pages/AuthBuilder";
import DynamicAuthCard from "./pages/DynamicAuthCard";
import Tdlist from "./pages/Tdlist";
import BagmanNy from "./pages/BagmanNy";
import Punkiez from "./pages/Punkiez";
import MbDesigns from "./pages/MbDesigns";
import TdDesigns from "./pages/TdDesigns";
import Quickprintz from "./pages/Quickprintz";
import QuickprintzForm from "./pages/QuickprintzForm";
import Katya from "./pages/Katya";
import Karol from "./pages/Karol";
import Luci from "./pages/Luci";
import Willow from "./pages/Willow";
import EldonDolla from "./pages/EldonDolla";
import BagmanForm from "./pages/BagmanForm";
import Show from "./pages/Show";
import TdReferral from "./pages/TdReferral";
import { MassCardEditor } from "./components/MassCardEditor";
import { ComponentLibrary } from "./components/ComponentLibrary";

// TD Studios Layout and Pages
import CoreLayout from "./layouts/CoreLayout";
import Home from "./pages/Home";
import MylarDesigns from "./pages/MylarDesigns";
import CustomDesigns from "./pages/CustomDesigns";
import SocialMediaContent from "./pages/SocialMediaContent";
import Contact from "./pages/Contact";
import CustomMylarForm from "./pages/CustomMylarForm";
import Referral from "./pages/Referral";
import CustomDesignForm from "./pages/CustomDesignForm";
import DigitalAssets from "./pages/DigitalAssets";
import CustomWebsiteForm from "./pages/CustomWebsiteForm";
import { CartProvider } from "@/hooks/useCart";
import Web from "./pages/Web";
import Dev from "./pages/Dev";
import Social from "./pages/Social";
import Portfolio from "./pages/Portfolio";
import { ErrorBoundary } from "./components/ErrorBoundary";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <CartProvider>
        <BrowserRouter>
        <Routes>
          {/* TD Studios Main Routes with CoreLayout */}
          <Route path="/" element={<CoreLayout />}>
            <Route index element={<Home />} />
            <Route path="web" element={<Web />} />
            <Route path="dev" element={<Dev />} />
            <Route path="social" element={<Social />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="shop" element={<Shop />} />
            <Route path="mylar-designs" element={<MylarDesigns />} />
            <Route path="custom-designs" element={<CustomDesigns />} />
            <Route path="social-content" element={<SocialMediaContent />} />
            <Route path="digital-assets" element={<DigitalAssets />} />
            <Route path="custom-mylar-form" element={<CustomMylarForm />} />
            <Route path="custom-websites" element={<CustomWebsiteForm />} />
            <Route path="referral" element={<Referral />} />
            <Route path="contact" element={<Contact />} />
            <Route path="custom-design-form" element={<CustomDesignForm />} />
            <Route path="checkout" element={<Checkout />} />
          </Route>

          {/* Cannabis App Routes (without CoreLayout) */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/brand" element={<Brand />} />
          <Route path="/auth" element={<Auth />} />

          {/* Brand Routes (without CoreLayout) */}
          <Route path="/tdstudios" element={<Tdlist />} />
          <Route path="/bagman_ny" element={<BagmanNy />} />
          <Route path="/punkiez" element={<Punkiez />} />
          <Route path="/mbdesigns" element={<MbDesigns />} />
          <Route path="/tddesigns" element={<TdDesigns />} />
          <Route path="/quickprintz" element={<Quickprintz />} />
          <Route path="/quickprintz/form" element={<QuickprintzForm />} />
          <Route path="/katya" element={<Katya />} />
          <Route path="/karol" element={<Karol />} />
          <Route path="/luci" element={<Luci />} />
          <Route path="/willow" element={<Willow />} />
          <Route path="/eldondolla" element={<EldonDolla />} />
          <Route path="/bagmanform" element={<BagmanForm />} />
          <Route path="/show" element={<Show />} />
          <Route path="/tdreferall" element={<TdReferral />} />

          {/* Dev-only builder routes */}
          <Route path="/__builder" element={<Builder />} />
          <Route path="/__auth-builder" element={<AuthBuilder />} />
          <Route path="/__card-editor" element={<MassCardEditor />} />
          <Route path="/__components" element={<ComponentLibrary />} />

          {/* Dynamic auth card routes - must be ABOVE catch-all */}
          <Route path="/:slug" element={<DynamicAuthCard />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
