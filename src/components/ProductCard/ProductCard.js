import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Typography,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useCart } from 'react-use-cart';

export const ProductCard = ({ item }) => {
	const { name, price, id, image } = item;
	const { token } = useContext(AuthContext);
	const navigate = useNavigate();
	const { addItem } = useCart();

	const handleClick = () => {
		if (token) {
			addItem(item);
		} else {
			navigate('/login');
		}
	};

	return (
		<Card
			sx={{
				maxWidth: 260,
				boxShadow:
					'rgba(67, 71, 85, 0.27) 0px 0px 4px 0px, rgba(90, 125, 188, 0.05) 0px 4px 16px 0px',
			}}>
			<CardMedia sx={{ height: 200 }} image={image} title='green iguana' />
			<CardContent>
				<Typography gutterBottom variant='h5' component='div'>
					{name}
				</Typography>
				<Typography variant='body2' color='text.secondary'>
					Price: ${price}
				</Typography>
			</CardContent>
			<CardActions>
				<Button
					onClick={handleClick}
					variant='contained'
					size='small'
					endIcon={<AddShoppingCartIcon />}>
					Add card
				</Button>
			</CardActions>
		</Card>
	);
};
