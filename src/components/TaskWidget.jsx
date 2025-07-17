import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  LinearProgress,
  Paper,
  useTheme,
  Tooltip,
} from '@mui/material';
import { Plus, Trash2, Check, ListTodo } from 'lucide-react';

export default function TaskWidget() {
  const theme = useTheme();
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [
      { id: 1, text: "Review quarterly reports", completed: false },
      { id: 2, text: "Update team documentation", completed: true },
      { id: 3, text: "Prepare for client meeting", completed: false },
    ];
  });

  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks([{ id: Date.now(), text: newTask.trim(), completed: false }, ...tasks]);
    setNewTask("");
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;

  return (
    <Paper elevation={2} sx={{ p: 2, maxWidth: 350, height: 400, display: 'flex', flexDirection: 'column', borderRadius: 4 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
        <Typography variant="h6" display="flex" alignItems="center" gap={1}>
          <ListTodo size={20} color={theme.primary} /> My Tasks
        </Typography>
        <Tooltip title="Add Task">
          <IconButton onClick={() => document.getElementById('task-input')?.focus()}>
            <Plus size={18} />
          </IconButton>
        </Tooltip>
      </Box>

      <Box component="form" onSubmit={addTask} mb={1} display="flex" gap={1}>
        <TextField
          id="task-input"
          fullWidth
          size="small"
          variant="outlined"
          placeholder="What needs to be done?"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
      </Box>

      <Box flex={1} overflow="auto">
        {tasks.length === 0 ? (
          <Typography variant="body2" color="text.secondary" align="center" fontStyle="italic">
            🎉 You're all caught up!
          </Typography>
        ) : (
          <List>
            {tasks.map(task => (
              <ListItem
                key={task.id}
                sx={{
                  borderRadius: 4,
                  bgcolor: task.completed ? 'action.selected' : 'transparent',
                  mb: 1,
                  transition: 'background 0.3s',
                }}
              >
                <IconButton
                  size="small"
                  onClick={() => toggleTask(task.id)}
                  sx={{
                    mr: 1,
                    bgcolor: task.completed ? theme.palette.primary.main : 'transparent',
                    border: `2px solid ${theme.palette.primary.main}`,
                    width: 24,
                    height: 24,
                    borderRadius: 1,
                  }}
                >
                  {task.completed && <Check size={14} color="#fff" />}
                </IconButton>
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        textDecoration: task.completed ? 'line-through' : 'none',
                        color: task.completed ? 'text.disabled' : 'text.primary',
                      }}
                    >
                      {task.text}
                    </Typography>
                  }
                />
                <ListItemSecondaryAction>
                  <Tooltip title="Delete">
                    <IconButton onClick={() => deleteTask(task.id)}>
                      <Trash2 size={16} color={theme.palette.error.main} />
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}
      </Box>

      <Box mt={2}>
        <LinearProgress
          variant="determinate"
          value={(completedCount / totalCount) * 100 || 0}
          sx={{ height: 8, borderRadius: 4 }}
        />
        <Typography variant="caption" color="text.secondary" mt={0.5} display="block" textAlign="center">
          {completedCount} of {totalCount} completed
        </Typography>
      </Box>
    </Paper>
  );
}
