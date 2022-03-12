# File Caddy

`File Caddy` is a tool to generate a static HTML file tree browser.

## Use case

The primary motivation for this tool is to allow easy browsing of a file structure while it is inaccessible or archived in cold storage.

## Usage

1. Use the Python script to generate a `files.json` index.

```bash
python3 filecaddy.py <root directory>
```

2. Install Node dependencies.

```bash
npm install
```

3. Run development server.

```bash
npm run start
```

4. View the file browser at `http://localhost:3000`.
