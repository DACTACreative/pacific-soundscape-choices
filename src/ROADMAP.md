# PACIFIC GAME - CRITICAL ISSUES & ACTION PLAN
## For Tomorrow's Final Development Push

### **CURRENT STATUS SUMMARY**
The Pacific Game has several critical issues preventing proper functionality in production:

1. **Answer Display Issues** - Game shows codes instead of full answer text
2. **Spider Chart Problems** - Hover not working, incorrect scoring, poor responsiveness
3. **Production vs Preview Differences** - Different behavior between environments
4. **Performance Issues** - VANTA.js tree effects causing slow loading
5. **Data Loading Failures** - CSV parsing issues in production
6. **Missing Visual Elements** - Scenario page pictures not implemented
7. **Inconsistent Scenario Structure** - Different layouts across scenario pages

### **CRITICAL ISSUES BREAKDOWN**

#### 🚨 **PRIORITY 1: GAME BREAKING ISSUES**

**1.1 Answer Display Crisis**
- **Problem**: GameScreen showing "A1", "A2" codes instead of actual answer text
- **Root Cause**: CSV parsing fails or is incomplete in production
- **Location**: `src/components/GameScreen.tsx` lines 150-200
- **Impact**: Game is unplayable - users can't understand choices
- **Fix Required**: Bulletproof CSV loading with better error handling

**1.2 Spider Chart Hover Malfunction**
- **Problem**: Hover events not working consistently, especially in production
- **Root Cause**: Chart.js event handling differs between dev/prod
- **Location**: `src/components/ThematicSpiderChart.tsx` lines 180-220
- **Impact**: Users can't see impact details for their choices
- **Fix Required**: Add touch support, improve event handling

**1.3 Production Environment Failures**
- **Problem**: Different behavior between preview and live site
- **Root Cause**: Build process differences, CDN loading issues
- **Locations**: Multiple files with external dependencies
- **Impact**: Broken user experience on deployed site
- **Fix Required**: Environment-specific configurations

#### 🔧 **PRIORITY 2: FUNCTIONALITY ISSUES**

**2.1 Spider Chart Scoring Logic**
- **Problem**: Max score should be 3, but shows 4+ for some themes
- **Expected**: 0-1=LOW, 2=MEDIUM, 3+=HIGH
- **Location**: `src/components/ThematicSpiderChart.tsx` lines 120-140
- **Fix Required**: Implement proper score capping and level mapping

**2.2 Excessive Data in Scenario End**
- **Problem**: Too much information overwhelming users
- **Location**: All scenario pages (`src/pages/Scenario*.tsx`)
- **Fix Required**: Streamline content, focus on key insights

**2.3 Blue Pacific Stories Section**
- **Problem**: Not properly organizing user choices by theme
- **Location**: `src/components/BluePacificStoriesSection.tsx`
- **Fix Required**: Better data grouping and presentation

#### 🎨 **PRIORITY 3: VISUAL & PERFORMANCE ISSUES**

**3.1 VANTA.js Tree Performance**
- **Problem**: Tree effects causing slow loading and performance issues
- **Location**: All pages with VANTA background
- **Fix Required**: Remove tree effects, use simpler animations

**3.2 Missing Scenario Images**
- **Problem**: No pictures on scenario pages as requested
- **Location**: `src/pages/Scenario*.tsx`
- **Fix Required**: Add relevant images for each scenario

**3.3 Font Consistency**
- **Problem**: Spider chart fonts don't match site design
- **Location**: `src/components/ThematicSpiderChart.tsx`
- **Fix Required**: Apply consistent Inter font family

**3.4 Responsive Design Issues**
- **Problem**: Spider chart doesn't fit all screen sizes properly
- **Location**: `src/components/ThematicSpiderChart.tsx`
- **Fix Required**: Improve responsive sizing and breakpoints

#### 📊 **PRIORITY 4: DATA & STRUCTURE ISSUES**

**4.1 Debug Panel Preloading**
- **Problem**: Debug panel shows data before user starts clicking
- **Location**: `src/components/DebugPanel.tsx`
- **Fix Required**: Only show debug info when user has made selections

