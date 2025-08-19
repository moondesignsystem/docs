This repository contains the source code for the official documentation website for the ***Moon Design System**.

Live documenation can be found at [www.moon.io](https://moon.io/)

Moon is our open-source design system, built to help product teams build better digital experiences. This site serves as the central resource for design documentation and technical specifications.

## Running the site locally

For builders looking to contribute to the documentation, follow these steps to run the site locally:

**Prerequisites:**
- Node.js (version 18 or higher)
- Yarn (or npm)

### 1. Clone and Install Dependencies:

```bash
git clone https://github.com/coingaming/moon-docs.git
cd moon-docs
yarn install
```

### 2. Run the Development Server:

```bash
yarn dev
```

The site will now be available at `http://localhost:3000`.

## How to contribute

All documentation content is written in MDX. You can find the content files in the `app/contents` directory. Simply edit the relevant .mdx file and the local development server will automatically reload with your changes.

## Tech stack

This documentation site is built using:

- Next.js (App Router)
- React & TypeScript
- Tailwind CSS
- MDX for content
