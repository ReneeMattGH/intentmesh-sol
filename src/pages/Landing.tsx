import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Shield, Zap, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary mb-8">
              <Sparkles className="h-4 w-4" />
              <span>AI-Powered Trading on Solana</span>
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Trade with Intent.
              <br />
              <span className="text-primary">Let AI Handle the Rest.</span>
            </h1>
            
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-10">
              Describe what you want in plain English. Our AI analyzes real-time market data, 
              checks your wallet balance, and executes trades on Solana.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/dashboard">
                <Button size="lg" className="h-14 px-8 text-lg gap-2 bg-gradient-primary text-primary-foreground hover:opacity-90">
                  Open Application
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="border-t border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-bold mb-4">Why IntentMesh?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built for traders who want simplicity without sacrificing power.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="rounded-2xl border border-border bg-card/50 p-8 hover:border-primary/30 transition-colors">
              <div className="h-12 w-12 rounded-xl bg-primary/15 flex items-center justify-center mb-6">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">Natural Language</h3>
              <p className="text-muted-foreground">
                Say "Buy 1 SOL worth of BONK" and let the AI figure out the details. No complex forms.
              </p>
            </div>
            
            <div className="rounded-2xl border border-border bg-card/50 p-8 hover:border-primary/30 transition-colors">
              <div className="h-12 w-12 rounded-xl bg-teal/15 flex items-center justify-center mb-6">
                <TrendingUp className="h-6 w-6 text-teal" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">Real-Time Data</h3>
              <p className="text-muted-foreground">
                Live prices from Jupiter API. See current rates, 24h changes, and market depth before trading.
              </p>
            </div>
            
            <div className="rounded-2xl border border-border bg-card/50 p-8 hover:border-primary/30 transition-colors">
              <div className="h-12 w-12 rounded-xl bg-warning/15 flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-warning" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">Safety First</h3>
              <p className="text-muted-foreground">
                Built-in risk analysis checks your wallet balance and warns about insufficient funds.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="border-t border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
          <div className="rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-background border border-primary/20 p-12 text-center">
            <h2 className="font-display text-3xl font-bold mb-4">Ready to Start Trading?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Connect your Solana wallet and experience the future of intent-based trading.
            </p>
            <Link to="/dashboard">
              <Button size="lg" className="h-14 px-8 text-lg gap-2">
                <Zap className="h-5 w-5" />
                Open Application
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              IntentMesh — Built on Solana
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
              <Link to="/trade" className="hover:text-foreground transition-colors">Trade</Link>
              <Link to="/transactions" className="hover:text-foreground transition-colors">History</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
