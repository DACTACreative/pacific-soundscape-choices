# UI/UX Guidelines - Choose Your Pacific Future

## Design Philosophy

The visual design reflects the Pacific's natural beauty while maintaining scientific credibility and emotional resonance. The interface should feel immersive yet accessible, honoring both traditional Pacific aesthetics and modern data visualization standards.

## Color Palette & Theme

### Primary Colors (HSL Values)
- **Ocean Blue**: `hsl(220, 70%, 45%)` - Primary brand color
- **Pacific Teal**: `hsl(180, 50%, 40%)` - Secondary accent
- **Coral Orange**: `hsl(15, 80%, 55%)` - Warning/attention states
- **Deep Navy**: `hsl(220, 30%, 15%)` - Text and backgrounds
- **Island Green**: `hsl(120, 40%, 35%)` - Success/positive indicators

### Semantic Color Usage
```css
/* Use semantic tokens from index.css */
background: hsl(var(--background));
color: hsl(var(--foreground));
border: hsl(var(--border));

/* Theme-specific overrides */
.scenario-low { --accent: hsl(120, 40%, 35%); }
.scenario-medium { --accent: hsl(45, 70%, 50%); }
.scenario-high { --accent: hsl(15, 80%, 55%); }
```

## Typography

### Font Hierarchy
- **Primary Font**: Inter (from Google Fonts)
- **Display Font**: Inter 600/700 for headings
- **Body Font**: Inter 400 for regular text
- **Code Font**: JetBrains Mono for technical content

### Font Sizes (Tailwind Classes)
- **Hero**: `text-4xl md:text-6xl` (36-60px)
- **H1**: `text-3xl md:text-4xl` (30-36px)
- **H2**: `text-2xl md:text-3xl` (24-30px)
- **H3**: `text-xl md:text-2xl` (20-24px)
- **Body**: `text-base md:text-lg` (16-18px)
- **Small**: `text-sm` (14px)
- **Caption**: `text-xs` (12px)

### Font Loading
```html
<!-- In index.html -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

## Layout Principles

### Grid System
- **Mobile First**: Design for 375px+ screens
- **Breakpoints**: sm(640px), md(768px), lg(1024px), xl(1280px)
- **Container**: Max-width 1200px with responsive padding
- **Spacing**: Use Tailwind's 4px grid (space-4, space-6, space-8, etc.)

### Component Spacing
```css
/* Standard spacing patterns */
.section-padding { @apply py-12 md:py-20; }
.container-padding { @apply px-4 md:px-6 lg:px-8; }
.card-padding { @apply p-6 md:p-8; }
.button-padding { @apply px-6 py-3 md:px-8 md:py-4; }
```

## Interactive Elements

### Buttons
- **Primary**: Ocean blue background, white text, subtle shadow
- **Secondary**: Transparent background, colored border and text
- **Hover States**: Slight opacity change (0.9) and scale (0.98)
- **Active States**: Deeper shadow, scale (0.95)
- **Focus**: Visible outline for keyboard navigation

```tsx
// Primary button example
<Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
  Choose This Path
</Button>
```

### Form Elements
- **Inputs**: Subtle border, focus states with color transition
- **Validation**: Clear error messaging in coral color
- **Labels**: Always visible and descriptive

### Cards and Containers
- **Background**: Semi-transparent overlays on ocean imagery
- **Borders**: Subtle, often using border-opacity
- **Shadows**: Soft, multi-layered for depth
- **Rounded Corners**: Consistent border-radius (8px-16px)

## Motion and Animation

### Transitions
- **Duration**: 200ms for micro-interactions, 400ms for page transitions
- **Easing**: `cubic-bezier(0.4, 0, 0.2, 1)` for natural feel
- **Hover**: Scale and opacity changes
- **Loading**: Gentle pulse animations

### Audio Visual Sync
- **Audio Loading**: Visual indicators that sync with audio preload states
- **Scenario Transitions**: Fade audio while transitioning visuals
- **Interactive Feedback**: Subtle audio cues for button clicks

## Responsive Design

### Mobile Considerations
- **Touch Targets**: Minimum 44px tap targets
- **Text Size**: Never below 16px to prevent zoom on iOS
- **Audio Controls**: Large, accessible play/pause buttons
- **Navigation**: Simplified menu structures

### Tablet Adaptations
- **Layouts**: Two-column where appropriate
- **Charts**: Optimized sizing for landscape/portrait
- **Audio**: Consider device capabilities

### Desktop Enhancements
- **Hover States**: Rich interactions unavailable on mobile
- **Keyboard Navigation**: Full accessibility support
- **Multi-column**: Utilize available screen real estate

## Data Visualization

### Chart Styling
- **Colors**: Use semantic palette, avoid clashing combinations
- **Typography**: Match site fonts (Inter family)
- **Interactivity**: Hover states, tooltips, click handlers
- **Responsive**: Scale appropriately across devices

### Icons and Symbols
- **Source**: Lucide React icon library
- **Size**: Consistent sizing (16px, 20px, 24px)
- **Color**: Inherit text color unless specifically themed
- **Accessibility**: Always paired with text labels

## Accessibility Standards

### WCAG Compliance
- **Color Contrast**: Minimum 4.5:1 for normal text, 3:1 for large text
- **Focus Management**: Visible focus indicators
- **Alt Text**: Descriptive for all images and icons
- **Keyboard Navigation**: Full application usable without mouse

### Audio Accessibility
- **Captions**: Consider future implementation for audio content
- **Volume Control**: User-controllable audio levels
- **Visual Indicators**: Show audio state for hearing-impaired users

## Component Standards

### Consistency Rules
1. **Naming**: Use descriptive, semantic class names
2. **Spacing**: Follow Tailwind's spacing scale consistently
3. **States**: Define hover, focus, active, and disabled states
4. **Variants**: Create reusable component variants
5. **Props**: Type all component props with TypeScript

### Reusable Patterns
```tsx
// Example reusable pattern for cards
interface CardProps {
  variant?: 'default' | 'scenario' | 'question';
  children: React.ReactNode;
}

const Card = ({ variant = 'default', children }: CardProps) => {
  const baseClasses = "rounded-lg shadow-lg p-6 backdrop-blur-sm";
  const variantClasses = {
    default: "bg-white/90 border border-gray-200",
    scenario: "bg-blue-900/80 border border-blue-400/30 text-white",
    question: "bg-gray-50/95 border border-gray-300"
  };
  
  return (
    <div className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </div>
  );
};
```

## Testing Guidelines

### Visual Testing
- Test on actual devices, not just browser dev tools
- Verify color contrast in different lighting conditions
- Check font rendering across browsers
- Validate animation performance on lower-end devices

### Interaction Testing
- Test all touch interactions on mobile devices
- Verify keyboard navigation works throughout
- Check audio playback across different browsers
- Validate form submissions and error states

## Future Considerations

### Scalability
- Design system should accommodate new question types
- Color palette should scale to additional scenarios
- Component library should support future features

### Internationalization
- Consider RTL language support in layout design
- Plan for longer text translations in buttons/labels
- Ensure icons are culturally appropriate across regions