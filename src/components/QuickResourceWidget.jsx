import React, { useState, useEffect, useRef } from 'react';
import {
  Paper,
  Typography,
  Modal,
  Box,
  IconButton,
  Button,
  Select,
  MenuItem,
  TextField,
  Chip,
  Card,
  CardContent,
  useTheme,
} from '@mui/material';
import {
  CalendarCheck,
  GraduationCap,
  ListTodo,
  BarChart,
  Rocket,
  X,
  Play,
  Square,
  RotateCcw,
} from 'lucide-react';

const resources = [
  {
    icon: <CalendarCheck size={24} />,
    label: 'Time Tracker',
    key: 'time',
    content: (theme, timerState) => (
      <>
        <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary', mb: 2 }}>
          Time Tracker
        </Typography>
        <Card
          sx={{
            mb: 2,
            bgcolor: 'background.paper',
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 4,
          }}
        >
          <CardContent sx={{ textAlign: 'center', py: 2 }}>
            <Typography
              variant="h5"
              id="time-tracker-display"
              sx={{
                fontWeight: 700,
                color: 'text.primary',
                fontFamily: 'Inter, Arial, sans-serif',
                letterSpacing: '0.1em',
              }}
            >
              {timerState.time}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Current Session
            </Typography>
          </CardContent>
        </Card>
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', mb: 2 }}>
          <Button
            variant="contained"
            color="primary"
            id="time-tracker-start"
            startIcon={<Play size={16} />}
            size="small"
            aria-label="Start timer"
            onClick={timerState.startTimer}
            disabled={timerState.isRunning}
          >
            Start
          </Button>
          <Button
            variant="contained"
            color="secondary"
            id="time-tracker-stop"
            startIcon={<Square size={16} />}
            size="small"
            aria-label="Stop timer"
            onClick={timerState.stopTimer}
            disabled={!timerState.isRunning}
          >
            Stop
          </Button>
          <Button
            variant="outlined"
            id="time-tracker-reset"
            startIcon={<RotateCcw size={16} />}
            size="small"
            aria-label="Reset timer"
            onClick={timerState.resetTimer}
          >
            Reset
          </Button>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Box>
            <Typography variant="body2" component="label" htmlFor="project-select" sx={{ mb: 0.5 }}>
              Project
            </Typography>
            <Select
              id="project-select"
              defaultValue="Project A"
              size="small"
              fullWidth
              sx={{ bgcolor: 'background.paper', borderRadius: 4 }}
            >
              <MenuItem value="Project A">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>Project A</Box>
              </MenuItem>
              <MenuItem value="Project B">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>Project B</Box>
              </MenuItem>
              <MenuItem value="Project C">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>Project C</Box>
              </MenuItem>
            </Select>
          </Box>
          <Box>
            <Typography variant="body2" component="label" htmlFor="task-input" sx={{ mb: 0.5 }}>
              Task Description
            </Typography>
            <TextField
              id="task-input"
              placeholder="What are you working on?"
              variant="outlined"
              size="small"
              fullWidth
              multiline
              rows={2}
              sx={{ '& .MuiOutlinedInput.root': { borderRadius: 4 } }}
            />
          </Box>
        </Box>
      </>
    ),
  },
  {
    icon: <GraduationCap size={24} />,
    label: 'Training Portal',
    key: 'training',
    content: (theme) => (
      <>
        <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary', mb: 2 }}>
          Training Portal
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 2 }}>
          <Card
            sx={{
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 4,
              '&:hover': { borderColor: 'secondary.main', transform: 'translateY(-2px)' },
              transition: 'all 0.3s ease',
            }}
          >
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  UX Design Fundamentals
                </Typography>
                <Chip label="In Progress" size="small" color="primary" />
              </Box>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                Learn the core principles of user experience design
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ flex: 1, height: 6, bgcolor: 'grey.200', borderRadius: 3, overflow: 'hidden' }}>
                  <Box sx={{ width: '65%', height: '100%', bgcolor: 'secondary.main', borderRadius: 3 }} />
                </Box>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  65%
                </Typography>
              </Box>
            </CardContent>
          </Card>
          <Card
            sx={{
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 4,
              '&:hover': { borderColor: 'secondary.main', transform: 'translateY(-2px)' },
              transition: 'all 0.3s ease',
            }}
          >
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  Cloud Infrastructure Basics
                </Typography>
                <Chip label="New" size="small" color="secondary" />
              </Box>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                Introduction to cloud computing and infrastructure management
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ flex: 1, height: 6, bgcolor: 'grey.200', borderRadius: 3, overflow: 'hidden' }}>
                  <Box sx={{ width: '0%', height: '100%', bgcolor: 'secondary.main', borderRadius: 3 }} />
                </Box>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  0%
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          size="small"
          sx={{ borderRadius: 4 }}
        >
          Browse All Courses
        </Button>
      </>
    ),
  },
  {
    icon: <ListTodo size={24} />,
    label: 'Project Management',
    key: 'project',
    content: (theme) => (
      <>
        <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary', mb: 2 }}>
          Project Management
        </Typography>
        <Card
          sx={{
            mb: 2,
            bgcolor: 'background.paper',
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 4,
          }}
        >
          <CardContent sx={{ p: 2 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1.5, lineHeight: 1.5 }}>
              Streamline your workflow with our comprehensive project management tools.
              Track progress, collaborate with team members, and meet deadlines efficiently.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip label="Kanban Boards" size="small" variant="outlined" color="primary" />
              <Chip label="Time Tracking" size="small" variant="outlined" color="primary" />
              <Chip label="Team Collaboration" size="small" variant="outlined" color="primary" />
            </Box>
          </CardContent>
        </Card>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Button variant="contained" color="primary" fullWidth size="small" sx={{ borderRadius: 4 }}>
            View Project Board
          </Button>
          <Button variant="outlined" color="primary" fullWidth size="small" sx={{ borderRadius: 4 }}>
            Create New Project
          </Button>
        </Box>
      </>
    ),
  },
  {
    icon: <BarChart size={24} />,
    label: 'Analytics Dashboard',
    key: 'analytics',
    content: (theme) => (
      <>
        <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary', mb: 2 }}>
          Analytics Dashboard
        </Typography>
        <Box container spacing={1.5} sx={{ mb: 2 }}>
          <Box item xs={6}>
            <Card
              sx={{
                textAlign: 'center',
                bgcolor: 'background.paper',
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 4,
              }}
            >
              <CardContent sx={{ py: 1.5 }}>
                <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 600 }}>
                  14
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  Active Projects
                </Typography>
              </CardContent>
            </Card>
          </Box>
          <Box item xs={6}>
            <Card
              sx={{
                textAlign: 'center',
                bgcolor: 'background.paper',
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 4,
              }}
            >
              <CardContent sx={{ py: 1.5 }}>
                <Typography variant="h6" sx={{ color: 'secondary.main', fontWeight: 600 }}>
                  91%
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  Satisfaction
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
        <Box container spacing={1.5} sx={{ mb: 2 }}>
          <Box item xs={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 600 }}>
                127
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Tasks Completed
              </Typography>
            </Box>
          </Box>
          <Box item xs={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: 'secondary.main', fontWeight: 600 }}>
                8.5h
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Avg. Daily Hours
              </Typography>
            </Box>
          </Box>
          <Box item xs={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 600 }}>
                23
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Team Members
              </Typography>
            </Box>
          </Box>
        </Box>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          size="small"
          sx={{ borderRadius: 4 }}
        >
          View Full Dashboard
        </Button>
      </>
    ),
  },
];

