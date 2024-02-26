import swal from 'sweetalert';

import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { fCurrency } from 'src/utils/format-number';

import Label from 'src/components/label';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { deleteProduct, handleDeleteProduct } from 'src/redux/slices/AdminSlice';

// ----------------------------------------------------------------------

export default function PostCard({ product }) {
  const dispatch = useDispatch();
  const renderStatus = (
    <Label
      variant="filled"
      color={(product.status === 'sale' && 'error') || 'info'}
      sx={{
        zIndex: 9,
        top: 16,
        right: 16,
        position: 'absolute',
        textTransform: 'uppercase',
      }}
    >
      {product.status}
    </Label>
  );

  const renderImg = (
    <Box
      component="img"
      alt={product.name}
      src={product.img}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  const renderPrice = (
    <Typography variant="subtitle1">
      <Typography
        component="span"
        variant="body1"
        sx={{
          color: 'text.disabled',
          textDecoration: 'line-through',
        }}
      >
        {product.priceSale && fCurrency(product.priceSale)}
      </Typography>
      &nbsp;
      {fCurrency(product.price)}
    </Typography>
  );

  const renderCategory = (
    <Typography variant="subtitle1">
      <Typography
        component="span"
        variant="body1"
        sx={{
          color: 'text.disabled',
          textDecoration: 'line-through',
        }}
      ></Typography>
      &nbsp;
      {product.category}
    </Typography>
  );

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {product.status && renderStatus}

        {renderImg}
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
          {product.name}
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {renderPrice}
          {renderCategory}
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
                  text: 'Once deleted, you will not be able to recover this product!',
                  icon: 'warning',
                  buttons: true,
                  dangerMode: true,
                }).then((willDelete) => {
                  if (willDelete) {
                    swal('Product has been deleted!', {
                      icon: 'success',
                    });
                    dispatch(deleteProduct(product._id));
                    dispatch(handleDeleteProduct(product._id));
                  } else {
                    swal('Product is safe!');
                  }
                });
              }}
            >
              Delete
            </Button>

            <a href={'/editProduct/' + product._id}>
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

PostCard.propTypes = {
  product: PropTypes.object,
};
