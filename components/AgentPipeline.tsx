'use client'

import { useState } from 'react'
import { 
  FileText, Users, Route as RouteIcon, DollarSign, 
  Ticket, Bell, Settings, Database, Globe, Clock 
} from 'lucide-react'

const pipelineSteps = [
  {
    id: 'parse',
    name: 'Parse Requests',
    icon: FileText,
    description: 'Agent processes ride requests from multiple channels (web, SMS, voice)',
    tools: ['CLIP (image understanding)', 'Whisper/Coqui (TTS)', 'Groq LLM'],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'match',
    name: 'Match Riders',
    icon: Users,
    description: 'AI agent groups riders by destination, timing, and location proximity',
    tools: ['CrewAI/TaskWeaver', 'Vector embeddings', 'LLM reasoning'],
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'route',
    name: 'Optimize Route',
    icon: RouteIcon,
    description: 'Computes optimal pickup sequence and generates route map',
    tools: ['Route optimization algo', 'Map API', 'Stable Diffusion/SDXL (map gen)'],
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'price',
    name: 'Calculate Pricing',
    icon: DollarSign,
    description: 'Distance-based cost calculation with automatic split among riders',
    tools: ['Distance API', 'Pricing engine', 'Cost allocation'],
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'ticket',
    name: 'Generate QR Tickets',
    icon: Ticket,
    description: 'Creates unique QR passes for each rider with pickup details',
    tools: ['QR generator', 'Ticket template', 'Supabase storage'],
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'reminders',
    name: 'Schedule Reminders',
    icon: Bell,
    description: 'Automatically sends SMS/email reminders before pickup time',
    tools: ['SMS API', 'Email service', 'Cron scheduler'],
    color: 'from-red-500 to-rose-500'
  }
]

const techStack = [
  { name: 'CrewAI / TaskWeaver', category: 'Agent Framework', icon: Settings },
  { name: 'FastAPI', category: 'Backend API', icon: Database },
  { name: 'Groq', category: 'LLM Provider', icon: Globe },
  { name: 'CLIP', category: 'Image Understanding', icon: FileText },
  { name: 'Stable Diffusion / SDXL', category: 'Image Generation', icon: RouteIcon },
  { name: 'Whisper / Coqui', category: 'TTS', icon: Bell },
  { name: 'Next.js', category: 'Frontend', icon: Globe },
  { name: 'Railway Cron', category: 'Scheduler', icon: Clock },
  { name: 'Supabase', category: 'Database & Storage', icon: Database },
]

