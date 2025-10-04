import Calculator from '@/app/components/calculator'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Next.js Calculator
        </h1>
        <Calculator />
      </div>
    </main>
  )
}