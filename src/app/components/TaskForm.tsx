"use client";
import { Tag, TaskInput } from "../types";
import { Button } from "../components/ui/Button";
import { useState } from "react";
import { DatePicker } from "./DatePicker";

export default function TaskForm({
  onSubmit,
  initialData,
  onClose,
  disabled = false,
}: {
  onSubmit: (task: TaskInput) => void;
  initialData?: TaskInput;
  onClose?: () => void;
  disabled?: boolean;
}) {
  const [form, setForm] = useState<TaskInput>(
    initialData || {
      title: "",
      description: "",
      date: "",
      is_completed: false,
      tags: [],
    }
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
      className="space-y-4"
    >
      <input
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        placeholder="Title"
        className="w-full p-2 border rounded"
        required
        // disabled={disabled}
      />
      <textarea
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        placeholder="Description"
        className="w-full p-2 border rounded"
        // disabled={disabled}
      />
      <DatePicker
        // title="Date"
        placeholder="Due Date"
        value={form.date}
        onChange={(newDate) => {
          setForm((prev) => ({ ...prev, date: newDate }));
        }}
        // disabled={disabled}
      />
      <input
        placeholder="Tag"
        value={form.tags
          .map((t: any) => (typeof t === "string" ? t : t.name)) // Normalize
          .join(",")}
        onChange={(e) =>
          setForm({
            ...form,
            tags: e.target.value
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean), // clean empty
          })
        }
        // disabled={disabled}
        className="w-full p-2 border rounded"
      />

      <div className="flex items-center gap-2">
        <label>
          <input
            type="checkbox"
            checked={form.is_completed}
            onChange={(e) =>
              setForm({ ...form, is_completed: e.target.checked })
            }
            // disabled={disabled}
            className="mr-2"
          />
          Completed
        </label>
      </div>
      {!disabled && (
        <div className="flex items-center justify-center mb-6 gap-2">
          <Button type="submit">Save</Button>
          {/* {onClose && (
            <Button onClick={onClose} variant="destructive">
              Close
            </Button>
          )} */}
        </div>
      )}
    </form>
  );
}
