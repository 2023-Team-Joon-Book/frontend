import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js'
import * as THREE from 'three'
import { Html, Text } from '@react-three/drei'
import { Group, Object3D } from 'three'
import { baseInstance } from '../../api/config'
import BookInfoModal from './BookModal'

interface BookProps {
  model: Object3D
  position: [number, number, number]
  isSelected: boolean
  onSelect: (index: number) => void
  thickness: number // 두께를 전달받도록 추가
}

interface BookData {
  pages: number
  title: string // Add this line
  cover_image_url: string // Add this line
  // Add any other properties that you expect from the API
}

const Book: React.FC<BookProps> = ({ model, position, isSelected, onSelect, thickness }) => {
  const mesh = useRef<THREE.Object3D | null>(null)

  useFrame(() => {
    if (mesh.current) {
      if (isSelected) {
        mesh.current.position.z += (3.6 - mesh.current.position.z) * 0.3
        mesh.current.rotation.y += (-Math.PI / 2 - mesh.current.rotation.y) * 0.1
      } else {
        mesh.current.position.z += (0 - mesh.current.position.z) * 0.1
        mesh.current.rotation.y += (0 - mesh.current.rotation.y) * 0.1
      }
    }
  })

  useEffect(() => {
    if (mesh.current) {
      mesh.current.position.y = position[1]
      // 두께를 적용
      mesh.current.scale.set(0.2, thickness, 0.2)
    }
  }, [position, thickness])

  return (
    <primitive
      ref={mesh}
      object={model}
      receiveShadow
      castShadow
      onClick={() => onSelect(position[1])}
    />
  )
}

const Stack: React.FC = () => {
  const [isAutoPlay, setIsAutoPlay] = useState(false)
  const [books, setBooks] = useState<
    {
      title: string
      coverImageUrl: string
      pages: number
      model: Object3D
      thickness: number
    }[]
  >([]) // 책의 모델과 두께를 저장
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const [selectedBookInfo, setSelectedBookInfo] = useState<{
    title: string
    coverImageUrl: string
    pages: number
  } | null>(null)

  useEffect(() => {
    const loader = new FBXLoader()
    loader.load('/book.fbx', (model: Group) => {
      baseInstance
        .get('/readings?status=READ', {
          headers: {
            Accept: '*/*',
          },
        })
        .then((response) => {
          // 'response.data' 대신 'response.data.bookInfos'를 사용합니다.
          const fetchedBooks = response.data.bookInfos.map((bookData: BookData) => {
            return {
              model: model.clone(),
              thickness: bookData.pages / 2000,
              title: bookData.title, // Access title
              coverImageUrl: bookData.cover_image_url, // Access cover_image_url
              pages: bookData.pages, // Access pages
            }
          })

          // 정기적으로 책 추가
          const interval = setInterval(() => {
            setBooks((prevBooks) => {
              return prevBooks.length < 10
                ? [...prevBooks, fetchedBooks[prevBooks.length]]
                : prevBooks
            })
          }, 300) // 여기에서 1000은 1초를 의미합니다. 필요에 따라 조절 가능

          return () => clearInterval(interval)
        })
        .catch((error) => {
          console.error('Error fetching data: ', error)
        })
    })
  }, [])

  const bookHeight = 0.65

  const handleSelect = (index: number) => {
    if (selectedIndex === index) {
      setSelectedIndex(null)
      setSelectedBookInfo(null)
    } else {
      setSelectedIndex(index)
      const book = books[index]
      setSelectedBookInfo({
        title: book.title,
        coverImageUrl: book.coverImageUrl,
        pages: book.pages,
      })
    }
  }

  const moveToNextBook = () => {
    const newIndex =
      selectedIndex !== null && selectedIndex < books.length - 1 ? selectedIndex + 1 : 0
    setSelectedIndex(newIndex)
    setSelectedBookInfo({
      title: books[newIndex].title,
      coverImageUrl: books[newIndex].coverImageUrl,
      pages: books[newIndex].pages,
    })
  }

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isAutoPlay) {
      interval = setInterval(() => {
        moveToNextBook()
      }, 1000) // Change 2000 to your preferred interval in milliseconds
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isAutoPlay, moveToNextBook])

  return (
    <div className="w-screen h-screen relative">
      <Canvas shadows camera={{ position: [-10, 5, 0], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight
          castShadow
          position={[-10, 5, 0]}
          intensity={2}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <group position={[0, -3.5, 0]}>
          {books.map((book, idx) => (
            <Book
              key={idx}
              model={book.model}
              position={[0, idx * bookHeight, 0]}
              isSelected={selectedIndex === idx}
              onSelect={() => handleSelect(idx)}
              thickness={book.thickness} // 두께를 전달
            />
          ))}
        </group>
        <Html
          position={[3, 0, -8]}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <button
            onClick={moveToNextBook}
            className="bg-bfc66a hover:bg-blue-700 text-white py-2 px-4 rounded-full transition duration-300 ease-in-out"
            style={{ fontFamily: 'Noto Sans KR' }}>
            Next
          </button>
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className="mt-2 bg-bfc66a hover:bg-blue-700 text-white py-2 px-4 rounded-full transition duration-300 ease-in-out"
            style={{ fontFamily: 'Noto Sans KR' }}>
            {isAutoPlay ? '멈춤 ⏹' : '자동 재생 ⏩'}
          </button>
        </Html>
        {/* <gridHelper args={[10, 10]} /> */}
      </Canvas>
      {selectedBookInfo && (
        <BookInfoModal
          title={selectedBookInfo.title}
          coverImageUrl={selectedBookInfo.coverImageUrl}
          pages={selectedBookInfo.pages}
          onClose={() => setSelectedBookInfo(null)}
        />
      )}
    </div>
  )
}

export default Stack
