'use client';

import React from 'react';
import { useFormik } from 'formik';
import { TextField, Button, Grid, Typography, Box, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';
import { signUpValidationSchema } from './utils/signUpValidationSchema';
import { useThemeMode } from 'hooks/useThemeMode';
import { api } from 'src/api/axiosSettings';
import { requestApi } from 'src/api/requests';
import { usePathname } from 'next/navigation';
import { getLanguageFromUrl } from 'utils/getLanguageFromUrl';

const SignUp = () => {
    const router = useRouter();
    const pathname = usePathname();
    const language = getLanguageFromUrl(pathname);
    const theme = useTheme();
    const formik = useFormik({
        initialValues: {
            name: '',
            surname: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: signUpValidationSchema,
        onSubmit: (data) => {
            const { email, password, name, surname } = data;

            api(requestApi.register({ email, password, name, surname }))
                .then((response) => {
                    localStorage.setItem('Authorization', response.data.token);
                    router.push(`/${language}/user/?userId=${response.data.user.id}`);
                })
                .catch((err) => {
                    console.error('ERROR', err);
                    //TODO: user friendly error message
                });
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
                    Registration
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="name"
                                name="name"
                                label="Name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="surname"
                                name="surname"
                                label="Surname"
                                value={formik.values.surname}
                                onChange={formik.handleChange}
                                error={formik.touched.surname && Boolean(formik.errors.surname)}
                                helperText={formik.touched.surname && formik.errors.surname}
                            />
                        </Grid>
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
                            <TextField
                                fullWidth
                                id="confirmPassword"
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.confirmPassword &&
                                    Boolean(formik.errors.confirmPassword)
                                }
                                helperText={
                                    formik.touched.confirmPassword && formik.errors.confirmPassword
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Sign Up
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Box>
    );
};

export default SignUp;
