import swal from 'sweetalert';

import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Iconify from 'src/components/iconify';
import { FaComments } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa';
import { FcLike } from 'react-icons/fc';
import { FcDislike } from 'react-icons/fc';

import { fCurrency } from 'src/utils/format-number';
import { fDate } from 'src/utils/format-time';
import Label from 'src/components/label';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { deleteNews, handleDeleteNews } from 'src/redux/slices/AdminSlice';

export default function NewsCard({ news }) {
  console.log('NEWS', news);
  const dispatch = useDispatch();

  const renderImg = (
    <Box
      component="img"
      alt={news.title}
      src={news.featuredImage}
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

  const renderAuthor = <Typography variant="subtitle1">{news.author}</Typography>;

  const renderDate = (
    <Typography variant="subtitle1">{formatDate(news.publicationDate)}</Typography>
  );

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {news.status && renderStatus}

        {renderImg}
      </Box>
      <Stack spacing={2} sx={{ p: 3 }} style={{zIndex:"3"}}>
        <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
          {news.title}
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {renderAuthor}
          {renderDate}
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <p>
            <FaComments />
            <span>{news?.comments?.length}</span>
          </p>
          <p>
            <FaEye />
            <span>{news?.views}</span>
          </p>

          <p>
            <FcLike />
            <span>{news.likes}</span>
          </p>

          <p>
            <FcDislike />
            <span>{news.dislikes}</span>
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
                    dispatch(deleteNews(news._id));
                    dispatch(handleDeleteNews(news._id));
                  } else {
                    swal('News is safe!');
                  }
                });
              }}
            >
              Delete
            </Button>

            <a href={'/editBlog/' + news._id}>
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

NewsCard.propTypes = {
  news: PropTypes.object,
};
