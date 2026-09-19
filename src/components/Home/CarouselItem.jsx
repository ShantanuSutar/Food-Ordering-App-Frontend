import { useState } from 'react'
import ImageNotSupportedOutlinedIcon from '@mui/icons-material/ImageNotSupportedOutlined'

export const CarouselItem = ({ item, onSelect }) => {
  const [failedImage, setFailedImage] = useState(null)
  const showImage = item.image && failedImage !== item.image

  return (
    <button
      type="button"
      onClick={onSelect}
      className="group w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] text-left shadow-md transition duration-300 hover:-translate-y-1 hover:border-pink-500/50 hover:bg-white/[0.08] hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
      aria-label={`View ${item.name} at ${item.restaurantName}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-white/[0.06]">
        {showImage ? (
          <img
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            src={item.image}
            alt={item.name}
            onError={() => setFailedImage(item.image)}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-gray-500">
            <ImageNotSupportedOutlinedIcon sx={{ fontSize: 42 }} />
            <span className="text-sm">Image unavailable</span>
          </div>
        )}
      </div>

      <div className="space-y-1 p-4">
        <h2 className="truncate text-lg font-semibold text-gray-100">{item.name}</h2>
        <p className="truncate text-sm text-gray-400">{item.restaurantName}</p>
        {item.price != null && (
          <p className="pt-1 font-semibold text-pink-400">₹{item.price}</p>
        )}
      </div>
    </button>
  )
}
