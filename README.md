# Alumni Connect - AI-Powered Ride Pooling System

A fully automated ride pooling system where AI agents orchestrate every step from request parsing to reminder delivery. Features automatically generated rider groups, optimized routes, cost splitting, and QR pickup passes.

## 🚀 Features

- **Automated Pooling**: AI agents automatically match riders and form groups overnight
- **Optimized Routes**: Computes optimal pickup sequences with distance-based pricing
- **QR Tickets**: Auto-generated QR passes for each rider with pickup details
- **Real-time Dashboard**: View today's pools and yesterday's completed rides
- **Agent Pipeline**: Full walkthrough of the parse → match → route → price → ticket → reminders pipeline

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with server-side rendering
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React QR Code** - QR code generation

### Backend
- **FastAPI** - High-performance Python web framework
- **Pydantic** - Data validation
- **Uvicorn** - ASGI server

### AI/ML (Integration Ready)
- **CrewAI / TaskWeaver** - Agent orchestration framework
- **Groq** - LLM provider
- **CLIP** - Image understanding
- **Stable Diffusion / SDXL** - Image generation for maps
- **Whisper / Coqui** - Text-to-speech

### Infrastructure
- **Supabase** - Database and file storage
- **Railway** - Cron jobs and backend hosting
- **Vercel** - Frontend hosting

## 📁 Project Structure

```
alumni-connect/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── TodayPools.tsx
│   ├── YesterdayPools.tsx
│   └── AgentPipeline.tsx
├── backend/               # FastAPI backend
│   ├── main.py           # API endpoints
│   ├── orchestrator.py   # Agent orchestrator
│   ├── requirements.txt
│   └── Dockerfile
├── public/               # Static assets
├── package.json
├── tailwind.config.js
├── next.config.js
├── Dockerfile            # Frontend Dockerfile
├── docker-compose.yml
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.11+
- **Git** (for deployment)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/alumni-connect.git
cd alumni-connect
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
cp env.example .env
```

Or create it manually:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 3. Install Dependencies

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cd ..
```

### 4. Run Locally

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate
uvicorn main:app --reload
```

Backend runs on: `http://localhost:8000`

**Terminal 2 - Frontend:**
```bash
npm run dev
```

Frontend runs on: `http://localhost:3000`

### 5. View the Application

Open your browser to: `http://localhost:3000`

## 🌐 Deployment

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/alumni-connect.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy Backend (Railway)

