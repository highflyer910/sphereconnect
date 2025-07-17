import React from "react";
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
import ChatWidget from "./components/ChatWidget";
import Footer from "./components/Footer";

export default function App() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", color: "text.primary" }}>
      <Header />
      <Navbar />
      <WelcomeSection />
      <ResourcesSection />
      <AnnouncementsWidget />
      <EventsWidget />
      <TeamSpotlightWidget />
      <QuickResourceWidget />
      <WelcomeNewHiresWidget />
      <TaskWidget />
      <ChatWidget />
      <Footer />

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        

      </Container>
    </Box>
  );
}
