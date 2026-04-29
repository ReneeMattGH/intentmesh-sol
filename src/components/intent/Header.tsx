import { useMemo, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Wallet, Copy, LogOut, ChevronDown, Check, Loader2 } from "lucide-react";
import { useSolBalance } from "@/hooks/useSolBalance";

const truncate = (addr: string) => `${addr.slice(0, 4)}…${addr.slice(-4)}`;

export const Header = () => {
  const { publicKey, connected, connecting, disconnect, wallet } = useWallet();
  const { setVisible } = useWalletModal();
  const { balance, loading } = useSolBalance();
  const [copied, setCopied] = useState(false);

  const address = useMemo(() => publicKey?.toBase58() ?? "", [publicKey]);

  const copyAddress = async () => {
    if (!address) return;
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <header className="z-40 w-full border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-end gap-3 px-6">
        <div className="flex items-center gap-2">
          {/* Network badge */}
          <div className="hidden items-center gap-1.5 rounded-full border border-teal/30 bg-teal/10 px-2.5 py-1 text-[11px] font-medium text-teal sm:inline-flex">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-teal" />
            </span>
            Devnet
          </div>

          {connected && publicKey ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  className="gap-2 border border-border bg-muted/40 pl-2 pr-2 hover:bg-muted/60"
                >
                  {wallet?.adapter.icon && (
                    <img
                      src={wallet.adapter.icon}
                      alt={wallet.adapter.name}
                      className="h-4 w-4 rounded-sm"
                    />
                  )}
                  <span className="hidden font-mono text-[11px] text-muted-foreground sm:inline">
                    {loading && balance === null ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                      <>{balance !== null ? balance.toFixed(3) : "—"} SOL</>
                    )}
                  </span>
                  <span className="mx-1 hidden h-4 w-px bg-border sm:inline" />
                  <span className="font-mono text-xs">{truncate(address)}</span>
                  <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 glass-card">
                <DropdownMenuLabel className="space-y-1">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Connected wallet
                  </div>
                  <div className="font-mono text-xs break-all">{address}</div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="px-2 py-1.5">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Balance
                  </div>
                  <div className="mt-0.5 font-display text-lg font-semibold gradient-text">
                    {balance !== null ? balance.toFixed(4) : "—"}{" "}
                    <span className="text-xs font-normal text-muted-foreground">SOL</span>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={copyAddress} className="gap-2">
                  {copied ? <Check className="h-4 w-4 text-teal" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied" : "Copy address"}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => disconnect()}
                  className="gap-2 text-destructive focus:text-destructive"
                >
                  <LogOut className="h-4 w-4" /> Disconnect
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              onClick={() => setVisible(true)}
              disabled={connecting}
              className="gap-2 bg-gradient-primary text-primary-foreground hover:opacity-90 glow-primary"
            >
              {connecting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Connecting…
                </>
              ) : (
                <>
                  <Wallet className="h-4 w-4" /> Connect Wallet
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
