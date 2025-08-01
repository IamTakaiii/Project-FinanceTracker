import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@/global/components/ui/dialog";
import type { Wallet } from "../wallet-types";
import { Button } from "@/global/components/ui/button";
import { Label } from "@/global/components/ui/label";
import { Input } from "@/global/components/ui/input";

type WalletDialogProps = React.ComponentProps<"div"> & {
  children?: React.ReactNode;
  mode?: "create" | "edit";
  wallet?: Wallet;
};

export const WalletDialog = ({ children, mode, wallet }: WalletDialogProps) => {
  return (
    <>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            {children || <Button>Open Dialog</Button>}
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {mode === "create" ? "Create Wallet" : "Edit Wallet"}
              </DialogTitle>
              <DialogDescription>
                {mode === "create"
                  ? "Fill in the details to create a new wallet."
                  : "Edit the wallet details below."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                defaultValue={wallet?.name}
                placeholder="e.g., Savings Account"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="currency" className="text-right">
                Currency
              </Label>
              <Input
                id="currency"
                name="currency"
                defaultValue={wallet?.currency}
                placeholder="e.g., USD"
                className="col-span-3"
                required
              />
            </div>
            {mode === 'create' && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="balance" className="text-right">
                  Initial Balance
                </Label>
                <Input
                  id="balance"
                  name="balance"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="col-span-3"
                  required
                />
              </div>
            )}
            </div>
            <DialogFooter>
                <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
};
