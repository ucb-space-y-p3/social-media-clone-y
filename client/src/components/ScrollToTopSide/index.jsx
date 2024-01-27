import useScrollTrigger from '@mui/material/useScrollTrigger';
import Fab from '@mui/material/Fab';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function ScrollTop({ children, window }) {
  // const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    // disableHysteresis: true,
    // threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-chat-anchor',
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: { xs: 100, md: 90, lg: 80 }, left: { xs: 40, md: 60, lg: 380 } }}
      >
        {children}
      </Box>
    </Fade>
  );
}

export default function ScrollToTopMain({ }) {
  return (
    <ScrollTop>
      <Fab size="meduim" aria-label="scroll back to side top">
        <KeyboardArrowUpIcon />
      </Fab>
    </ScrollTop>
  )
}