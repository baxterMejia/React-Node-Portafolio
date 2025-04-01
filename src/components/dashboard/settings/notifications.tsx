'use client';

import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import UploadIcon from '@mui/icons-material/CloudUpload';
import dayjs, { Dayjs } from 'dayjs';

interface FormValues {
  name: string;
  email: string;
  gender: string;
  country: string;
  birthDate: Dayjs | null;
  notifications: boolean;
  bio: string;
  file: File | null;
}

const defaultValues: FormValues = {
  name: 'Johan Sebastian',
  email: 'johan@mejia.io',
  gender: 'male',
  country: 'Colombia',
  birthDate: dayjs('1995-01-01'),
  notifications: true,
  bio: 'Full stack developer passionate about tech and challenges.',
  file: null,
};

export function Notifications(): React.JSX.Element {
  const { control, handleSubmit, setValue, watch } = useForm<FormValues>({
    defaultValues,
  });

  const file = watch('file');

  const onSubmit = (data: FormValues) => {
    alert('Form submitted! Check console.');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader
          title="Advanced Form Example"
          subheader="Demonstrating MUI components and form handling"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth label="Full Name" variant="outlined" />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth label="Email Address" variant="outlined" />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <FormLabel>Gender</FormLabel>
                    <RadioGroup row {...field}>
                      <FormControlLabel value="male" control={<Radio />} label="Male" />
                      <FormControlLabel value="female" control={<Radio />} label="Female" />
                      <FormControlLabel value="other" control={<Radio />} label="Other" />
                    </RadioGroup>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Country</InputLabel>
                    <Select {...field} label="Country">
                      <MenuItem value="Colombia">Colombia</MenuItem>
                      <MenuItem value="USA">USA</MenuItem>
                      <MenuItem value="Spain">Spain</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="birthDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    label="Birth Date"
                    value={field.value}
                    onChange={(date) => setValue('birthDate', date)}
                    slotProps={{
                      textField: { fullWidth: true },
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="notifications"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Switch {...field} checked={field.value} />}
                    label="Enable notifications"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="bio"
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth multiline rows={4} label="Short Bio" />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Button variant="outlined" component="label" startIcon={<UploadIcon />}>
                Upload File
                <input
                  type="file"
                  hidden
                  onChange={(e) => {
                    setValue('file', e.target.files ? e.target.files[0] : null);
                  }}
                />
              </Button>
              {file && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Selected: {file.name}
                </Typography>
              )}
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button type="submit" variant="contained">
            Save changes
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}
