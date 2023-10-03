import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import * as THREE from 'three';
import { Html } from "@react-three/drei";
import { Group, Object3D } from "three";

interface BookProps {
    model: Object3D;
    position: [number, number, number];
    isSelected: boolean;
    onSelect: (index: number) => void;
}

const Book: React.FC<BookProps> = ({ model, position, isSelected, onSelect }) => {
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
        }
    }, [position]);

    return (
        <primitive
            ref={mesh}
            object={model}
            scale={[0.15, 0.15, 0.15]}
            receiveShadow
            castShadow
            onClick={() => onSelect(position[1])}
        />
    );
};

const Stack: React.FC = () => {
    const [books, setBooks] = useState<THREE.Object3D[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [firstClick, setFirstClick] = useState<boolean>(true);

    useEffect(() => {
        const loader = new FBXLoader();
        loader.load("/book.fbx", (model: Group) => {
            const interval = setInterval(() => {
                setBooks((prevBooks) => {
                    return prevBooks.length < 10 ? [...prevBooks, model.clone()] : prevBooks;
                });
            }, 100);

            return () => clearInterval(interval);
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
            <Canvas shadows camera={{ position: [0, 3, 10], fov: 50 }}>
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
                    {books.map((model, idx) => (
                        <Book
                            key={idx}
                            model={model}
                            position={[0, idx * bookHeight, 0]}
                            isSelected={selectedIndex === idx}
                            onSelect={() => handleSelect(idx)}
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
