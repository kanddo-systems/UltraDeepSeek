<div align="center">
  <img src="public/assets/logo.png" alt="Project Logo" style="border-radius: 8px;" width="100" />
</div>

This project is a basic template for creating **Google Chrome extensions** using **Vite**, **TypeScript**, and **Tailwind CSS**. It provides a modular and organized base to help you start building your own extension efficiently.

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (recommended v14 or higher)
- **npm** or **yarn** (package manager)
- **Vite** (for building and development)
- **Google Chrome** to test the extension

## Setting Up the Project

1. **Clone or download the repository**:

   ```bash
   git clone https://github.com/your-username/your-repository.git
   cd your-repository
   ```

2. **Install the dependencies**:

   If using `npm`:

   ```bash
   npm install
   ```

   Or if using `yarn`:

   ```bash
   yarn install
   ```

3. **Vite Configuration**:
   
   Vite is already set up for TypeScript and Tailwind. The build and development process is optimized, and you can customize it as needed.

## Folder Structure

The project is organized as follows:

```
/public
  /assets
    logo.png      # Project logo (shown in the README)
/manifest.json     # Chrome extension configuration
  index.html      # Base HTML file for the extension
/src
  /content        # Content script that interacts with the pages
  /popup          # Popup of the extension, where the UI is rendered
  /styles         # Styles (using Tailwind CSS)
  /background.ts  # Background script (service worker)
/vite.config.ts   # Vite configuration

```

- **`/public`**: Contains public files for the extension, like the logo and base HTML file.
- **`/src`**: Contains TypeScript files (background, content script, popup) and CSS/Tailwind.
- **`vite.config.ts`**: Vite configuration file.
- **`manifest.json`**: Configuration file for the Chrome extension.

## Testing the Extension

### 1. **Running the Project in Development Mode**

During development, you can run the extension locally. To do so, use the following command:

```bash
npm run dev
```

Or, if you're using `yarn`:

```bash
yarn dev
```

This will start Vite in development mode, and you can see the extension in the browser by going to `chrome://extensions/`.

### 2. **Building the Extension for Production**

Once you're done with development and want to test the final version of the extension, you need to build it. Run the following command:

```bash
npm run build
```

Or, if you're using `yarn`:

```bash
yarn build
```

This will create the production-ready version of the extension in the **`dist/`** folder. You’ll need to manually load this folder in **Google Chrome** to test the extension.

### 3. **Loading the Extension in Chrome**

1. Go to `chrome://extensions/` in Google Chrome.
2. Enable **Developer mode** in the top-right corner.
3. Click on **"Load unpacked"**.
4. Select the **`dist/`** folder that was generated after the build.
5. Your extension will now be available for testing directly in the browser.

### 4. **Testing and Debugging**

After loading the extension, you can click on the extension's icon in the browser to interact with the popup or the content script. You can also inspect the background script and popup through the Chrome developer tools.

- To open the background console, go to `chrome://extensions/`, find your extension, and click on **"service worker"** to inspect the background script.
- To inspect the popup, click on the extension icon and use the **Inspect popup** option in the extension menu.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.