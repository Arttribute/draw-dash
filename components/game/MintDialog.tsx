import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export function MintDialog({ drawingUrl }: { drawingUrl: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          Mint creation
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enhance and mint</DialogTitle>
          <DialogDescription>
            Enhance your creation with AI and mint your sketch
          </DialogDescription>
        </DialogHeader>
        <div className="border p-1 rounded-xl">
          <Image
            src={drawingUrl}
            width={600}
            height={600}
            alt="User's Drawing"
            className=" rounded-xl object-cover w-full aspect-[1]"
          />
        </div>
        <Input id="name" placeholder="Name your creation" />

        <DialogFooter>
          <Button type="submit" className="w-full">
            Enhance and mint
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
