import React, { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useFBX } from "@react-three/drei";

const Book = (props: any) => {
    const mesh = useRef<any>(null);
    const { model, position } = props;
    const targetY = position[1];

    useEffect(() => {
        if (mesh.current) {
            mesh.current.position.y = targetY;
        }
    }, [targetY]);

    return (
        <primitive
            ref={mesh}
            object={model}
            scale={[0.15, 0.15, 0.15]}
            receiveShadow
            castShadow
        />
    );
};

const Stack = () => {
    const [books, setBooks] = useState<any[]>([]);  // books 배열로 관리
    const originalModel = useFBX("/book.fbx");

    useEffect(() => {
        const interval = setInterval(() => {
            if (books.length < 10) {
                setBooks(prev => [...prev, originalModel.clone()]);  // 새로운 복제본을 배열에 추가
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [books, originalModel]);

    const bookHeight = 0.6;

    return (
        <div className="w-screen h-screen">
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
                <group position={[0, -2, 0]}>
                    {books.map((model, idx) => (
                        <Book
                            key={idx}
                            model={model}
                            position={[0, idx * bookHeight, 0]}
                        />
                    ))}
                </group>
                <gridHelper args={[10, 10]} />
            </Canvas>
        </div>
    );
};

export default Stack;

