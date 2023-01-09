import {
	Paper,
	Typography,
	Link,
	TextField,
	InputAdornment,
	Button,
} from '@mui/material';
import { Stack } from '@mui/system';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { UserContext } from '../../context/UserContext';

export const Login = () => {
	const [inpType, setInpType] = useState(false);
	const { setToken } = useContext(AuthContext);
	const { setUser } = useContext(UserContext);
	const navigate = useNavigate();

	const schema = Yup.object({
		email: Yup.string().email('Invalid email format').required('Required!!!'),
		password: Yup.string()
			.min(6, 'Password should not be less than 6 characters')
			.max(9, 'Password should not be more than 9 characters')
			.required('Required!!!'),
	});

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		mode: 'all',
		defaultValues: {
			email: '',
			password: '',
		},

		resolver: yupResolver(schema),
	});

	return (
		<Paper
			sx={{
				width: '50%',
				marginX: 'auto',
				marginTop: '60px',
				padding: '25px',
			}}>
			<Typography variant='h4' textAlign='center' gutterBottom>
				Login
			</Typography>
			<Typography variant='body2' marginBottom={'30px'}>
				Do you have not account?
				<Link
					underline='hover'
					component={RouterLink}
					to='/register'
					marginLeft={'10px'}>
					Register
				</Link>
			</Typography>
			<form
				onSubmit={handleSubmit((data) => {
					axios
						.post('http://localhost:8080/login', data)
						.then((res) => {
							if (res.status === 200) {
								setToken(res.data.accessToken);
								setUser(res.data.user);
								navigate('/');
							}
						})
						.catch((err) => console.log(err));
				})}>
				<Stack spacing={2}>
					<TextField
						type={'email'}
						label='Email'
						{...register('email')}
						helperText={errors.email?.message}
						error={errors.email ? true : false}
					/>
					<TextField
						type={inpType ? 'text' : 'password'}
						label='Password'
						{...register('password')}
						helperText={errors.password?.message}
						error={errors.password ? true : false}
						InputProps={{
							endAdornment: (
								<InputAdornment
									position='end'
									onClick={() => setInpType(!inpType)}>
									{inpType ? (
										<VisibilityIcon color='primary' cursor='pointer' />
									) : (
										<VisibilityOffIcon color='primary' cursor='pointer' />
									)}
								</InputAdornment>
							),
						}}
					/>

					<Button
						type='submit'
						disabled={!isValid}
						size='large'
						variant='contained'>
						Send
					</Button>
				</Stack>
			</form>
		</Paper>
	);
};
