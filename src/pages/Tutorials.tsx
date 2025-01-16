import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Rating,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

interface Tutorial {
  id: number;
  title: string;
  description: string;
  image: string;
  duration: string;
  difficulty: string;
  category: string;
  steps: {
    label: string;
    content: string;
    tips: string[];
    quiz?: {
      question: string;
      options: string[];
      correctAnswer: number;
    };
  }[];
  achievements: string[];
}

const tutorials: Tutorial[] = [
  {
    id: 1,
    title: 'Getting Started with Vegetable Gardening',
    description: 'Learn the basics of starting your own vegetable garden from scratch.',
    image: '/images/tutorials/vegetable-garden.jpg',
    duration: '30 minutes',
    difficulty: 'Beginner',
    category: 'Vegetables',
    steps: [
      {
        label: 'Choose Your Location',
        content: 'Select a spot that gets at least 6 hours of sunlight daily and has good soil drainage.',
        tips: [
          'South-facing locations typically get the most sun',
          'Avoid areas with strong winds',
          'Consider proximity to a water source'
        ],
        quiz: {
          question: 'How many hours of sunlight do most vegetables need daily?',
          options: ['2-4 hours', '4-5 hours', '6+ hours', '8+ hours'],
          correctAnswer: 2
        }
      },
      {
        label: 'Prepare Your Soil',
        content: 'Test and amend your soil to create the perfect growing environment.',
        tips: [
          'Get a soil test kit to check pH levels',
          'Add organic matter to improve soil structure',
          'Consider raised beds for better control'
        ]
      },
      {
        label: 'Select Your Plants',
        content: 'Choose vegetables that are appropriate for your climate and season.',
        tips: [
          'Start with easy-to-grow vegetables',
          'Consider your growing zone',
          'Plan for succession planting'
        ]
      }
    ],
    achievements: [
      'Garden Planner',
      'Soil Master',
      'Plant Selector'
    ]
  }
];

const Tutorials = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(null);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [completedTutorials, setCompletedTutorials] = useState<number[]>([]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleTutorialStart = (tutorial: Tutorial) => {
    setSelectedTutorial(tutorial);
    setActiveStep(0);
    setQuizAnswer(null);
    setShowQuizResult(false);
  };

  const handleTutorialComplete = (tutorialId: number) => {
    if (!completedTutorials.includes(tutorialId)) {
      setCompletedTutorials([...completedTutorials, tutorialId]);
    }
    setSelectedTutorial(null);
  };

  const handleQuizSubmit = () => {
    setShowQuizResult(true);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Learning Center
      </Typography>
      <Typography variant="body1" paragraph>
        Start your farming journey with our step-by-step tutorials.
        Each tutorial includes practical tips, quizzes, and achievements.
      </Typography>

      {/* Tutorial Cards */}
      <Grid container spacing={3}>
        {tutorials.map((tutorial) => (
          <Grid item key={tutorial.id} xs={12} md={6}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={tutorial.image}
                alt={tutorial.title}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {tutorial.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {tutorial.description}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Chip
                    icon={<AccessTimeIcon />}
                    label={tutorial.duration}
                    size="small"
                  />
                  <Chip
                    label={tutorial.difficulty}
                    size="small"
                    color={
                      tutorial.difficulty === 'Beginner' ? 'success' :
                      tutorial.difficulty === 'Intermediate' ? 'warning' : 'error'
                    }
                  />
                  <Chip
                    label={tutorial.category}
                    size="small"
                  />
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleTutorialStart(tutorial)}
                  startIcon={<PlayCircleOutlineIcon />}
                >
                  Start Tutorial
                </Button>
                {completedTutorials.includes(tutorial.id) && (
                  <Chip
                    icon={<CheckCircleIcon />}
                    label="Completed"
                    color="success"
                    size="small"
                    sx={{ ml: 1 }}
                  />
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Tutorial Dialog */}
      <Dialog
        open={Boolean(selectedTutorial)}
        onClose={() => setSelectedTutorial(null)}
        maxWidth="md"
        fullWidth
      >
        {selectedTutorial && (
          <>
            <DialogTitle>
              <Typography variant="h5">{selectedTutorial.title}</Typography>
              <Typography variant="subtitle2" color="text.secondary">
                {selectedTutorial.category} • {selectedTutorial.duration}
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Stepper activeStep={activeStep} orientation="vertical">
                {selectedTutorial.steps.map((step, index) => (
                  <Step key={step.label}>
                    <StepLabel>{step.label}</StepLabel>
                    <StepContent>
                      <Typography paragraph>{step.content}</Typography>
                      
                      {/* Tips */}
                      <Paper elevation={0} sx={{ bgcolor: 'background.default', p: 2, mb: 2 }}>
                        <Typography variant="subtitle2" gutterBottom>
                          Tips:
                        </Typography>
                        <List dense>
                          {step.tips.map((tip, tipIndex) => (
                            <ListItem key={tipIndex}>
                              <ListItemIcon sx={{ minWidth: 36 }}>
                                <CheckCircleIcon color="success" fontSize="small" />
                              </ListItemIcon>
                              <ListItemText primary={tip} />
                            </ListItem>
                          ))}
                        </List>
                      </Paper>

                      {/* Quiz */}
                      {step.quiz && (
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="subtitle2" gutterBottom>
                            Quick Quiz:
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            {step.quiz.question}
                          </Typography>
                          <Grid container spacing={1}>
                            {step.quiz.options.map((option, optionIndex) => (
                              <Grid item xs={12} sm={6} key={optionIndex}>
                                <Button
                                  variant={quizAnswer === optionIndex ? 'contained' : 'outlined'}
                                  color={
                                    showQuizResult
                                      ? optionIndex === step.quiz!.correctAnswer
                                        ? 'success'
                                        : quizAnswer === optionIndex
                                        ? 'error'
                                        : 'primary'
                                      : 'primary'
                                  }
                                  fullWidth
                                  onClick={() => setQuizAnswer(optionIndex)}
                                  disabled={showQuizResult}
                                >
                                  {option}
                                </Button>
                              </Grid>
                            ))}
                          </Grid>
                          {!showQuizResult && quizAnswer !== null && (
                            <Button
                              onClick={handleQuizSubmit}
                              sx={{ mt: 1 }}
                            >
                              Submit Answer
                            </Button>
                          )}
                        </Box>
                      )}

                      <Box sx={{ mb: 2 }}>
                        <Button
                          variant="contained"
                          onClick={handleNext}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          {index === selectedTutorial.steps.length - 1 ? 'Finish' : 'Continue'}
                        </Button>
                        <Button
                          disabled={index === 0}
                          onClick={handleBack}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          Back
                        </Button>
                      </Box>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
              {activeStep === selectedTutorial.steps.length && (
                <Paper square elevation={0} sx={{ p: 3 }}>
                  <Typography gutterBottom>
                    Congratulations! You've completed this tutorial.
                  </Typography>
                  <Box sx={{ mt: 2, mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Achievements Unlocked:
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {selectedTutorial.achievements.map((achievement) => (
                        <Chip
                          key={achievement}
                          icon={<EmojiEventsIcon />}
                          label={achievement}
                          color="primary"
                        />
                      ))}
                    </Box>
                  </Box>
                  <Button
                    onClick={() => handleTutorialComplete(selectedTutorial.id)}
                    variant="contained"
                  >
                    Close Tutorial
                  </Button>
                </Paper>
              )}
            </DialogContent>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default Tutorials;
