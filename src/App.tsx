
import { useEffect, useState, useRef } from 'react';

export default function App() {
  const targetDate = new Date(2026, 6, 4, 13, 0, 0);

  const calculateTimeLeft = () => {
    const now = new Date();
    const diff = targetDate.getTime() - now.getTime();

    return {
      days: Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24))),
      hours: Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24)),
      minutes: Math.max(0, Math.floor((diff / (1000 * 60)) % 60)),
      seconds: Math.max(0, Math.floor((diff / 1000) % 60)),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [musicStarted, setMusicStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const eventSectionRef = useRef<HTMLDivElement | null>(null);
  const [showEventCards, setShowEventCards] = useState(false);

  useEffect(() => {
  const timer = setInterval(() => {
    setTimeLeft(calculateTimeLeft());
  }, 1000);

  return () => clearInterval(timer);
}, []);
useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setShowEventCards(true);
      }
    },
    {
      threshold: 0.3,
    }
  );

  if (eventSectionRef.current) {
    observer.observe(eventSectionRef.current);
  }

  return () => observer.disconnect();
}, []);
    const startMusic = async () => {
  if (!musicStarted && audioRef.current) {
    setShowConfetti(true); // PRIMERO aparecen

    await audioRef.current.play(); // al mismo tiempo suena

    setMusicStarted(true);
    setIsPlaying(true);

    setTimeout(() => {
      setShowConfetti(false);
    }, 9000);
  }
};

    const toggleMusic = (
  e: React.MouseEvent<HTMLButtonElement>
) => {
  e.stopPropagation();

  if (!audioRef.current) return;

  if (isPlaying) {
    audioRef.current.pause();
    setIsPlaying(false);
  } else {
    audioRef.current.play();
    setIsPlaying(true);
  }
};
  return (
    <div
  className="min-h-screen relative overflow-hidden text-white bg-black"
  onClick={startMusic}
>
<audio
  ref={audioRef}
  src="/musica.mp3"
  preload="auto"
/>
      <div
  className="absolute inset-0 bg-cover bg-center md:scale-105"
  style={{
    backgroundImage: "url('/fondo.png')",
  }}
/>

      <div className="absolute inset-0 bg-black/75" />
      <div className="absolute bottom-0 left-0 w-full h-72 bg-gradient-to-t from-white/10 via-white/5 to-transparent blur-3xl opacity-40" />
      <div className="absolute top-[-150px] left-[-100px] w-[450px] h-[450px] bg-blue-500/30 rounded-full blur-[140px]" />

      <div className="absolute bottom-[-150px] right-[-100px] w-[450px] h-[450px] bg-yellow-400/20 rounded-full blur-[140px]" />
      {showConfetti && (
  <div className="fixed inset-0 pointer-events-none z-[999] overflow-hidden">

    {[...Array(500)].map((_, i) => (
      <div
        key={i}
        className="absolute animate-confetti"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * -30}%`,

          animationDuration: `${4 + Math.random() * 3}s`,
          animationDelay: `${Math.random() * 1}s`,

          width: `${3 + Math.random() * 5}px`,
          height: `${2 + Math.random() * 4}px`,

          background:
            Math.random() > 0.5
              ? '#8ED6FF'
              : '#FFFFFF',

          opacity: 0.95,

          borderRadius: '1px',

          filter: 'blur(0.2px)',

          transform: `rotate(${Math.random() * 360}deg)`,
        }}
      />
    ))}
     

  </div>
)}

  
      <div className="relative z-10">
        

        <section className="relative flex flex-col items-center justify-center text-center px-6 pt-16 pb-10 overflow-hidden">

          {/* GLOW TOP */}
          <div className="absolute top-[-120px] w-[500px] h-[500px] bg-yellow-400/20 rounded-full blur-[120px]" />

          {/* GLOW LEFT */}
          <div className="absolute left-[-120px] top-[200px] w-[300px] h-[300px] bg-blue-500/20 rounded-full blur-[100px]" />

          {/* GLOW RIGHT */}
          <div className="absolute right-[-120px] top-[250px] w-[300px] h-[300px] bg-yellow-400/20 rounded-full blur-[100px]" />

          {/* BADGE */}
          <div className="relative z-10 mb-6 animate-pulse">

            <span className="bg-yellow-400 text-black px-6 py-2 rounded-full font-black tracking-[4px] shadow-2xl text-sm md:text-base">
              ⚽ EVENTO EXCLUSIVO ⚽
            </span>

          </div>

          {/* TITULO */}
          <h1 className="relative z-10 text-5xl sm:text-6xl md:text-8xl font-black tracking-wider drop-shadow-[0_0_25px_rgba(255,255,255,0.5)]">
  <span className="text-[#0057D9]">NE</span>
  <span className="text-yellow-400">HIT</span>
  <span className="text-[#0057D9]">AN</span>
</h1>
          <div className="flex gap-2 mt-3 text-yellow-400 text-xl justify-center">
          ⭐ ⭐ ⭐ ⭐ 
          </div>
          {/* SUBTITULO */}
<h2 className="relative z-10 mt-5 text-3xl md:text-5xl font-black uppercase tracking-[3px] animate-pulse">
  <span className="text-sky-300">C</span>
  <span className="text-white">U</span>
  <span className="text-sky-300">M</span>
  <span className="text-white">P</span>
  <span className="text-sky-300">L</span>
  <span className="text-white">E</span>

  <span className="inline-block w-4" />

  <span className="text-sky-300">4</span>

  <span className="inline-block w-4" />

  <span className="text-white">A</span>
  <span className="text-sky-300">Ñ</span>
  <span className="text-white">O</span>
  <span className="text-sky-300">S</span>
</h2>
<div className="relative z-10 mt-6 w-64 h-1 rounded-full bg-gradient-to-r from-transparent via-yellow-400 to-transparent shadow-[0_0_25px_rgba(255,215,0,0.8)]" />
          {/* TEXTO */}
          <p
  className="
    relative z-10
    mt-6
    text-lg md:text-2xl
    max-w-2xl
    leading-relaxed
    font-semibold
    text-white
    animate-[float_6s_ease-in-out_infinite]
  "
>
  <span
  className="
    text-cyan-300
    font-bold
    drop-shadow-[0_0_10px_rgba(103,232,249,1)]
    animate-pulse
  "
>
  Prepárate para vivir una experiencia inolvidable.
</span>
</p>

          {/* CARD IMAGEN */}
          <div className="relative z-10 mt-14">
          

            {/* AURA */}
            <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400 via-blue-500 to-yellow-400 rounded-[50px] blur-2xl opacity-60 animate-pulse" />

            {/* CARD */}
            <div className="relative rounded-[40px] overflow-hidden border-4 border-yellow-400 shadow-[0_0_40px_rgba(255,215,0,0.5)] w-[320px] md:w-[450px] backdrop-blur-xl">

              <img
  src="/figurita.png"
  alt="Nehitan Pixar"
  className="w-full h-auto object-contain transition duration-700 animate-[float_4s_ease-in-out_infinite]"
/>

            </div>

          </div>

        </section>

        <section className="px-6 py-14 flex justify-center">

          <div
  className="relative overflow-hidden rounded-[40px] px-8 md:px-14 py-10 shadow-2xl text-center border border-yellow-400/40"
  style={{
    backgroundImage: "url('/contador-fondo.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>

            <h3 className="text-3xl md:text-4xl font-black text-yellow-400 mb-8">
              ⏳ EL CUMPLE COMIENZA EN ⏳
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">

              <div className="bg-black/50 rounded-3xl p-4 md:p-6 border border-yellow-400/40 shadow-[0_0_25px_rgba(255,215,0,0.25)] hover:scale-105 transition duration-500">
                <div className="text-4xl md:text-6xl font-black text-yellow-300">
                  {timeLeft.days}
                </div>
                <div className="text-white mt-2 text-sm md:text-lg">
                  {timeLeft.days === 1 ? 'DÍA' : 'DÍAS'}
                </div>
              </div>

              <div className="bg-black/50 rounded-3xl p-4 md:p-6 border border-yellow-400/40 shadow-[0_0_25px_rgba(255,215,0,0.25)] hover:scale-105 transition duration-500">
                <div className="text-4xl md:text-6xl font-black text-yellow-300">
                  {timeLeft.hours}
                </div>
                <div className="text-white mt-2 text-sm md:text-lg">
                  {timeLeft.hours === 1 ? 'HORA' : 'HORAS'}
                </div>
              </div>

              <div className="bg-black/50 rounded-3xl p-4 md:p-6 border border-yellow-400/40 shadow-[0_0_25px_rgba(255,215,0,0.25)] hover:scale-105 transition duration-500">
                <div className="text-4xl md:text-6xl font-black text-yellow-300">
                  {timeLeft.minutes}
                </div>
                <div className="text-white mt-2 text-sm md:text-lg">
                  {timeLeft.minutes === 1 ? 'MINUTO' : 'MINUTOS'}
                </div>
              </div>

              <div className="bg-black/50 rounded-3xl p-4 md:p-6 border border-yellow-400/40 shadow-[0_0_25px_rgba(255,215,0,0.25)] hover:scale-105 transition duration-500">
                <div className="text-4xl md:text-6xl font-black text-yellow-300">
                  {timeLeft.seconds}
                </div>
                <div className="text-white mt-2 text-sm md:text-lg">
  {timeLeft.seconds === 1 ? 'SEGUNDO' : 'SEGUNDOS'}
</div>
              </div>

            </div>
          </div>
        </section>
<section className="px-6 pb-10 flex justify-center">

  <div className="max-w-2xl w-full text-center rounded-[35px] border border-yellow-400/40 bg-black/40 backdrop-blur-xl p-8">

    <div className="text-4xl mb-3">
      🔔
    </div>

    <h3 className="text-2xl md:text-3xl font-black text-yellow-400">
      NO TE OLVIDES DEL GRAN DÍA
    </h3>

    <p className="text-gray-300 mt-4 text-lg">
      
    </p>

    <button
      onClick={() =>
        window.open(
          'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Cumpleaños+de+Nehitan&dates=20260704T160000Z/20260704T200000Z&details=Te+esperamos+en+el+cumpleaños+de+Nehitan&location=Camping+UPCN+La+Plata',
          '_blank'
        )
      }
      className="mt-6 bg-yellow-400 hover:bg-yellow-300 text-black font-black px-8 py-4 rounded-2xl shadow-[0_0_30px_rgba(255,215,0,0.5)] hover:scale-105 transition-all duration-300"
    >
      📅 AGENDAR RECORDATORIO
    </button>

  </div>

</section>
        <section
  ref={eventSectionRef}
  className="px-6 py-10"
>

  <div
    className="relative overflow-hidden max-w-3xl mx-auto rounded-[40px] p-8 shadow-2xl text-center border border-yellow-400/40"
    style={{
      backgroundImage: "url('/evento-fondo.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
  >

    {/* OSCURECER FONDO */}
    <div className="absolute inset-0 bg-black/45" />

    {/* CONTENIDO */}
    <div className="relative z-10">

      <h3 className="text-3xl md:text-4xl font-black text-yellow-400 mb-8 drop-shadow-lg">
        📅 INFORMACIÓN DEL EVENTO
      </h3>

      <div className="grid gap-4 md:gap-5">

  <div
  className={`bg-black/45 border border-yellow-400/40 rounded-2xl p-4 shadow-[0_0_20px_rgba(255,215,0,0.25)]
${
  showEventCards
    ? 'animate-[slideLeft_0.8s_ease_forwards]'
    : 'opacity-0'
}`}
>
    <div className="text-yellow-400 font-bold text-lg">
      📅 FECHA
    </div>
    <div className="text-yellow-300 text-lg sm:text-xl md:text-2xl font-black mt-1">
      04/07/2026
    </div>
  </div>

  <div
  className={`bg-black/45 border border-yellow-400/40 rounded-2xl p-4 shadow-[0_0_20px_rgba(255,215,0,0.25)]
${
  showEventCards
    ? 'animate-[slideRight_0.8s_ease_forwards]'
    : 'opacity-0'
}`}
  style={{ animationDelay: '0.2s' }}
>
    <div className="text-yellow-400 font-bold text-lg">
      🏟 LUGAR
    </div>
    <div className="text-yellow-300 text-lg sm:text-xl md:text-2xlfont-black mt-1">
      CAMPING U.P.C.N
    </div>
  </div>

  <div
  className={`bg-black/45 border border-yellow-400/40 rounded-2xl p-4 shadow-[0_0_20px_rgba(255,215,0,0.25)]
${
  showEventCards
    ? 'animate-[slideLeft_0.8s_ease_forwards]'
    : 'opacity-0'
}`}
  style={{ animationDelay: '0.4s' }}
>
    <div className="text-yellow-400 font-bold text-lg">
      🕒 HORARIO
    </div>
    <div className="text-yellow-300 text-lg sm:text-xl md:text-2xl font-black mt-1">
      13:00 - 17:00 hs
    </div>
  </div>

  <div
  className={`bg-black/45 border border-yellow-400/40 rounded-2xl p-4 shadow-[0_0_20px_rgba(255,215,0,0.25)]
${
  showEventCards
    ? 'animate-[slideRight_0.8s_ease_forwards]'
    : 'opacity-0'
}`}
  style={{ animationDelay: '0.6s' }}
>
    <div className="text-yellow-400 font-bold text-lg">
      📍 DIRECCIÓN
    </div>
    <div className="text-yellow-300 text-lg sm:text-xl md:text-2xl font-black mt-1">
      Calle 89 y 143
    </div>
  </div>

</div>

    </div>

  </div>

</section>

        <section className="px-6 pb-20 flex flex-col md:flex-row items-center justify-center gap-8">

          <button
            onClick={() =>
              window.open(
                'https://www.google.com/maps/search/?api=1&query=Camping+UPCN+Calle+89+y+143+La+Plata',
                '_blank'
              )
            }
            className="w-full md:w-auto bg-yellow-400 hover:bg-yellow-300 hover:scale-110 transition-all duration-500 text-black font-black text-lg md:text-xl px-10 py-5 rounded-3xl shadow-[0_0_30px_rgba(255,215,0,0.6)]"
          >
            📍 VER UBICACIÓN
          </button>

          <button
            onClick={() =>
              window.open(
                'https://forms.gle/tcPshsZvCLkZVcJn6',
                '_blank'
              )
            }
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-500 hover:scale-110 transition-all duration-500 text-white font-black text-lg md:text-xl px-10 py-5 rounded-3xl shadow-[0_0_30px_rgba(37,99,235,0.7)]"
          >
            ⚽ CONFIRMAR ASISTENCIA
          </button>

        </section>
<button
  onClick={toggleMusic}
  className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-yellow-400 text-black text-2xl shadow-[0_0_25px_rgba(255,215,0,0.7)] hover:scale-110 transition-all duration-300"
>
  {isPlaying ? '🔊' : '🔇'}
</button>
        <footer className="text-center pb-10 text-gray-400 text-sm">
          ❤️Hecho con amor, de Mamá y Papá para el cumpleaños de Nehi⚽
        </footer>

      </div>
    </div>
  );
}
