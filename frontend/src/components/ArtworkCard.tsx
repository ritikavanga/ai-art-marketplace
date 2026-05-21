interface ArtworkProps {
  title: string
  description: string
  genre: string
  image_url: string
  price: number
}

export default function ArtworkCard({
  title,
  description,
  genre,
  image_url,
  price
}: ArtworkProps) {
  return (
    <div className="bg-zinc-900 rounded-2xl overflow-hidden shadow-lg">
      <img
        src={image_url}
        alt={title}
        className="w-full h-64 object-cover"
      />

      <div className="p-4">
        <h2 className="text-2xl font-bold">
          {title}
        </h2>

        <p className="text-zinc-400 mt-2">
          {description}
        </p>

        <p className="mt-3 text-sm text-purple-400">
          {genre}
        </p>

        <p className="mt-4 text-green-400 text-xl font-semibold">
          ₹{price}
        </p>
      </div>
    </div>
  )
}