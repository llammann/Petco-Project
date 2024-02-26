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
import { getAllPets } from 'src/redux/slices/AdminSlice';
import PostCard from '../post-card';
import PostCartWidget from '../post-cart-widget';
import TextField from '@mui/material/TextField';

export default function ProductsView() {
  const [filterMenuOpen, setFilterMenuOpen] = useState(null);

  const SORT_OPTIONS = [
    { value: 'priceDesc', label: 'Price: High-Low' },
    { value: 'priceAsc', label: 'Price: Low-High' },
    { value: 'ageDesc', label: 'Age:  High-Low' },
    { value: 'ageAsc', label: 'Age: Low-High' },
    { value: 'default', label: 'Default' },
  ];

  const FILTER_OPTIONS = [
    { value: 'All', label: 'All' },
    { value: 'Male', label: 'Only: Male' },
    { value: 'Female', label: 'Only: Female' },
    { value: 'Paid', label: 'Only: Paid' },
    { value: 'Free', label: 'Only: Free' },
  ];

  const dispatch = useDispatch();
  const [searchQuery, setsearchQuery] = useState('');

  useEffect(() => {
    dispatch(getAllPets());
  }, [dispatch]);
  const allDogs = useSelector((state) => state.admin.dogs);
  const [dogs, setDogs] = useState([]);
  console.log('dogs', allDogs);
  useEffect(() => {
    setDogs(allDogs);
  }, [allDogs]);

  useEffect(() => {
    const searchedDogs = allDogs.filter(
      (dog) =>
        dog.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dog.gender.toLowerCase() == searchQuery.toLowerCase() ||
        dog.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dog.color.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setDogs(searchedDogs); // This line causes the issue
  }, [searchQuery, allDogs]);

  const [sortMenuOpen, setSortMenuOpen] = useState(null);
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
    let sortedDogs = [...dogs]; // Create a copy of the news array

    switch (value) {
      case 'priceDesc':
        sortedDogs.sort((a, b) => b.price - a.price); // Sort by likes descending
        break;
      case 'priceAsc':
        sortedDogs.sort((a, b) => a.price - b.price); // Sort by likes ascending
        break;
      case 'ageDesc':
        sortedDogs.sort((a, b) => b.age - a.age); // Sort by likes ascending
        break;
      case 'ageAsc':
        sortedDogs.sort((a, b) => a.age - b.age); // Sort by likes ascending
        break;
      case 'default':
        sortedDogs=[...allDogs] // Sort by likes ascending
        break;
      default:
        // Default sorting
        break;
    }

    // Update the news state with sorted news
    setDogs(sortedDogs);
  };

  const handleFilterBy = (value) => {
    let filteredDogs = allDogs;

    // Apply category filter
    if (value == 'Male') {
      filteredDogs = filteredDogs.filter((dog) => dog.gender === 'male');
    }
    if (value == 'Female') {
      filteredDogs = filteredDogs.filter((dog) => dog.gender === 'female');
    }
    if (value == 'Paid') {
      filteredDogs = filteredDogs.filter((dog) => dog.price !== 'Free');
    }
    if (value == 'Free') {
      filteredDogs = filteredDogs.filter((dog) => dog.price === 'Free');
    }
    if (value == 'All') {
      filteredDogs = [...filteredDogs];
    }
    setDogs(filteredDogs);
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Dogs
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
              const searchedDogs = allDogs.filter((dog) =>
                dog.breeder.toLowerCase().includes(query)
              );
              setDogs(searchedDogs);
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
        <a href="/addDog">
          <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Dog
          </Button>
        </a>
      </Stack>

      <Grid container spacing={3}>
        {dogs.map((dog) => (
          <Grid key={dog._id} xs={12} sm={6} md={3}>
            <PostCard dog={dog} />
          </Grid>
        ))}
      </Grid>
      <PostCartWidget />
    </Container>
  );
}
