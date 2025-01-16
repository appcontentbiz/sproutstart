import { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Link,
  Alert,
  CircularProgress,
  Divider,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const steps = ['Account Details', 'Personal Information', 'Preferences'];

const Register = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  // Form states
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    experience: '',
    interests: [] as string[],
    notifications: true,
    terms: false,
  });

  const handleInputChange = (field: string) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };

  const handleCheckboxChange = (field: string) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [field]: e.target.checked,
    });
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const validateStep = () => {
    switch (activeStep) {
      case 0:
        if (!formData.email || !formData.password || !formData.confirmPassword) {
          setError('Please fill in all fields');
          return false;
        }
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          return false;
        }
        if (formData.password.length < 8) {
          setError('Password must be at least 8 characters');
          return false;
        }
        break;
      case 1:
        if (!formData.name) {
          setError('Please fill in all fields');
          return false;
        }
        break;
      case 2:
        if (!formData.terms) {
          setError('Please accept the terms and conditions');
          return false;
        }
        break;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;

    if (activeStep === steps.length - 1) {
      try {
        await register(formData.email, formData.password, formData.name);
        navigate('/');
      } catch (err) {
        setError('Failed to create account');
      }
    } else {
      handleNext();
    }
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={handleInputChange('email')}
              margin="normal"
              required
              autoComplete="email"
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleInputChange('password')}
              margin="normal"
              required
              autoComplete="new-password"
            />
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange('confirmPassword')}
              margin="normal"
              required
              autoComplete="new-password"
            />
          </Box>
        );
      case 1:
        return (
          <Box>
            <TextField
              fullWidth
              label="Full Name"
              value={formData.name}
              onChange={handleInputChange('name')}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Farming Experience"
              select
              value={formData.experience}
              onChange={handleInputChange('experience')}
              margin="normal"
              SelectProps={{
                native: true,
              }}
            >
              <option value="">Select your experience level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </TextField>
          </Box>
        );
      case 2:
        return (
          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.notifications}
                  onChange={handleCheckboxChange('notifications')}
                />
              }
              label="I want to receive notifications about tips, events, and updates"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.terms}
                  onChange={handleCheckboxChange('terms')}
                  required
                />
              }
              label={
                <Typography variant="body2">
                  I agree to the{' '}
                  <Link href="#" underline="hover">
                    Terms and Conditions
                  </Link>{' '}
                  and{' '}
                  <Link href="#" underline="hover">
                    Privacy Policy
                  </Link>
                </Typography>
              }
            />
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Create Account
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 4 }}>
          Join our community of gardeners and farmers
        </Typography>

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          {getStepContent(activeStep)}

          <Box sx={{ mt: 4, mb: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} />
              ) : activeStep === steps.length - 1 ? (
                'Create Account'
              ) : (
                'Next'
              )}
            </Button>
          </Box>
        </form>

        <Divider sx={{ my: 3 }}>
          <Typography variant="body2" color="text.secondary">
            OR
          </Typography>
        </Divider>

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2">
            Already have an account?{' '}
            <Link
              component={RouterLink}
              to="/login"
              variant="body2"
              underline="hover"
            >
              Sign in
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
