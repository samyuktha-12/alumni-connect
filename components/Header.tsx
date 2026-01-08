'use client'

export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-display font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Alumni Connect
              </h1>
              <p className="text-xs text-slate-500">AI-Powered Ride Pooling</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#today" className="text-slate-700 hover:text-primary-600 transition-colors font-medium">Today&apos;s Pools</a>
            <a href="#yesterday" className="text-slate-700 hover:text-primary-600 transition-colors font-medium">Yesterday</a>
            <a href="#pipeline" className="text-slate-700 hover:text-primary-600 transition-colors font-medium">Pipeline</a>
          </nav>
        </div>
      </div>
    </header>
  )
}

