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
import { useCreateWallet } from "../wallet-hook";
import { useForm } from "@mantine/form";
import { Spinner } from "@/global/components/ui/spinner";
import { useState } from "react";
import { ErrorHandler } from "@/global/utils/errors";
import { FormField } from "@/global/components/ui/formfield";


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
      <DialogContent className="sm:max-w-[450px]">
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
