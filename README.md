Visit the live site: [https://kachunl.github.io/dg-landing/](https://kachunl.github.io/dg-landing/)

## Prerequisites

- Node.js 18+
- npm or yarn

## Installation

### 1. Clone the repository:
```bash
git clone https://github.com/kachunl/dg-landing.git
cd dg-landing
```

### 2. Install dependencies:
```bash
npm install
# or
yarn install
```

### 3. Create environment file:
```bash
# Copy the example env file
cp .env.example .env.local
```

### 4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

### 5. Open your browser
Open [http://localhost:3000](http://localhost:3000) in your browser.

## Manual Deployment

1. **Build the static export:**
   ```bash
   npm run build
   ```

2. **Locate built files:**
   The built files will be in the `out/` directory

3. **Deploy:**
   Deploy the `out/` directory to your static hosting service