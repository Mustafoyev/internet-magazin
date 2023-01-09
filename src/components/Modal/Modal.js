import { Close } from '@mui/icons-material';
import { Dialog, DialogTitle, IconButton } from '@mui/material';
import { Box } from '@mui/system';

export const Modal = ({ children, title, modal, setModal }) => {
	return (
		<Dialog
			onClose={() => setModal(false)}
			open={modal}
			sx={{ padding: '10px' }}>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}>
				<DialogTitle>{title}</DialogTitle>
				<IconButton onClick={() => setModal(false)}>
					<Close />
				</IconButton>
			</Box>
			{children}
		</Dialog>
	);
};
