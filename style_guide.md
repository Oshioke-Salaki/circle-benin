# Circle Restaurant — UI Style Guide

This document outlines the design system, aesthetics, and component principles for the Circle Restaurant Next.js application following its complete UI overhaul.

## 1. Core Aesthetics & Philosophy
- **Pristine Luxury**: The interface aims for a "made in the future" luxury vibe. It avoids cliché "AI-generated" gradients, relying instead on stark contrasts, precise typography, and dark-mode elegance.
- **Glassmorphism**: Used sparingly for overlays (like the Sticky Nav and Drawer Close button) to provide depth without clutter.
- **Cinematic Photography**: Large, high-resolution imagery takes center stage, bathed in moody lighting and subtle zoom animations.

## 2. Color Palette
The color system uses deep, rich tones balanced by stark contrasts.

### Primary Colors
- **Obsidian Black (`#050505`)**: The core background. Creates infinite depth and contrast.
- **Deep Crimson (`#89172E`)**: The primary brand and accent color. Used for active states, primary buttons, borders, and subtle glows.

### Secondary / Text Colors
- **White (`#FFFFFF`)**: Secondary brand color and primary text color for maximum readability against the dark background.
- **White Dim (`#E0E0E0` to `white/60`)**: Used for secondary text, descriptions, and subtle UI elements.
- **Translucents**: Used for borders (`border-white/10`), subtle backgrounds (`bg-white/5`), and disabled states.

## 3. Typography
The typography marries classic elegance with modern minimalism.

- **Headings (Display Font)**: *Playfair Display*
  - Weights: 400, 600, 700
  - Usage: Hero text, Section Titles, Dish Names in cards and drawers.
- **Body Text (Sans-serif)**: *Outfit*
  - Weights: 300, 400
  - Usage: Descriptions, navigation links, AI Assistant chat, metadata.
  - *Why Outfit?* It provides a clean, geometric, and futuristic counterpoint to the classic serif headings.

## 4. Components & Interactions

### The Dish Card
- **Layout**: Image-heavy top with a stark, clean text layout below.
- **Interaction**: On hover, the card lifts slightly (`-translate-y-1`), borders glow with a subtle crimson hue, and the image scales slowly (`scale-105`) while fading from 80% to 100% opacity.
- **Buttons**: Inline, text-based actions featuring a trailing arrow that slides right on hover in crimson.

### The Dish Drawer (Side Drawer)
- **Animation**: Slides in from the right using a spring physics configuration in `framer-motion` (`stiffness: 200, damping: 25`).
- **Layout**: 
  - Massive hero image that bleeds to the edges.
  - Two-column grid for ingredients, allergens, and spice levels.
  - Integrated AI Assistant at the bottom.
- **Responsiveness**: Full width on mobile, max-width 600px on desktop. Scroll is locked behind it when open on mobile.

### The AI Assistant (Circle Concierge)
- **Role**: Simulates a live Sommelier & Chef.
- **Design**: Encased in a custom card with rounded corners, using crimson backgrounds for user messages and translucent borders for the AI's responses.
- **Interaction**: Features a "typing" animation (three bouncing crimson dots) and pre-filled suggestion chips (e.g., "Suggest a wine pairing").

## 5. Animation Primitives (Framer Motion)
- **Fade Up**: Elements drift upwards into place while fading in. Used for staggered list reveals.
- **Spring Slides**: Used for the Side Drawer to give it physical "weight" and premium feel.
- **Slow Zooms**: Background images and card images have 1-second-plus transition durations (`duration-700` or `duration-1000`) for a cinematic feel.

## 6. CSS Utilities
- Custom scrollbar styled to match the dark/crimson theme (invisible track, crimson translucent thumb).
- Native Tailwind line-clamp utilities used to keep grid cards perfectly aligned.
