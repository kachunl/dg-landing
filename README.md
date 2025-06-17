Visit the live site: https://kachunl.github.io/dg-landing/

***Prerequisites:***

Node.js 18+
npm or yarn

***Installation:***

**Clone the repository:**

git clone https://github.com/kachunl/dg-landing.git
cd dg-landing

**Install dependencies:**

npm install
# or
yarn install

**Create environment file:**

# Copy the example env file
cp .env.example .env.local

**Start the development server:**

npm run dev
# or
yarn dev

**Open http://localhost:3000 in your browser.**

***Manual deployment:***

Build the static export: npm run build
The built files will be in the out/ directory
Deploy the out/ directory to your static hosting service