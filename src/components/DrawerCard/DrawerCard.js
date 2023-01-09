import { Box, Button, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useCart } from 'react-use-cart';

export const DrawerCard = ({ item }) => {
	const { updateItemQuantity, removeItem } = useCart();
	const { name, price, id, quantity, image } = item;
	console.log(item);
	return (
		<Box
			sx={{
				paddingBottom: '10px',
				borderBottom: '1px solid',
				marginBottom: '10px',
			}}>
			<Stack sx={{ padding: '6px' }} direction={'row'}>
				<img
					style={{
						display: 'block',
						width: '40px',
						height: '40px',
						borderRadius: '50%',
					}}
					src={image}
					alt={name}
					width={40}
					height={40}
				/>
				<Box sx={{ marginLeft: '10px' }}>
					<Typography>{name}</Typography>
					<Typography>Price: ${price}</Typography>
				</Box>
				<Box sx={{ margin: '0 15px', display: 'flex', alignItems: 'center' }}>
					<Button
						onClick={() => updateItemQuantity(id, quantity + 1)}
						variant='contained'>
						<AddIcon />
					</Button>
					<Typography sx={{ margin: '0 10px' }}>{quantity}</Typography>
					<Button
						onClick={() => updateItemQuantity(id, quantity - 1)}
						variant='contained'>
						<RemoveIcon />
					</Button>
				</Box>
				<Button
					onClick={() => removeItem(id)}
					sx={{ marginLeft: '15px' }}
					variant='contained'
					size='small'
					color='error'>
					Delet All
				</Button>
			</Stack>
		</Box>
	);
};
