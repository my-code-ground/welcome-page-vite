const particles = [];

for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    const size = 10 + (Math.random() * 40);
    const x = Math.random() * (innerWidth - size);
    const y = Math.random() * (innerHeight - size);
    let dx = (5 + Math.random() * 10) * (Math.random() < 0.5 ? -1 : 1);
    let dy = (5 + Math.random() * 10) * (Math.random() < 0.5 ? -1 : 1);

    particle.style.position = 'absolute';
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.borderRadius = `${Math.random() * 50}%`;
    particle.style.transform = `rotate(${Math.random() * 360}deg)`;

    const r = Math.random() * 256;
    const g = Math.random() * 256;
    const b = Math.random() * 256;
    particle.style.backgroundColor = `rgba(${r},${g},${b}, ${0.5 + Math.random()})`;

    document.body.append(particle);
    particles.push({
        particle,
        size,
        dx,
        dy
    });
}

setInterval(() => {
    for (const p of particles) {
        const {dx, dy, size, particle} = p;
        particle.style.left = `${particle.offsetLeft + dx}px`;
        particle.style.top = `${particle.offsetTop + dy}px`;

        if ((particle.offsetTop + size) >= innerHeight || (particle.offsetTop) <= 0) p.dy = -dy;
        if ((particle.offsetLeft + size) >= innerWidth || (particle.offsetLeft) <= 0) p.dx = -dx;
        if (cursorElm.style.opacity === '0') continue;

        const r1 = size / 2;
        const r2 = cursorElm.offsetWidth / 2;

        const x1 = particle.offsetLeft + r1;
        const y1 = particle.offsetTop + r1;

        const x2 = cursorElm.offsetLeft + r2;
        const y2 = cursorElm.offsetTop + r2;

        const yDiff = y2 - y1;
        const xDiff = x2 - x1;

        const distance = Math.hypot(xDiff, yDiff);
        // const distance = (xDiff * xDiff + yDiff * yDiff) ** (1 / 2);

        if (distance <= (r1 + r2)) {
            p.dx = -dx;
            p.dy = -dy;
            particle.style.left = `${particle.offsetLeft + (r1 + r2 - distance) * (p.dx < 0 ? -1 : 1)}px`;
            particle.style.top = `${particle.offsetTop + (r1 + r2 - distance) * (p.dy < 0 ? -1 : 1)}px`;
        }
    }
}, 50);

const cursorElm = document.createElement('div');
cursorElm.classList.add('cursor');
document.body.append(cursorElm);

let tmrId;

addEventListener('mousemove', (e) => {
    if (tmrId) clearTimeout(tmrId);
    cursorElm.style.opacity = '1';
    cursorElm.style.left = `${e.clientX - cursorElm.offsetWidth / 2}px`;
    cursorElm.style.top = `${e.clientY - cursorElm.offsetHeight / 2}px`;
    tmrId = setTimeout(()=>{
        cursorElm.style.opacity = 0;
    }, 5000);
});

addEventListener('mouseout', () => {
    cursorElm.style.opacity = '0';
});