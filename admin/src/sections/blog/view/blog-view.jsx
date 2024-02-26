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
import { getAllNews } from 'src/redux/slices/AdminSlice';
import PostCard from '../post-card';
import PostCartWidget from '../post-cart-widget';
import TextField from '@mui/material/TextField';

export default function ProductsView() {
  const SORT_OPTIONS = [
    { value: 'likeDesc', label: 'Like: High-Low' },
    { value: 'likeAsc', label: 'Like: Low-High' },
  ];

  const FILTER_OPTIONS = [
    { value: 'All', label: 'All' },
    { value: 'Toys', label: 'Only: Toys' },
    { value: 'Foods', label: 'Only: Foods' },
    { value: 'Accessories', label: 'Only: Acessories' },
    { value: 'Clothes', label: 'Only: Clothes' },
  ];

  const allNews = useSelector((state) => state.admin.news);
  const [news, setNews] = useState([]);

  const dispatch = useDispatch();
  const [searchQuery, setsearchQuery] = useState('');

  useEffect(() => {
    dispatch(getAllNews());
  }, [dispatch]);

  useEffect(() => {
    setNews(allNews);
  }, [allNews]);

  useEffect(() => {
    const searchedNews = allNews.filter((news) =>
      news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setNews(searchedNews); // This line causes the issue
  }, [searchQuery, allNews]);

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
    let sortedNews = [...news]; // Create a copy of the news array
  
    switch (value) {
      case 'likeDesc':
        sortedNews.sort((a, b) => b.likes - a.likes); // Sort by likes descending
        break;
      case 'likeAsc':
        sortedNews.sort((a, b) => a.likes - b.likes); // Sort by likes ascending
        break;
      default:
        // Default sorting
        break;
    }
  
    // Update the news state with sorted news
    setNews(sortedNews);
  };
  

  // const handleFilterBy = (value) => {
  //   let filteredProducts = allProducts;
  
  //   // Apply category filter
  //   if (value !== 'All') {
  //     filteredProducts = filteredProducts.filter((product) => product.category === value);
  //   }
  
  //   // Update the products state with filtered products
  //   setProducts(filteredProducts);
  // };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Blog
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
              const searchedNews = allNews.filter((news) =>
                news.title.toLowerCase().includes(query)
              );
              setNews(searchedNews);
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
          {/* <Button
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
          </Menu> */}

        </Typography>
        <a href="/addBlog">
          <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Blog
          </Button>
        </a>
      </Stack>

      <Grid container spacing={3}>
        {news.map((news) => (
          <Grid key={news._id} xs={12} sm={6} md={3}>
            <PostCard news={news} />
          </Grid>
        ))}
      </Grid>
      <PostCartWidget />
    </Container>
  );
}
