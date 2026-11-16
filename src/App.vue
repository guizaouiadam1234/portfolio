<script setup>
import AboutSection from './components/AboutSection.vue'
import ContactSection from './components/ContactSection.vue'
import EducationSection from './components/EducationSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import HeroSection from './components/HeroSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import SiteHeader from './components/SiteHeader.vue'
import SkillsSection from './components/SkillsSection.vue'
</script>

<template>
  <a class="skip-link" href="#main">Skip to content</a>
  <SiteHeader />
  <main id="main">
    <HeroSection />
    <AboutSection />
    <ExperienceSection />
    <ProjectsSection />
    <SkillsSection />
    <EducationSection />
    <ContactSection />
  </main>
</template>

