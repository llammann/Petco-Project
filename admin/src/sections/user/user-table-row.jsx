import swal from 'sweetalert';

import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { deleteUser, handleDeleteUser } from 'src/redux/slices/AdminSlice';

import { useDispatch, useSelector } from 'react-redux';

// ----------------------------------------------------------------------

export default function UserTableRow({
  _id,
  selected,
  name,
  avatarUrl,
  surname,
  createdAt,
  email,
  balance,
  handleClick,
}) {
  let users = useSelector((state) => state.admin.users);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={name} src={avatarUrl} />
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{surname}</TableCell>

        <TableCell>{email}</TableCell>

        <TableCell align="center">{createdAt}</TableCell>

        <TableCell>
          <Label color={(status === 'banned' && 'error') || 'success'}>{balance}</Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem
          onClick={() => {
            handleCloseMenu();
            console.log('IDD', _id);

            swal({
              title: 'Are you sure?',
              text: 'Once deleted, you will not be able to recover this user!',
              icon: 'warning',
              buttons: true,
              dangerMode: true,
            }).then((willDelete) => {
              if (willDelete) {
                swal('User has been deleted!', {
                  icon: 'success',
                });
                dispatch(deleteUser(_id));
                dispatch(handleDeleteUser(_id));
              } else {
                swal('User is safe!');
              }
            });
          }}
        >
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>

        {/* <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem> */}
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  surname: PropTypes.any,
  handleClick: PropTypes.func,
  createdAt: PropTypes.any,
  name: PropTypes.any,
  username: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
};
