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
import { useCreateWallet, useUpdateWallet } from "../wallet-hook";
import { useForm } from "@mantine/form";
import { Spinner } from "@/global/components/ui/spinner";
import { useState } from "react";
import { FormField } from "@/global/components/ui/formfield";

type WalletDialogProps = React.ComponentProps<"div"> & {
  children?: React.ReactNode;
  mode: "create" | "edit";
  wallet?: Wallet;
  onOpenChange?: (open: boolean) => void;
};

export const WalletDialog = ({ children, mode, wallet, onOpenChange }: WalletDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const createWalletMutation = useCreateWallet();
  const updateWalletMutation = useUpdateWallet();

  const isProcessing =
    createWalletMutation.isPending || updateWalletMutation.isPending;

  const form = useForm<Omit<Wallet, "id">>({
    mode: "uncontrolled",
    initialValues: {
      name: wallet?.name || "",
      currency: wallet?.currency || "",
      initial_balance: wallet?.initial_balance?.toString() || "0.00",
      balance: wallet?.balance?.toString() || "0.00",
      icon: wallet?.icon || null,
    },
    validate: {
      name: (value) => (value.trim() ? null : "Name is required"),
      currency: (value) => (value.trim() ? null : "Currency is required"),
      initial_balance: (value) =>
        !isNaN(parseFloat(value)) && parseFloat(value) >= 0
          ? null
          : "Balance must be a non-negative number",
      balance: (value) =>
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
    };

    if (mode === "create") {
      createWalletMutation.mutate(values, mutationCallbacks);
      onOpenChange?.(false);
    } else if (mode === "edit" && wallet) {
      updateWalletMutation.mutate(
        { ...values, id: wallet.id },
        mutationCallbacks
      );
      onOpenChange?.(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || <Button>Open Dialog</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <form onSubmit={form.onSubmit(handleOnSubmitWallet)}>
          <DialogHeader className="mb-4">
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
            <FormField
              id="name"
              name="name"
              label="Name"
              type="text"
              placeholder="Enter wallet name"
              required
              labelPosition="side"
              {...form.getInputProps("name")}
            />

            {/* Currency Field */}
            <FormField
              id="currency"
              name="currency"
              label="Currency"
              type="text"
              placeholder="Enter currency code (e.g., USD)"
              required
              labelPosition="side"
              {...form.getInputProps("currency")}
            />

            { /* Balance Field */}
            {mode === "edit" && (
              <FormField
                id="balance"
                name="balance"
                label="Current Balance"
                type="number"
                step="1.00"
                placeholder="0.00"
                required
                labelPosition="side"
                {...form.getInputProps("balance") }
              />
            )}

            {/* Initial Balance Field (only for create mode) */}
            {mode === "create" && (
              <FormField
                id="initial_balance"
                name="initial_balance"
                label="Initial Balance"
                type="number"
                step="0.01"
                placeholder="0.00"
                required
                labelPosition="side"
                {...form.getInputProps("initial_balance")}
              />
            )}
          </div>

          <DialogFooter className="flex justify-end mt-4">
            <Button
              type="submit"
              disabled={isProcessing || !form.isDirty()}
              size={"sm"}
            >
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
