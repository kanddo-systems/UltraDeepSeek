<div align="center" style="border-radius: 8px;">
  <img src="public/assets/deepseek-logo.png" alt="Project Logo" style="border-radius: 8px;" width="100" />
</div>

# Ultra DeepSeek

**Ultra DeepSeek** is a Chrome extension designed to enhance and organize the DeepSeek experience. It provides improved search capabilities, structured data visualization, and better accessibility features, allowing users to streamline their research workflow within DeepSeek.

## Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js** (recommended v14 or higher)
- **npm** or **yarn** (package manager)
- **Vite** (for building and development)
- **Google Chrome** (for testing the extension)

## Setting Up the Project

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/ultra-deepseek.git
   cd ultra-deepseek
   ```

2. **Install dependencies**:

   If using `npm`:

   ```bash
   npm install
   ```

   Or if using `yarn`:

   ```bash
   yarn install
   ```

3. **Vite Configuration**:

   Vite is pre-configured for TypeScript and Tailwind. The build process is optimized, but you can customize it as needed.

## Folder Structure

The project follows this structure:

```
/public
  /assets
    logo.png      # Project logo (shown in the README)
/manifest.json     # Chrome extension configuration
/src
  /background     # Background script (service worker)
  /content        # Content script that interacts with the pages
  /popup          # Popup of the extension, where the UI is rendered
  /styles         # Styles (using Tailwind CSS)
  /popup
      index.html      # Base HTML file for the extension
/vite.config.ts   # Vite configuration
```

- **`/public`**: Contains public assets like the logo and base HTML file.
- **`/src`**: Holds TypeScript files for the background script, content scripts, and popup.
- **`vite.config.ts`**: Vite configuration file.
- **`manifest.json`**: Chrome extension manifest file.

## Running the Extension

### 1. **Development Mode**

To run the extension in development mode, use:

```bash
npm run dev
```

Or with `yarn`:

```bash
yarn dev
```

This starts Vite in development mode. Load the extension manually in Chrome:

1. Navigate to `chrome://extensions/`
2. Enable **Developer mode** (top-right corner)
3. Click **Load unpacked**
4. Select the **`dist/`** folder

### 2. **Building for Production**

When ready to deploy, build the production version with:

```bash
npm run build
```

Or with `yarn`:

```bash
yarn build
```

This generates a `dist/` folder with the production-ready extension.

### 3. **Testing and Debugging**

After loading the extension, interact with the popup or content script. Debug using Chrome DevTools:

- **Background script**: Go to `chrome://extensions/`, locate the extension, and open the **service worker console**.
- **Popup debugging**: Click the extension icon and inspect it using **Inspect popup**.

## License

Ultra DeepSeek is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

