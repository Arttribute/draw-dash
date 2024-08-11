import { CoinsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMinipay } from "@/components/providers/MinipayProvider";
import { formatCount } from "@/lib/utils";
import { Token } from "@/lib/minipay";
import Link from "next/link";

const currencies: Token[] = ["cUSD", "USDC", "USDT"];

const MinipayButton = ({ balance }: { balance: string }) => {
  const { currency, setCurrency } = useMinipay();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="w-full flex justify-start"
        >
          <CoinsIcon className="mr-2 h-4 w-4" />
          <p className="space-x-1">
            <span className="text-muted-foreground">
              {formatCount(parseFloat(balance))}
            </span>
            <span>{currency}</span>
          </p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuLabel>Currency Token</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={currency}
          onValueChange={(val) => setCurrency(val as Token)}
        >
          {currencies.map((currency) => (
            <DropdownMenuRadioItem key={currency} value={currency}>
              {currency}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
        <Button asChild className="w-full">
          <Link href="https://minipay.opera.com/add_cash">Add Cash</Link>
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MinipayButton;
