import { useState } from 'react';
import { Plus, GripVertical, Trash2, Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Task } from '@/types/productivity';

interface KanbanBoardProps {
  tasks: Task[];
  onAddTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  onUpdateTask: (id: string, updates: Partial<Task>) => void;
  onDeleteTask: (id: string) => void;
}

const columns = [
  { id: 'todo', title: 'To Do', color: 'border-muted' },
  { id: 'inProgress', title: 'In Progress', color: 'border-energy' },
  { id: 'done', title: 'Done', color: 'border-rest' },
] as const;

const priorityColors = {
  high: 'bg-destructive/10 text-destructive border-destructive/30',
  medium: 'bg-energy/10 text-energy border-energy/30',
  low: 'bg-muted text-muted-foreground border-muted',
};

export function KanbanBoard({ tasks, onAddTask, onUpdateTask, onDeleteTask }: KanbanBoardProps) {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<Task['priority']>('medium');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;
    onAddTask({
      title: newTaskTitle,
      priority: newTaskPriority,
      status: 'todo',
      estimatedMinutes: 30,
    });
    setNewTaskTitle('');
    setShowAddForm(false);
  };

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  const handleDrop = (e: React.DragEvent, status: Task['status']) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    onUpdateTask(taskId, { status });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="card-elevated rounded-2xl p-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display text-xl font-semibold text-foreground">Task Board</h3>
          <p className="text-sm text-muted-foreground mt-1">Drag tasks between columns</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </div>

      {showAddForm && (
        <div className="mb-6 p-4 rounded-xl bg-secondary/50 animate-scale-in">
          <div className="flex gap-3">
            <Input
              placeholder="Task title..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
              className="flex-1"
            />
            <div className="flex gap-1">
              {(['high', 'medium', 'low'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setNewTaskPriority(p)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                    newTaskPriority === p
                      ? priorityColors[p]
                      : 'bg-background border-border text-muted-foreground'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            <Button onClick={handleAddTask} size="sm">Add</Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        {columns.map((column) => (
          <div
            key={column.id}
            onDrop={(e) => handleDrop(e, column.id as Task['status'])}
            onDragOver={handleDragOver}
            className={`min-h-[200px] rounded-xl border-2 border-dashed ${column.color} p-3 transition-colors`}
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-foreground">{column.title}</h4>
              <span className="text-xs text-muted-foreground px-2 py-1 rounded-full bg-secondary">
                {tasks.filter((t) => t.status === column.id).length}
              </span>
            </div>

            <div className="space-y-2">
              {tasks
                .filter((task) => task.status === column.id)
                .map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task.id)}
                    className="kanban-card group"
                  >
                    <div className="flex items-start gap-2">
                      <GripVertical className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity cursor-grab" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{task.title}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs border ${priorityColors[task.priority]}`}>
                            <Flag className="w-3 h-3" />
                            {task.priority}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => onDeleteTask(task.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-destructive/10 rounded transition-all"
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
