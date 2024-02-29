import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import { useNavigate } from 'react-router-dom';
import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';
import handleLogin from './../../redux/slices/AdminSlice';
import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import { useDispatch } from 'react-redux';
// ----------------------------------------------------------------------

export default function LoginView() {
  const navigate = useNavigate();
  const AdminPassword = 'LamanNazirli';
  const [passValue, setpassValue] = useState('');
  const [Logged, setLogged] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = () => {
    if (passValue == AdminPassword) {
      dispatch(handleLogin(true));
      router.push('/dashboard');
      console.log('Welcome!');
    } else {
      router.push('/404');
      dispatch(handleLogin(false));
    }
  };
  const theme = useTheme();

  const [showPassword, setShowPassword] = useState(false);

  // const handleClick = () => {
  //   console.log('Eevvveettt');
  //   router.push('/dashboard');
  // };

  const renderForm = (
    <>
      <Stack spacing={3}>
        {/* <TextField name="email" label="Email address" /> */}

        <TextField
          name="password"
          label="Password"
          onChange={(e) => {
            setpassValue(e.target.value);
          }}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}></Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleLogin}
      >
        Login
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Sign in to Admin</Typography>
          <Typography variant="h4" style={{ textAlign: 'center' }}>
            <img
              style={{ width: '50%', height: '100%', margin: 'auto' }}
              src="https://lordicon.com/icons/wired/flat/44-avatar-user-in-circle.gif"
              alt=""
            />
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:google-fill" color="#DF3E30" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:facebook-fill" color="#1877F2" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:twitter-fill" color="#1C9CEA" />
            </Button>
          </Stack>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
