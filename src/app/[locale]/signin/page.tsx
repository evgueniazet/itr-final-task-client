'use client';

import { useFormik } from 'formik';
import { TextField, Button, Grid, Typography, Box, useTheme } from '@mui/material';
import { signInValidationSchema } from './utils/signInValidationSchema';
import { useThemeMode } from 'hooks/useThemeMode';

const Login = () => {
    const theme = useTheme();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: signInValidationSchema,
        onSubmit: (values) => {
            console.log(values);
        },
    });
    const { themeMode } = useThemeMode();

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <Box sx={{ width: '400px' }}>
                <Typography
                    variant="h4"
                    gutterBottom
                    align="center"
                    sx={{
                        color: themeMode
                            ? theme.palette.primary.main
                            : theme.palette.secondary.main,
                    }}
                >
                    Login
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="email"
                                name="email"
                                label="Email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="password"
                                name="password"
                                label="Password"
                                type="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Box>
    );
};

export default Login;
