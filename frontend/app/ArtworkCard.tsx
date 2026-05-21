export default function ArtworkCard({
  title,
  genre,
  price
}: {
  title: string
  genre: string
  price: number
}) {
  return (
    <div className="bg-zinc-900 p-4 rounded-xl">
      <div className="h-48 bg-zinc-700 rounded mb-3"></div>
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-sm text-gray-400">{genre}</p>
      <p className="text-green-400 mt-2">₹{price}</p>
    </div>
  )
}