1. Go to [railway.app](https://railway.app) and sign in with GitHub
2. Click "Start a New Project" → "Deploy from GitHub repo"
3. Select your `alumni-connect` repository
4. Configure service:
   - Go to **Settings** → **Root Directory** → Enter: `backend`
   - Click **Save**
5. Get your backend URL:
   - **Settings** → **Networking** → **Generate Domain**
   - Copy the URL (e.g., `https://xxx.railway.app`)

### Step 3: Deploy Frontend (Vercel)

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "Add New" → "Project"
3. Import your `alumni-connect` repository
4. Add Environment Variable:
   - **Key:** `NEXT_PUBLIC_API_URL`
   - **Value:** Your Railway backend URL
   - **Environments:** Select all (Production, Preview, Development)
5. Click **Deploy**

### Step 4: Update CORS

Edit `backend/main.py` and update CORS settings:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://your-app.vercel.app",  # Your Vercel URL
        "https://*.vercel.app",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

Commit and push:
```bash
git add backend/main.py
git commit -m "Update CORS for production"
git push
```

Railway will automatically redeploy with the new CORS settings.

## 🔧 Configuration

### Environment Variables

**Local Development (`.env` file):**
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**Production (Railway Variables):**
```env
ENV=production
SUPABASE_URL=your_supabase_url (optional)
SUPABASE_KEY=your_supabase_key (optional)
GROQ_API_KEY=your_groq_key (optional)
```

**Production (Vercel Environment Variables):**
```env
NEXT_PUBLIC_API_URL=https://your-backend.railway.app
```

## 🔑 API Keys (Optional Services)

### Supabase (Database & Storage)

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to **Settings** → **API**
4. Copy **Project URL** and **anon/public key**
5. Add to Railway Variables: `SUPABASE_URL`, `SUPABASE_KEY`

### Groq (AI/LLM Provider)

1. Go to [console.groq.com](https://console.groq.com)
2. Go to **API Keys** section
3. Click **"Create API Key"**
4. Copy the key (starts with `gsk_`)
5. Add to Railway Variables: `GROQ_API_KEY`

### Twilio (SMS Notifications)

1. Go to [twilio.com](https://www.twilio.com)
2. Sign up for free trial
3. Copy **Account SID**, **Auth Token**, and **Phone Number**
4. Add to Railway Variables: `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_PHONE_NUMBER`

### SendGrid (Email Notifications)

1. Go to [sendgrid.com](https://sendgrid.com)
2. Create account
3. Go to **Settings** → **API Keys**
4. Create API key
5. Add to Railway Variables: `SENDGRID_API_KEY`

## 🧪 API Endpoints

- `GET /health` - Health check
- `GET /api/pools/today` - Get today's pools
- `GET /api/pools/yesterday` - Get yesterday's completed pools
- `GET /api/pools/{pool_id}` - Get specific pool
- `GET /api/pools/{pool_id}/qr/{rider_name}` - Get QR code for rider

Full API documentation available at `/docs` when backend is running.

## 🔄 Agent Pipeline

The system uses an orchestrator that coordinates multiple AI agents:

1. **Parse Agent**: Processes ride requests from multiple channels
2. **Match Agent**: Groups riders by destination, timing, and location
3. **Route Agent**: Optimizes pickup sequence and generates route maps
4. **Price Agent**: Calculates distance-based costs and splits
5. **Ticket Agent**: Generates QR passes for each rider
6. **Reminder Agent**: Schedules SMS/email notifications

See `backend/orchestrator.py` for the implementation structure.

## 📊 Real Data Integration

**Current State:** The system uses mock data by default. The API endpoints return hardcoded pool data.

**To Use Real Data:**

1. **Set up Supabase database** (see API Keys section)
2. **Create database tables** for pools, riders, and ride requests
3. **Update API endpoints** in `backend/main.py` to query Supabase instead of returning mock data
4. **Set up cron job** on Railway to run the orchestrator nightly (2 AM) to process requests and create pools

**Flow:**
- Users submit ride requests → Stored in database
- Cron job runs nightly → Agents process requests → Create pools → Save to database
- Frontend queries API → API queries database → Returns real pools

For detailed integration steps, see the comments in `backend/main.py` and `backend/orchestrator.py`.

## 🐛 Troubleshooting

### Port Already in Use?

**Backend (port 8000):**
```bash
lsof -ti:8000 | xargs kill -9
# Or use different port
uvicorn main:app --reload --port 8001
```

**Frontend (port 3000):**
```bash
lsof -ti:3000 | xargs kill -9
```

### Frontend Can't Connect to Backend

1. Check `.env` file exists and has correct `NEXT_PUBLIC_API_URL`
2. Restart Next.js dev server after changing `.env`
3. Verify backend is running on the correct port
4. Check CORS settings in `backend/main.py`

### Module Not Found Errors

**Frontend:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Backend:**
```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt --force-reinstall
```

### CORS Errors in Production

1. Verify CORS in `backend/main.py` includes your Vercel URL
2. Make sure you pushed CORS changes and Railway redeployed
3. Check Railway deployment logs for errors

## 🚀 Extending the System

### Adding Real AI Agents

1. Install CrewAI:
```bash
pip install crewai
```

2. Update `backend/orchestrator.py` to use CrewAI agents

### Integrating Supabase

1. Install Supabase client:
```bash
pip install supabase
```

2. Update API endpoints to query Supabase instead of mock data

3. Set up database schema (see Supabase documentation)

### Adding Map Visualization

1. Integrate Mapbox or Google Maps API
2. Use Stable Diffusion to generate stylized route overlays

## 📝 License

This project is open source and available under the MIT License.


