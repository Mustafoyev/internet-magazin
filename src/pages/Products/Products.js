import {
	Box,
	Button,
	DialogActions,
	DialogContent,
	Grid,
	MenuItem,
	Tab,
	Tabs,
	TextField,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Modal } from '../../components/Modal/Modal';
import axios from 'axios';
import { Stack } from '@mui/system';
import { AdminProductCard } from '../../components/AdminProductCard/AdminProductCard';

export const Products = () => {
	const [productModal, setProductModal] = useState(false);
	const [value, setValue] = useState(1);
	const [categorys, setCategorys] = useState([]);
	const [products, setProducts] = useState([]);
	const nameRef = useRef();
	const priceRef = useRef();
	const imageRef = useRef();
	const categoryRef = useRef();

	const handleChange = (evt) => {
		setValue(+evt.target.attributes.tabIndex.nodeValue);
	};

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
			.post('http://localhost:8080/products', {
				name: nameRef.current.value,
				price: priceRef.current.value,
				image: imageRef.current.value,
				category_id: categoryRef.current.value,
			})
			.then((res) => {
				if (res.status === 201) {
					setProductModal(false);
				}
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		axios
			.get('http://localhost:8080/products?category_id=' + value)
			.then((res) => setProducts(res.data))
			.catch((err) => console.log(err));
	}, [value]);

	return (
		<Box sx={{ marginLeft: '260px', padding: '20px' }}>
			<Button
				onClick={() => setProductModal(true)}
				variant='contained'
				size='large'
				endIcon={<AddIcon />}>
				Add product
			</Button>

			<Box sx={{ marginTop: '30px' }}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<Tabs
						value={value}
						onChange={handleChange}
						aria-label='basic tabs example'>
						{categorys.map((el) => (
							<Tab
								key={el.id}
								value={el.id}
								tabIndex={el.id}
								label={el.category_name}
								id={`simple-tab-${el.id}`}
							/>
						))}
					</Tabs>
				</Box>
				{categorys.map((el) => (
					<Box
						key={el.id}
						role='tabpanel'
						hidden={value !== el.id}
						sx={{ padding: '30px' }}
						value={value}
						index={el.id}>
						<Grid container spacing={1}>
							{products.map((item) => (
								<AdminProductCard key={item.id} item={item} />
							))}
						</Grid>
					</Box>
				))}
			</Box>

			<Modal
				title={'Add category'}
				modal={productModal}
				setModal={setProductModal}>
				<form onSubmit={handleSubmit}>
					<DialogContent dividers>
						<Stack spacing={2}>
							<TextField
								inputRef={nameRef}
								sx={{ width: '300px' }}
								label='Product name'
							/>
							<TextField
								inputRef={priceRef}
								sx={{ width: '300px' }}
								label='Product price'
							/>
							<TextField
								inputRef={imageRef}
								sx={{ width: '300px' }}
								label='Product image'
							/>
							<TextField
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
							Add product
						</Button>
					</DialogActions>
				</form>
			</Modal>
		</Box>
	);
};
