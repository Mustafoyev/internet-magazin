import {
	AppBar,
	Link,
	Drawer,
	Box,
	IconButton,
	Grid,
	Badge,
	Button,
	Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import logo from '../../assets/images/logo.svg';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { blueGrey } from '@mui/material/colors';
import { UserContext } from '../../context/UserContext';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { useCart } from 'react-use-cart';
import DeleteIcon from '@mui/icons-material/Delete';
import SellIcon from '@mui/icons-material/Sell';
import { DrawerCard } from '../../components/DrawerCard/DrawerCard';
import { Close, Done } from '@mui/icons-material';
import { Modal } from '../../components/Modal/Modal';

export const Client = () => {
	const [drawer, setDrawer] = useState(false);
	const [orderModal, setOrderModal] = useState(false);
	const { user } = useContext(UserContext);
	const { setToken } = useContext(AuthContext);
	const [products, setProducts] = useState([]);
	const navigate = useNavigate();
	const { totalItems, cartTotal, emptyCart, id, items, isEmpty } = useCart();

	useEffect(() => {
		axios
			.get('http://localhost:8080/products')
			.then((res) => setProducts(res.data))
			.catch((err) => console.log(err));
	}, []);

	const handleOrder = () => {
		axios
			.post('http://localhost:8080/orders', {
				user_id: user.id,
				user_name: user.first_name,
				user_email: user.email,
				products: items,
				total_price: cartTotal,
			})
			.then((res) => {
				if (res.status === 201) {
					setOrderModal(false);
					emptyCart(id);
					setDrawer(false);
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<>
			<AppBar sx={{ padding: '20px', backgroundColor: blueGrey[600] }}>
				<Stack direction={'row'} justifyContent='space-between'>
					<Box
						component='div'
						sx={{ width: '200px', backgroundColor: 'transparent' }}>
						<Link
							sx={{
								width: '200px',
								height: '50px',
								display: 'block',
								backgroundColor: 'transparent',
							}}
							component={RouterLink}
							to='/'>
							<img
								style={{ display: 'block', width: '180px', height: '50px' }}
								src={logo}
								alt='Logo'
								width={180}
								height={40}
							/>
						</Link>
					</Box>
					<Box component='div' sx={{ backgroundColor: 'transparent' }}>
						<Stack direction={'row'} alignItems='center'>
							<Link
								sx={{ color: deepOrange[50], marginRight: '10px' }}
								variant={'body1'}
								component={RouterLink}
								to='/login'>
								Login
							</Link>

							<Badge badgeContent={totalItems} color='secondary'>
								<IconButton onClick={() => setDrawer(true)}>
									<AddShoppingCartIcon sx={{ color: deepOrange[50] }} />
								</IconButton>
							</Badge>
							<Drawer
								anchor='right'
								open={drawer}
								onClose={() => setDrawer(false)}>
								<Box
									p={2}
									sx={{
										display: 'flex',
										flexDirection: 'column',
										height: '100%',
									}}
									width='500px'
									role='presentation'>
									{isEmpty ? (
										<Typography variant='h3'>Card is empty</Typography>
									) : (
										''
									)}
									<Stack sx={{ flexGrow: '1' }}>
										{items.map((item) => (
											<DrawerCard key={item.id} item={item} />
										))}
									</Stack>
									<Stack alignItems={'center'} direction={'row'} spacing={2}>
										<Button
											onClick={() => emptyCart(id)}
											variant='contained'
											color='error'
											endIcon={<DeleteIcon />}>
											Clear card
										</Button>
										<Button
											onClick={() => setOrderModal(true)}
											variant='contained'
											color='success'
											endIcon={<SellIcon />}>
											Order
										</Button>
										<Typography>Total price: ${cartTotal}</Typography>
									</Stack>
								</Box>
							</Drawer>
							<Avatar
								onClick={() =>
									setToken(
										localStorage.removeItem('token'),
										navigate('/login'),
										emptyCart(),
									)
								}
								sx={{
									bgcolor: deepOrange[500],
									marginLeft: '20px',
									cursor: 'pointer',
								}}>
								{user.first_name[0]} {user.last_name[0]}
							</Avatar>
						</Stack>
					</Box>
				</Stack>
			</AppBar>
			<Box sx={{ marginTop: '130px', paddingX: '32px' }}>
				<Grid container spacing={4}>
					{products.map((item) => (
						<Grid key={item.id} item xs={2}>
							<ProductCard item={item} />
						</Grid>
					))}
				</Grid>
			</Box>

			<Modal title='Are you sure?' modal={orderModal} setModal={setOrderModal}>
				<Stack
					sx={{ margin: '0 auto', paddingBottom: '20px' }}
					direction={'row'}
					spacing={2}>
					<Button
						onClick={() => handleOrder()}
						variant='contained'
						color='success'
						endIcon={<Done />}>
						Yes
					</Button>
					<Button
						onClick={() => setOrderModal(false)}
						variant='contained'
						color='error'
						endIcon={<Close />}>
						No
					</Button>
				</Stack>
			</Modal>
		</>
	);
};
