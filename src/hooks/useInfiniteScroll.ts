import { useEffect, useCallback, useState } from 'react'

interface UseInfiniteScrollProps {
  hasMore: boolean
  onLoadMore: () => Promise<void>
  threshold?: number
}

const useInfiniteScroll = ({ hasMore, onLoadMore, threshold = 0.1 }: UseInfiniteScrollProps) => {
  const [target, setTarget] = useState<Element | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleIntersect = useCallback(
    async ([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting && hasMore && !isLoading) {
        setIsLoading(true)
        await onLoadMore()
        setIsLoading(false)
      }
    },
    [hasMore, isLoading, onLoadMore],
  )

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, { threshold })

    if (target) observer.observe(target)

    return () => {
      if (target) observer.unobserve(target)
    }
  }, [target, handleIntersect, threshold])

  return setTarget
}

export default useInfiniteScroll
