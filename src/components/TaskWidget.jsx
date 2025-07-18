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
  Divider,
  Button,
} from '@mui/material';
import { Plus, Trash2, Check, ListTodo } from 'lucide-react';

export default function TaskWidget() {
  const theme = useTheme();
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [
      { id: 1, text: "Onboard new intern", completed: true },
      { id: 2, text: "Update team documentation", completed: true },
      { id: 3, text: "Prepare for client meeting", completed: false },
      { id: 4, text: "Follow up on pending approvals", completed: false },
      { id: 8, text: "Review marketing campaign assets", completed: false },
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
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 4,
        bgcolor: 'background.paper',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      role="region"
      aria-labelledby="my-tasks-heading"
    >
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography
          id="my-tasks-heading"
          variant="h6"
          component="h3"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            fontWeight: 600,
          }}
        >
          <ListTodo size={22} color={theme.palette.primary.main} /> My Tasks
        </Typography>
        <Tooltip title="Add New Task">
          <IconButton onClick={() => document.getElementById('task-input')?.focus()} aria-label="Add new task">
            <Plus size={20} />
          </IconButton>
        </Tooltip>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Box component="form" onSubmit={addTask} mb={2} display="flex" gap={1}>
        <TextField
          id="task-input"
          fullWidth
          size="small"
          variant="outlined"
          placeholder="What needs to be done?"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          aria-label="New task description"
        />
        <Button type="submit" variant="contained" size="small" aria-label="Add task">
          Add
        </Button>
      </Box>

      <Box
      sx={{
        flex: 1,
        maxHeight: 200,
        overflowY: 'auto',
        pr: 1,
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
          borderRadius: '10px',
        '&:hover': {
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)',
      },
    },
    scrollbarWidth: 'thin',
    scrollbarColor: `${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'} transparent`,
  }}
>
  {tasks.length === 0 ? (
    <Typography variant="body2" color="text.secondary" align="center" fontStyle="italic" p={2}>
      🎉 You're all caught up! No tasks to display.
    </Typography>
  ) : (
    <List disablePadding>
      {tasks.map(task => (
        <ListItem
          key={task.id}
          sx={{
            borderRadius: 2,
            bgcolor: task.completed ? 'action.selected' : 'transparent',
            mb: 1,
            border: `1px solid ${theme.palette.divider}`,
            transition: 'background 0.3s, border-color 0.3s',
            '&:hover': {
              borderColor: theme.palette.primary.main,
            },
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
              flexShrink: 0,
            }}
            aria-label={task.completed ? `Mark "${task.text}" as incomplete` : `Mark "${task.text}" as complete`}
          >
            {task.completed && <Check size={14} color="#fff" />}
          </IconButton>
          <ListItemText
            primary={
              <Typography
                sx={{
                  textDecoration: task.completed ? 'line-through' : 'none',
                  color: task.completed ? 'text.disabled' : 'text.primary',
                  wordBreak: 'break-word',
                }}
              >
                {task.text}
              </Typography>
            }
          />
          <ListItemSecondaryAction>
            <Tooltip title="Delete Task">
              <IconButton onClick={() => deleteTask(task.id)} aria-label={`Delete task "${task.text}"`}>
                <Trash2 size={18} color={theme.palette.error.main} />
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
          aria-label={`Task completion progress: ${Math.round((completedCount / totalCount) * 100 || 0)}%`}
        />
        <Typography variant="caption" color="text.secondary" mt={0.5} display="block" textAlign="center">
          {completedCount} of {totalCount} completed
        </Typography>
      </Box>
    </Paper>
  );
}