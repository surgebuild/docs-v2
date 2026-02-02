# Documentation Contribution Guide

This guide provides a brief overview of the project structure and instructions on how to update the documentation,

## 1. Setup

**Prerequisites:**

- Node.js (Latest stable version recommended)
- pnpm (Package manager)

**Installation:**

1. Clone the repository.
2. Install dependencies:

    ```bash
    pnpm install
    ```

**Running Locally:**
Start the development server to preview your changes:

```bash
pnpm run dev
```

The docs will be available at `http://localhost:5173` (check terminal for exact port).

---

## 2. Project Structure

Here are the key files and folders you need to know:

- **`docs/pages/`**: Contains the actual documentation content. Each file usually corresponds to a page.
  - Files are written in **MDX** (Markdown).
  - Example: `docs/pages/overview/bitcoin-lending-landscape.mdx`.
- **`docs/public/`**: Stores static assets like images.
  - Images put here are valid at the root path `/`.
  - Example: `docs/public/assets/image.png` is accessible as `/assets/image.png`.
- **`vocs.config.ts`**: The main configuration file.
  - Controls the **Sidebar Navigation**, **Top Navigation**, **Logo**, **Theme**, and **Social Links**.
- **`styles.css`**: Global custom CSS styles.

---

## 3. How to Update Content

### Editing Existing Pages

1. Navigate to `docs/pages/`.
2. Find the `.mdx` file corresponding to the page you want to edit.
3. Make your changes using standard Markdown syntax.
4. Save the file; the local development server will hot-reload the changes.

### Adding a New Page

1. Create a new `.mdx` file in the appropriate subdirectory within `docs/pages/`.
    - Example: `docs/pages/new-feature/introduction.mdx`.
2. Add content to the file.

### Adding Images

1. Place your image file in `docs/public/assets/` (create the folder if it doesn't exist or use `docs/public/images/`).
    - Recommended path: `docs/public/assets/my-image.png`.
2. Reference it in your markdown file:

    ```markdown
    ![Image Description](/assets/my-image.png)
    ```

---

## 4. Updating Navigation (Sidebar)

To add your new page to the sidebar or change the order:

1. Open `vocs.config.ts`.
2. Locate the `sidebar` object.
3. Add or modify entries. The `link` property should match the file path relative to `docs/pages` (excluding `.mdx`).

**Example:**
If you created `docs/pages/tech/new-feature.mdx`, add this to the `sidebar`:

```typescript
{
  text: "New Feature",
  link: "/tech/new-feature", // Corresponds to docs/pages/tech/new-feature.mdx
}
```
