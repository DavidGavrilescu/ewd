import React, { useRef, useEffect } from 'react';



const DrawableBoard: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx !== null) {
        
                // Set canvas size
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight * 0.2;
                canvas.style.position = "absolute";
                canvas.style.bottom = "0px";
                canvas.style.left = "0px";

        
                let drawing = false;
                let hue = 0; // Hue value for the color cycle
                let lastX = 0, lastY = 0;
        
                function startDrawing(e: { offsetX: number; offsetY: number; }) {
                    drawing = true;
                    [lastX, lastY] = [e.offsetX, e.offsetY];
                }
        
                function stopDrawing() {
                    drawing = false;
                }
        
                function draw(e: { offsetX: number; offsetY: number; }) {
                    if (!drawing || !ctx) return;
        
                    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`; // Gradual color change
                    ctx.lineWidth = 5;
                    ctx.lineCap = "round";
                    ctx.lineJoin = "round";
        
                    ctx.beginPath();
                    ctx.moveTo(lastX, lastY);
                    ctx.lineTo(e.offsetX, e.offsetY);
                    ctx.stroke();
        
                    [lastX, lastY] = [e.offsetX, e.offsetY];
        
                    hue = (hue + 0.1) % 360; // Cycle through colors
                }
        
                // Event Listeners
                canvas.addEventListener("mousedown", startDrawing);
                canvas.addEventListener("mousemove", draw);
                canvas.addEventListener("mouseup", stopDrawing);
                canvas.addEventListener("mouseout", stopDrawing);
            }
        }
    }, []);

    return <canvas ref={canvasRef}></canvas>
};

export default DrawableBoard;