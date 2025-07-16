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

export default function App() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", color: "text.primary" }}>
      {/* Header */}
      <Header />
      <Navbar />
      {/* Welcome Section */}
      <WelcomeSection />
      {/* Resources Section */}
      <ResourcesSection />
      {/* Announcements Widget */}
      <AnnouncementsWidget />
      {/* Events Widget */}
      <EventsWidget />
      {/* Team Spotlight Widget */}
      <TeamSpotlightWidget />
      {/* Quick Resource Widget */}
      <QuickResourceWidget />

      {/* Main Layout Content */}
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        {/* TODO: Add Navbar here */}
        {/* TODO: Add Routes / Pages here */}

      </Container>
    </Box>
  );
}
