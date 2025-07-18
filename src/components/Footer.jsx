import React from 'react';
import {
  Paper,
  Container,
  Typography,
  Box,
  Link,
  useTheme,
} from '@mui/material';
import { Building2, Phone, Mail } from 'lucide-react';

export default function Footer() {
  const theme = useTheme();

  const footerLinks = [
    {
      title: "Resources",
      links: [
        { label: "Policies", href: "/policy-center" },
        { label: "Forms", href: "/forms" },
        { label: "Training", href: "/training" }
      ]
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
        { label: "Security", href: "/security" }
      ]
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Blog", href: "/blog" }
      ]
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", href: "/help" },
        { label: "Contact", href: "/contact" },
        { label: "Status", href: "/status" }
      ]
    }
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        bgcolor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        py: { xs: 2, md: 3 },
        mt: 'auto',
        position: 'relative'
      }}
      component="footer"
    >
      <Container maxWidth="xl">
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', lg: 'flex-start' },
          gap: { xs: 3, md: 4 },
          mb: 3
        }}>
          <Box sx={{ 
            width: { xs: '100%', lg: 'auto' },
            mb: { xs: 2, lg: 0 }
          }}>
            <Typography
              variant="h6"
              sx={{
                color: 'primary.main',
                fontWeight: 600,
                mb: 1.5,
                fontSize: { xs: '1.1rem', md: '1.25rem' }
              }}
            >
              ◉◉ SphereConnect
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 1.25,
              '& > *': {
                fontSize: { xs: '0.875rem', md: '0.9375rem' }
              }
            }}>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Building2 size={18} color={theme.palette.primary.main} />
                123 Corporate Plaza, Floor 5
              </Typography>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Phone size={18} color={theme.palette.primary.main} />
                (555) 123-4567
              </Typography>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Mail size={18} color={theme.palette.primary.main} />
                <Link 
                  href="mailto:support@sphereconnect.com" 
                  color="primary.main" 
                  underline="hover"
                  sx={{
                    transition: 'color 0.2s ease',
                    '&:hover': { color: 'secondary.main' }
                  }}
                >
                  support@sphereconnect.com
                </Link>
              </Typography>
            </Box>
          </Box>

          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { 
              xs: 'repeat(2, 1fr)', 
              sm: 'repeat(3, 1fr)', 
              md: 'repeat(4, 1fr)' 
            },
            gap: { xs: 3, md: 4 },
            width: '100%',
            maxWidth: { lg: '65%' }
          }}>
            {footerLinks.map((section, index) => (
              <Box key={index}>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    fontWeight: 600, 
                    mb: 1.5,
                    fontSize: { xs: '0.9375rem', md: '1rem' },
                    color: 'text.primary'
                  }}
                >
                  {section.title}
                </Typography>
                <Box component="ul" sx={{ 
                  listStyle: 'none', 
                  p: 0, 
                  m: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1.25
                }}>
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.href}
                        color="text.secondary"
                        underline="none"
                        sx={{
                          display: 'inline-block',
                          py: 0.25,
                          fontSize: { xs: '0.875rem', md: '0.9375rem' },
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            color: 'primary.main',
                            transform: 'translateX(3px)'
                          }
                        }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{
          borderTop: '1px solid',
          borderColor: 'divider',
          pt: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Typography 
            variant="caption" 
            color="text.secondary"
            sx={{ 
              fontSize: { xs: '0.75rem', sm: '0.8125rem' },
              textAlign: 'center'
            }}
          >
            © 2025 SphereConnect. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Paper>
  );
}