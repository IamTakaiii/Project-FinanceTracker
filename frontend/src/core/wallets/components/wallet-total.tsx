import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/global/components/ui/card";
import { DynamicIcon } from "lucide-react/dynamic";

type WalletTotalProps = {
    totalBalance: string | null;
    isLoading?: boolean;
    isFetching?: boolean;
    baseCurrency?: string | null;
    ts?: number;
}

const WalletTotal = ({ totalBalance, baseCurrency, isLoading, isFetching}: WalletTotalProps) => {

  const formattedBalance = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: baseCurrency || "USD",
  }).format(Number(totalBalance));

  return (
    <Card className="flex flex-col bg-primary text-primary-foreground transition-all col-span-2">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="space">
          <CardTitle className="text-lg font-medium">{"Total Net Worth"}</CardTitle>
          <p className="text-xs text-primary-foreground">Sum of all wallet balances</p>
        </div>
        <DynamicIcon
          name="scale"
          className="text-primary-foreground"
          size={26}
        />
      </CardHeader>
      <CardContent className="flex-grow flex items-end justify-between">
       {
        isLoading || isFetching ? (
          <div className="h-6 w-24 bg-muted animate-pulse rounded" />
        ) : (
          <div className="text-2xl font-bold">
            {formattedBalance}
          </div>
        )
        }
      </CardContent>
    </Card>
  );
};

export default WalletTotal;
