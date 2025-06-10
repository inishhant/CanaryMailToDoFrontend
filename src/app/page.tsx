"use client";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  searchTasks,
} from "../app/lib/api";
import { Task, TaskInput } from "../app/types";
import TaskForm from "../app/components/TaskForm";
import TaskItem from "../app/components/TaskItem";
import SearchBar from "../app/components/SearchBar";
import { FormDialog } from "./components/FormDialog";
import { handleAPIError } from "./lib/toast";
import { RadioGroupButton } from "./components/ui/RadioGroupButton";

const filterButtons = [
  { value: "all", id: "all-button", title: "All" },
  { value: "pending", id: "pending-button", title: "Pending" },
  { value: "completed", id: "completed-button", title: "Completed" },
];

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [editing, setEditing] = useState<Task | null>(null);
  const [openForm, setOpenForm] = useState(false);
  const [view, setViewMode] = useState<boolean>(false);
  const [mode, setMode] = useState<"view" | "edit" | "create">("create");

  const loadTasks = async () => {
    setLoading(true);
    const t = await getTasks();
    setTasks(t);
    setFilteredTasks(t);
    setLoading(false);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    if (!openForm) {
      setEditing(null); // Reset editing state when form is closed
    }
  }, [openForm]);

  const handleSave = async (task: TaskInput) => {
    if (editing) {
      const tags = task.tags.map((t) => (typeof t === "string" ? t : t.name));
      await updateTask(editing.id, { ...task, tags: tags });
    } else {
      await createTask(task);
    }
    setEditing(null);
    setOpenForm(false); // 👈 close dialog after save
    loadTasks();
  };

  const handleDelete = async (id: number) => {
    await deleteTask(id);
    loadTasks();
  };

  const handleSearch = async (params: { type: string; query: string }) => {
    if (!params.query.trim()) return loadTasks();

    const cleaned = {
      [params.type]: params.query.trim(),
    };
    const results = await searchTasks(cleaned);
    if (results.length === 0) {
      loadTasks();
      return handleAPIError({ msg: "No search result found" });
    } else {
      setTasks(results);
    }
  };

  const handleFilter = (type: string) => {
    const filteredTasks = tasks.filter((t) =>
      type === "completed"
        ? t.is_completed === true
        : type === "pending"
        ? t.is_completed === false
        : loadTasks()
    );
    setFilteredTasks(filteredTasks);
  };

  return (
    <>
      <div className="dark max-w-4xl mx-auto p-4 space-y-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold tracking-tight">📝 FocusDo</h1>
          <FormDialog
            open={openForm}
            onOpenChange={() => {
              setOpenForm((p) => !p), setViewMode(false), setMode("create");
            }}
            buttonTitle="+ New Task"
            dialogTitle={
              mode === "view"
                ? "View Task"
                : mode === "edit"
                ? "Edit Task"
                : "Create Task"
            }
            dialogDescription={
              mode === "view"
                ? ""
                : mode === "edit"
                ? "Fill in the details to edit your task"
                : "Fill in the details for your new task"
            }
          >
            <TaskForm
              onSubmit={handleSave}
              initialData={editing || undefined}
              onClose={() => setOpenForm(false)}
              disabled={mode === "view"}
            />
          </FormDialog>
        </div>
        <SearchBar onSearch={handleSearch} />
        <RadioGroupButton
          defaultValue="all"
          groupItems={filterButtons}
          orientation="horizontal"
          onChange={handleFilter}
        />

        {loading && (
          <div className="text-center text-gray-500">Loading tasks...</div>
        )}
        {!loading && !openForm && filteredTasks.length > 0 && (
          <>
            {/* <SearchBar onSearch={handleSearch} /> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTasks.map((t) => (
                <TaskItem
                  key={t.id}
                  task={t}
                  onView={(task) => {
                    setEditing(task);
                    setViewMode(true);
                    setOpenForm(true);
                    setMode("view");
                  }}
                  onEdit={(t) => {
                    setEditing({ ...t });
                    setOpenForm(true);
                    setMode("edit");
                  }}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <ToastContainer hideProgressBar />
    </>
  );
}
