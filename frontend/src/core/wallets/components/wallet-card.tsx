import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/global/components/ui/card";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import type { Wallet } from "../wallet-types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/global/components/ui/dropdown-menu";
import { Button } from "@/global/components/ui/button";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { WalletDialog } from "./wallet-dialog";
import { useDeleteWallet } from "../wallet-hook";
import { useState } from "react";
import { ConfirmationDialog } from "@/global/components/custom/comfirmation-dialog";

type WalletCardProps = {
  wallet: Wallet;
};

const WalletCard = ({ wallet }: WalletCardProps) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const deleteWallet = useDeleteWallet();

  const onDeleteWallet = () => {
    deleteWallet.mutate(wallet.id);
    setIsDropDownOpen(false);
  };

  const formattedBalance = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: wallet.currency,
  }).format(Number(wallet.balance));

  return (
    <Card className="flex flex-col transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="space">
          <CardTitle className="text-lg font-medium">{wallet.name}</CardTitle>
          <p className="text-xs text-muted-foreground">Current Balance</p>
        </div>
        <DynamicIcon
          name={(wallet.icon && (wallet.icon as IconName)) || "wallet"}
          className="text-primary"
          size={26}
        />
      </CardHeader>
      <CardContent className="flex-grow flex items-end justify-between">
        <div className="text-xl font-bold text-ellipsis">{formattedBalance}</div>

        {/* Dropdown menu for actions */}
        <DropdownMenu open={isDropDownOpen} onOpenChange={setIsDropDownOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <WalletDialog
              mode="edit"
              wallet={wallet}
              onOpenChange={(open) => {
                if (!open) {
                  setIsDropDownOpen(false);
                }
              }}
            >
              <button className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full">
                <Pencil className="mr-2 h-4 w-4" />
                <span className="px-2">Edit</span>
              </button>
            </WalletDialog>
            
            { /* Confirmation dialog for delete action */}
            <ConfirmationDialog
              title="Are you absolutely sure?"
              description="This action cannot be undone. This will permanently delete your wallet."
              onConfirm={onDeleteWallet}
              confirmText="Delete"
              confirmButtonClass="bg-red-500 hover:bg-red-600 text-white"
            >
              <DropdownMenuItem
                onSelect={(e) => e.preventDefault()}
                className="text-red-500 focus:text-red-500 cursor-pointer"
                variant="destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" color="red" />
                <span>Delete</span>
              </DropdownMenuItem>
            </ConfirmationDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  );
};

export default WalletCard;