export default function QuickResourcesWidget() {
  const [open, setOpen] = useState(false);
  const [activeKey, setActiveKey] = useState(null);
  const theme = useTheme();

  // Timer state
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  const stopTimer = () => {
    if (isRunning) {
      setIsRunning(false);
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  const time = `${String(Math.floor(seconds / 3600)).padStart(2, '0')}:${String(
    Math.floor((seconds % 3600) / 60)
  ).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;

  const timerState = {
    time,
    isRunning,
    startTimer,
    stopTimer,
    resetTimer,
  };

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  const openModal = (item) => {
    setActiveKey(item.key);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setActiveKey(null);
  };

  const activeContent = resources.find((res) => res.key === activeKey);

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        borderRadius: 4,
        bgcolor: theme.palette.background.paper,
        width: '100%',
        maxWidth: { xs: '100%', md: 350 },
        mx: { xs: 'auto', md: 0 },
        mt: { xs: 2, md: 2 },
      }}
      aria-labelledby="quick-resources-heading"
    >
      <Box sx={{ mb: 2, display: 'inline-flex', flexDirection: 'column' }}>
        <Typography
          id="quick-resources-heading"
          variant="h6"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            color: theme.palette.text.primary,
            fontWeight: 600,
          }}
        >
          <Rocket size={20} />
          Quick Access
        </Typography>
        <Box sx={{ width: '100%', height: '2px' }} />
      </Box>

      <Box
  sx={{
    display: 'flex',
    flexWrap: 'wrap',
    gap: 1,
    justifyContent: 'center',
  }}
>
  {resources.map((res, i) => (
    <Box
      key={i}
      onClick={() => openModal(res)}
      sx={{
        width: {
          xs: '100%',
          sm: 'calc(50% - 4px)',
          md: 'calc(50% - 4px)',
        },

        flexShrink: 0,
        flexGrow: 0,

        flexBasis: {
          xs: '100%',
          sm: 'calc(50% - 4px)',
          md: 'calc(50% - 4px)',
        },

        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 4,
        p: 2,
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxSizing: 'border-box',

        '&:hover': {
          borderColor: theme.palette.primary.main,
          transform: 'translateY(-2px)',
        },
      }}
    >
      {React.cloneElement(res.icon, { color: theme.palette.primary.main })}
      <Typography variant="body2" sx={{ mt: 1, fontWeight: 500, color: 'text.primary' }}>
        {res.label}
      </Typography>
    </Box>
  ))}
</Box>

      <Modal open={open} onClose={closeModal} aria-labelledby="quick-resource-modal">
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: 350 },
            bgcolor: 'background.paper',
            color: 'text.primary',
            p: 2,
            borderRadius: 4,
            border: '1px solid rgba(0, 0, 0, 0.1)',
            maxHeight: '80vh',
            overflowY: 'auto',
          }}
        >
          <IconButton
            onClick={closeModal}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: 'text.primary',
              '&:hover': { bgcolor: 'action.hover' },
            }}
            aria-label="Close modal"
          >
            <X size={20} />
          </IconButton>
          {activeContent && activeContent.content(theme, timerState)}
        </Box>
      </Modal>
    </Paper>
  );
}