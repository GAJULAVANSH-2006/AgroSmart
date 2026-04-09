"use client"

import { useState, useEffect } from "react"

export interface WeatherData {
  temperature: number
  feelsLike: number
  condition: string
  humidity: number
  windSpeed: number
  uvIndex: number
  pressure: number
  visibility: number
  dewPoint: number
  sunrise: string
  sunset: string
  location: string
  hourly: { time: string; temp: number; icon: string }[]
  forecast: { day: string; high: number; low: number; condition: string; rain: number; icon: string }[]
}

function getWeatherEmoji(code: number, isDay: number): string {
  if (code === 1000) return isDay ? "☀️" : "🌙"
  if (code <= 1003) return "⛅"
  if (code <= 1009) return "☁️"
  if (code <= 1030) return "🌫️"
  if (code <= 1063) return "🌦️"
  if (code <= 1117) return "❄️"
  if (code <= 1135) return "🌫️"
  if (code <= 1147) return "🌫️"
  if (code <= 1201) return "🌧️"
  if (code <= 1225) return "❄️"
  if (code <= 1237) return "🌨️"
  if (code <= 1264) return "🌧️"
  if (code <= 1282) return "⛈️"
  return "🌤️"
}

function formatTime(timeStr: string): string {
  const date = new Date(timeStr)
  return date.toLocaleTimeString("en-US", { hour: "numeric", hour12: true })
}

function getDayName(dateStr: string, index: number): string {
  if (index === 0) return "Today"
  return new Date(dateStr).toLocaleDateString("en-US", { weekday: "short" })
}

export function useWeather(location = "Mandya,Karnataka,India") {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_WEATHERAPI_KEY
    if (!apiKey) {
      setIsLoading(false)
      return
    }

    async function fetchWeather() {
      try {
        const res = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(location)}&days=7&aqi=no&alerts=no`
        )
        if (!res.ok) throw new Error("Failed to fetch weather")
        const data = await res.json()

        const current = data.current
        const astro = data.forecast.forecastday[0].astro

        // Hourly — next 12 hours from current hour
        const allHours = data.forecast.forecastday.flatMap((d: any) => d.hour)
        const nowHour = new Date().getHours()
        const todayHours = data.forecast.forecastday[0].hour
        const tomorrowHours = data.forecast.forecastday[1]?.hour || []
        const combined = [...todayHours, ...tomorrowHours]
        const startIdx = combined.findIndex((h: any) => new Date(h.time).getHours() === nowHour)
        const hourly = combined.slice(startIdx >= 0 ? startIdx : 0, (startIdx >= 0 ? startIdx : 0) + 12).map((h: any, i: number) => ({
          time: i === 0 ? "Now" : formatTime(h.time),
          temp: Math.round(h.temp_c),
          icon: getWeatherEmoji(h.condition.code, h.is_day),
        }))

        // 7-day forecast
        const forecast = data.forecast.forecastday.map((d: any, i: number) => ({
          day: getDayName(d.date, i),
          high: Math.round(d.day.maxtemp_c),
          low: Math.round(d.day.mintemp_c),
          condition: d.day.condition.text,
          rain: d.day.daily_chance_of_rain,
          icon: getWeatherEmoji(d.day.condition.code, 1),
        }))

        setWeather({
          temperature: Math.round(current.temp_c),
          feelsLike: Math.round(current.feelslike_c),
          condition: current.condition.text,
          humidity: current.humidity,
          windSpeed: Math.round(current.wind_kph),
          uvIndex: current.uv,
          pressure: current.pressure_mb,
          visibility: current.vis_km,
          dewPoint: Math.round(current.dewpoint_c),
          sunrise: astro.sunrise,
          sunset: astro.sunset,
          location: `${data.location.name}, ${data.location.region}`,
          hourly,
          forecast,
        })
      } catch (err: any) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchWeather()
  }, [location])

  return { weather, isLoading, error }
}
