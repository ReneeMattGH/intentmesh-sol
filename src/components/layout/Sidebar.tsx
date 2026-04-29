import { NavLink, useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  History,
  Zap,
  Settings,
  HelpCircle,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
}

const mainNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Trade",
    href: "/trade",
    icon: Sparkles,
    badge: "AI",
  },
  {
    title: "Transactions",
    href: "/transactions",
    icon: History,
  },
];

const secondaryNavItems: NavItem[] = [
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    title: "Help",
    href: "/help",
    icon: HelpCircle,
  },
];

export function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "relative flex flex-col border-r border-border/60 bg-background/95 backdrop-blur-xl transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <Link to="/" className="flex h-16 items-center gap-3 px-4 hover:opacity-80 transition-opacity">
        <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-primary glow-primary">
          <Zap className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
        </div>
        {!collapsed && (
          <div className="flex flex-col leading-tight">
            <span className="font-display text-lg font-semibold tracking-tight">
              Intent<span className="gradient-text">Mesh</span>
            </span>
            <span className="text-[11px] text-muted-foreground">
              AI-Powered Trading
            </span>
          </div>
        )}
      </Link>

      <Separator className="mx-4 w-auto" />

      {/* Main Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="flex flex-col gap-1">
          {!collapsed && (
            <div className="mb-2 px-3 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Main
            </div>
          )}
          {mainNavItems.map((item) => (
            <NavLink key={item.href} to={item.href}>
              {({ isActive }) => (
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3",
                    isActive && "bg-primary/10 text-primary hover:bg-primary/15",
                    collapsed && "justify-center px-2"
                  )}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left">{item.title}</span>
                      {item.badge && (
                        <Badge variant="outline" className="h-5 px-1.5 text-[10px] border-primary/30 bg-primary/10 text-primary">
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </Button>
              )}
            </NavLink>
          ))}
        </nav>

        <Separator className="my-4" />

        {/* Secondary Navigation */}
        <nav className="flex flex-col gap-1">
          {!collapsed && (
            <div className="mb-2 px-3 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Support
            </div>
          )}
          {secondaryNavItems.map((item) => (
            <NavLink key={item.href} to={item.href}>
              {({ isActive }) => (
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3",
                    isActive && "bg-primary/10 text-primary hover:bg-primary/15",
                    collapsed && "justify-center px-2"
                  )}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {!collapsed && <span>{item.title}</span>}
                </Button>
              )}
            </NavLink>
          ))}
        </nav>
      </ScrollArea>

      <Separator className="mx-4 w-auto" />

      {/* Collapse Toggle */}
      <div className="p-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "w-full gap-2 text-muted-foreground hover:text-foreground",
            collapsed && "justify-center px-2"
          )}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4" />
              <span className="text-xs">Collapse</span>
            </>
          )}
        </Button>
      </div>

      {/* Status Badge */}
      <div className={cn("p-4", collapsed && "px-2")}>
        <div
          className={cn(
            "flex items-center gap-2 rounded-lg border border-teal/30 bg-teal/10 px-3 py-2",
            collapsed && "justify-center px-2"
          )}
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
          </span>
          {!collapsed && (
            <span className="text-xs font-medium text-teal">Devnet Active</span>
          )}
        </div>
      </div>
    </div>
  );
}