export default function AgentPipeline() {
  const [selectedStep, setSelectedStep] = useState<string | null>(null)

  return (
    <section id="pipeline" className="scroll-mt-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-display font-bold text-slate-900 mb-4">
          How It Works: The Agent Pipeline
        </h2>
        <p className="text-slate-600 text-lg max-w-3xl mx-auto">
          A fully automated system where AI agents orchestrate every step from request parsing to reminder delivery
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
        <h3 className="text-2xl font-display font-bold text-slate-900 mb-6 flex items-center gap-3">
          <Settings className="w-7 h-7 text-primary-600" />
          Agent Orchestrator
        </h3>
        <p className="text-slate-700 mb-6 leading-relaxed">
          The orchestrator coordinates all agents in a sequential pipeline. Each agent receives input from the previous step,
          processes it using specialized tools (LLMs, image generators, APIs), and passes structured output to the next agent.
          The orchestrator handles error recovery, retries, and logging throughout the entire pipeline.
        </p>
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-6 border border-primary-200">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <h4 className="font-semibold text-slate-900 mb-2">Orchestrator Features</h4>
              <ul className="space-y-1 text-sm text-slate-700">
                <li>• Sequential agent execution with dependency management</li>
                <li>• Parallel processing where possible (e.g., multiple route optimizations)</li>
                <li>• Error handling and automatic retries with exponential backoff</li>
                <li>• State persistence between pipeline steps</li>
                <li>• Comprehensive logging and monitoring</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
        {pipelineSteps.map((step, idx) => {
          const Icon = step.icon
          return (
            <div
              key={step.id}
              className={`bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all hover:scale-105 ${
                selectedStep === step.id ? 'ring-4 ring-primary-400' : ''
              }`}
              onClick={() => setSelectedStep(selectedStep === step.id ? null : step.id)}
            >
              <div className={`h-2 bg-gradient-to-r ${step.color}`} />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${step.color} flex items-center justify-center text-white`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-500">Step {idx + 1}</div>
                    <h4 className="font-bold text-lg text-slate-900">{step.name}</h4>
                  </div>
                </div>
                <p className="text-slate-600 text-sm mb-4">{step.description}</p>
                {selectedStep === step.id && (
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <div className="text-xs font-semibold text-slate-500 mb-2">Tools Used:</div>
                    <div className="flex flex-wrap gap-2">
                      {step.tools.map((tool, i) => (
                        <span key={i} className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
        <h3 className="text-2xl font-display font-bold text-slate-900 mb-6 flex items-center gap-3">
          <RouteIcon className="w-7 h-7 text-green-600" />
          Maps & QR Generation
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
            <h4 className="font-semibold text-slate-900 mb-3">Route Maps</h4>
            <p className="text-slate-700 text-sm mb-4">
              Generated using route optimization algorithms combined with map visualization.
              Stable Diffusion/SDXL can create stylized map overlays showing the optimal path,
              pickup points, and timing information.
            </p>
            <div className="text-xs text-slate-600 space-y-1">
              <div>• Location: Backend API endpoint</div>
              <div>• Storage: Supabase storage bucket</div>
              <div>• Format: SVG/PNG with route overlay</div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
            <h4 className="font-semibold text-slate-900 mb-3">QR Passes</h4>
            <p className="text-slate-700 text-sm mb-4">
              Auto-generated for each rider with unique ride ID, pickup location, time, and passenger info.
              QR codes are stored in Supabase and can be scanned by drivers at pickup points.
            </p>
            <div className="text-xs text-slate-600 space-y-1">
              <div>• Location: Ticket generation service</div>
              <div>• Storage: Supabase storage + database</div>
              <div>• Format: QR code + ticket template</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h3 className="text-2xl font-display font-bold text-slate-900 mb-6 flex items-center gap-3">
          <Database className="w-7 h-7 text-indigo-600" />
          Hosting Setup
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <h4 className="font-semibold text-slate-900 mb-2">FastAPI Backend</h4>
            <p className="text-slate-600 text-sm">RESTful API for agent orchestration, data processing, and business logic</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <h4 className="font-semibold text-slate-900 mb-2">Next.js Frontend</h4>
            <p className="text-slate-600 text-sm">Server-side rendered React app for displaying pools, maps, and QR passes</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <h4 className="font-semibold text-slate-900 mb-2">Supabase</h4>
            <p className="text-slate-600 text-sm">PostgreSQL database and file storage for pools, routes, and tickets</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <h4 className="font-semibold text-slate-900 mb-2">Railway Cron Jobs</h4>
            <p className="text-slate-600 text-sm">Scheduled tasks to trigger agent pipeline overnight for next-day pools</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <h4 className="font-semibold text-slate-900 mb-2">LLM Services</h4>
            <p className="text-slate-600 text-sm">Groq for agent reasoning and text processing</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <h4 className="font-semibold text-slate-900 mb-2">Storage & CDN</h4>
            <p className="text-slate-600 text-sm">Supabase storage for images, maps, and QR codes with CDN delivery</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl shadow-xl p-8 mt-12 text-white">
        <h3 className="text-2xl font-display font-bold mb-6">Tech Stack</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {techStack.map((tech, idx) => {
            const Icon = tech.icon
            return (
              <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="flex items-center gap-3 mb-2">
                  <Icon className="w-5 h-5" />
                  <div>
                    <div className="font-semibold">{tech.name}</div>
                    <div className="text-xs text-blue-100">{tech.category}</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="text-center mt-12">
        <a 
          href="https://github.com/yourusername/alumni-connect" 
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all transform hover:scale-105 shadow-lg font-semibold"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          Fork on GitHub
        </a>
        <p className="text-slate-600 mt-4">
          Students can fork, run locally, and extend the system immediately
        </p>
      </div>
    </section>
  )
}

