import { Box } from '@mui/system';
import { blueGrey } from '@mui/material/colors';
import { amber } from '@mui/material/colors';
import { deepOrange } from '@mui/material/colors';
import logo from '../../assets/images/logo.svg';
import { Link as RouterLink, NavLink, Route, Routes } from 'react-router-dom';
import {
	Avatar,
	Link,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import QrCodeIcon from '@mui/icons-material/QrCode';
import { Orders } from '../Orders/Orders';
import { Category } from '../Category/Category';
import { Products } from '../Products/Products';

export const Admin = () => {
	return (
		<Box sx={{ height: '100vh', overflow: 'hidden' }}>
			<Box
				sx={{
					backgroundColor: blueGrey[900],
					position: 'fixed',
					width: '260px',
					top: '0',
					left: '0',
					height: '100vh',
					display: 'flex',
					alignItems: 'center',
					flexDirection: 'column',
				}}>
				<Box
					component='div'
					sx={{
						width: '200px',
						backgroundColor: 'transparent',
						marginTop: '40px',
						marginBottom: '40px',
					}}>
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
				<List>
					<ListItem>
						<ListItemButton component={NavLink} to='orders'>
							<ListItemIcon>
								<ShoppingBagIcon sx={{ color: amber[600] }} />
							</ListItemIcon>
							<ListItemText primary='Orders' sx={{ color: blueGrey[50] }} />
						</ListItemButton>
					</ListItem>
					<ListItem>
						<ListItemButton component={NavLink} to='category'>
							<ListItemIcon>
								<CategoryIcon sx={{ color: amber[600] }} />
							</ListItemIcon>
							<ListItemText primary='Category' sx={{ color: blueGrey[50] }} />
						</ListItemButton>
					</ListItem>
					<ListItem>
						<ListItemButton component={NavLink} to='products'>
							<ListItemIcon>
								<QrCodeIcon sx={{ color: amber[600] }} />
							</ListItemIcon>
							<ListItemText primary='Products' sx={{ color: blueGrey[50] }} />
						</ListItemButton>
					</ListItem>
				</List>
			</Box>
			<Box
				sx={{
					marginLeft: '260px',
					padding: '20px',
					backgroundColor: blueGrey[600],
				}}>
				<Avatar sx={{ bgcolor: deepOrange[500], marginLeft: 'auto' }}>
					A A
				</Avatar>
			</Box>
			<Routes>
				<Route path='orders' element={<Orders />} />
				<Route path='category' element={<Category />} />
				<Route path='products' element={<Products />} />
			</Routes>
		</Box>
	);
};
