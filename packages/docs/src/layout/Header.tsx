import { FC, useEffect, useRef, useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  IconButton,
  Theme,
  Drawer,
  ListItem,
  ListItemText,
  List,
  ListItemButton,
  styled,
} from '@mui/material';
import { GitHub, Menu, ChevronLeft } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';

type Props = {
  href: string;
  text: string;
};

const hoverSx = {
  '&:hover': {
    color: (theme: Theme) => theme.palette.primary.main,
  },
};

const Link: FC<Props> = ({ href, text }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Button
      sx={{ textTransform: 'none', fontWeight: 'bold', fontSize: 16, ...hoverSx }}
      color={location.pathname === href ? 'primary' : 'inherit'}
      onClick={() => navigate(href)}
    >
      {text}
    </Button>
  );
};

const DrawerLink: FC<Props & { onClick: () => void }> = ({ href, text, onClick }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const onButtonClick = () => {
    href.startsWith('http') ? window.open(href) : navigate(href);
    onClick();
  };

  return (
    <ListItem disablePadding>
      <ListItemButton
        style={{ backgroundColor: location.pathname === href ? '#f0f7ff' : undefined }}
        onClick={onButtonClick}
      >
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
};

const StyledAppBar = styled(AppBar)`
  transition-property: background-color, border-radius, margin, top, height, width;
  z-index: ${({ theme }) => theme.zIndex.drawer + 1 };
  transition-duration: 0.2s;
  height: 64px;
  top: 0;

  &.detached {
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #fff;
    background-color: rgb(245, 245, 245, 0.95);
    width: calc(100% - 20px);
    border-radius: 8px;
    margin: 0 10px;
    height: 54px;
    top: 5px;
  }

  .MuiToolbar-root {
    min-height: 100%;
  }
`;

const pages = [
  { href: '/getting-started', title: 'Getting started' },
  { href: '/docs', title: 'Docs' },
];

export const Header: FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDetached, setIsDetached] = useState(false);
  const navigate = useNavigate();
  const detachedRef = useRef(isDetached);
  detachedRef.current = isDetached;

  useEffect(() => {
    const handleScroll = () => {
      const shouldBeDetached = document.body.parentElement.scrollTop > 5;
      detachedRef.current !== shouldBeDetached && setIsDetached(shouldBeDetached);
    };

    document.addEventListener('scroll', handleScroll);
    return () => document.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <StyledAppBar color="default" position="sticky" className={isDetached && !isDrawerOpen ? 'detached' : undefined}>
        <Toolbar>
          <Box sx={{ display: { xs: 'block', sm: 'none' }, mr: 1 }}>
            <IconButton onClick={() => setIsDrawerOpen(v => !v)}>
              {isDrawerOpen ? <ChevronLeft /> : <Menu />}
            </IconButton>
          </Box>
          <Typography
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
            component="h1"
            role="button"
            tabIndex={0}
            variant="h5"
          >
            MobX Form Schema
          </Typography>
          <div style={{ flex: 1 }} />

          <Box sx={{ gap: { sm: 0.5, md: 1 }, display: { xs: 'none', sm: 'flex' } }}>
            {pages.map(({ href, title }) => (
              <Link text={title} href={href} key={href} />
            ))}
            <IconButton
              href="https://github.com/yoskutik/mobx-form-schema"
              target="_blank"
              color="inherit"
              rel="noreferer"
              size="medium"
              sx={hoverSx}
            >
              <GitHub />
            </IconButton>
          </Box>
        </Toolbar>
      </StyledAppBar>

      <Drawer anchor="left" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} disableScrollLock>
        <Toolbar />
        <List sx={{ width: '200px' }}>
          {pages.map(({ href, title }) => (
            <DrawerLink text={title} href={href} key={href} onClick={() => setIsDrawerOpen(false)} />
          ))}
          <DrawerLink
            href="https://github.com/yoskutik/mobx-form-schema"
            onClick={() => setIsDrawerOpen(false)}
            text="GitHub"
          />
        </List>
      </Drawer>
    </>
  );
};
