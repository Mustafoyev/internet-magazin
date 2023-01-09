import {
	Paper,
	Typography,
	Link,
	TextField,
	MenuItem,
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

export const Register = () => {
	const [inpType, setInpType] = useState(false);
	const { setToken } = useContext(AuthContext);
	const { setUser } = useContext(UserContext);
	const navigate = useNavigate();

	const schema = Yup.object({
		first_name: Yup.string().required('Required!!!'),
		last_name: Yup.string().required('Required!!!'),
		email: Yup.string().email('Invalid email format').required('Required!!!'),
		password: Yup.string()
			.min(6, 'Password should not be less than 6 characters')
			.max(9, 'Password should not be more than 9 characters')
			.required('Required!!!'),
		gender: Yup.string().required('Required!!!'),
	});

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		mode: 'all',
		defaultValues: {
			first_name: '',
			last_name: '',
			email: '',
			password: '',
			gender: '',
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
				Register
			</Typography>
			<Typography variant='body2' marginBottom={'30px'}>
				Do you have account?
				<Link
					underline='hover'
					component={RouterLink}
					to='/login'
					marginLeft={'10px'}>
					Login
				</Link>
			</Typography>
			<form
				onSubmit={handleSubmit((data) => {
					axios
						.post('http://localhost:8080/register', data)
						.then((res) => {
							if (res.status === 201) {
								setToken(res.data.accessToken);
								setUser(res.data.user);
								navigate('/');
							}
						})
						.catch((err) => console.log(err));
				})}>
				<Stack spacing={2}>
					<TextField
						{...register('first_name')}
						label='First name'
						helperText={errors.first_name?.message}
						error={errors.first_name ? true : false}
					/>
					<TextField
						{...register('last_name')}
						label='Last name'
						helperText={errors.last_name?.message}
						error={errors.last_name ? true : false}
					/>
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
					<TextField
						{...register('gender')}
						label='Gender'
						helperText={errors.gender?.message}
						error={errors.gender ? true : false}
						select>
						<MenuItem value='male'>Male</MenuItem>
						<MenuItem value='female'>Female</MenuItem>
					</TextField>
					<Button
						disabled={!isValid}
						type='submit'
						size='large'
						variant='contained'>
						Send
					</Button>
				</Stack>
			</form>
		</Paper>
	);
};
