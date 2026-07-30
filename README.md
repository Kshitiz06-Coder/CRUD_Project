# React CRUD Starter

A clean, minimal React application demonstrating full CRUD operations (Create, Read, Update, Delete) using [JSONPlaceholder](https://jsonplaceholder.typicode.com/) as a dummy REST API. Built with **Vite**, **React**, **React Router**, **Axios**, and **Tailwind CSS**.

---

## Contributors

- **Sarthak Thapa**(https://github.com/Sarthak05-code)
- **Kshitiz Khatiwada**(https://github.com/Kshitiz06-Coder)

---

## Features

- **Create** — Add new posts via a form
- **Read** — View all posts in a list and view individual post details
- **Update** — Edit existing posts
- **Delete** — Remove posts with confirmation
- Responsive UI styled with Tailwind CSS
- Client-side routing with React Router

---

## Tech Stack

| Technology                                               | Purpose                     |
| -------------------------------------------------------- | --------------------------- |
| [React](https://react.dev/)                              | UI library                  |
| [Vite](https://vitejs.dev/)                              | Build tool & dev server     |
| [React Router](https://reactrouter.com/)                 | Client-side routing         |
| [Axios](https://axios-http.com/)                         | HTTP client for API calls   |
| [Tailwind CSS](https://tailwindcss.com/)                 | Utility-first CSS framework |
| [JSONPlaceholder](https://jsonplaceholder.typicode.com/) | Fake REST API               |

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [pnpm](https://pnpm.io/) package manager

> Install pnpm globally if you haven't already:
>
> ```bash
> npm install -g pnpm
> ```

---

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/YOUR_USERNAME/react-crud-starter.git
   cd react-crud-starter
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start the development server**

   ```bash
   pnpm dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:5173](http://localhost:5173)

---

## Available Scripts

| Command        | Description                          |
| -------------- | ------------------------------------ |
| `pnpm dev`     | Start the Vite development server    |
| `pnpm build`   | Build the app for production         |
| `pnpm preview` | Preview the production build locally |
| `pnpm lint`    | Run ESLint (if configured)           |

---

## Project Structure

```
react-crud-starter/
├── public/
│   └── vite.svg
├── src/
│   ├── api/
│   │   └── postService.js       # All API calls (GET, POST, PUT, DELETE)
│   ├── components/
│   │   ├── Navbar.jsx           # Top navigation bar
│   │   ├── PostList.jsx         # List all posts (GET all)
│   │   ├── PostDetail.jsx       # Single post view (GET by ID)
│   │   ├── PostForm.jsx         # Create new post (POST)
│   │   └── PostEditForm.jsx     # Edit existing post (PUT)
│   ├── pages/
│   │   ├── HomePage.jsx         # Homepage wrapper
│   │   ├── PostPage.jsx         # Detail page wrapper
│   │   ├── CreatePostPage.jsx   # Create page wrapper
│   │   └── EditPostPage.jsx     # Edit page wrapper
│   ├── App.jsx                  # Router configuration
│   ├── main.jsx                 # Entry point
│   └── index.css                # Tailwind directives + base styles
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md
```

---

## API Integration

This project consumes the [JSONPlaceholder](https://jsonplaceholder.typicode.com/) fake REST API.

| Method   | Endpoint     | Description               |
| -------- | ------------ | ------------------------- |
| `GET`    | `/posts`     | Fetch all posts           |
| `GET`    | `/posts/:id` | Fetch a single post by ID |
| `POST`   | `/posts`     | Create a new post         |
| `PUT`    | `/posts/:id` | Update an existing post   |
| `DELETE` | `/posts/:id` | Delete a post             |

> **Note:** JSONPlaceholder is a mock API. It returns realistic responses but does not persist changes on the server. The UI updates locally to reflect changes.

---

## Components Overview

### `Navbar`

- Responsive top navigation with links to Home and Create Post pages.

### `PostList`

- Fetches and displays the first 10 posts from the API.
- Each card shows the title, a body excerpt, and action buttons.
- Includes **Edit** and **Delete** buttons for each post.

### `PostDetail`

- Fetches a single post based on the `:id` route parameter.
- Displays the full title and body content.
- Includes **Edit Post** and **Delete Post** action buttons.

### `PostForm`

- Controlled form for creating a new post.
- Validates that title and body are not empty.
- On success, shows a confirmation message and redirects to the home page.

### `PostEditForm`

- Pre-populates the form with existing post data fetched by ID.
- Controlled form for updating the post title and body.
- On success, redirects back to the post detail page.

---

## Routing

| Route       | Page             | Description           |
| ----------- | ---------------- | --------------------- |
| `/`         | `HomePage`       | List of all posts     |
| `/post/:id` | `PostPage`       | View a single post    |
| `/create`   | `CreatePostPage` | Create a new post     |
| `/edit/:id` | `EditPostPage`   | Edit an existing post |

---

## Styling

All styling is done with **Tailwind CSS** utility classes. No custom CSS files are required beyond the Tailwind directives in `src/index.css`.

Key Tailwind patterns used:

- `max-w-4xl mx-auto px-4` for centered responsive containers
- `bg-white rounded-xl shadow-sm border` for card styling
- `hover:bg-blue-700 transition` for interactive states
- `focus:ring-2 focus:ring-blue-500` for accessible form focus states

---

## Authors

- **[Sarthak Thapa]** — GET all, GET by ID, POST operations, project setup, Tailwind integration
- **[Kshitiz Khatiwada]** — PUT and DELETE operations, Edit page, button handlers

---

## License

This project is for educational purposes. Feel free to use it as a starter template for your own React CRUD projects.

---

## Acknowledgments

- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) for the free fake REST API
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first styling framework
- [Vite](https://vitejs.dev/) for the blazing fast dev experience
