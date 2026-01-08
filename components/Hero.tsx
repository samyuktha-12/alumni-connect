'use client'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-primary-600 via-purple-600 to-secondary-600 text-white">
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="text-center">
          <h1 className="text-5xl lg:text-7xl font-display font-bold mb-6 tracking-tight">
            Smart Ride Pooling
            <span className="block text-3xl lg:text-5xl mt-2 bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">
              Powered by AI Agents
            </span>
          </h1>
          <p className="text-xl lg:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Automatically match riders, optimize routes, split costs, and generate QR passes — all while you sleep.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="#today"
              className="px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg"
            >
              View Today&apos;s Pools
            </a>
            <a 
              href="#pipeline"
              className="px-8 py-4 bg-primary-700/50 backdrop-blur-sm border-2 border-white/30 rounded-lg font-semibold hover:bg-primary-700 transition-all transform hover:scale-105"
            >
              See How It Works
            </a>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 to-transparent" />
    </section>
  )
}

