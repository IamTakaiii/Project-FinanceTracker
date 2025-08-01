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
import { useCreateWallet } from "../wallet-hook";
import { useForm } from "@mantine/form";
import { Spinner } from "@/global/components/ui/spinner";
import { useState } from "react";
import { ErrorHandler } from "@/global/utils/errors";

type WalletDialogProps = React.ComponentProps<"div"> & {
  children?: React.ReactNode;
  mode: "create" | "edit";
  wallet?: Wallet;
};

export const WalletDialog = ({
  children,
  mode,
  wallet,
}: WalletDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const createWalletMutation = useCreateWallet();
  // const updateWalletMutation = useUpdateWallet();

  // A consolidated loading state for the submit button.
  // const isProcessing =
  //   createWalletMutation.isPending || updateWalletMutation.isPending;

  const isProcessing = createWalletMutation.isPending;

  const form = useForm<Omit<Wallet, "id">>({
    mode: "uncontrolled",
    initialValues: {
      name: wallet?.name || "",
      currency: wallet?.currency || "",
      initial_balance: wallet?.initial_balance?.toString() || "0.00",
    },
    validate: {
      name: (value) => (value.trim() ? null : "Name is required"),
      currency: (value) => (value.trim() ? null : "Currency is required"),
      initial_balance: (value) =>
        !isNaN(parseFloat(value)) && parseFloat(value) >= 0
          ? null
          : "Balance must be a non-negative number",
    },
  });

  const handleOnSubmitWallet = (values: Omit<Wallet, "id">) => {
    const mutationCallbacks = {
      onSuccess: () => {
        setIsOpen(false);
        form.reset();
      },
      onError: (error: unknown) => ErrorHandler(error),
    };

    if (mode === "create") {
      createWalletMutation.mutate(values, mutationCallbacks);
    } else if (mode === "edit" && wallet) {
      //
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || <Button>Open Dialog</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={form.onSubmit(handleOnSubmitWallet)}>
          <DialogHeader>
            <DialogTitle>
              {mode === "create" ? "Create Wallet" : "Edit Wallet"}
            </DialogTitle>
            <DialogDescription>
              {mode === "create"
                ? "Fill in the details to create a new wallet."
                : "Edit your wallet details below."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Name Field */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                className="col-span-3 placeholder:text-gray-300"
                placeholder="Enter wallet name"
                {...form.getInputProps("name")}
              />
            </div>
            {form.errors.name && (
              <div className="col-span-4 text-right text-sm text-red-500">
                {form.errors.name}
              </div>
            )}

            {/* Currency Field */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="currency" className="text-right">
                Currency
              </Label>
              <Input
                id="currency"
                className="col-span-3 placeholder:text-gray-300"
                placeholder="Enter currency code (e.g., USD)"
                {...form.getInputProps("currency")}
              />
            </div>
            {form.errors.currency && (
              <div className="col-span-4 text-right text-sm text-red-500">
                {form.errors.currency}
              </div>
            )}

            {/* Initial Balance Field (only for create mode) */}
            {mode === "create" && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="initial_balance" className="text-right">
                    Initial Balance
                  </Label>
                  <Input
                    id="initial_balance"
                    type="number"
                    step="0.01"
                    className="col-span-3"
                    {...form.getInputProps("initial_balance")}
                  />
                </div>
                {form.errors.initial_balance && (
                  <div className="col-span-4 text-right text-sm text-red-500">
                    {form.errors.initial_balance}
                  </div>
                )}
              </>
            )}
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isProcessing || !form.isDirty()}>
              {isProcessing ? (
                <Spinner size="small" className="text-white" />
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
