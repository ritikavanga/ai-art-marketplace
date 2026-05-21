interface Props {
  title: string
  genre: string
  price: number
  image_url: string
}

export default function ArtworkCard({
  title,
  genre,
  price,
  image_url
}: Props) {
  return (
    <div className="bg-zinc-900 rounded-xl overflow-hidden shadow-lg">
      <img
        src={image_url}
        alt={title}
        className="w-full h-64 object-cover"
      />

      <div className="p-4">
        <h2 className="text-2xl font-bold">
          {title}
        </h2>

        <p className="text-zinc-400 mt-1">
          {genre}
        </p>

        <p className="text-green-400 mt-3 text-lg">
          ₹{price}
        </p>
      </div>
    </div>
  )
}