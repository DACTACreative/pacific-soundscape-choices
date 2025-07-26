# Choose Your Pacific Future - Interactive Climate Game

A sound-driven, data-informed interactive experience that puts users in charge of Pacific climate choices and shows their consequences by the year 2050.

## About This Project

Choose Your Pacific Future is an interactive climate decision-making game focused on Pacific Island nations. Users make 11 critical policy decisions that influence climate outcomes, with each choice dynamically affecting indicators like sea level rise, coral health, and community resilience. The experience culminates in one of three 2050 scenarios, each accompanied by authentic ocean audio recordings.

## Technologies Used

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn-ui components
- **Audio**: Howler.js for immersive soundscapes
- **Charts**: Chart.js, Recharts for data visualization
- **Routing**: React Router for multi-page experience

## Project Structure

```
src/
├── components/          # React components
│   ├── GameScreen.tsx   # Main game logic and question flow
│   ├── IntroScreen.tsx  # Landing page and introduction
│   ├── ResultScreen.tsx # Outcome display and data visualization
│   └── ui/             # Reusable UI components
├── data/               # Game content and configuration
│   ├── questions.json   # All 11 game questions
│   ├── outcomes.json    # Scenario descriptions for 2050
│   ├── answers.json     # Answer options with themes and impacts
│   └── dashboard.json   # Key indicators and data points
├── pages/              # Route components
│   ├── Index.tsx        # Main game page
│   ├── Scenario1.tsx    # Low warming outcome (< 1.5°C)
│   ├── Scenario2.tsx    # Medium warming outcome (~2°C)
│   └── Scenario3.tsx    # High warming outcome (> 2.5°C)
└── context/            # Application state management
    └── AudioContext.tsx # Audio playback management

public/
├── audio/              # Scenario-specific ocean recordings
│   ├── scenario-low.mp3
│   ├── scenario-medium.mp3
│   └── scenario-high.mp3
└── data/               # CSV data files for visualizations
    ├── sea-level-data.csv
    └── flooding-data.csv
```

## Game Flow

1. **Introduction**: User reads about Pacific climate challenges
2. **Decision Making**: 11 questions covering energy, governance, adaptation, etc.
3. **Scoring**: Choices are weighted across mitigation and resilience themes
4. **Outcome**: User is directed to one of three 2050 scenarios based on their decisions
5. **Audio Experience**: Each scenario plays authentic Fiji tide recordings

## JSON File Structure

### questions.json
```json
[
  {
    "QuestionCode": "Q1",
    "Question": "Question text...",
    "options": ["A1", "B1"]
  }
]
```

### answers.json
```json
[
  {
    "code": "A1",
    "theme": "Social Cohesion",
    "answer": "Full answer text...",
    "narrative": "Story consequence...",
    "impact": "Immediate impact...",
    "outcome": "Long-term outcome..."
  }
]
```

### outcomes.json
```json
{
  "low": "Best case scenario description...",
  "medium": "Moderate scenario description...",
  "high": "Worst case scenario description..."
}
```

### dashboard.json
```json
{
  "low": {
    "seaLevel": "15cm rise by 2050",
    "coralHealth": "70% reefs healthy",
    "displacement": "Minimal relocation needed"
  }
}
```

## Development Setup

### Prerequisites
- Node.js 18+ and npm
- Git

### Local Development
```bash
# Clone the repository
git clone <REPOSITORY_URL>
cd <PROJECT_NAME>

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Testing Audio
- Ensure audio files are properly placed in `public/audio/`
- Test on multiple browsers and devices
- Verify mobile autoplay policies are handled

### Updating Game Content

**To modify questions:**
1. Edit `src/data/questions.json`
2. Ensure QuestionCode matches options in `answers.json`

**To update answer options:**
1. Edit `src/data/answers.json`
2. Maintain consistent theme categorization
3. Update narrative and impact text

**To adjust scenarios:**
1. Edit `src/data/outcomes.json` for scenario descriptions
2. Update `src/data/dashboard.json` for indicator values
3. Modify scenario pages in `src/pages/Scenario*.tsx`

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to GitHub Pages
```bash
# Build the project
npm run build

# Deploy to gh-pages branch
npm run deploy
```

**Note**: Update the base URL in `vite.config.ts` for proper GitHub Pages deployment.

### Environment Variables
No environment variables required for basic deployment.

## Browser Support

- Modern browsers with ES6+ support
- Mobile Safari and Chrome (audio autoplay considerations)
- Desktop: Chrome, Firefox, Safari, Edge

## Performance Considerations

- Audio files are preloaded for smooth transitions
- Large data visualizations use lazy loading
- Mobile-optimized touch interactions
- Responsive design for all screen sizes

## Data Sources

This game incorporates data from:
- Pacific Data Hub
- IPCC Climate Reports
- NASA Sea Level Projections
- Fiji Government Climate Assessments

## Contributing

See `docs/next-dev-actionables.md` for current development priorities and known issues.

## License

[License information to be added]