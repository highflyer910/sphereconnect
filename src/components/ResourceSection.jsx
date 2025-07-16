import { Box, Typography, Grid, Card, CardMedia, CardContent, CardActionArea, Chip } from '@mui/material';
import { BookOpen } from 'lucide-react';
import { useTheme } from '@mui/material/styles';

const blogPosts = [
  {
    title: 'Deploy Your FastAPI App on Vercel: The Complete Guide',
    img: 'https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fcbsyoae8fiav56ocizm9.png',
    url: 'https://dev.to/highflyer910/deploy-your-fastapi-app-on-vercel-the-complete-guide-27c0',
    tag: 'FastAPI',
  },
  {
    title: 'Common Web Security Attacks and Top Tips to Protect Your Website',
    img: 'https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-Uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fitgbwfnpo7hl549we1sb.jpg',
    url: 'https://dev.to/highflyer910/common-web-security-attacks-and-top-tips-to-protect-your-website-16jo',
    tag: 'Web Security',
  },
  {
    title: 'Python data structures (lists, tuples, dictionaries, sets)',
    img: 'https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-Uploads.s3.amazonaws.com%2Fi%2Fpdk09voppbn4lato43dp.png',
    url: 'https://dev.to/highflyer910/python-data-structures-lists-tuples-dictionaries-sets-3epc',
    tag: 'Python',
  },
  {
    title: 'Unlocking Web Accessibility: Tips for Developers',
    img: 'https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-Uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F98n25dgnbm6fr45d3hvo.png',
    url: 'https://dev.to/highflyer910/unlocking-web-accessibility-tips-for-developers-d6l',
    tag: 'Accessibility',
  },
];

const ResourcesSection = () => {
  const theme = useTheme();

  return (
    <Box sx={{ maxWidth: 1400, width: '95%', mx: 'auto', mt: 3.5 }}>
      <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            color: theme.palette.text.primary,
          }}
        >
          <BookOpen size={22} /> Resources for Your Role
        </Typography>
        <Box
          sx={{
            width: '100%',
            height: '2px',
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            borderRadius: '1px',
          }}
        />
      </Box>

      <Grid container spacing={1} justifyContent="center">
        {blogPosts.map((post, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Card
              sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: 360, md: 290 },
                minHeight: 260,
                borderRadius: 3,
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: theme.shadows[3],
                },
              }}
            >
              <CardActionArea
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardMedia
                  component="img"
                  height="120"
                  image={post.img}
                  alt={post.title}
                  sx={{
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease',
                    '&:hover': { transform: 'scale(1.05)' },
                  }}
                />
                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    p: 1.5,
                    pt: 1,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    component="div"
                    sx={{
                      fontWeight: 500,
                      lineHeight: 1.3,
                      flexGrow: 1,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      mb: 1,
                      minHeight: '56px',
                      color: theme.palette.text.primary,
                    }}
                  >
                    {post.title}
                  </Typography>
                  <Chip
                    label={post.tag}
                    size="small"
                    color="primary"
                    sx={{
                      alignSelf: 'flex-start',
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      bgcolor: theme.palette.primary.main,
                      color: 'white',
                      mb: 0.75,
                      ml: 0.75,
                    }}
                  />
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ResourcesSection;