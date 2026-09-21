import { useState } from 'react'
import ImageNotSupportedOutlinedIcon from '@mui/icons-material/ImageNotSupportedOutlined'

export const CarouselItem = ({ item, onSelect }) => {
  const [failedImage, setFailedImage] = useState(null)
  const showImage = item.image && failedImage !== item.image

  return (
    <button
      type="button"
      onClick={onSelect}
      className="group h-full w-full transform-gpu overflow-hidden rounded-xl border border-slate-400/15 bg-[var(--color-surface)] text-left shadow-[0_8px_20px_rgba(2,6,23,0.18)] transition-[transform,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-orange-500/45 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
      aria-label={`View ${item.name} at ${item.restaurantName}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-800">
        {showImage ? (
          <img
            className="h-full w-full transform-gpu object-cover transition-transform duration-300 ease-out group-hover:scale-[1.025]"
            src={item.image}
            alt={item.name}
            loading="lazy"
            decoding="async"
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
          <p className="pt-1 font-bold text-orange-400">₹{item.price}</p>
        )}
      </div>
    </button>
  )
}
