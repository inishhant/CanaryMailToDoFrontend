import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export function AlertDialogDemo({
  buttonComp,
  buttonTitle,
  dialogTitle,
  dialogDescription,
  cancelTitle,
  submitTitle,
  onConfirm,
}: {
  buttonComp?: React.ReactNode;
  buttonTitle?: string;
  dialogTitle?: string;
  dialogDescription?: string;
  cancelTitle?: string;
  submitTitle?: string;
  onConfirm?: () => void;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {buttonComp ? (
          buttonComp
        ) : (
          <Button variant="outline">{buttonTitle || "Click Here"}</Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{dialogTitle || "Are you sure?"}</AlertDialogTitle>
          <AlertDialogDescription>
            {dialogDescription || ""}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelTitle || "Cancel"}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            {submitTitle || "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
