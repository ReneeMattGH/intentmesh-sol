import { useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { Transaction, PublicKey, TransactionInstruction } from "@solana/web3.js";
import type { ParsedIntent } from "@/lib/intentParser";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Lock, AlertTriangle, Sparkles, Loader2, Wallet } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSign: (signature?: string) => void;
  intent: ParsedIntent | null;
}

const truncate = (a: string) => `${a.slice(0, 4)}…${a.slice(-4)}`;

export const ApprovalDialog = ({ open, onOpenChange, onSign, intent }: Props) => {
  const { publicKey, wallet, signTransaction, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [signing, setSigning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSign = async () => {
    if (!publicKey || !connection) {
      setError("Wallet not connected");
      return;
    }

    // Check if user has sufficient balance
    if (intent?.walletContext && !intent.walletContext.hasSufficientBalance) {
      setError(`Insufficient balance. You need ${intent.source.amount} ${intent.source.token} but only have ${intent.walletContext.balance.toFixed(4)}`);
      return;
    }

    setSigning(true);
    setError(null);

    try {
      // Create a demo transaction - in production this would be the actual swap/escrow instruction
      // For demo purposes, we'll create a small self-transfer to demonstrate wallet signing
      const transaction = new Transaction();
      
      // Add a memo instruction to identify this as an IntentMesh transaction
      const memoProgram = new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr");
      const memoData = `IntentMesh: ${intent?.action || "swap"} ${intent?.source.amount || 0} ${intent?.source.token || "SOL"} -> ${intent?.target.token || ""}`;
      
      transaction.add(
        new TransactionInstruction({
          keys: [{ pubkey: publicKey, isSigner: true, isWritable: false }],
          programId: memoProgram,
          data: Buffer.from(memoData),
        })
      );

      // Set fee payer
      transaction.feePayer = publicKey;
      
      // Get latest blockhash
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;

      let signature: string;

      // Use sendTransaction if available (most wallets support this)
      if (sendTransaction) {
        signature = await sendTransaction(transaction, connection, {
          skipPreflight: false,
          preflightCommitment: "confirmed",
        });
      } else if (signTransaction) {
        // Fallback: sign then send
        const signed = await signTransaction(transaction);
        signature = await connection.sendRawTransaction(signed.serialize(), {
          skipPreflight: false,
          preflightCommitment: "confirmed",
        });
      } else {
        throw new Error("Wallet does not support transaction signing");
      }

      // Wait for confirmation
      await connection.confirmTransaction(signature, "confirmed");

      setSigning(false);
      onSign(signature);
    } catch (err) {
      console.error("Transaction failed:", err);
      setError(err instanceof Error ? err.message : "Transaction failed");
      setSigning(false);
    }
  };

  const sim = intent?.simulation;
  const risk = intent?.risk;

  return (
    <Dialog open={open} onOpenChange={(v) => !signing && onOpenChange(v)}>
      <DialogContent className="glass-card sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">Review & Approve</DialogTitle>
          <DialogDescription>
            You're authorizing IntentMesh to deposit funds into an escrow PDA and execute on your
            behalf.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          {publicKey && (
            <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-3 py-2 text-xs">
              <span className="text-muted-foreground">Signing wallet</span>
              <span className="flex items-center gap-1.5 font-mono">
                {wallet?.adapter.icon && (
                  <img src={wallet.adapter.icon} alt="" className="h-3.5 w-3.5 rounded-sm" />
                )}
                {truncate(publicKey.toBase58())}
              </span>
            </div>
          )}

          <div className="rounded-lg border border-border bg-muted/40 p-3 text-sm">
            <div className="mb-1 flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
              <Lock className="h-3.5 w-3.5" /> Escrow deposit
            </div>
            <div className="flex items-center justify-between">
              <span>Amount</span>
              <span className="font-mono">
                {sim ? `${sim.inAmount.toLocaleString(undefined, { maximumFractionDigits: 4 })} ${sim.inToken}` : "—"}
              </span>
            </div>
            <div className="flex items-center justify-between text-muted-foreground">
              <span>Escrow PDA</span>
              <span className="font-mono text-xs">EsCr…8kQ2</span>
            </div>
          </div>

          <div className="rounded-lg border border-primary/30 bg-primary/5 p-3 text-sm">
            <div className="mb-1 flex items-center gap-2 text-xs uppercase tracking-wide text-primary">
              <Sparkles className="h-3.5 w-3.5" /> Expected outcome
            </div>
            <div className="flex items-center justify-between">
              <span>Receive (min)</span>
              <span className="font-mono">
                {sim ? `${sim.outAmount.toLocaleString()} $${sim.outToken}` : "—"}
              </span>
            </div>
            <div className="flex items-center justify-between text-muted-foreground">
              <span>Route</span>
              <span className="font-mono text-xs">{sim?.route ?? "—"}</span>
            </div>
          </div>

          {risk && risk.level !== "safe" && (
            <div
              className={`rounded-lg border p-3 text-sm ${
                risk.level === "danger"
                  ? "border-destructive/30 bg-destructive/5"
                  : "border-warning/30 bg-warning/5"
              }`}
            >
              <div
                className={`mb-1 flex items-center gap-2 text-xs uppercase tracking-wide ${
                  risk.level === "danger" ? "text-destructive" : "text-warning"
                }`}
              >
                <AlertTriangle className="h-3.5 w-3.5" /> Risks acknowledged
              </div>
              <ul className="list-inside list-disc space-y-0.5 text-muted-foreground">
                <li>{risk.headline}</li>
                {intent?.target.category === "meme" && <li>Meme tokens carry high volatility</li>}
              </ul>
            </div>
          )}
        </div>

        {error && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
              <div className="text-destructive">{error}</div>
            </div>
          </div>
        )}

        <DialogFooter className="gap-2 sm:gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={signing}>
            Cancel
          </Button>
          <Button
            onClick={handleSign}
            disabled={signing || !publicKey}
            className="gap-2 bg-gradient-primary text-primary-foreground hover:opacity-90 glow-primary"
          >
            {signing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Awaiting wallet signature…
              </>
            ) : !publicKey ? (
              <>
                <Wallet className="h-4 w-4" /> Connect Wallet
              </>
            ) : (
              <>Sign with Wallet</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
