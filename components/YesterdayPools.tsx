'use client'

import { CheckCircle, Clock, Users, Route, DollarSign } from 'lucide-react'
import { format } from 'date-fns'

interface Rider {
  name: string
  pickup: string
  time: string
}

interface Pool {
  id: string
  route_name: string
  riders: Rider[]
  total_cost: number
  per_person: number
  distance: number
  duration: string
  pickup_order: string[]
  destination: string
  completed_at?: string
}

interface YesterdayPoolsProps {
  pools: Pool[]
  loading: boolean
}

export default function YesterdayPools({ pools, loading }: YesterdayPoolsProps) {
  if (loading) {
    return (
      <section id="yesterday" className="scroll-mt-20">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      </section>
    )
  }

  return (
    <section id="yesterday" className="scroll-mt-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-display font-bold text-slate-900 mb-4">
          Yesterday&apos;s Pools
        </h2>
        <p className="text-slate-600 text-lg mb-2">
          Proves automation worked overnight — agents ran to form groups, compute routes, and schedule reminders
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
          <CheckCircle className="w-4 h-4" />
          All pools completed successfully
        </div>
      </div>

      {pools.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
          <p className="text-slate-500 text-lg">No pools completed yesterday</p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {pools.map((pool) => (
            <div key={pool.id} className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-green-100">
              <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-green-50 to-emerald-50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <h3 className="text-2xl font-display font-bold text-slate-900">{pool.route_name}</h3>
                  </div>
                  <span className="px-3 py-1 bg-green-600 text-white rounded-full text-xs font-semibold uppercase">
                    Completed
                  </span>
                </div>
                
                {pool.completed_at && (
                  <div className="text-sm text-slate-600 mb-4">
                    Completed: {format(new Date(pool.completed_at), 'PPpp')}
                  </div>
                )}

                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Users className="w-4 h-4" />
                    <span>{pool.riders.length} riders</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Route className="w-4 h-4" />
                    <span>{pool.distance} km</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Clock className="w-4 h-4" />
                    <span>{pool.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-600 font-semibold">
                    <DollarSign className="w-4 h-4" />
                    <span>₹{pool.per_person.toFixed(2)}/person</span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-slate-50 border-b border-slate-200">
                <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <Route className="w-5 h-5 text-green-600" />
                  Executed Route
                </h4>
                <div className="bg-white rounded-lg p-4 border border-slate-200">
                  <div className="space-y-2">
                    {pool.pickup_order.map((stop, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm">
                          ✓
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-slate-900">{stop}</div>
                          <div className="text-sm text-slate-500">
                            {pool.riders.find(r => r.pickup === stop)?.time || 'Completed'}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="flex items-center gap-3 pt-2 border-t border-slate-200">
                      <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                        ✓
                      </div>
                      <div className="font-medium text-slate-900">{pool.destination}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h4 className="font-semibold text-slate-900 mb-4">Riders</h4>
                <div className="space-y-3">
                  {pool.riders.map((rider, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div>
                        <div className="font-medium text-slate-900">{rider.name}</div>
                        <div className="text-sm text-slate-600">{rider.pickup} • {rider.time}</div>
                      </div>
                      <div className="text-sm font-semibold text-green-600">
                        ₹{pool.per_person.toFixed(2)} paid
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

