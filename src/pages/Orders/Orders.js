import {
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Typography,
} from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const Orders = () => {
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		axios
			.get('http://localhost:8080/orders')
			.then((res) => setOrders(res.data))
			.catch((err) => console.log(err));
	}, []);

	console.log(orders);

	return (
		<Box
			sx={{
				marginLeft: '260px',
				padding: '20px',
				height: '640px',
				overflowY: 'scroll',
			}}>
			<TableContainer sx={{ marginTop: '30px' }} component={Paper}>
				<Table>
					<TableHead sx={{ backgroundColor: blueGrey[300] }}>
						<TableRow>
							<TableCell sx={{ color: blueGrey[50] }}>User name</TableCell>
							<TableCell sx={{ color: blueGrey[50] }}>User email</TableCell>
							<TableCell sx={{ color: blueGrey[50] }}>Products</TableCell>
							<TableCell sx={{ color: blueGrey[50] }}>Total price</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{orders.map((el) => (
							<TableRow key={el.id}>
								<TableCell>{el.user_name}</TableCell>
								<TableCell>{el.user_email}</TableCell>
								<TableCell>
									{el.products.map((item) => (
										<Box
											sx={{
												display: 'flex',
												alignItems: 'center',
												marginBottom: '6px',
											}}
											key={item.id}>
											<img
												style={{
													display: 'block',
													width: '60px',
													height: '100px',
													marginRight: '10px',
												}}
												src={item.image}
												alt={item.name}
												width={60}
												height={100}
											/>
											<Box>
												<Typography>{item.name}</Typography>
												<Typography>Price: ${item.price}</Typography>
												<Typography>{`${item.quantity} X $${item.price} = $${item.itemTotal}`}</Typography>
											</Box>
										</Box>
									))}
								</TableCell>
								<TableCell>Total price: ${el.total_price}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};
