import swal from 'sweetalert';

import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Iconify from 'src/components/iconify';
import { PiDogFill } from 'react-icons/pi';
import { RiGenderlessFill } from 'react-icons/ri';
import { FaLocationDot } from 'react-icons/fa6';

import { fCurrency } from 'src/utils/format-number';
import { fDate } from 'src/utils/format-time';
import Label from 'src/components/label';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { deletePet, handleDeletePet } from 'src/redux/slices/AdminSlice';

export default function DogCard({ dog }) {
  const dispatch = useDispatch();

  const renderImg = (
    <Box
      component="img"
      alt={dog.name}
      src={dog.img}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}.${month}.${year}`;
  }

  const renderBreed = <Typography variant="subtitle1">{dog.breed}</Typography>;

  const renderPrice = (
    <Typography variant="subtitle1">
      {dog.price !== 'Free' ? '$' : null}
      {dog.price}
    </Typography>
  );

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {dog.status && renderStatus}

        {renderImg}
      </Box>
      <Stack spacing={2} sx={{ p: 3 }} style={{ zIndex: '3' }}>
        <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
          <div>
            <p>
              <PiDogFill />
              <span>{dog.name}</span>
            </p>
            <p>
              {/* <FaLocationDot /> */}
              <span>{dog.size}</span>
            </p>
          </div>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {renderBreed}
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <p>
            <RiGenderlessFill />
            <span>{dog.gender}</span>
          </p>
          {renderPrice}
          <p>
            <FaLocationDot />
            <span>{dog.city}</span>
          </p>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <div
            className="buttons"
            style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
          >
            <Button
              variant="outlined"
              onClick={() => {
                swal({
                  title: 'Are you sure?',
                  text: 'Once deleted, you will not be able to recover this news!',
                  icon: 'warning',
                  buttons: true,
                  dangerMode: true,
                }).then((willDelete) => {
                  if (willDelete) {
                    swal('News has been deleted!', {
                      icon: 'success',
                    });
                    dispatch(deletePet(dog._id));
                    dispatch(handleDeletePet(dog._id));
                  } else {
                    swal('News is safe!');
                  }
                });
              }}
            >
              Delete
            </Button>

            <a href={'/editDog/' + dog._id}>
              <Button variant="outlined" onClick={() => {}}>
                Edit
              </Button>
            </a>
          </div>
        </Stack>
      </Stack>
    </Card>
  );
}

DogCard.propTypes = {
  news: PropTypes.object,
};
