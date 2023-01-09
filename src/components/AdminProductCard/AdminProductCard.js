import { Delete, Edit } from '@mui/icons-material';
import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	DialogActions,
	DialogContent,
	Grid,
	MenuItem,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Modal } from '../Modal/Modal';

export const AdminProductCard = ({ item }) => {
	const { name, price, id, image, category_id } = item;
	const [itemModal, setItemModal] = useState(false);
	const [categorys, setCategorys] = useState([]);
	const nameRef = useRef();
	const priceRef = useRef();
	const imageRef = useRef();
	const categoryRef = useRef();

	const getCategory = async () => {
		axios
			.get('http://localhost:8080/category')
			.then((res) => setCategorys(res.data))
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		getCategory();
	}, []);

	const handleSubmit = (evt) => {
		evt.preventDefault();
		axios
			.put('http://localhost:8080/products/' + id, {
				name: nameRef.current.value,
				price: priceRef.current.value,
				image: imageRef.current.value,
				category_id: categoryRef.current.value,
			})
			.then((res) => {
				if (res.status === 200) {
					setItemModal(false);
				}
			})
			.catch((err) => console.log(err));
	};

	const handleDeleteItem = (id) => {
		axios
			.delete('http://localhost:8080/products/' + id)
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	};

	return (
		<Grid item xs={3}>
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
						onClick={() => setItemModal(true)}
						color='warning'
						variant='contained'
						size='small'
						endIcon={<Edit />}>
						Edit
					</Button>
					<Button
						onClick={() => handleDeleteItem(id)}
						color='error'
						variant='contained'
						size='small'
						endIcon={<Delete />}>
						Delete
					</Button>
				</CardActions>
			</Card>
			{itemModal && (
				<Modal title={'Edit product'} modal={itemModal} setModal={setItemModal}>
					<form onSubmit={handleSubmit}>
						<DialogContent dividers>
							<Stack spacing={2}>
								<TextField
									defaultValue={name}
									inputRef={nameRef}
									sx={{ width: '300px' }}
									label='Product name'
								/>
								<TextField
									defaultValue={price}
									inputRef={priceRef}
									sx={{ width: '300px' }}
									label='Product price'
								/>
								<TextField
									defaultValue={image}
									inputRef={imageRef}
									sx={{ width: '300px' }}
									label='Product image'
								/>
								<TextField
									defaultValue={category_id}
									inputRef={categoryRef}
									sx={{ width: '300px' }}
									label='Product category'
									select>
									{categorys.map((el) => (
										<MenuItem key={el.id} value={el.id}>
											{el.category_name}
										</MenuItem>
									))}
								</TextField>
							</Stack>
						</DialogContent>
						<DialogActions>
							<Button variant='contained' type='submit'>
								Edit product
							</Button>
						</DialogActions>
					</form>
				</Modal>
			)}
		</Grid>
	);
};
