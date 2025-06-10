export type Tag = {
  id: number,
  name: string,
}
export type Task = {
  id: number;
  title: string;
  description?: string;
  date: string;
  is_completed: boolean;
  tags: Tag[]|string[];
};

export type TaskInput = Omit<Task, 'id'>;
