# SafeWhisper Adventure - Student Survey Website

An interactive, child-friendly survey website for collecting feedback from students about game preferences and companion/pet preferences.

## Features

🔊 **Audio Narration** - Questions read aloud using text-to-speech
📱 **Touch-Friendly** - Large buttons perfect for tablets and phones
🎨 **Visual Design** - Emoji and icon-based options (no reading required)
📊 **Data Collection** - Automatic response storage
⚡ **Progressive** - One question at a time with progress indicator
🌐 **Accessible** - Works on any device with a web browser

## Files

- `index.html` - Landing page with survey selection
- `game-survey.html` - Game preferences survey (6 questions)
- `friend-survey.html` - Game friend/pet preferences survey (7 questions)
- `styles.css` - All styling
- `script.js` - Interactivity, audio, and data collection
- `README.md` - This file

## How to Deploy to GitHub Pages

### Step 1: Create a New Repository

1. Go to [GitHub.com](https://github.com) and log in
2. Click the "+" icon in the top right and select "New repository"
3. Name it: `safewhisper-survey` (or any name you like)
4. Make it **Public**
5. Click "Create repository"

### Step 2: Upload Files

**Option A: Using GitHub Web Interface (Easiest)**

1. In your new repository, click "uploading an existing file"
2. Drag all files from `docs/survey-website/` folder:
   - index.html
   - game-survey.html
   - friend-survey.html
   - styles.css
   - script.js
   - README.md
3. Click "Commit changes"

**Option B: Using Git Command Line**

```bash
cd /path/to/SafeWhisperAdventure/docs/survey-website
git init
git add .
git commit -m "Initial survey website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/safewhisper-survey.git
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. In your repository, go to **Settings**
2. Scroll down to **Pages** (in the left sidebar)
3. Under "Source", select **main** branch
4. Click **Save**
5. Wait 1-2 minutes for deployment

### Step 4: Access Your Website

Your survey will be live at:
```
https://YOUR-USERNAME.github.io/safewhisper-survey/
```

For example: `https://prajaktak.github.io/safewhisper-survey/`

## How to Use the Survey

### For Students:

1. Open the website on a tablet or computer
2. Click on either "Game Survey" or "Game Friend Survey"
3. Click "🔊 Listen to Question" to hear each question
4. Tap on the pictures to answer
5. Click "Next →" to continue
6. Submit when done!

### For Teachers/Researchers:

1. Have students use tablets or computers
2. Navigate to the survey URL
3. Students can work independently (audio reads questions)
4. Each device should be used by one student at a time
5. Responses are saved automatically

## Collecting Data

Responses are stored in the browser's localStorage. To download responses:

### Method 1: Browser Console

1. Open the website
2. Press `F12` (or right-click → "Inspect")
3. Go to the **Console** tab
4. Type: `downloadResponses()`
5. Press Enter
6. A JSON file will download with all responses

### Method 2: Manual Export

1. Press `F12` (or right-click → "Inspect")
2. Go to the **Application** tab (Chrome) or **Storage** tab (Firefox)
3. Click on **Local Storage** → Your website URL
4. Find `surveyResponses` key
5. Copy the value
6. Paste into a text editor and save as `.json`

## Data Format

Responses are saved as JSON:

```json
[
  {
    "q1": "love-it",
    "q2": "phone,tablet",
    "q3": "puzzle,action,story",
    "age": "7",
    "timestamp": "2026-02-26T10:30:00.000Z",
    "surveyType": "gameSurvey"
  }
]
```

## Customization

### Change Colors

Edit `styles.css`:
- Line 9-10: Background gradient
- Line 29-30: Header gradient
- Line 95-96: Card gradient

### Add/Remove Questions

Edit `game-survey.html` or `friend-survey.html`:
1. Copy a `<div class="question">` block
2. Update `data-question` number
3. Update the question text and options
4. Update total questions in navigation logic

### Change Voice Speed

Edit `script.js` line 108:
```javascript
msg.rate = 0.85; // 0.5 = slow, 1.0 = normal, 2.0 = fast
```

## Browser Compatibility

✅ Chrome/Edge (recommended)
✅ Safari
✅ Firefox
⚠️ Text-to-speech may vary by browser/device

## Tips for Best Results

1. **Use tablets or computers** (larger screens work better)
2. **Headphones recommended** if in a classroom setting
3. **One student per device** for accurate data
4. **Test audio first** to ensure text-to-speech works
5. **Download data regularly** (localStorage can be cleared)

## Troubleshooting

**Audio not working?**
- Check device volume
- Try a different browser (Chrome recommended)
- Some devices/browsers may not support text-to-speech

**Responses not saving?**
- Check if cookies/localStorage is enabled
- Try a different browser
- Don't use private/incognito mode

**Website not loading?**
- Wait 2-3 minutes after enabling GitHub Pages
- Check the URL is correct
- Clear browser cache and reload

## Privacy & Data

- No personal information is collected
- No data is sent to external servers
- All data stays in the browser until manually downloaded
- No cookies or tracking

## Support

For issues or questions:
- Check this README
- Contact: SafeWhisper Adventure Team

## License

© 2026 SafeWhisper Adventure. For research and educational use.

---

Made with ❤️ for safer, happier kids!
