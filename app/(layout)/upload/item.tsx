import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Item() {
  return (
    <Dialog>
      <DialogTrigger>
        <div>Add Item</div>
      </DialogTrigger>
      <DialogContent>
        <form action=""></form>
      </DialogContent>
    </Dialog>
  );
}