**4.2 Scenario Page Inconsistency**
- **Problem**: Different structures and content across 3 scenario pages
- **Location**: `src/pages/Scenario*.tsx`
- **Fix Required**: Standardize layout and content structure

**4.3 Additional Graph Requirements**
- **Problem**: Need more data visualizations beyond spider chart
- **Suggested**: Add flooding days chart, sea level rise chart, fisheries impact
- **Location**: New components needed
- **Fix Required**: Implement additional chart components

### **ACTION PLAN FOR TOMORROW**

#### **PHASE 1: CRITICAL FIXES (2-3 hours)**
1. **Fix Answer Display**
   - Implement robust CSV loading with fallbacks
   - Add better error handling and retry logic
   - Test with network throttling

2. **Fix Spider Chart Hover**
   - Add touch/click support for mobile
   - Implement better event handling
   - Add fallback for failed interactions

3. **Fix Production Issues**
   - Implement environment-specific configurations
   - Add better error boundaries
   - Test production build locally

#### **PHASE 2: FUNCTIONALITY IMPROVEMENTS (2-3 hours)**
1. **Spider Chart Scoring**
   - Implement proper 0-1-2-3+ scoring system
   - Fix theme counting logic
   - Add proper level mapping (LOW/MEDIUM/HIGH)

2. **Streamline Scenario Content**
   - Remove excessive text sections
   - Focus on key insights and impacts
   - Improve readability and flow

3. **Fix Blue Pacific Stories**
   - Better organize user choices by theme
   - Show clear connections between choices and outcomes
   - Improve data presentation

#### **PHASE 3: VISUAL & PERFORMANCE (1-2 hours)**
1. **Remove Tree Effects**
   - Replace VANTA tree with simpler animations
   - Improve loading performance
   - Add CSS fallback animations

2. **Add Scenario Images**
   - Source appropriate images for each scenario
   - Implement responsive image loading
   - Add proper alt text for accessibility

3. **Fix Font Consistency**
   - Apply Inter font across all components
   - Ensure consistent typography
   - Fix spider chart font rendering

#### **PHASE 4: ENHANCEMENTS (2-3 hours)**
1. **Add Additional Charts**
   - Implement flooding days visualization
   - Add sea level rise projections
   - Create fisheries impact chart

2. **Standardize Scenario Pages**
   - Create consistent layout structure
   - Unify content presentation
   - Ensure responsive design

3. **Improve Debug Panel**
   - Only show when user has made selections
   - Add production-safe debug options
   - Better organize debug information

### **TESTING CHECKLIST**
- [ ] Test answer display in production
- [ ] Verify spider chart hover on mobile/desktop
- [ ] Check all scenario pages load correctly
- [ ] Ensure images display properly
- [ ] Test performance on slow connections
- [ ] Verify data loading with network issues
- [ ] Check font consistency across browsers
- [ ] Test responsive design on all devices

### **FILES TO MODIFY**
1. `src/components/GameScreen.tsx` - Fix answer display
2. `src/components/ThematicSpiderChart.tsx` - Fix hover, scoring, fonts
3. `src/components/BluePacificStoriesSection.tsx` - Improve data organization
4. `src/pages/Scenario*.tsx` - Add images, standardize structure
5. `src/components/DebugPanel.tsx` - Fix preloading issue
6. Create new chart components for additional visualizations

### **EXPECTED TIMELINE**
- **Total Time**: 7-10 hours of focused development
- **Priority 1 Issues**: Must be completed first
- **Priority 2-4**: Can be tackled in parallel if needed
- **Testing**: Allow 1-2 hours for thorough testing

### **SUCCESS METRICS**
- Game answers display properly in production
- Spider chart hover works on all devices
- All scenario pages load consistently
- Performance improved (faster loading)
- User experience is smooth and intuitive
- Debug panel only shows relevant information

---

**CRITICAL NOTE**: Focus on Priority 1 issues first - these are game-breaking and must be fixed before launch. The other priorities can be addressed based on available time.