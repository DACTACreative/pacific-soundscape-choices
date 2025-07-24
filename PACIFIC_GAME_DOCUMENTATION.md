# Choose Your Pacific Future - Game Documentation

## Overview
Interactive climate game for Pacific Islands with sound-driven storytelling.

## Audio Files Needed
Please upload these audio files to replace the placeholders:

### Current/Ambient Audio
- `public/audio/ambient.mp3` - Current tide sounds (peaceful ocean)

### Scenario Audio Files  
- `public/audio/scenario-low.mp3` - Scenario 1 Tide (sustainable future)
- `public/audio/scenario-medium.mp3` - Scenario 2 Tide (moderate impact)  
- `public/audio/scenario-high.mp3` - Scenario 3 Tide (high impact/crisis)

## Content Pages
The following pages contain editable scenario content:

- `/scenario-1` - Low emissions scenario content
- `/scenario-2` - Medium emissions scenario content  
- `/scenario-3` - High emissions scenario content

## Game Mechanics
- 10 questions with 2 choices each
- Dual scoring: Mitigation + Resilience
- 6 possible outcome combinations
- Audio transitions based on final scenario

## Technical Structure
- React + TypeScript
- Tailwind CSS with ocean theme
- Audio management with fade transitions
- Responsive design for mobile/desktop

## Data Files
- `src/data/questions.json` - Game questions
- `src/data/outcomes.json` - Scenario narratives  
- `src/data/dashboard.json` - 2050 metrics

## How to Edit Content
1. Navigate to scenario pages to edit narratives
2. Update JSON files for questions/metrics
3. Replace audio files with your recordings
4. Test game flow after changes