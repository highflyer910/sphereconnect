import React, { useRef} from "react";
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
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary', display: 'flex', flexDirection: 'column' }}>
      <Header onChatClick={handleChatIconClick} />
      <Navbar />

      <Box component="main" sx={{ flex: 1 }}>
        <WelcomeSection />
        <ResourcesSection />

        {/* Main Widgets Section */}
        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)',
              },
              gap: 3,
              maxWidth: '1300px',
              mx: 'auto',
            }}
          >
            {/* Row 1 */}
            <Box sx={{ width: '100%', minHeight: '350px' }}>
              <AnnouncementsWidget />
            </Box>
            <Box sx={{ width: '100%', minHeight: '350px' }}>
              <EventsWidget />
            </Box>
            <Box sx={{ width: '100%', minHeight: '350px' }}>
              <TeamSpotlightWidget />
            </Box>

            {/* Row 2 */}
            <Box sx={{ width: '100%', minHeight: '350px' }}>
              <QuickResourceWidget />
            </Box>
            <Box sx={{ width: '100%', minHeight: '350px' }}>
              <WelcomeNewHiresWidget />
            </Box>
            <Box sx={{ width: '100%', minHeight: '350px' }}>
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