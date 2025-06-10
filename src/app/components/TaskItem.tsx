"use client";
import { Task } from "../types";
import { Button } from "../components/ui/Button";
import { AlertDialogDemo } from "../components/ui/AlertDialog";
import Image from "next/image";
import { cn } from "@/lib/utils";

const ActionButton = ({
  onClick,
  image,
  alt,
  isAlertRequired,
  dialogTitle = "Are you sure?",
  dialogDescription = "This action cannot be undone.",
  submitTitle = "Yes",
  cancelTitle = "No",
}: {
  onClick: (task?: Task, id?: number) => void;
  image: string;
  alt: string;
  isAlertRequired: boolean;
  dialogTitle?: string;
  dialogDescription?: string;
  submitTitle?: string;
  cancelTitle?: string;
}) => {
  const iconButton = (
    <Button
      variant="ghost"
      className="p-0 h-auto w-auto bg-transparent hover:bg-transparent border-none focus:outline-none focus:ring-0 focus:border-transparent focus:shadow-none cursor-pointer"
      // className="p-0 h-auto w-auto bg-transparent hover:bg-transparent"
    >
      <Image src={image} width={16} height={16} alt={alt} />
    </Button>
  );

  return isAlertRequired ? (
    <AlertDialogDemo
      buttonComp={iconButton}
      dialogTitle={dialogTitle}
      dialogDescription={dialogDescription}
      submitTitle={submitTitle}
      cancelTitle={cancelTitle}
      onConfirm={() => onClick()}
    />
  ) : (
    <div onClick={() => onClick()}>{iconButton}</div>
  );
};

export default function TaskItem({
  task,
  onView,
  onEdit,
  onDelete,
}: {
  task: Task;
  onView: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <div
      // className="border rounded-xl p-2 shadow-sm space-y-2"
      className={cn(
        "border rounded-xl p-2 shadow-sm space-y-2 border-l-[4px]",
        task.is_completed ? "border-l-green-500" : "border-l-blue-500"
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{task.title}</h3>
        <div className="flex flex-wrap gap-2 text-sm text-blue-500">
          {task.tags.map((tag, i) => (
            <span key={i}>#{typeof tag === "string" ? tag : tag.name}</span>
          ))}
        </div>
      </div>
      <p>{task.description}</p>
      <div className="text-sm text-muted-foreground">
        <span>{task.date}</span>
      </div>

      <div className="flex mt-2 justify-end">
        <ActionButton
          onClick={() => onView(task)}
          image="/eye.svg"
          alt="View"
          isAlertRequired={false}
        />
        <ActionButton
          onClick={() => onEdit(task)}
          image="/edit.svg"
          alt="Edit"
          isAlertRequired={false}
        />
        <ActionButton
          onClick={() => onDelete(task.id)}
          image="/trash-alt.svg"
          alt="Delete"
          isAlertRequired={true}
          dialogTitle="Are you sure you want to delete this task?"
          dialogDescription={""}
          submitTitle={"Yes"}
          cancelTitle={"No"}
        />
      </div>
    </div>
  );
}
