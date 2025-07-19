import React, { useRef } from "react";
import { Box, Container } from "@mui/material";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import WelcomeSection from "./components/WelcomeSection";
import ResourcesSection from "./components/ResourceSection";
import AnnouncementsWidget from "./components/AnnouncementWidget";
import EventsWidget from "./components/EventsWidget";
import TeamSpotlightWidget from "./components/TeamSpotlightWidget";
import QuickResourceWidget from "./components/QuickResourceWidget";
import WelcomeNewHiresWidget from "./components/WelcomeNewHiresWidget";
import TaskWidget from "./components/TaskWidget";
import FoldableChatWidget from './components/FoldableChatWidget';
import Footer from "./components/Footer";

const styles = {
  appContainer: {
    minHeight: '100vh',
    bgcolor: 'background.default',
    color: 'text.primary',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '100vw',
    overflowX: 'hidden',
  },
  mainContent: {
    flex: 1,
    width: '100%',
  },
  widgetsContainer: {
    py: { xs: 2, sm: 4 },
    px: { xs: 1, sm: 2, md: 3 },
    width: '100%',
    maxWidth: '100% !important',
  },
  widgetsGrid: {
    display: 'grid',
    gridTemplateColumns: {
      xs: '1fr',
      sm: 'repeat(2, 1fr)',
      lg: 'repeat(3, 1fr)',
    },
    gap: { xs: 1, sm: 2, md: 3 },
    maxWidth: { xs: '100%', lg: '1300px' },
    mx: 'auto',
    width: '100%',
  },
  widgetBox: {
    minHeight: { xs: '300px', sm: '350px' },
    width: '100%',
  }
};

export default function App() {
  const chatWidgetRef = useRef(null);

  const handleChatIconClick = () => {
    if (chatWidgetRef.current) {
      const fabButton = chatWidgetRef.current.querySelector('button');
      if (fabButton) {
        const isChatOpen = fabButton.getAttribute('aria-label') === 'Close chat';
        if (!isChatOpen) {
          fabButton.click();
        }
      }
      chatWidgetRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };

  return (
    <Box sx={styles.appContainer}>
      <Header onChatClick={handleChatIconClick} />
      <Navbar />

      <Box component="main" sx={styles.mainContent}>
        <WelcomeSection />
        <ResourcesSection />

        <Container maxWidth="xl" sx={styles.widgetsContainer}>
          <Box sx={styles.widgetsGrid}>
            {/* Row 1 */}
            <Box sx={styles.widgetBox}>
              <AnnouncementsWidget />
            </Box>
            <Box sx={styles.widgetBox}>
              <EventsWidget />
            </Box>
            <Box sx={styles.widgetBox}>
              <TeamSpotlightWidget />
            </Box>

            {/* Row 2 */}
            <Box sx={styles.widgetBox}>
              <QuickResourceWidget />
            </Box>
            <Box sx={styles.widgetBox}>
              <WelcomeNewHiresWidget />
            </Box>
            <Box sx={styles.widgetBox}>
              <TaskWidget />
            </Box>
          </Box>
        </Container>
      </Box>

      <Footer />
      <FoldableChatWidget ref={chatWidgetRef} />
    </Box>
  );
}