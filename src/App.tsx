import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SolanaProviders } from "@/components/intent/SolanaProviders";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/intent/Header";
import Landing from "./pages/Landing.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Trade from "./pages/Trade.tsx";
import Transactions from "./pages/Transactions.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

// Layout with sidebar for main pages
const MainLayout = () => (
  <div className="flex min-h-screen bg-background">
    <Sidebar />
    <div className="flex flex-1 flex-col">
      <Header />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  </div>
);

// Simple layout without sidebar for landing and 404
const SimpleLayout = () => (
  <div className="min-h-screen bg-background">
    <Outlet />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SolanaProviders>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Landing page - no sidebar */}
            <Route element={<SimpleLayout />}>
              <Route path="/" element={<Landing />} />
            </Route>
            {/* App routes with sidebar */}
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/trade" element={<Trade />} />
              <Route path="/transactions" element={<Transactions />} />
            </Route>
            {/* Catch-all */}
            <Route element={<SimpleLayout />}>
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </SolanaProviders>
  </QueryClientProvider>
);

export default App;
