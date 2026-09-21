# Preethi Gutti - Personal Portfolio

A sleek, responsive, and modern cybersecurity & software engineering portfolio website designed for Preethi Gutti, CSE (Cyber Security) undergraduate at GITAM University, Visakhapatnam.

---

## 🌟 Overview & Highlights

- **Aesthetic**: Deep navy/near-black theme with high-contrast electric cyan highlights, subtle glassmorphism, thin cyber borders, and elegant glow effects.
- **Hero Canvas**: Custom interactive telemetry visualizer rendering dynamic nodes, packet pulse routing, and mouse reticle tracking in vanilla HTML5 Canvas.
- **Architecture**: 100% pure semantic HTML5, modern CSS3 variables, and vanilla JavaScript (no npm, no node dependencies, no build steps required).
- **GitHub Pages Ready**: Zero build configuration needed. Simply push this directory to a GitHub repository and turn on GitHub Pages in repository settings.
- **Fully Responsive**: Optimized fluid typography and flex/grid layouts across 4K displays, desktops, tablets, and smartphones.
- **Zero Hallucination / Accurate**: Built strictly with the provided academic profile, CGPA (8.58/10), projects, and coursework.

---

## 📂 Project Structure

```
preethi-portfolio/
├── index.html            # Main semantic HTML5 single-page application
├── css/
│   └── style.css         # Complete design system, dark palette, animations & responsive queries
├── js/
│   ├── main.js           # ScrollSpy, mobile hamburger menu, copy toast, back-to-top button
│   └── cyber-canvas.js   # Interactive HTML5 Canvas cybersecurity network visualizer
├── assets/
│   └── favicon.svg       # Vector cyber shield favicon
└── README.md             # Documentation & deployment guide
```

---

## 🚀 How to Run Locally

### Using Python (Built-in)
Run the following command in PowerShell or Terminal inside the `preethi-portfolio` directory:
```bash
python -m http.server 8000
```
Then open your browser and navigate to:
```
http://localhost:8000
```

---

## 🌐 How to Publish to GitHub Pages

1. Initialize git and commit:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio release"
   ```
2. Link your GitHub repository:
   ```bash
   git branch -M main
   git remote add origin https://github.com/preethig7/<repo-name>.git
   git push -u origin main
   ```
3. In your GitHub repository:
   - Go to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
   - Select branch `main` and folder `/ (root)`.
   - Click **Save**.
   Your website will be live at `https://preethig7.github.io/<repo-name>/`.
