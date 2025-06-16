import React, { useState, useEffect, useRef, useContext } from 'react';
import {
  Container, Typography, Box, TextField, Grid, Paper, Radio, Checkbox, Button, Card, CardContent, useMediaQuery, Collapse, IconButton, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions, Slide, Avatar, Table, TableBody, TableCell, TableHead, TableRow, Switch, FormControlLabel, Fade, Zoom, useScrollTrigger, Link, Divider
} from '@mui/material';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import StarIcon from '@mui/icons-material/Star';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import logoLight from './assets/radiance_logo_light.png';
import logoDark from './assets/radiance_logo_dark.png';
import { keyframes } from '@mui/system';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import LanguageIcon from '@mui/icons-material/Language';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { ThemeContext } from './ThemeContext';

const coveredTopicsList = [
  'Introduction',
  'Objectives',
  'Key Concepts',
  'Case Studies',
  'Hands-on Activities',
  'Q&A Session',
  'Summary & Conclusion',
];

const initialState = {
  details: {
    name: '', email: '', role: '', title: '', instructor: ''
  },
  contentImpact: {},
  trainer: {},
  organization: {},
  overall: {},
  coveredTopics: [],
  coveredTopicsOther: '',
  comments: '',
};

const contentImpactQuestions = [
  'The content was informative and relevant',
  'The training material was well organized and easy to follow',
  'The training objectives were communicated up front',
  'The training objectives were achieved',
];
const trainerQuestions = [
  'The trainer was knowledgeable',
  'Effective use of audio-visual aids',
  'Participation and group interaction were encouraged',
  'The trainer did a good job presenting',
  'Adequate time for questions',
  'The trainer was friendly and respectful',
];
const organizationQuestions = [
  'Was the duration of the training appropriate?',
  'Was the session interactive and engaging?',
  'How would you rate the trainer\'s knowledge of the subject?'
];
const overallQuestions = [
  'Training/knowledge/skills relevant to job role',
  'Others will benefit from the knowledge',
  'Training was worthwhile and should be repeated',
];

const steps = [
  'Course Details',
  'Content & Impact',
  'Trainer',
  'Organization',
  'Overall Impression',
  'Covered Topics',
  'Comments & Suggestions',
];

// Add these keyframe animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

function ScrollToTop() {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 1000,
          cursor: 'pointer',
          bgcolor: 'primary.main',
          color: 'white',
          borderRadius: '50%',
          p: 1,
          boxShadow: 4,
          '&:hover': {
            bgcolor: 'primary.dark',
            transform: 'scale(1.1)',
          },
          transition: 'all 0.3s ease',
        }}
      >
        <ExpandLessIcon />
      </Box>
    </Zoom>
  );
}

function SectionCard({ title, expanded, onToggle, icon, children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  console.log('Theme mode:', theme.palette.mode, 'Logo:', theme.palette.mode === 'dark' ? logoDark : logoLight);

  return (
    <Fade in timeout={800}>
      <Card 
        elevation={4} 
        sx={{ 
          mb: 4, 
          borderRadius: 2, 
          boxShadow: 6, 
          ':hover': { 
            boxShadow: 12,
            transform: 'translateY(-4px)',
          }, 
          background: theme.palette.background.paper,
          transition: 'all 0.3s ease',
          overflow: 'hidden',
          animation: `${fadeInUp} 0.6s ease-out`,
        }}
      >
        <CardContent sx={{ p: 0 }}>
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mb: 0, 
              px: 3, 
              py: 2, 
              borderTopLeftRadius: 2, 
              borderTopRightRadius: 2, 
              background: `linear-gradient(45deg, ${theme.palette.background.default} 30%, ${theme.palette.background.paper} 90%)`,
              borderBottom: `1.5px solid ${theme.palette.divider}`,
              boxShadow: theme.shadows[1],
              '&:hover': {
                background: `linear-gradient(45deg, ${theme.palette.background.paper} 30%, ${theme.palette.background.default} 90%)`,
              },
              transition: 'all 0.3s ease',
            }}
          >
            {icon && (
              <Box sx={{ 
                mr: 1, 
                color: 'secondary.main', 
                fontSize: 28,
                animation: `${pulse} 2s infinite`,
              }}>
                {icon}
              </Box>
            )}
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'primary.main', 
                flexGrow: 1, 
                fontWeight: 700,
                fontSize: isMobile ? '1.1rem' : '1.25rem',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.02)',
                  color: 'secondary.main',
                },
              }}
            >
              {title}
            </Typography>
            <IconButton 
              onClick={onToggle} 
              size="small" 
              aria-label={expanded ? `Collapse ${title}` : `Expand ${title}`}
              sx={{
                transition: 'all 0.3s ease',
                transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                '&:hover': {
                  animation: `${bounce} 1s`,
                  backgroundColor: 'rgba(0,0,0,0.04)',
                },
              }}
            >
              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>
          {expanded && (
            <Box 
              sx={{ 
                px: 3, 
                py: 2,
                animation: `${fadeInUp} 0.4s ease-out`,
              }}
            >
              {typeof children === 'function' ? children() : children}
            </Box>
          )}
        </CardContent>
      </Card>
    </Fade>
  );
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Helper for required star
const RequiredStar = () => <span style={{ color: '#d32f2f', marginLeft: 4 }}>*</span>;

