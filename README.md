# Friday Night Funkin' Browser Mod List

A single-page web app that aggregates dozens of Friday Night Funkin' browser mods and makes them easy to preview and launch from one place. The interface is built with vanilla HTML, Bootstrap 5, and a small amount of custom JavaScript and CSS.

## Features

- **Mod catalog grid** – Every mod from `scripts/fnf-mod-list.js` is rendered into a responsive CSS grid that scales from mobile through desktop layouts.
- **Quick launch modal** – Clicking a card opens the selected mod inside a Bootstrap modal with an embedded iframe player.
- **Fullscreen toggle** – A "Full Screen" button expands the modal to fill the viewport and toggles back to the default size.
- **Customization controls** – A floating gear icon opens a settings modal where you can change the page background color and the gap between grid items. Settings persist via `localStorage`.
- **Graceful image fallbacks** – If a preview image fails to load, it is automatically replaced with a placeholder asset.

## Project structure

```text
FNF-Mod_List.html   # Main entry point – open this file in a browser to use the app
scripts/
  fnf-mod-list.js   # Populates the mod grid, handles modal behavior, and saves user settings
styles/
  fnf-mod-list.css  # Layout, modal, and customization styles
```

Preview assets referenced in the JavaScript are expected to live in `Assets/images/` relative to the HTML file. The repository mirrors the original project structure, so ensure those assets are present when deploying.

## Getting started

1. Clone the repository:

   ```bash
   git clone https://github.com/<your-account>/fnf-mod-list.git
   cd fnf-mod-list
   ```

2. Open `FNF-Mod_List.html` in a modern browser (Chrome, Firefox, Edge, etc.). No build step or web server is required because the site is entirely static.

### Running via a local web server (optional)

If your browser blocks iframe content when opening local files, serve the directory with a simple HTTP server:

```bash
# Python 3
python -m http.server 8000

# Then visit http://localhost:8000/FNF-Mod_List.html
```

### Publishing to GitHub Pages

Hosting the site on GitHub Pages only takes a few clicks once the code lives in your own repository:

1. Fork or push the project into a repository on your GitHub account.
2. Commit and push any customizations (new mods, CSS tweaks, etc.).
3. In the GitHub UI, navigate to **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, select your default branch (e.g., `main`) and the `/` (root) directory, then click **Save**.
5. Wait for the deployment banner at the top of the repository to confirm the site build finished, then follow the provided URL (typically `https://<username>.github.io/<repository>/`).

If you organize assets into additional folders, make sure their relative paths remain correct after the Pages build. For custom domains, add the DNS records GitHub provides and place your domain in a `CNAME` file at the repository root.

## Customizing and extending

### Adding a new mod card

1. Edit `scripts/fnf-mod-list.js`.
2. Append a new object to the `mods` array with `name`, `href`, and `img` keys:

   ```js
   {
     name: "My Custom Mod",
     href: "https://example.com/path/to/mod/",
     img: "../Assets/images/My_Custom_Mod_preview.png"
   }
   ```

3. Save the file and refresh the page – the new mod appears automatically.

### Updating styles

All layout and interactive styling lives in `styles/fnf-mod-list.css`. Edit the relevant selectors (e.g., `.mod-grid`, `.mod-item`, `.fullscreen-modal`) to tweak spacing, hover effects, or modal behavior.

## Dependencies

External libraries are loaded via CDN links in `FNF-Mod_List.html`:

- [Bootstrap 5.3](https://getbootstrap.com/) (CSS & JavaScript) for layout, modal, and component styling.
- [Font Awesome 5.14](https://fontawesome.com/) for the gear icon.
- [jQuery 3.5.1](https://jquery.com/) (currently unused directly in custom scripts but included by the original project).

No additional package installation is required.

## Browser support

The app targets evergreen browsers that support ES6 modules and `localStorage`. Tested in recent versions of Chrome and Firefox.

## Contributing

Contributions that add new mods, improve styling, or enhance functionality are welcome!

1. Fork the project and create a feature branch.
2. Commit your changes with clear messages.
3. Open a pull request describing the updates and any testing performed.

## License

This project retains the licensing terms of the original source. If you intend to redistribute or host the mod files, ensure you respect the licenses of the individual mods and external assets.
