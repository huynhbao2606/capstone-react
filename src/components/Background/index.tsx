export default function BackgroundFire() {
    const embers = Array.from({ length: 200 });

    return (
        <div className="fire-embers">
            {embers.map((_, i) => {
                const left = Math.random() * 100; // vị trí ngang
                const delay = Math.random() * 8;  // delay ngẫu nhiên
                const size = 2 + Math.random() * 3; // kích thước
                const dur = 4 + Math.random() * 6;  // thời gian bay

                return (
                    <div
                        key={i}
                        className="ember"
                        style={{
                            left: `${left}%`,
                            animationDelay: `${delay}s`,
                            animationDuration: `${dur}s`,
                            width: `${size}px`,
                            height: `${size}px`,
                        }}
                    />
                );
            })}
        </div>
    );
}
