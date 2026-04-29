import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTransactions } from "@/hooks/useTransactions";
import { useSolBalance } from "@/hooks/useSolBalance";
import {
  Wallet,
  Sparkles,
  TrendingUp,
  Activity,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = "default",
}: {
  title: string;
  value: string;
  subtitle?: string;
  icon: React.ElementType;
  trend?: string;
  variant?: "default" | "success" | "warning" | "danger";
}) => {
  const variantStyles = {
    default: "bg-muted/30",
    success: "bg-teal/10 border-teal/30",
    warning: "bg-warning/10 border-warning/30",
    danger: "bg-destructive/10 border-destructive/30",
  };

  return (
    <Card className={cn("glass-card", variantStyles[variant])}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="mt-2 font-display text-3xl font-semibold">{value}</p>
            {subtitle && (
              <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
            )}
            {trend && (
              <p className="mt-1 text-xs text-teal">{trend}</p>
            )}
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const RecentTransaction = ({
  tx,
}: {
  tx: ReturnType<typeof useTransactions>["transactions"][0];
}) => {
  const statusConfig = {
    confirmed: { icon: CheckCircle2, className: "text-teal" },
    pending: { icon: Clock, className: "text-warning" },
    failed: { icon: AlertCircle, className: "text-destructive" },
  };

  const StatusIcon = statusConfig[tx.status].icon;

  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-4 py-3">
      <div className="flex items-center gap-3">
        <div className={cn("flex h-8 w-8 items-center justify-center rounded-md bg-primary/10", statusConfig[tx.status].className)}>
          <StatusIcon className="h-4 w-4" />
        </div>
        <div>
          <p className="text-sm font-medium">
            {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}{" "}
            {tx.fromAmount} {tx.fromToken} → {tx.toAmount} {tx.toToken}
          </p>
          <p className="text-xs text-muted-foreground">
            {new Date(tx.timestamp).toLocaleString()}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium">${tx.usdValue.toFixed(2)}</p>
        <Badge
          variant="outline"
          className={cn(
            "text-[10px]",
            tx.riskLevel === "safe" && "border-teal/30 bg-teal/10 text-teal",
            tx.riskLevel === "caution" && "border-warning/30 bg-warning/10 text-warning",
            tx.riskLevel === "danger" && "border-destructive/30 bg-destructive/10 text-destructive"
          )}
        >
          {tx.riskLevel}
        </Badge>
      </div>
    </div>
  );
};

const QuickAction = ({
  title,
  description,
  icon: Icon,
  to,
  primary = false,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  to: string;
  primary?: boolean;
}) => (
  <Link to={to}>
    <Card
      className={cn(
        "group cursor-pointer transition-all hover:scale-[1.02]",
        primary
          ? "border-primary/30 bg-primary/5 hover:border-primary/50"
          : "glass-card hover:border-primary/30"
      )}
    >
      <CardContent className="flex items-center gap-4 p-4">
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
            primary ? "bg-gradient-primary text-primary-foreground" : "bg-primary/15 text-primary"
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <p className="font-medium">{title}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
      </CardContent>
    </Card>
  </Link>
);

export default function Dashboard() {
  const { connected } = useWallet();
  const { setVisible } = useWalletModal();
  const { balance } = useSolBalance();
  const { transactions, stats, loading } = useTransactions();

  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s your trading overview.
          </p>
        </div>
        {!connected && (
          <Button
            onClick={() => setVisible(true)}
            className="gap-2 bg-gradient-primary text-primary-foreground hover:opacity-90 glow-primary"
          >
            <Wallet className="h-4 w-4" />
            Connect Wallet
          </Button>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Transactions"
          value={stats.total.toString()}
          subtitle={`${stats.successful} successful`}
          icon={Activity}
          variant="default"
        />
        <StatCard
          title="24h Volume"
          value={`$${stats.totalVolume.toFixed(2)}`}
          subtitle={`${stats.last24h} transactions today`}
          icon={TrendingUp}
          trend="+12.5% from yesterday"
          variant="success"
        />
        <StatCard
          title="SOL Balance"
          value={balance !== null ? balance.toFixed(4) : "—"}
          subtitle="Available for trading"
          icon={Zap}
          variant="default"
        />
        <StatCard
          title="Pending"
          value={stats.pending.toString()}
          subtitle={`${stats.failed} failed`}
          icon={Clock}
          variant={stats.pending > 0 ? "warning" : "default"}
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="mb-4 font-display text-lg font-medium">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <QuickAction
            title="New Trade"
            description="Describe your trading intent in plain English"
            icon={Sparkles}
            to="/trade"
            primary
          />
          <QuickAction
            title="View History"
            description="Review all your past transactions"
            icon={Activity}
            to="/transactions"
          />
          <QuickAction
            title="AI Assistant"
            description="Get help with complex trading strategies"
            icon={Zap}
            to="/trade"
          />
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-medium">Recent Transactions</h2>
          <Link to="/transactions">
            <Button variant="ghost" size="sm" className="gap-1">
              View All
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <Card className="glass-card">
          <CardContent className="p-4">
            {loading ? (
              <div className="py-8 text-center text-muted-foreground">
                Loading transactions...
              </div>
            ) : recentTransactions.length > 0 ? (
              <div className="space-y-2">
                {recentTransactions.map((tx) => (
                  <RecentTransaction key={tx.id} tx={tx} />
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-muted-foreground">No transactions yet</p>
                <Link to="/trade">
                  <Button variant="outline" className="mt-4 gap-2">
                    <Sparkles className="h-4 w-4" />
                    Start Trading
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
