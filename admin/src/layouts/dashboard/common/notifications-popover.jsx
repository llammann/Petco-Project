import { useState } from 'react';
import { Badge, IconButton } from '@mui/material';
import Iconify from 'src/components/iconify';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function NotificationsPopover() {
  const navigate = useNavigate();
  const notifications = useSelector((state) => state.admin.messages);
  const totalUnRead = notifications.filter((item) => item.isUnRead === true).length;
  const isLogged = useSelector((state) => state.admin.isLogged);
  const handleClick = () => {
    navigate('/messages'); // Navigate to messages page when icon is clicked
  };

  return (
    <>
      <IconButton color="default" onClick={handleClick}>
        <Badge badgeContent={totalUnRead} color="error">
          <Iconify width={24} icon="solar:bell-bing-bold-duotone" />
        </Badge>
        <sub>
          <p style={{ color: 'red' }}>{notifications.length}</p>
        </sub>
      </IconButton>
    </>
  );
}
