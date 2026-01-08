'use client'

import { useState } from 'react'
import QRCode from 'react-qr-code'
import { MapPin, Clock, DollarSign, Users, Route } from 'lucide-react'

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
}

interface TodayPoolsProps {
  pools: Pool[]
  loading: boolean
}

export default function TodayPools({ pools, loading }: TodayPoolsProps) {
  const [selectedPool, setSelectedPool] = useState<string | null>(null)
  const [selectedRider, setSelectedRider] = useState<string | null>(null)

  if (loading) {
    return (
      <section id="today" className="scroll-mt-20">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      </section>
    )
  }

  if (pools.length === 0) {
    return (
      <section id="today" className="scroll-mt-20">
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
          <p className="text-slate-500 text-lg">No pools scheduled for today</p>
        </div>
      </section>
    )
  }

  return (
    <section id="today" className="scroll-mt-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-display font-bold text-slate-900 mb-4">
          Today&apos;s Pooled Rides
        </h2>
        <p className="text-slate-600 text-lg">
          Automatically generated rider groups with optimized routes and cost splitting
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {pools.map((pool) => (
          <div key={pool.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
            <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-primary-50 to-secondary-50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-display font-bold text-slate-900">{pool.route_name}</h3>
                <button
                  onClick={() => setSelectedPool(selectedPool === pool.id ? null : pool.id)}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                >
                  {selectedPool === pool.id ? 'Hide Route' : 'Show Route'}
                </button>
              </div>
              
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

            {selectedPool === pool.id && (
              <div className="p-6 bg-slate-50 border-b border-slate-200">
                <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <Route className="w-5 h-5 text-primary-600" />
                  Optimized Route Map
                </h4>
                <div className="bg-white rounded-lg p-4 mb-4 border border-slate-200">
                  <div className="space-y-2">
                    {pool.pickup_order.map((stop, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-sm">
                          {idx + 1}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-slate-900">{stop}</div>
                          <div className="text-sm text-slate-500">
                            {pool.riders.find(r => r.pickup === stop)?.time || 'TBD'}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="flex items-center gap-3 pt-2 border-t border-slate-200">
                      <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm">
                        ✓
                      </div>
                      <div className="font-medium text-slate-900">{pool.destination}</div>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-slate-600">
                  <span className="font-semibold">Total Distance:</span> {pool.distance} km | 
                  <span className="font-semibold ml-2">Total Cost:</span> ₹{pool.total_cost.toFixed(2)} | 
                  <span className="font-semibold ml-2">Per Person:</span> ₹{pool.per_person.toFixed(2)}
                </div>
              </div>
            )}

            <div className="p-6">
              <h4 className="font-semibold text-slate-900 mb-4">Riders & QR Passes</h4>
              <div className="space-y-4">
                {pool.riders.map((rider, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <div className="flex-1">
                      <div className="font-medium text-slate-900">{rider.name}</div>
                      <div className="text-sm text-slate-600 flex items-center gap-2 mt-1">
                        <MapPin className="w-4 h-4" />
                        {rider.pickup}
                      </div>
                      <div className="text-sm text-slate-600 flex items-center gap-2 mt-1">
                        <Clock className="w-4 h-4" />
                        {rider.time}
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedRider(selectedRider === `${pool.id}-${idx}` ? null : `${pool.id}-${idx}`)}
                      className="ml-4 px-4 py-2 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-colors text-sm font-medium"
                    >
                      {selectedRider === `${pool.id}-${idx}` ? 'Hide QR' : 'Show QR'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {pool.riders.map((rider, idx) => (
              selectedRider === `${pool.id}-${idx}` && (
                <div key={`qr-${idx}`} className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-t border-slate-200">
                  <div className="bg-white rounded-xl p-6 shadow-lg max-w-sm mx-auto">
                    <div className="text-center mb-4">
                      <h5 className="font-bold text-xl text-slate-900 mb-2">Ride Ticket</h5>
                      <div className="text-sm text-slate-600 space-y-1">
                        <div><span className="font-semibold">Passenger:</span> {rider.name}</div>
                        <div><span className="font-semibold">Ride ID:</span> {pool.id}</div>
                        <div><span className="font-semibold">Pickup:</span> {rider.pickup}</div>
                        <div><span className="font-semibold">Time:</span> {rider.time}</div>
                        <div><span className="font-semibold">Destination:</span> {pool.destination}</div>
                      </div>
                    </div>
                    <div className="flex justify-center bg-white p-4 rounded-lg border-2 border-slate-200">
                      <QRCode 
                        value={`RIDE:${pool.id}|RIDER:${rider.name}|PICKUP:${rider.pickup}|TIME:${rider.time}`}
                        size={200}
                        level="H"
                      />
                    </div>
                    <p className="text-xs text-center text-slate-500 mt-4">
                      Show this QR code at your pickup location
                    </p>
                  </div>
                </div>
              )
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

