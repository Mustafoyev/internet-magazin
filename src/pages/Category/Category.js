import {
	Box,
	Button,
	DialogActions,
	DialogContent,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { blueGrey } from '@mui/material/colors';
import { Delete, Edit } from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';
import { Modal } from '../../components/Modal/Modal';
import axios from 'axios';

export const Category = () => {
	const [categoryModal, setCategoryModal] = useState(false);
	const [editModal, setEditModal] = useState(false);
	const [item, setItem] = useState({});
	const [categorys, setCategorys] = useState([]);
	const categoryRef = useRef();
	const categoryEditRef = useRef();

	const handleSubmit = (evt) => {
		evt.preventDefault();
		axios
			.post('http://localhost:8080/category', {
				category_name: categoryRef.current.value,
			})
			.then((res) => {
				if (res.status === 201) {
					setCategoryModal(false);
					getCategory();
				}
			})
			.catch((err) => console.log(err));
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

	const handleSubmitEdit = (id) => {
		axios
			.put('http://localhost:8080/category/' + id, {
				category_name: categoryEditRef.current.value,
			})
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	};

	const handleDelete = (id) => {
		axios
			.delete('http://localhost:8080/category/' + id)
			.then((res) => {
				if (res.status === 200) {
					getCategory();
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<Box sx={{ marginLeft: '260px', padding: '20px' }}>
			<Button
				onClick={() => setCategoryModal(true)}
				variant='contained'
				size='large'
				endIcon={<AddIcon />}>
				Add category
			</Button>
			<TableContainer sx={{ marginTop: '30px' }} component={Paper}>
				<Table>
					<TableHead sx={{ backgroundColor: blueGrey[300] }}>
						<TableRow>
							<TableCell sx={{ color: blueGrey[50] }}>Id</TableCell>
							<TableCell sx={{ color: blueGrey[50] }}>Name</TableCell>
							<TableCell sx={{ color: blueGrey[50] }}>Action</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{categorys.map((el) => (
							<TableRow key={el.id}>
								<TableCell>{el.id}</TableCell>
								<TableCell>{el.category_name}</TableCell>
								<TableCell>
									<IconButton onClick={() => (setEditModal(true), setItem(el))}>
										<Edit />
									</IconButton>
									<IconButton onClick={() => handleDelete(el.id)}>
										<Delete />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<Modal
				title={'Add category'}
				modal={categoryModal}
				setModal={setCategoryModal}>
				<form onSubmit={handleSubmit}>
					<DialogContent dividers>
						<TextField
							inputRef={categoryRef}
							sx={{ width: '300px' }}
							label='Category name'
						/>
					</DialogContent>
					<DialogActions>
						<Button variant='contained' type='submit'>
							Add category
						</Button>
					</DialogActions>
				</form>
			</Modal>
			{editModal && (
				<Modal modal={editModal} setModal={setEditModal} title='Edit category'>
					<form>
						<DialogContent dividers>
							<TextField
								defaultValue={item.category_name}
								inputRef={categoryEditRef}
								sx={{ width: '300px' }}
								label='Edit category name'
							/>
						</DialogContent>
						<DialogActions>
							<Button
								onClick={() => handleSubmitEdit(item.id)}
								variant='contained'
								type='submit'>
								Edit category name
							</Button>
						</DialogActions>
					</form>
				</Modal>
			)}
		</Box>
	);
};
