import React, { FC, MutableRefObject, useEffect, useRef, useState } from 'react';
import ResentBook from './ResentBook';

function useOnScreen(options: IntersectionObserverInit): [MutableRefObject<HTMLDivElement | null>, boolean] {
    const ref = useRef<HTMLDivElement | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setVisible(entry.isIntersecting);
        }, options);

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [ref, options]);

    return [ref, visible];
}

const MainSecond: FC = () => {
    const [ref, visible] = useOnScreen({ threshold: 0.1 });

    const headerStyle = {
        width: '100%',
        backgroundColor: 'white',
    };

    return (
        <div className="text-5xl indent-1 mt-60 text-center" style={headerStyle} ref={ref}>
            <div style={{ fontFamily: "bmfont" }}>
                <p className={`text-5xl ${visible ? 'animate-slideUpFade' : ''}`}>매일 신작 도서를</p>
                <p className={`text-5xl ${visible ? 'animate-slideUpFade' : ''}`}>구경하세요</p>
                <div className='mt-8'>
                    <p className={`text-2xl ${visible ? 'animate-slideUpFade' : ''}`}>10년치 베스트셀러</p>
                    <p className={`text-2xl ${visible ? 'animate-slideUpFade' : ''}`}>신간 오디오북 장르 소설까지</p>
                </div>
            </div>
            <div className="flex flex-col mt-auto" style={{ marginTop: '10vh' }}>
                <ResentBook />
            </div>
        </div>
    );
}

export default MainSecond;
