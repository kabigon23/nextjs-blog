import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';  // 1. Next.js router import

const WordSphereComponent = ({ texts }) => {
    const canvasRef = useRef(null);
    const router = useRouter();  // 2. useRouter hook


    const counts = [1, 2, 4, 5, 4, 2, 1];
    const options = {
        tilt: Math.PI / 9,
        initialVelocityX: 0.3,
        initialVelocityY: 0.3,
        initialRotationX: Math.PI * 0.14,
        initialRotationZ: 0,
    };

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;

        wordSphere(canvas, texts, counts, options, router);
    }, [canvasRef, texts, counts, options]);

    return <canvas id="canvas" ref={canvasRef} />;
};

const wordSphere = (canvas, texts, counts, options, router) => {
    let highlightedText = null;
    const wordLinks = {
        '자바스크립트': '#',
        '일상': '#',
        // ... (and so on)
    };
    let wordPositions = [];  // 6. 단어 위치 저장

    const π = Math.PI; // happy math!
    const {
        width = 320,
        height = 320,
        radius = 150,
        padding = 10,
        fontSize = 20,
        tilt = 0,
        initialVelocityX = 0,
        initialVelocityY = 0,
        initialRotationX = 0,
        initialRotationZ = 0,
    } = options;

    let vx = initialVelocityX, vy = initialVelocityY;
    let rx = initialRotationX, rz = initialRotationZ;

    // canvas setup
    let ctx = canvas.getContext('2d');
    ctx.textAlign = 'center';

    // Hi-DPI support
    canvas.width = width * 2;
    canvas.height = height * 2;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(2, 2);

    // scrolling
    let clicked = false, lastX, lastY;
    let dx = 0, dy = 0;
    canvas.addEventListener('mousedown', event => {
        clicked = true;
        lastX = event.screenX;
        lastY = event.screenY;
    });
    canvas.addEventListener('mousemove', event => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        highlightedText = null;

        for (const { text, x: wordX, y: wordY, width, height } of wordPositions) {
            if (
                x >= wordX - width &&
                x <= wordX + width &&
                y >= wordY &&
                y <= wordY + height
            ) {
                highlightedText = text;
                break;
            }
        }
        if (!clicked) return;
        [dx, dy] = [event.screenX - lastX, event.screenY - lastY];
        [lastX, lastY] = [event.screenX, event.screenY];

        // rotation update
        rz += -dy * 0.01;
        rx += dx * 0.01;

        // velocity update
        vx = dx * 0.1;
        vy = dy * 0.1;

        if (!looping) startLoop();
    });
    canvas.addEventListener('mouseup', e => clicked = false);
    canvas.addEventListener('mouseleave', e => clicked = false);
    canvas.addEventListener('click', event => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
    
        for (const { text, x: wordX, y: wordY, width, height } of wordPositions) {
            if (
                x >= wordX - width && 
                x <= wordX + width && 
                y >= wordY && 
                y <= wordY + height
            ) {
                const link = wordLinks[text];
                if (link) {
                    console.log(`Navigating to ${link}`);
                    router.push(link);
                }
                break;
            }
        }
    });
    
    
    
    
    
    
    


    function rot(x, y, t) {
        return [x * Math.cos(t) - y * Math.sin(t), x * Math.sin(t) + y * Math.cos(t)];
    }

    function render() {
        wordPositions = [];  // 초기화
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let ix = 0, iz = 0;
        for (const text of texts) {
            const degZ = (π / (counts.length - 1)) * iz;
            const degX = (2 * π / counts[iz]) * ix;

            let x = radius * Math.sin(degZ) * Math.cos(degX);
            let y = radius * Math.sin(degZ) * Math.sin(degX);
            let z = radius * Math.cos(degZ) + 8 * (ix % 2); // randomness

            // camera transform
            [y, z] = rot(y, z, tilt);
            [x, z] = rot(x, z, rz);
            [x, y] = rot(x, y, rx);

            // convert to cartesian and then draw.
            const alpha = 0.6 + 0.4 * (x / radius);
            const size = fontSize + 2 + 5 * (x / radius);
            ctx.fillStyle = `rgba(0,0,0,${alpha})`;
            ctx.font = `${size}px "Helvetica Neue", sans-serif`;

            // 중심점의 좌표
            const wordX = y + width / 2;
            const wordY = -z + height / 2;

            ctx.fillText(text, wordX, wordY);

            // 텍스트의 위치를 저장합니다.
            wordPositions.push({
                text,
                x: wordX,
                y: wordY - size ,
                width: ctx.measureText(text).width, // 텍스트의 너비를 저장
                height: size // 텍스트의 높이를 저장
            });

            // 테두리를 그립니다.
            if (highlightedText === text) {
                ctx.strokeStyle = 'red';
                const metrics = ctx.measureText(text);
                ctx.strokeRect(wordX, wordY - size +2, metrics.width, size);
            }

            ix--;
            if (ix < 0) {
                iz++;
                ix = counts[iz] - 1;
            }
        }
    }


    // renderer
    let looping = false;
    function rendererLoop() {
        if (looping) window.requestAnimationFrame(rendererLoop);
        render();

        // deacceleration - dirty code xD
        if (vx > 0) vx = vx - 0.01;
        if (vy > 0) vy = vy - 0.01;
        if (vx < 0) vx = vx + 0.01;
        if (vy > 0) vy = vy + 0.01;
        // if (vx == 0 && vy == 0) stopLoop();

        rz += vy * 0.01;
        rx += vx * 0.01;
    }

    function startLoop() {
        looping = true;
        window.requestAnimationFrame(rendererLoop);
    }

    function stopLoop() {
        looping = false;
    }
    startLoop();
};

export default WordSphereComponent;
