import React, { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Box } from "@react-three/drei";

const Book = (props: any) => {
    const mesh = useRef<any>(null);
    const targetY = props.position[1];

    useEffect(() => {
        if (mesh.current) {
            mesh.current.position.y = targetY;
        }
    }, [targetY]);

    return (
        <Box
            ref={mesh}
            args={[3.5, 0.5, 4.5]}
            receiveShadow
            castShadow
        >
            <meshStandardMaterial color="lightblue" />
        </Box>
    );
};

const Stack = () => {
    const [numBooks, setNumBooks] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setNumBooks(prev => (prev < 10 ? prev + 1 : prev)); // 책 개수
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const bookHeight = 0.6;  // 책의 높이에 약간의 간격을 추가 구분선 느낌

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
                    {Array.from({ length: numBooks }).map((_, idx) => (
                        <Book
                            key={idx}
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