// Reverse the Likert scale order for better UX and scoring
const likertMatrixLabels = [
  'Very Poor',
  'Poor',
  'Fair',
  'Good',
  'Very Good',
];

const ScrollHint = () => (
  <Box sx={{
    display: { xs: 'flex', sm: 'none' },
    alignItems: 'center',
    justifyContent: 'center',
    mb: 1,
    color: 'text.secondary',
    fontSize: 14,
    width: '100%',
    gap: 1,
  }}>
    <span>Swipe to see more</span>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M8 5l8 7-8 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </Box>
);

function LikertMatrix({ questions, section, formSection, handleChange }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const tableContainerRef = useRef(null);

  useEffect(() => {
    if (isMobile && tableContainerRef.current) {
      // Ensure table starts at left
      tableContainerRef.current.scrollLeft = 0;
    }
  }, [isMobile]);

  return (
    <Box sx={{ width: '100%', overflowX: 'auto', position: 'relative', scrollBehavior: 'smooth' }} ref={tableContainerRef}>
      {isMobile && (
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 1,
          color: 'text.secondary',
          fontSize: 14,
          width: '100%',
          gap: 1,
        }}>
          <span>Swipe to see more</span>
          <ArrowForwardIosIcon fontSize="small" />
        </Box>
      )}
      <Table sx={{ minWidth: isMobile ? 500 : 700 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ background: theme.palette.background.paper, position: 'sticky', left: 0, zIndex: 1, minWidth: 120, boxShadow: isMobile ? 2 : 0 }}></TableCell>
            {likertMatrixLabels.map(label => (
              <TableCell align="center" key={label} sx={{ fontWeight: 600, color: theme.palette.text.primary, background: theme.palette.background.paper }}>{label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {questions.map((q, idx) => (
            <TableRow key={q} hover sx={{ transition: 'background 0.2s', '&:hover': { background: theme.palette.action.hover } }}>
              <TableCell sx={{ fontWeight: 500, color: theme.palette.text.primary, background: theme.palette.background.paper, minWidth: 120, position: 'sticky', left: 0, zIndex: 1, boxShadow: isMobile ? 2 : 0 }}>{q}<RequiredStar /></TableCell>
              {likertMatrixLabels.map((label, colIdx) => (
                <TableCell align="center" key={label} sx={{ background: theme.palette.background.paper }}>
                  <Radio
                    checked={formSection[idx] === String(colIdx + 1)}
                    onChange={() => handleChange(section, idx, String(colIdx + 1))}
                    value={colIdx + 1}
                    name={`${section}-question-${idx}`}
                    inputProps={{ 'aria-label': label }}
                    required={formSection[idx] === undefined || formSection[idx] === ''}
                    sx={{
                      color: theme.palette.secondary.main,
                      '&.Mui-checked': {
                        color: theme.palette.primary.main,
                        boxShadow: `0 0 0 4px ${theme.palette.primary.main}22`
                      },
                      transition: 'color 0.2s, box-shadow 0.2s',
                    }}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

function ConfirmDialog({ open, onClose, onConfirm }) {
  return (
    <Dialog
      open={open}
      onClose={() => onClose(false)}
      TransitionComponent={Slide}
      TransitionProps={{ direction: "up" }}
      PaperProps={{
        sx: {
          borderRadius: 4,
          padding: 2,
          background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
          color: 'white',
          maxWidth: '400px',
          width: '100%',
        }
      }}
    >
      <DialogTitle sx={{ textAlign: 'center', fontSize: '1.5rem' }}>
        Confirm Submission
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" sx={{ textAlign: 'center', mb: 2 }}>
          Are you sure you want to submit your feedback?
        </Typography>
        <Typography variant="body2" sx={{ textAlign: 'center', color: 'rgba(255,255,255,0.8)' }}>
          Please review your responses before submitting.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', gap: 2, pb: 2 }}>
        <Button 
          onClick={() => onClose(false)} 
          variant="outlined"
          sx={{ 
            color: 'white', 
            borderColor: 'white',
            '&:hover': {
              borderColor: 'white',
              backgroundColor: 'rgba(255,255,255,0.1)',
            }
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={() => onConfirm(true)} 
          variant="contained"
          sx={{ 
            bgcolor: 'white', 
            color: 'primary.main',
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.9)',
            }
          }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function SuccessDialog({ open, onClose }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Slide}
      TransitionProps={{ direction: "up" }}
      PaperProps={{
        sx: {
          borderRadius: 4,
          padding: 2,
          background: 'linear-gradient(45deg, #43cea2 30%, #185a9d 90%)',
          color: 'white',
          maxWidth: '400px',
          width: '100%',
        }
      }}
    >
      <DialogTitle sx={{ textAlign: 'center', fontSize: '1.5rem' }}>
        Thank You! 🎉
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" sx={{ textAlign: 'center', mb: 2 }}>
          Your feedback has been successfully submitted.
        </Typography>
        <Typography variant="body2" sx={{ textAlign: 'center', color: 'rgba(255,255,255,0.8)' }}>
          We appreciate your time and valuable input!
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
        <Button 
          onClick={onClose} 
          variant="contained"
          sx={{ 
            bgcolor: 'white', 
            color: 'primary.main',
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.9)',
            }
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function Footer() {
  const { theme: themeMode } = useContext(ThemeContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      component="footer"
      sx={{
        py: { xs: 4, sm: 6 },
        px: { xs: 2, sm: 4 },
        mt: 'auto',
        background: themeMode === 'dark'
          ? 'linear-gradient(180deg, #232526 0%, #414345 100%)'
          : 'linear-gradient(180deg, #e3eeff 0%, #f3e7e9 100%)',
        color: themeMode === 'dark' ? '#fff' : '#232526',
        borderTop: '1px solid',
        borderColor: 'divider',
        boxShadow: 8,
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={4}
          alignItems="flex-start"
          justifyContent="space-between"
        >
          {/* Company Info */}
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <img
                src={themeMode === 'dark' ? logoDark : logoLight}
                alt="Radiance Tech LLC Logo"
                style={{
                  height: 72,
                  marginBottom: 20,
                  maxWidth: '100%',
                  boxShadow: 'none',
                  filter: themeMode === 'dark' ? 'brightness(0.9) contrast(1.1)' : 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    filter: themeMode === 'dark' ? 'brightness(1) contrast(1.2)' : 'brightness(1.05)',
                  }
                }}
              />
              <Typography variant="body2" sx={{ mb: 2, maxWidth: 240, mx: { xs: 'auto', md: 0 }, color: 'text.secondary' }}>
                Empowering businesses with innovative technology solutions and expert training programs.
              </Typography>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: 'primary.main' }}>
                Quick Links
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Link href="https://www.radiancetechllc.com/" color="inherit" underline="hover" sx={{ fontWeight: 500, fontSize: 16 }}>
                  Website
                </Link>
                <Link href="https://www.radiancetechllc.com/services" color="inherit" underline="hover" sx={{ fontWeight: 500, fontSize: 16 }}>
                  Services
                </Link>
                <Link href="https://www.radiancetechllc.com/about" color="inherit" underline="hover" sx={{ fontWeight: 500, fontSize: 16 }}>
                  About Us
                </Link>
                <Link href="https://www.radiancetechllc.com/contact" color="inherit" underline="hover" sx={{ fontWeight: 500, fontSize: 16 }}>
                  Contact
                </Link>
              </Box>
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: 'primary.main' }}>
                Contact Us
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  <EmailIcon color="primary" />
                  <Link href="mailto:info@radiancetechllc.com" color="inherit" underline="hover" sx={{ fontWeight: 500 }}>
                    info@radiancetechllc.com
                  </Link>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  <PhoneIcon color="primary" />
                  <Link href="tel:+1234567890" color="inherit" underline="hover" sx={{ fontWeight: 500 }}>
                    +1 (234) 567-890
                  </Link>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  <LocationOnIcon color="primary" />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Radiance Tech LLC
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Social Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: 'primary.main' }}>
                Connect
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <IconButton href="https://www.linkedin.com/company/radiance-tech-llc" target="_blank" sx={{ color: 'primary.main', bgcolor: 'background.paper', boxShadow: 2, '&:hover': { bgcolor: 'secondary.main', color: '#fff' }, transition: 'all 0.3s' }}>
                  <LinkedInIcon />
                </IconButton>
                <IconButton href="https://www.facebook.com/radiancetechllc" target="_blank" sx={{ color: 'primary.main', bgcolor: 'background.paper', boxShadow: 2, '&:hover': { bgcolor: 'secondary.main', color: '#fff' }, transition: 'all 0.3s' }}>
                  <FacebookIcon />
                </IconButton>
                <IconButton href="https://twitter.com/radiancetechllc" target="_blank" sx={{ color: 'primary.main', bgcolor: 'background.paper', boxShadow: 2, '&:hover': { bgcolor: 'secondary.main', color: '#fff' }, transition: 'all 0.3s' }}>
                  <TwitterIcon />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Copyright */}
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
          textAlign: { xs: 'center', md: 'left' },
        }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Radiance Tech LLC. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3, justifyContent: { xs: 'center', md: 'flex-end' } }}>
            <Link href="/privacy" color="inherit" underline="hover" variant="body2" sx={{ whiteSpace: 'nowrap' }}>
              Privacy Policy
            </Link>
            <Link href="/terms" color="inherit" underline="hover" variant="body2" sx={{ whiteSpace: 'nowrap' }}>
              Terms of Service
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

function App() {
  const { theme: themeMode, toggleTheme } = useContext(ThemeContext);
  const [form, setForm] = useState(initialState);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(Array(steps.length).fill(true));
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Always scroll to top on page load/refresh
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const handleChange = (section, key, value) => {
    setForm((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const handleTopicsChange = (topic) => {
    setForm((prev) => {
      const topics = prev.coveredTopics.includes(topic)
        ? prev.coveredTopics.filter((t) => t !== topic)
        : [...prev.coveredTopics, topic];
      return { ...prev, coveredTopics: topics };
    });
  };

  const handleExpandToggle = (idx) => {
    setExpanded((prev) => prev.map((v, i) => (i === idx ? !v : v)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmDialog(true);
  };

  const handleDialogClose = async (confirmed) => {
    setShowConfirmDialog(false);
    if (confirmed) {
      setLoading(true);
      try {
        console.log('Submitting feedback...', form); // Debug log

        const response = await fetch('http://localhost:5000/api/submit-feedback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(form),
        });

        console.log('Response status:', response.status); // Debug log

        const data = await response.json();
        console.log('Response data:', data); // Debug log

        if (!response.ok) {
          throw new Error(data.error || 'Failed to submit feedback');
        }

        setShowSuccessDialog(true);
        setForm(initialState);
      } catch (error) {
        console.error('Error submitting feedback:', error);
        setError(error.message || 'Failed to submit feedback. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  // Update the theme creation to use the context theme
  const muiTheme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: themeMode === 'dark' ? '#00bcd4' : '#1976d2',
        contrastText: '#fff',
      },
      secondary: {
        main: themeMode === 'dark' ? '#ffb300' : '#d81b60',
        contrastText: '#fff',
      },
      background: {
        default: themeMode === 'dark' ? '#181c24' : '#f3f6fd',
        paper: themeMode === 'dark' ? '#23293a' : '#fff',
      },
      success: {
        main: '#43a047',
      },
      warning: {
        main: '#ffa726',
      },
      error: {
        main: '#e53935',
      },
      info: {
        main: '#1e88e5',
      },
      text: {
        primary: themeMode === 'dark' ? '#e3f2fd' : '#23293a',
        secondary: themeMode === 'dark' ? '#b0bec5' : '#607d8b',
      },
    },
    shape: {
      borderRadius: 12,
    },
    typography: {
      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
      fontWeightBold: 700,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 8,
            padding: '8px 24px',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: 8,
              animation: `${pulse} 1s infinite`,
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 2,
              },
              '&.Mui-focused': {
                transform: 'translateY(-2px)',
                boxShadow: 4,
              },
            },
          },
        },
      },
      MuiRadio: {
        styleOverrides: {
          root: {
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.2)',
            },
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.2)',
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={muiTheme}>
      <Box 
        sx={{ 
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          background: themeMode === 'dark' 
            ? 'linear-gradient(135deg, #232526 0%, #414345 100%)' 
            : 'linear-gradient(135deg, #f3e7e9 0%, #e3eeff 100%)', 
          py: isMobile ? 2 : 6,
          scrollBehavior: 'smooth',
          animation: `${fadeInUp} 0.8s ease-out`,
        }}
      >
        <Container maxWidth="md" sx={{ flex: 1, mb: { xs: 4, sm: 6, md: 8 } }}>
          <Paper 
            elevation={6} 
            sx={{ 
              p: { xs: 2, sm: 4, md: 6 }, 
              borderRadius: 4, 
              background: themeMode === 'dark' ? 'rgba(30,30,30,0.95)' : 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: 12,
                transform: 'scale(1.01)',
              },
              animation: `${fadeInUp} 1s ease-out`,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            {/* Logo and Theme Toggle */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              mb: 4,
              flexDirection: isMobile ? 'column' : 'row',
              gap: 2,
            }}>
              <Box sx={{
                background: 'transparent',
                boxShadow: 'none',
                borderRadius: 0,
                p: 0,
                display: 'flex',
                alignItems: 'center',
                height: isMobile ? 80 : 140,
                maxWidth: 320,
                width: '100%',
                justifyContent: 'center',
                animation: `${fadeInUp} 0.6s ease-out`,
              }}>
                <img
                  src={themeMode === 'dark' ? logoDark : logoLight}
                  alt="Radiance Tech LLC Logo"
                  style={{
                    height: 72,
                    marginBottom: 20,
                    maxWidth: '100%',
                    boxShadow: 'none',
                    filter: themeMode === 'dark' ? 'brightness(0.9) contrast(1.1)' : 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      filter: themeMode === 'dark' ? 'brightness(1) contrast(1.2)' : 'brightness(1.05)',
                    }
                  }}
                />
              </Box>
              <FormControlLabel
                control={
                  <Switch 
                    checked={themeMode === 'dark'} 
                    onChange={toggleTheme} 
                    color="primary" 
                  />
                }
                label={themeMode === 'dark' ? '🌙 Dark Mode' : '☀️ Light Mode'}
                sx={{ ml: 2, userSelect: 'none' }}
              />
            </Box>
            <Typography variant={isMobile ? 'h5' : 'h4'} gutterBottom align="center" sx={{ fontWeight: 700, color: 'primary.main', mb: 4 }}>
              Training Evaluation Form
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              {/* Step 0: Course Details */}
              <SectionCard title="Details" expanded={expanded[0]} onToggle={() => handleExpandToggle(0)} icon={<PersonIcon />}>
                <div id="section-card-0" />
                <Grid container spacing={2}>
                  <Grid xs={12} sm={6} md={4}>
                    <TextField label="Name" fullWidth required value={form.details.name} onChange={e => handleChange('details', 'name', e.target.value)} />
                  </Grid>
                  <Grid xs={12} sm={6} md={4}>
                    <TextField label="Email" type="email" fullWidth required value={form.details.email} onChange={e => handleChange('details', 'email', e.target.value)} />
                  </Grid>
                  <Grid xs={12} sm={6} md={4}>
                    <TextField label="Role" fullWidth required value={form.details.role} onChange={e => { handleChange('details', 'role', e.target.value); handleChange('details', 'title', e.target.value); }} />
                  </Grid>
                  <Grid xs={12} sm={6} md={6}>
                    <TextField label="Training Title" fullWidth required value={form.details.title} onChange={e => handleChange('details', 'title', e.target.value)} />
                  </Grid>
                  <Grid xs={12} sm={6} md={6}>
                    <TextField label="Instructor Name" fullWidth required value={form.details.instructor} onChange={e => handleChange('details', 'instructor', e.target.value)} />
                  </Grid>
                </Grid>
              </SectionCard>
              {/* Step 1: Content & Impact */}
              <SectionCard title="Content & Impact" expanded={expanded[1]} onToggle={() => handleExpandToggle(1)} icon={<SchoolIcon />}>
                <div id="section-card-1" />
                <LikertMatrix
                  questions={contentImpactQuestions}
                  section="contentImpact"
                  formSection={form.contentImpact}
                  handleChange={handleChange}
                />
              </SectionCard>
              {/* Step 2: Trainer */}
              <SectionCard title="Trainer" expanded={expanded[2]} onToggle={() => handleExpandToggle(2)} icon={<GroupIcon />}>
                <div id="section-card-2" />
                <LikertMatrix
                  questions={trainerQuestions}
                  section="trainer"
                  formSection={form.trainer}
                  handleChange={handleChange}
                />
              </SectionCard>
              {/* Step 3: Organization */}
              <SectionCard title="Organization" expanded={expanded[3]} onToggle={() => handleExpandToggle(3)} icon={<StarIcon />}>
                <div id="section-card-3" />
                <LikertMatrix
                  questions={organizationQuestions}
                  section="organization"
                  formSection={form.organization}
                  handleChange={handleChange}
                />
              </SectionCard>
              {/* Step 4: Overall Impression */}
              <SectionCard title="Overall Impression" expanded={expanded[4]} onToggle={() => handleExpandToggle(4)} icon={<StarIcon />}>
                <div id="section-card-4" />
                <LikertMatrix
                  questions={overallQuestions}
                  section="overall"
                  formSection={form.overall}
                  handleChange={handleChange}
                />
              </SectionCard>
              {/* Step 5: Covered Topics */}
              <SectionCard title="Covered Topics" expanded={expanded[5]} onToggle={() => handleExpandToggle(5)}>
                <div id="section-card-5" />
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                  {coveredTopicsList.map(topic => (
                    <FormControlLabel
                      key={topic}
                      control={
                        <Checkbox
                          checked={form.coveredTopics.includes(topic)}
                          onChange={() => handleTopicsChange(topic)}
                          sx={{
                            color: 'primary.main',
                            '&.Mui-checked': { color: 'secondary.main' },
                          }}
                        />
                      }
                      label={topic}
                    />
                  ))}
                </Box>
                <TextField
                  label="Other (please specify)"
                  fullWidth
                  value={form.coveredTopicsOther}
                  onChange={e => setForm(prev => ({ ...prev, coveredTopicsOther: e.target.value }))}
                  sx={{ mb: 2 }}
                />
              </SectionCard>
              {/* Step 6: Comments & Suggestions */}
              <SectionCard title="Comments & Suggestions" expanded={expanded[6]} onToggle={() => handleExpandToggle(6)}>
                <div id="section-card-6" />
                <TextField
                  label="Your comments or suggestions"
                  fullWidth
                  multiline
                  minRows={3}
                  value={form.comments}
                  onChange={e => setForm(prev => ({ ...prev, comments: e.target.value }))}
                  sx={{ mb: 2 }}
                />
              </SectionCard>
              {/* Submit Button */}
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Button 
                  type="submit" 
                  variant="contained" 
                  size="large" 
                  disabled={loading}
                  startIcon={loading ? null : null}
                  sx={{ 
                    px: 5, 
                    py: 1.5, 
                    fontWeight: 600, 
                    borderRadius: 4, 
                    boxShadow: 4, 
                    background: 'linear-gradient(90deg, #ffaf7b 0%, #d76d77 100%)', 
                    color: '#fff', 
                    ':hover': { 
                      boxShadow: 8, 
                      background: 'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  {loading ? "Submitting..." : "Submit Feedback"}
                </Button>
              </Box>
            </Box>
          </Paper>
        </Container>

        <Footer />

        {/* Confirmation Dialog */}
        <ConfirmDialog 
          open={showConfirmDialog}
          onClose={setShowConfirmDialog}
          onConfirm={handleDialogClose}
        />

        {/* Success Dialog */}
        <SuccessDialog 
          open={showSuccessDialog}
          onClose={() => setShowSuccessDialog(false)}
        />

        {/* Error Snackbar */}
        <Snackbar 
          open={!!error} 
          autoHideDuration={6000} 
          onClose={() => setError(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert 
            onClose={() => setError(null)} 
            severity="error" 
            variant="filled"
            sx={{ width: '100%' }}
          >
            {error}
          </Alert>
        </Snackbar>

        <ScrollToTop />
      </Box>
    </ThemeProvider>
  );
}

export default App;
