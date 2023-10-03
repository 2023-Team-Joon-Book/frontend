import React, { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import * as THREE from 'three';
import { Group } from "three";

const Book = (props: any) => {
    const mesh = useRef<THREE.Object3D | null>(null);
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
    const [books, setBooks] = useState<THREE.Object3D[]>([]);

    useEffect(() => {
        const loader = new FBXLoader();
        loader.load("/book.fbx", (model: Group) => {
            const interval = setInterval(() => {
                setBooks((prevBooks) => {
                    // 이전 상태 기반으로 책의 개수가 10개 미만이라면 책을 새로 추가
                    return prevBooks.length < 10 ? [...prevBooks, model.clone()] : prevBooks;
                });
            }, 1000);

            return () => clearInterval(interval); // 정리 함수로 타이머를 제거
        });
    }, []); // 의존성 배열을 빈 배열로 설정하여, 컴포넌트 마운트 시에만 이펙트가 실행되게 합니다.

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
