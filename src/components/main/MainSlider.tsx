import { useState } from "react";
import "../../scss/Slider.scss";

const slides = [
    { color: "gray", target: "#", text: "책1" },
    { color: "gray", target: "#", text: "책2" },
    { color: "gray", target: "#", text: "책3" },
    { color: "gray", target: "#", text: "책4" },
    { color: "gray", target: "#", text: "책5" },
    { color: "gray", target: "#", text: "책6" },
    { color: "gray", target: "#", text: "책7" },
    { color: "gray", target: "#", text: "책8" },
    { color: "gray", target: "#", text: "책9" },
    { color: "gray", target: "#", text: "책10" },
    { color: "gray", target: "#", text: "책11" },
    { color: "gray", target: "#", text: "책12" },
];

export default function MainSlider() {
    const [animate, setAnimate] = useState(true);
    const onStop = () => setAnimate(false);
    const onRun = () => setAnimate(true);

    return (
        <div className="wrapper">
            <div className="slide_container">
                <ul
                    className="slide_wrapper"
                    onMouseEnter={onStop}
                    onMouseLeave={onRun}
                >
                    <div
                        className={"slide original".concat(
                            animate ? "" : " stop"
                        )}
                    >
                        {slides.map((s, i) => (
                            <li key={i} className="big">
                                <div className="item" style={{ background: s.color }}>
                                    {s.text}
                                </div>
                            </li>
                        ))}
                    </div>
                    <div
                        className={"slide clone".concat(animate ? "" : " stop")}
                    >
                        {slides.map((s, i) => (
                            <li key={i} className="big">
                                <div className="item" style={{ background: s.color }}>
                                    {s.text}
                                </div>
                            </li>
                        ))}
                    </div>
                </ul>
            </div>
        </div>
    );
}
