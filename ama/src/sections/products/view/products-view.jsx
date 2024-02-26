import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Iconify from 'src/components/iconify';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from 'src/redux/slices/AdminSlice';
import ProductCard from '../product-card';
import ProductCartWidget from '../product-cart-widget';
import TextField from '@mui/material/TextField';
export default function ProductsView() {
  const SORT_OPTIONS = [
    { value: 'priceDesc', label: 'Price: High-Low' },
    { value: 'priceAsc', label: 'Price: Low-High' },
  ];

  const FILTER_OPTIONS = [
    { value: 'All', label: 'All' },
    { value: 'Toys', label: 'Only: Toys' },
    { value: 'Foods', label: 'Only: Foods' },
    { value: 'Accessories', label: 'Only: Acessories' },
    { value: 'Clothes', label: 'Only: Clothes' },
  ];

  const allProducts = useSelector((state) => state.admin.products);
  const [products, setProducts] = useState([]);

  const dispatch = useDispatch();
  const [searchQuery, setsearchQuery] = useState('');

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    setProducts(allProducts);
  }, [allProducts]);

  useEffect(() => {
    const searchedProducts = allProducts.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setProducts(searchedProducts); // This line causes the issue
  }, [searchQuery, allProducts]);

  const [sortMenuOpen, setSortMenuOpen] = useState(null);
  const [filterMenuOpen, setFilterMenuOpen] = useState(null);
  const handleSortMenuOpen = (event) => {
    setSortMenuOpen(event.currentTarget);
  };

  const handleSortMenuClose = () => {
    setSortMenuOpen(null);
  };

  const handleFilterMenuOpen = (event) => {
    setFilterMenuOpen(event.currentTarget);
  };

  const handleFilterMenuClose = () => {
    setFilterMenuOpen(null);
  };

  const handleSortBy = (value) => {
    let sortedProducts = [...products]; // Create a copy of the products array
  
    switch (value) {
      case 'priceDesc':
        sortedProducts.sort((a, b) => b.price - a.price); // Sort by price descending
        break;
      case 'priceAsc':
        sortedProducts.sort((a, b) => a.price - b.price); // Sort by price ascending
        break;
      default:
        // Default sorting
        break;
    }
  
    // Update the products state with sorted products
    setProducts(sortedProducts);
  };

  const handleFilterBy = (value) => {
    let filteredProducts = allProducts;
  
    // Apply category filter
    if (value !== 'All') {
      filteredProducts = filteredProducts.filter((product) => product.category === value);
    }
  
    // Update the products state with filtered products
    setProducts(filteredProducts);
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Products
      </Typography>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            onChange={(e) => {
              const query = e.target.value.toLowerCase();
              setsearchQuery(query);
              const searchedProducts = allProducts.filter((product) =>
                product.name.toLowerCase().includes(query)
              );
              setProducts(searchedProducts);
            }}
          />

          {/* SORT PRICE */}
          <Button
            disableRipple
            color="inherit"
            onClick={handleSortMenuOpen}
            endIcon={
              <Iconify icon={sortMenuOpen ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />
            }
          >
            Sort By:&nbsp;
            <Typography
              component="span"
              variant="subtitle2"
              sx={{ color: 'text.secondary' }}
            ></Typography>
          </Button>

          <Menu
            open={!!sortMenuOpen}
            anchorEl={sortMenuOpen}
            onClose={handleSortMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            {SORT_OPTIONS.map((option) => (
              <MenuItem key={option.value} onClick={() => handleSortBy(option.value)}>
                {option.label}
              </MenuItem>
            ))}
          </Menu>

          {/* FILTER CATEGORY */}
          <Button
            disableRipple
            color="inherit"
            onClick={handleFilterMenuOpen}
            endIcon={
              <Iconify icon={filterMenuOpen ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />
            }
          >
            Filter By:&nbsp;
            <Typography
              component="span"
              variant="subtitle2"
              sx={{ color: 'text.secondary' }}
            ></Typography>
          </Button>

          <Menu
            open={!!filterMenuOpen}
            anchorEl={filterMenuOpen}
            onClose={handleFilterMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            {FILTER_OPTIONS.map((option) => (
              <MenuItem key={option.value} onClick={() => handleFilterBy(option.value)}>
                {option.label}
              </MenuItem>
            ))}
          </Menu>
        </Typography>
        <a href="/addProduct">
          <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Product
          </Button>
        </a>
      </Stack>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid key={product._id} xs={12} sm={6} md={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
      <ProductCartWidget />
    </Container>
  );
}
