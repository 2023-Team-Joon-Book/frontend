import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import * as THREE from 'three';
import { Html } from "@react-three/drei";
import { Group, Object3D } from "three";
import axios from 'axios';

interface BookProps {
    model: Object3D;
    position: [number, number, number];
    isSelected: boolean;
    onSelect: (index: number) => void;
    thickness: number; // 두께를 전달받도록 추가
}

const Book: React.FC<BookProps> = ({ model, position, isSelected, onSelect, thickness }) => {
    const mesh = useRef<THREE.Object3D | null>(null);

    useFrame(() => {
        if (mesh.current) {
            if (isSelected) {
                mesh.current.position.z += (1 - mesh.current.position.z) * 0.1;
                mesh.current.rotation.y += (-Math.PI / 4 - mesh.current.rotation.y) * 0.1;
            } else {
                mesh.current.position.z += (0 - mesh.current.position.z) * 0.1;
                mesh.current.rotation.y += (0 - mesh.current.rotation.y) * 0.1;
            }
        }
    });

    useEffect(() => {
        if (mesh.current) {
            mesh.current.position.y = position[1];
            // 두께를 적용
            mesh.current.scale.set(0.15, thickness, 0.15);
        }
    }, [position, thickness]);

    return (
        <primitive
            ref={mesh}
            object={model}
            receiveShadow
            castShadow
            onClick={() => onSelect(position[1])}
        />
    );
};

const Stack: React.FC = () => {
    const [books, setBooks] = useState<{ model: Object3D; thickness: number }[]>([]); // 책의 모델과 두께를 저장
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [firstClick, setFirstClick] = useState<boolean>(true);

    useEffect(() => {
        const loader = new FBXLoader();
        loader.load("/book.fbx", (model: Group) => {
            // 환경변수에서 인증 토큰 불러오기
            const authHeader = import.meta.env.VITE_REACT_APP_AUTH_TOKEN
            axios.get('http://localhost:8080/api/v1/readings?status=READ', {
                headers: {
                    'Authorization': authHeader,
                    'Accept': '*/*'
                }
            })
                .then((response) => {
                    // API에서 가져온 데이터를 이용해 책 두께 설정
                    const fetchedBooks = response.data.map((bookData: any) => {
                        return {
                            model: model.clone(),
                            // 여기서 pages를 적당한 스케일로 환산하여 두께로 사용
                            thickness: bookData.pages / 1000
                        };
                    });

                    // 정기적으로 책 추가
                    const interval = setInterval(() => {
                        setBooks((prevBooks) => {
                            return prevBooks.length < 10 ? [...prevBooks, fetchedBooks[prevBooks.length]] : prevBooks;
                        });
                    }, 1000); // 여기에서 1000은 1초를 의미합니다. 필요에 따라 조절 가능

                    return () => clearInterval(interval);
                })
                .catch((error) => {
                    console.error("Error fetching data: ", error);
                });
        });
    }, []);

    const bookHeight = 0.6;

    const handleSelect = (index: number) => {
        setSelectedIndex(selectedIndex === index ? null : index);
    };

    const moveSelectionDown = () => {
        if (firstClick) {
            setSelectedIndex(books.length - 1);
            setFirstClick(false);
        } else if (selectedIndex !== null && selectedIndex > 0) {
            setSelectedIndex(prev => (prev !== null ? prev - 1 : null));
        }
    };

    const moveSelectionUp = () => {
        if (firstClick) {
            setSelectedIndex(books.length - 1);
            setFirstClick(false);
        } else if (selectedIndex !== null && selectedIndex < books.length - 1) {
            setSelectedIndex(prev => (prev !== null ? prev + 1 : null));
        }
    };

    return (
        <div className="w-screen h-screen relative">
            <Canvas shadows camera={{ position: [0, 5, 10], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <directionalLight
                    castShadow
                    position={[2.5, 18, 5]}
                    intensity={1}
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                    shadow-camera-far={50}
                    shadow-camera-left={-10}
                    shadow-camera-right={10}
                    shadow-camera-top={10}
                    shadow-camera-bottom={-10}
                />
                <group position={[0, -3, 0]}>
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
                <Html position={[3, 0, 0]} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <button
                        onClick={moveSelectionUp}
                        className="mb-2 bg-bfc66a hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
                    >
                        ⬆️
                    </button>
                    <button
                        onClick={moveSelectionDown}
                        className="bg-bfc66a hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
                    >
                        ⬇️
                    </button>
                </Html>
                <gridHelper args={[10, 10]} />
            </Canvas>
        </div>
    );

};

export default Stack;

