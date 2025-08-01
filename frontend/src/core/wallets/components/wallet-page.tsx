import { WalletDialog } from "./wallet-dialog";
import { Button } from "@/global/components/ui/button";
import { PlusCircle } from "lucide-react";

export const WalletPage = () => {

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Wallets</h1>
          <p className="text-muted-foreground">
            Manage your wallets in your account.
          </p>
        </div>
        <WalletDialog mode="create">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Wallet
          </Button>
        </WalletDialog>
      </div>
    </>
  );
};
