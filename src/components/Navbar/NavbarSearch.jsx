import { useCallback, useEffect, useRef, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import ImageNotSupportedOutlinedIcon from '@mui/icons-material/ImageNotSupportedOutlined'
import SearchIcon from '@mui/icons-material/Search'
import { CircularProgress, IconButton } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { clearMenuSearch, searchMenuItem } from '../../State/Menu/Action'

const SearchResultImage = ({ item }) => {
  const image = item.image
  const [failedImage, setFailedImage] = useState(null)
  const showImage = image && failedImage !== image

  return (
    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-800 sm:h-20 sm:w-20">
      {showImage ? (
        <img
          src={image}
          alt=""
          className="h-full w-full object-cover"
          onError={() => setFailedImage(image)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-gray-500">
          <ImageNotSupportedOutlinedIcon />
        </div>
      )}
    </div>
  )
}

export const NavbarSearch = () => {
  const [open, setOpen] = useState(false)
  const [keyword, setKeyword] = useState('')
  const containerRef = useRef(null)
  const inputRef = useRef(null)
  const resultRefs = useRef([])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const jwt = localStorage.getItem('jwt')
  const { search, searchLoading, searchError, hasSearched } = useSelector(
    (store) => store.menu
  )

  const closeSearch = useCallback(() => {
    setOpen(false)
    setKeyword('')
    resultRefs.current = []
    dispatch(clearMenuSearch())
  }, [dispatch])

  useEffect(() => {
    if (!open) return undefined

    inputRef.current?.focus()

    const handleClickOutside = (event) => {
      if (!containerRef.current?.contains(event.target)) closeSearch()
    }
    const handleEscape = (event) => {
      if (event.key === 'Escape') closeSearch()
    }

    document.addEventListener('pointerdown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('pointerdown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [closeSearch, open])

  useEffect(() => {
    if (!open) return undefined

    const normalizedKeyword = keyword.trim()
    if (!normalizedKeyword) {
      dispatch(clearMenuSearch())
      return undefined
    }

    const debounceTimer = window.setTimeout(() => {
      dispatch(searchMenuItem({ keyword: normalizedKeyword, jwt }))
    }, 325)

    return () => window.clearTimeout(debounceTimer)
  }, [dispatch, jwt, keyword, open])

  const selectResult = (item) => {
    if (!item.restaurantId) return

    const city = encodeURIComponent(item.restaurantCity || 'city')
    const restaurantName = encodeURIComponent(item.restaurantName || 'restaurant')

    closeSearch()
    navigate(
      `/restaurant/${city}/${restaurantName}/${item.restaurantId}?food=${item.id}`,
      { state: { selectedFoodId: item.id } }
    )
  }

  const handleInputKeyDown = (event) => {
    if (event.key === 'ArrowDown' && search.length > 0) {
      event.preventDefault()
      resultRefs.current[0]?.focus()
    }

    if (event.key === 'Enter' && !searchLoading && search.length > 0) {
      event.preventDefault()
      selectResult(search[0])
    }
  }

  const handleResultKeyDown = (event, index) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      resultRefs.current[index + 1]?.focus()
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      if (index === 0) inputRef.current?.focus()
      else resultRefs.current[index - 1]?.focus()
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <IconButton
        onClick={() => open ? closeSearch() : setOpen(true)}
        aria-label={open ? 'Close food search' : 'Search foods'}
        aria-expanded={open}
        aria-controls="navbar-food-search"
      >
        {open ? <CloseIcon /> : <SearchIcon sx={{ fontSize: '1.5rem' }} />}
      </IconButton>

      {open && (
        <section
          id="navbar-food-search"
          role="search"
          className="fixed inset-x-0 top-16 z-[70] border-y border-slate-400/20 bg-[var(--color-surface)]/98 p-4 shadow-[0_20px_50px_rgba(2,6,23,0.42)] backdrop-blur-xl sm:absolute sm:left-auto sm:right-0 sm:top-[calc(100%+0.8rem)] sm:w-[min(42rem,calc(100vw-2rem))] sm:rounded-xl sm:border"
        >
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              ref={inputRef}
              type="search"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder="Search food, category, or restaurant"
              aria-label="Search food, category, or restaurant"
              aria-controls="navbar-search-results"
              className="w-full rounded-lg border border-slate-400/25 bg-[var(--color-surface-2)] py-3 pl-12 pr-12 text-base text-white outline-none transition placeholder:text-slate-500 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/25"
            />
            {searchLoading && (
              <CircularProgress
                size={20}
                className="absolute right-4 top-1/2 -translate-y-1/2"
                aria-label="Searching"
              />
            )}
          </div>

          <div id="navbar-search-results" className="mt-3 max-h-[65vh] overflow-y-auto">
            {!keyword.trim() && (
              <div className="px-3 py-10 text-center text-sm text-gray-400">
                Start typing to find available dishes, categories, or restaurants.
              </div>
            )}

            {keyword.trim() && searchLoading && (
              <div className="space-y-2" aria-live="polite">
                {Array.from({ length: 3 }, (_, index) => (
                  <div key={`search-skeleton-${index}`} className="flex animate-pulse gap-3 rounded-xl p-2">
                    <div className="h-16 w-16 rounded-xl bg-white/10 sm:h-20 sm:w-20" />
                    <div className="flex-1 space-y-3 py-2">
                      <div className="h-4 w-1/2 rounded bg-white/10" />
                      <div className="h-3 w-1/3 rounded bg-white/10" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {keyword.trim() && !searchLoading && searchError && (
              <div className="px-3 py-10 text-center text-sm text-red-300" role="alert">
                {searchError}
              </div>
            )}

            {keyword.trim() && !searchLoading && !searchError && hasSearched && search.length === 0 && (
              <div className="px-3 py-10 text-center text-sm text-gray-400">
                No available food found for “{keyword.trim()}”.
              </div>
            )}

            {!searchLoading && !searchError && search.length > 0 && (
              <ul className="space-y-1" aria-label="Food search results">
                {search.map((item, index) => (
                  <li key={item.id}>
                    <button
                      ref={(element) => { resultRefs.current[index] = element }}
                      type="button"
                      onClick={() => selectResult(item)}
                      onKeyDown={(event) => handleResultKeyDown(event, index)}
                      className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition hover:bg-slate-600/35 focus:bg-slate-600/35 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                    >
                      <SearchResultImage item={item} />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <p className="truncate font-semibold text-gray-100">{item.name}</p>
                          <span className="shrink-0 font-bold text-orange-400">₹{item.price}</span>
                        </div>
                        <p className="truncate text-sm text-gray-400">{item.restaurantName}</p>
                        {item.categoryName && (
                          <span className="mt-1 inline-block rounded-full bg-slate-700/50 px-2 py-0.5 text-xs text-gray-400">
                            {item.categoryName}
                          </span>
                        )}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}
    </div>
  )
}
