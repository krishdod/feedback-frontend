import React, { useState, useEffect, useRef, useContext, Suspense, lazy } from 'react';
import {
  Container, Typography, Box, TextField, Grid, Paper, Radio, Checkbox, Button, Card, CardContent, useMediaQuery, Collapse, IconButton, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions, Slide, Avatar, Table, TableBody, TableCell, TableHead, TableRow, Switch, FormControlLabel, Fade, Zoom, useScrollTrigger, Link, Divider, Chip, Stack, useTheme, TableContainer
} from '@mui/material';
import { useTheme as useMuiTheme, ThemeProvider, createTheme } from '@mui/material/styles';
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
import { getApiUrl } from './config';

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

// Enhanced animations
const animations = {
  fadeInUp: keyframes`
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  `,
  bounce: keyframes`
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-10px); }
    60% { transform: translateY(-5px); }
  `,
  pulse: keyframes`
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  `,
  slideIn: keyframes`
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  `,
  fadeIn: keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
  `,
};

const likertMatrixLabels = ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'];

// Enhanced ScrollToTop component
const ScrollToTop = React.memo(function ScrollToTop() {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
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
          borderRadius: '50%',
          width: 56,
          height: 56,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
          color: 'white',
          boxShadow: 4,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'scale(1.1)',
            boxShadow: 8,
          },
        }}
      >
        <ArrowBackIosNewIcon sx={{ transform: 'rotate(90deg)' }} />
      </Box>
    </Zoom>
  );
});

// Enhanced SectionCard component
const SectionCard = React.memo(function SectionCard({ title, expanded, onToggle, icon, children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Card
      elevation={expanded ? 6 : 2}
      sx={{
        mb: { xs: 1.5, sm: 2 },
        borderRadius: { xs: 1.5, sm: 2 },
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        background: theme.palette.mode === 'dark' ? 'rgba(35, 41, 58, 0.8)' : 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        border: '1px solid',
        borderColor: 'divider',
        '&:hover': {
          transform: expanded ? 'none' : 'translateY(-1px)',
          boxShadow: expanded ? 6 : 3,
        },
        animation: `${animations.fadeInUp} 0.6s ease-out`,
      }}
    >
      <CardContent sx={{ p: { xs: 1, sm: 2, md: 2.5 } }}>
        <Box
          onClick={onToggle}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            p: { xs: 0.5, sm: 0.5 },
            borderRadius: 1.5,
            transition: 'background 0.2s',
            '&:hover': {
              background: theme.palette.action.hover,
            },
            mb: expanded ? { xs: 1, sm: 1.5 } : 0,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 1.5 } }}>
            <Avatar
              sx={{
                background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                color: 'white',
                width: { xs: 28, sm: 40 },
                height: { xs: 28, sm: 40 },
              }}
            >
              {icon}
            </Avatar>
            <Typography
              variant={isMobile ? 'h6' : 'h5'}
              sx={{
                fontWeight: 600,
                color: theme.palette.text.primary,
                fontSize: { xs: '0.9rem', sm: '1.1rem', md: '1.25rem' },
              }}
            >
              {title}
            </Typography>
          </Box>
          <IconButton
            size="small"
            sx={{
              transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease',
              color: theme.palette.primary.main,
            }}
          >
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Box sx={{ pt: { xs: 1, sm: 1.5 } }}>
            {children}
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const RequiredStar = () => <span style={{ color: '#d32f2f', marginLeft: 4 }}>*</span>;

// Enhanced ScrollHint component
const ScrollHint = () => (
  <Box
    sx={{
      position: 'fixed',
      bottom: 80,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 999,
      animation: `${animations.bounce} 2s infinite`,
    }}
  >
    <Chip
      icon={<ArrowForwardIosIcon />}
      label="Swipe to see more"
      variant="outlined"
      sx={{
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(0, 0, 0, 0.1)',
      }}
    />
  </Box>
);

// Enhanced LikertMatrix component with better mobile responsiveness
function LikertMatrix({ questions, section, formSection, handleChange }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const tableContainerRef = useRef(null);

  useEffect(() => {
    if (isMobile && tableContainerRef.current) {
      tableContainerRef.current.scrollLeft = 0;
    }
  }, [isMobile]);

  // Mobile-friendly card layout for small screens
  if (isMobile) {
    return (
      <Box sx={{ width: '100%' }}>
        {questions.map((question, idx) => (
          <Card key={idx} sx={{ mb: 1.5, p: 1.5 }}>
            <Typography variant="body2" sx={{ mb: 1.5, fontWeight: 500, fontSize: '0.85rem' }}>
              {question}
              <RequiredStar />
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              gap: 1 
            }}>
              {likertMatrixLabels.map((label, colIdx) => (
                <FormControlLabel
                  key={colIdx}
                  control={
                                      <Radio
                    checked={formSection[idx] === (colIdx + 1)}
                    onChange={() => handleChange(section, idx, String(colIdx + 1))}
                    value={colIdx + 1}
                    name={`${section}-question-${idx}`}
                    size="small"
                    sx={{
                      color: theme.palette.secondary.main,
                      '&.Mui-checked': {
                        color: theme.palette.primary.main,
                      },
                    }}
                  />
                  }
                  label={
                    <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                      {label}
                    </Typography>
                  }
                  sx={{ 
                    margin: 0,
                    width: '100%',
                    '& .MuiFormControlLabel-label': {
                      fontSize: '0.8rem',
                      lineHeight: 1.2,
                      flex: 1,
                    }
                  }}
                />
              ))}
            </Box>
          </Card>
        ))}
      </Box>
    );
  }

  // Tablet and desktop table layout
  return (
    <Box sx={{ width: '100%', overflowX: 'auto', position: 'relative', scrollBehavior: 'smooth' }} ref={tableContainerRef}>
      {isTablet && (
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 1.5,
          color: 'text.secondary',
          fontSize: 12,
          width: '100%',
          gap: 1,
        }}>
          <span>Swipe to see more</span>
          <ArrowForwardIosIcon fontSize="small" />
        </Box>
      )}
      <Table sx={{ 
        minWidth: isTablet ? 600 : '100%',
        tableLayout: 'fixed',
        width: '100%'
      }}>
        <TableHead>
          <TableRow>
            <TableCell 
              sx={{ 
                background: theme.palette.background.paper, 
                position: 'sticky', 
                left: 0, 
                zIndex: 1, 
                width: isTablet ? '30%' : '40%',
                minWidth: isTablet ? 150 : 200,
                boxShadow: isTablet ? 2 : 0,
                fontWeight: 600,
                wordWrap: 'break-word',
                fontSize: '0.8rem',
                padding: { xs: 0.5, sm: 1 },
              }}
            >
              Questions
            </TableCell>
            {likertMatrixLabels.map(label => (
              <TableCell 
                align="center" 
                key={label} 
                sx={{ 
                  fontWeight: 600, 
                  color: theme.palette.text.primary, 
                  background: theme.palette.background.paper,
                  fontSize: { xs: '0.7rem', sm: '0.8rem' },
                  padding: { xs: 0.5, sm: 1 },
                  width: isTablet ? '14%' : '12%',
                  wordWrap: 'break-word',
                }}
              >
                {label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {questions.map((q, idx) => (
            <TableRow key={q} hover sx={{ transition: 'background 0.2s', '&:hover': { background: theme.palette.action.hover } }}>
              <TableCell 
                sx={{ 
                  fontWeight: 500, 
                  color: theme.palette.text.primary, 
                  background: theme.palette.background.paper, 
                  width: isTablet ? '30%' : '40%',
                  minWidth: isTablet ? 150 : 200,
                  position: 'sticky', 
                  left: 0, 
                  zIndex: 1, 
                  boxShadow: isTablet ? 2 : 0,
                  fontSize: { xs: '0.7rem', sm: '0.8rem' },
                  padding: { xs: 0.5, sm: 1 },
                  wordWrap: 'break-word',
                }}
              >
                {q}
                <RequiredStar />
              </TableCell>
              {likertMatrixLabels.map((label, colIdx) => (
                <TableCell 
                  align="center" 
                  key={label} 
                  sx={{ 
                    background: theme.palette.background.paper,
                    padding: { xs: 0.5, sm: 1 },
                    width: isTablet ? '14%' : '12%',
                  }}
                >
                  <Radio
                    checked={formSection[idx] === (colIdx + 1)}
                    onChange={() => handleChange(section, idx, String(colIdx + 1))}
                    value={colIdx + 1}
                    name={`${section}-question-${idx}`}
                    inputProps={{ 'aria-label': label }}
                    required={formSection[idx] === undefined || formSection[idx] === ''}
                    size="small"
                    sx={{
                      color: theme.palette.secondary.main,
                      '&.Mui-checked': {
                        color: theme.palette.primary.main,
                        boxShadow: `0 0 0 3px ${theme.palette.primary.main}22`
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

// Simple Admin page with inline password gate and submissions table
const ADMIN_PASSWORD = 'radiance123'; // Change this to your desired password

function AdminPage() {
  const theme = useTheme();
  const [isAuthed, setIsAuthed] = useState(() => sessionStorage.getItem('admin_authed') === '1');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [headers, setHeaders] = useState([]);
  const [rows, setRows] = useState([]);

  const handleAuthenticate = () => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin_authed', '1');
      setIsAuthed(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect password');
    }
  };

  useEffect(() => {
    if (!isAuthed) return;
    let ignore = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const resp = await fetch(getApiUrl('/view-data'));
        const data = await resp.json();
        if (!resp.ok || data.status !== 'success') {
          throw new Error(data.message || 'Failed to load submissions');
        }
        if (!ignore) {
          setHeaders(data.headers || []);
          setRows(data.data || []);
        }
      } catch (e) {
        if (!ignore) setError(e.message || 'Failed to load submissions');
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => { ignore = true; };
  }, [isAuthed]);

  if (!isAuthed) {
    return (
      <Container maxWidth="sm" sx={{ py: 6 }}>
        <Paper elevation={6} sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, textAlign: 'center' }}>
            Admin Access
          </Typography>
          <TextField
            type="password"
            label="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            fullWidth
            size="small"
            sx={{ mb: 2 }}
            onKeyDown={(e) => { if (e.key === 'Enter') handleAuthenticate(); }}
          />
          {authError && (
            <Alert severity="error" sx={{ mb: 2 }}>{authError}</Alert>
          )}
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
            <Button variant="contained" onClick={handleAuthenticate}>Enter</Button>
            <Button variant="outlined" onClick={() => (window.location.href = '/')}>Back</Button>
          </Box>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>Submitted Feedback</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined" onClick={() => window.location.href = getApiUrl('/download-excel')}>Download Excel</Button>
          <Button variant="text" onClick={() => { sessionStorage.removeItem('admin_authed'); window.location.reload(); }}>Sign out</Button>
          <Button variant="contained" onClick={() => (window.location.href = '/')}>Back to Form</Button>
        </Box>
      </Box>
      {loading && (
        <Alert severity="info" sx={{ mb: 2 }}>Loading submissions...</Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
      )}
      {!loading && !error && (
        <Paper elevation={3} sx={{ p: 2 }}>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  {headers.map((h, idx) => (
                    <TableCell key={idx} sx={{ fontWeight: 600 }}>{h}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, rIdx) => (
                  <TableRow key={rIdx} hover>
                    {(row || []).map((cell, cIdx) => (
                      <TableCell key={cIdx}>{cell}</TableCell>
                    ))}
                  </TableRow>
                ))}
                {rows.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={Math.max(headers.length, 1)} align="center" sx={{ color: 'text.secondary' }}>
                      No submissions yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Container>
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
        py: { xs: 3, sm: 6 },
        px: { xs: 1.5, sm: 4 },
        mt: 'auto',
        background: themeMode === 'dark'
          ? 'linear-gradient(180deg, #232526 0%, #414345 100%)'
          : 'linear-gradient(180deg, #e3eeff 0%, #f3e7e9 100%)',
        color: themeMode === 'dark' ? '#fff' : '#232526',
        borderTop: '1px solid',
        borderColor: 'divider',
        boxShadow: 8,
        width: '100%',
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 1, sm: 2 } }}>
        <Grid
          container
          spacing={{ xs: 2, sm: 4 }}
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
                  height: isMobile ? 60 : 72,
                  marginBottom: isMobile ? 15 : 20,
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
              <Typography variant="body2" sx={{ 
                mb: 2, 
                maxWidth: 240, 
                mx: { xs: 'auto', md: 0 }, 
                color: 'text.secondary',
                fontSize: { xs: '0.75rem', sm: '0.875rem' }
              }}>
                Empowering businesses with innovative technology solutions and expert training programs.
              </Typography>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Typography variant="h6" sx={{ 
                mb: 2, 
                fontWeight: 700, 
                color: 'primary.main',
                fontSize: { xs: '1rem', sm: '1.25rem' }
              }}>
                Quick Links
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Link href="https://www.radiancetechllc.com/" color="inherit" underline="hover" sx={{ 
                  fontWeight: 500, 
                  fontSize: { xs: '0.875rem', sm: '1rem' }
                }}>
                  Website
                </Link>
                <Link href="https://www.radiancetechllc.com/our-services" color="inherit" underline="hover" sx={{ 
                  fontWeight: 500, 
                  fontSize: { xs: '0.875rem', sm: '1rem' }
                }}>
                  Services
                </Link>
                <Link href="https://www.radiancetechllc.com/about-us" color="inherit" underline="hover" sx={{ 
                  fontWeight: 500, 
                  fontSize: { xs: '0.875rem', sm: '1rem' }
                }}>
                  About Us
                </Link>
                <Link href="https://www.radiancetechllc.com/get-hired" color="inherit" underline="hover" sx={{ 
                  fontWeight: 500, 
                  fontSize: { xs: '0.875rem', sm: '1rem' }
                }}>
                  Get Hired
                </Link>
              </Box>
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Typography variant="h6" sx={{ 
                mb: 2, 
                fontWeight: 700, 
                color: 'primary.main',
                fontSize: { xs: '1rem', sm: '1.25rem' }
              }}>
                Contact Us
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1, 
                  justifyContent: { xs: 'center', md: 'flex-start' },
                  flexWrap: 'wrap'
                }}>
                  <EmailIcon color="primary" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />
                  <Link href="mailto:info@radiancetechllc.com" color="inherit" underline="hover" sx={{ 
                    fontWeight: 500,
                    fontSize: { xs: '0.75rem', sm: '0.875rem' }
                  }}>
                    info@radiancetechllc.com
                  </Link>
                </Box>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1, 
                  justifyContent: { xs: 'center', md: 'flex-start' },
                  flexWrap: 'wrap'
                }}>
                  <PhoneIcon color="primary" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />
                  <Link href="tel:+1234567890" color="inherit" underline="hover" sx={{ 
                    fontWeight: 500,
                    fontSize: { xs: '0.75rem', sm: '0.875rem' }
                  }}>
                    +1 (234) 567-890
                  </Link>
                </Box>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1, 
                  justifyContent: { xs: 'center', md: 'flex-start' },
                  flexWrap: 'wrap'
                }}>
                  <LocationOnIcon color="primary" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />
                  <Typography variant="body2" sx={{ 
                    fontWeight: 500,
                    fontSize: { xs: '0.75rem', sm: '0.875rem' }
                  }}>
                    Radiance Tech LLC
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Social Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ 
              textAlign: { xs: 'center', md: 'left' },
              display: 'flex',
              flexDirection: 'column',
              alignItems: { xs: 'center', md: 'flex-start' },
              justifyContent: { xs: 'center', md: 'flex-start' }
            }}>
              <Typography variant="h6" sx={{ 
                mb: 2, 
                fontWeight: 700, 
                color: 'primary.main',
                fontSize: { xs: '1rem', sm: '1.25rem' },
                textAlign: { xs: 'center', md: 'left' }
              }}>
                Connect
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                gap: 2, 
                justifyContent: 'center',
                alignItems: 'center',
                flexWrap: 'wrap',
                width: '100%',
                maxWidth: { xs: '200px', sm: 'none' }
              }}>
                <IconButton href="https://www.linkedin.com/company/radiance-tech-llc" target="_blank" sx={{ 
                  color: 'primary.main', 
                  bgcolor: 'background.paper', 
                  boxShadow: 2, 
                  '&:hover': { bgcolor: 'secondary.main', color: '#fff' }, 
                  transition: 'all 0.3s',
                  width: { xs: 36, sm: 40 },
                  height: { xs: 36, sm: 40 }
                }}>
                  <LinkedInIcon sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />
                </IconButton>
                <IconButton href="https://www.facebook.com/radiancetechllc" target="_blank" sx={{ 
                  color: 'primary.main', 
                  bgcolor: 'background.paper', 
                  boxShadow: 2, 
                  '&:hover': { bgcolor: 'secondary.main', color: '#fff' }, 
                  transition: 'all 0.3s',
                  width: { xs: 36, sm: 40 },
                  height: { xs: 36, sm: 40 }
                }}>
                  <FacebookIcon sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />
                </IconButton>
                <IconButton href="https://twitter.com/radiancetechllc" target="_blank" sx={{ 
                  color: 'primary.main', 
                  bgcolor: 'background.paper', 
                  boxShadow: 2, 
                  '&:hover': { bgcolor: 'secondary.main', color: '#fff' }, 
                  transition: 'all 0.3s',
                  width: { xs: 36, sm: 40 },
                  height: { xs: 36, sm: 40 }
                }}>
                  <TwitterIcon sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: { xs: 2, sm: 4 } }} />

        {/* Copyright */}
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
          textAlign: { xs: 'center', md: 'left' },
        }}>
          <Typography variant="body2" color="text.secondary" sx={{ 
            fontSize: { xs: '0.7rem', sm: '0.875rem' }
          }}>
            © {new Date().getFullYear()} Radiance Tech LLC. All rights reserved.
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            gap: { xs: 2, sm: 3 }, 
            justifyContent: { xs: 'center', md: 'flex-end' },
            flexWrap: 'wrap'
          }}>
            <Link href="/privacy" color="inherit" underline="hover" variant="body2" sx={{ 
              whiteSpace: 'nowrap',
              fontSize: { xs: '0.7rem', sm: '0.875rem' }
            }}>
              Privacy Policy
            </Link>
            <Link href="/terms" color="inherit" underline="hover" variant="body2" sx={{ 
              whiteSpace: 'nowrap',
              fontSize: { xs: '0.7rem', sm: '0.875rem' }
            }}>
              Terms of Service
            </Link>
          </Box>
        </Box>

        {/* Admin Submissions Button */}
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          <Button variant="outlined" size="small" onClick={() => (window.location.href = '/admin')}>
            View Submissions (Admin)
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

function App() {
  const { theme: themeMode, toggleTheme } = useContext(ThemeContext);
  
  // Individual state variables as requested
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [trainingTitle, setTrainingTitle] = useState("");
  const [instructorName, setInstructorName] = useState("");

  const [contentRatings, setContentRatings] = useState([0, 0, 0, 0]);
  const [trainerRatings, setTrainerRatings] = useState([0, 0, 0, 0, 0, 0]);
  const [organizationRatings, setOrganizationRatings] = useState([0, 0, 0]);
  const [overallRatings, setOverallRatings] = useState([0, 0, 0]);

  const [selectedTopics, setSelectedTopics] = useState([]);
  const [otherTopicText, setOtherTopicText] = useState("");
  const [commentText, setCommentText] = useState("");

  // UI state variables
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

  // Handler for rating changes
  const handleRatingChange = (section, questionIndex, rating) => {
    const ratingValue = parseInt(rating);
    
    switch (section) {
      case 'content':
        setContentRatings(prev => {
          const newRatings = [...prev];
          newRatings[questionIndex] = ratingValue;
          return newRatings;
        });
        break;
      case 'trainer':
        setTrainerRatings(prev => {
          const newRatings = [...prev];
          newRatings[questionIndex] = ratingValue;
          return newRatings;
        });
        break;
      case 'organization':
        setOrganizationRatings(prev => {
          const newRatings = [...prev];
          newRatings[questionIndex] = ratingValue;
          return newRatings;
        });
        break;
      case 'overall':
        setOverallRatings(prev => {
          const newRatings = [...prev];
          newRatings[questionIndex] = ratingValue;
          return newRatings;
        });
        break;
      default:
        break;
    }
  };

  // Handler for topic selection
  const handleTopicsChange = (topic) => {
    setSelectedTopics(prev => {
      if (prev.includes(topic)) {
        return prev.filter(t => t !== topic);
      } else {
        return [...prev, topic];
      }
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
        const payload = {
          full_name: fullName,
          email: email,
          job_role: jobRole,
          training_title: trainingTitle,
          instructor_name: instructorName,
          content_ratings: contentRatings,
          trainer_ratings: trainerRatings,
          organization_ratings: organizationRatings,
          overall_ratings: overallRatings,
          covered_topics: selectedTopics,
          other_topic: otherTopicText,
          comments: commentText
        };

        console.log('Submitting feedback...', payload);

                        const response = await fetch(getApiUrl("/submit-feedback"), {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                  },
                  body: JSON.stringify(payload),
                });

        console.log('Response status:', response.status);

        const data = await response.json();
        console.log('Response data:', data);

        if (!response.ok) {
          throw new Error(data.error || 'Failed to submit feedback');
        }

        setShowSuccessDialog(true);
        
        // Reset form
        setFullName("");
        setEmail("");
        setJobRole("");
        setTrainingTitle("");
        setInstructorName("");
        setContentRatings([0, 0, 0, 0]);
        setTrainerRatings([0, 0, 0, 0, 0, 0]);
        setOrganizationRatings([0, 0, 0]);
        setOverallRatings([0, 0, 0]);
        setSelectedTopics([]);
        setOtherTopicText("");
        setCommentText("");
        
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
      h4: {
        fontSize: { xs: '1.75rem', sm: '2.125rem', md: '2.125rem' },
        lineHeight: { xs: 1.2, sm: 1.235, md: 1.235 },
      },
      h5: {
        fontSize: { xs: '1.5rem', sm: '1.5rem', md: '1.5rem' },
        lineHeight: { xs: 1.2, sm: 1.334, md: 1.334 },
      },
      h6: {
        fontSize: { xs: '1.25rem', sm: '1.25rem', md: '1.25rem' },
        lineHeight: { xs: 1.2, sm: 1.2, md: 1.2 },
      },
      body1: {
        fontSize: { xs: '0.875rem', sm: '1rem', md: '1rem' },
      },
      body2: {
        fontSize: { xs: '0.75rem', sm: '0.875rem', md: '0.875rem' },
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 8,
            padding: '8px 24px',
            transition: 'all 0.3s ease',
            fontSize: { xs: '0.875rem', sm: '1rem' },
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: 8,
              animation: `${animations.pulse} 1s infinite`,
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              transition: 'all 0.3s ease',
              fontSize: { xs: '0.875rem', sm: '1rem' },
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
      MuiChip: {
        styleOverrides: {
          root: {
            transition: 'all 0.2s ease',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
            },
          },
        },
      },
    },
  });

  const isAdminRoute = typeof window !== 'undefined' && window.location.pathname === '/admin';

  if (isAdminRoute) {
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
            py: isMobile ? 0.5 : 3,
          }}
        >
          <Container maxWidth="lg" sx={{ flex: 1 }}>
            <AdminPage />
          </Container>
          <Footer />
        </Box>
      </ThemeProvider>
    );
  }

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
          py: isMobile ? 0.5 : 3,
          scrollBehavior: 'smooth',
          animation: `${animations.fadeInUp} 0.8s ease-out`,
        }}
      >
        <Container 
          maxWidth="lg" 
          sx={{ 
            flex: 1, 
            mb: { xs: 0.5, sm: 2, md: 3 },
            px: { xs: 0.5, sm: 2 },
            py: { xs: 0.25, sm: 1 }
          }}
        >
          <Paper 
            elevation={4} 
            sx={{ 
              p: { xs: 1, sm: 2, md: 3 }, 
              borderRadius: { xs: 1, sm: 2, md: 3 }, 
              background: themeMode === 'dark' ? 'rgba(30,30,30,0.95)' : 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: 8,
                transform: 'scale(1.005)',
              },
              animation: `${animations.fadeInUp} 1s ease-out`,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            {/* Logo and Theme Toggle */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              mb: { xs: 1.5, sm: 3 },
              flexDirection: isMobile ? 'column' : 'row',
              gap: 1,
            }}>
              <Box sx={{
                background: 'transparent',
                boxShadow: 'none',
                borderRadius: 0,
                p: 0,
                display: 'flex',
                alignItems: 'center',
                height: { xs: 36, sm: 60, md: 80 },
                maxWidth: { xs: 180, sm: 280 },
                width: '100%',
                justifyContent: 'center',
                animation: `${animations.fadeInUp} 0.6s ease-out`,
              }}>
                <img
                  src={themeMode === 'dark' ? logoDark : logoLight}
                  alt="Radiance Tech LLC Logo"
                  style={{
                    height: isMobile ? 32 : 60,
                    marginBottom: isMobile ? 3 : 10,
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
                    size="small"
                  />
                }
                label={
                  <Typography variant="body2" sx={{ fontSize: { xs: '0.65rem', sm: '0.8rem' } }}>
                    {themeMode === 'dark' ? '🌙 Dark' : '☀️ Light'}
                  </Typography>
                }
                sx={{ 
                  ml: 1, 
                  userSelect: 'none',
                  '& .MuiFormControlLabel-label': {
                    fontSize: { xs: '0.65rem', sm: '0.8rem' }
                  }
                }}
              />
            </Box>
            <Typography 
              variant={isMobile ? 'h6' : 'h5'} 
              gutterBottom 
              align="center" 
              sx={{ 
                fontWeight: 700, 
                color: 'primary.main', 
                mb: { xs: 1.5, sm: 3 },
                fontSize: { xs: '1.1rem', sm: '1.5rem', md: '1.75rem' }
              }}
            >
              Training Evaluation Form
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              {/* Step 0: Course Details */}
              <SectionCard title="Details" expanded={expanded[0]} onToggle={() => handleExpandToggle(0)} icon={<PersonIcon />}>
                <div id="section-card-0" />
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: 2,
                  alignItems: { xs: 'center', sm: 'flex-start' },
                  width: '100%'
                }}>
                  <Typography variant="body2" color="text.secondary" sx={{ 
                    mb: 0.5,
                    textAlign: { xs: 'center', sm: 'left' },
                    width: '100%'
                  }}>
                    Please provide your information and training details:
                  </Typography>
                  <Grid container spacing={{ xs: 1.5, sm: 2 }} sx={{ 
                    width: '100%',
                    justifyContent: { xs: 'center', sm: 'flex-start' }
                  }}>
                    <Grid item xs={12} sm={6} md={4}>
                      <TextField 
                        label="Full Name" 
                        fullWidth 
                        required 
                        size="small"
                        value={fullName} 
                        onChange={e => setFullName(e.target.value)}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 1.5,
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <TextField 
                        label="Email Address" 
                        type="email" 
                        fullWidth 
                        required 
                        size="small"
                        value={email} 
                        onChange={e => setEmail(e.target.value)}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 1.5,
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <TextField 
                        label="Job Role/Position" 
                        fullWidth 
                        required 
                        size="small"
                        value={jobRole} 
                        onChange={e => setJobRole(e.target.value)}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 1.5,
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <TextField 
                        label="Training Title/Course Name" 
                        fullWidth 
                        required 
                        size="small"
                        value={trainingTitle} 
                        onChange={e => setTrainingTitle(e.target.value)}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 1.5,
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <TextField 
                        label="Instructor/Trainer Name" 
                        fullWidth 
                        required 
                        size="small"
                        value={instructorName} 
                        onChange={e => setInstructorName(e.target.value)}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 1.5,
                          }
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </SectionCard>
              {/* Step 1: Content & Impact */}
              <SectionCard title="Content & Impact" expanded={expanded[1]} onToggle={() => handleExpandToggle(1)} icon={<SchoolIcon />}>
                <div id="section-card-1" />
                <LikertMatrix
                  questions={contentImpactQuestions}
                  section="content"
                  formSection={contentRatings}
                  handleChange={handleRatingChange}
                />
              </SectionCard>
              {/* Step 2: Trainer */}
              <SectionCard title="Trainer" expanded={expanded[2]} onToggle={() => handleExpandToggle(2)} icon={<GroupIcon />}>
                <div id="section-card-2" />
                <LikertMatrix
                  questions={trainerQuestions}
                  section="trainer"
                  formSection={trainerRatings}
                  handleChange={handleRatingChange}
                />
              </SectionCard>
              {/* Step 3: Organization */}
              <SectionCard title="Organization" expanded={expanded[3]} onToggle={() => handleExpandToggle(3)} icon={<StarIcon />}>
                <div id="section-card-3" />
                <LikertMatrix
                  questions={organizationQuestions}
                  section="organization"
                  formSection={organizationRatings}
                  handleChange={handleRatingChange}
                />
              </SectionCard>
              {/* Step 4: Overall Impression */}
              <SectionCard title="Overall Impression" expanded={expanded[4]} onToggle={() => handleExpandToggle(4)} icon={<StarIcon />}>
                <div id="section-card-4" />
                <LikertMatrix
                  questions={overallQuestions}
                  section="overall"
                  formSection={overallRatings}
                  handleChange={handleRatingChange}
                />
              </SectionCard>
              {/* Step 5: Covered Topics */}
              <SectionCard title="Covered Topics" expanded={expanded[5]} onToggle={() => handleExpandToggle(5)}>
                <div id="section-card-5" />
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  gap: 1.5,
                  mb: 1.5 
                }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    Select all topics that were covered during the training:
                  </Typography>
                  <Box sx={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: { xs: 0.5, sm: 1 },
                    justifyContent: { xs: 'flex-start', sm: 'flex-start' }
                  }}>
                    {coveredTopicsList.map(topic => (
                      <Chip
                        key={topic}
                        label={topic}
                        onClick={() => handleTopicsChange(topic)}
                        color={selectedTopics.includes(topic) ? "primary" : "default"}
                        variant={selectedTopics.includes(topic) ? "filled" : "outlined"}
                        size="small"
                        sx={{
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            transform: 'scale(1.05)',
                            boxShadow: 2,
                          },
                          fontSize: { xs: '0.7rem', sm: '0.8rem' },
                          height: { xs: 28, sm: 32 },
                        }}
                      />
                    ))}
                  </Box>
                  <TextField
                    label="Other topics (please specify)"
                    fullWidth
                    size="small"
                    value={otherTopicText}
                    onChange={e => setOtherTopicText(e.target.value)}
                    sx={{ 
                      mb: 1.5,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 1.5,
                      }
                    }}
                  />
                </Box>
              </SectionCard>
              {/* Step 6: Comments & Suggestions */}
              <SectionCard title="Comments & Suggestions" expanded={expanded[6]} onToggle={() => handleExpandToggle(6)}>
                <div id="section-card-6" />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  <Typography variant="body2" color="text.secondary">
                    Please share any additional comments, suggestions, or feedback about the training:
                  </Typography>
                  <TextField
                    label="Your comments or suggestions"
                    fullWidth
                    multiline
                    minRows={2}
                    maxRows={4}
                    size="small"
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    sx={{ 
                      mb: 1.5,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 1.5,
                      }
                    }}
                  />
                </Box>
              </SectionCard>
              {/* Enhanced Submit Button */}
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center', 
                mt: 3,
                gap: 1.5
              }}>
                <Button 
                  type="submit" 
                  variant="contained" 
                  size="large" 
                  disabled={loading}
                  startIcon={loading ? null : null}
                  sx={{ 
                    px: { xs: 3, sm: 4 }, 
                    py: { xs: 1, sm: 1.5 },
                    fontWeight: 600, 
                    borderRadius: 2, 
                    boxShadow: 3, 
                    background: 'linear-gradient(90deg, #ffaf7b 0%, #d76d77 100%)', 
                    color: '#fff', 
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                    minWidth: { xs: '180px', sm: '220px' },
                    height: { xs: '40px', sm: '48px' },
                    ':hover': { 
                      boxShadow: 6, 
                      background: 'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                    '&:disabled': {
                      background: 'linear-gradient(90deg, #ccc 0%, #999 100%)',
                      transform: 'none',
                    }
                  }}
                >
                  {loading ? "Submitting..." : "Submit Feedback"}
                </Button>
                {loading && (
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', fontSize: '0.8rem' }}>
                    Please wait while we submit your feedback...
                  </Typography>
                )}
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
