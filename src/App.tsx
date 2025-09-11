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
import Bagman from "./pages/Bagman";
import Punkiez from "./pages/Punkiez";
import Quickprintz from "./pages/Quickprintz";
import Form from "./pages/Form";
import { MassCardEditor } from "./components/MassCardEditor";
import { ComponentLibrary } from "./components/ComponentLibrary";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/brand" element={<Brand />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/tdstudios" element={<Bagman />} />
          <Route path="/punkiez" element={<Punkiez />} />
          <Route path="/quickprintz" element={<Quickprintz />} />
          <Route path="/form" element={<Form />} />
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
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
