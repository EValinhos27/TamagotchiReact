import { NavBtn, Slide, Track, Wrapper } from "./style";

import bannerOpcao1 from "../../assets/home/banner_opcao_1.png";
import floresta from "../../assets/home/floresta.png";
import praia from "../../assets/home/praia.png";
import cidade from "../../assets/home/cidade.png";
import { useEffect, useRef, useState } from "react";

const slides = [
  { src: bannerOpcao1, alt: "Banner promocional com assinatura anual" },
  { src: floresta, alt: "Personagem em cenário de floresta" },
  { src: praia, alt: "Personagem em cenário de praia" },
  { src: cidade, alt: "Personagem em cenário de cidade" },
];

export default function Carousel() {
  const [index, setIndex] = useState(0);
  const autoRef = useRef(null);

  const next = () => setIndex((i) => (i + 1) % slides.length);
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);

  const startAuto = () => {
    autoRef.current = setInterval(next, 3000);
  };
  const stopAuto = () => clearInterval(autoRef.current);

  useEffect(() => {
    startAuto();
    return () => stopAuto();
  }, []);

  return (
    <Wrapper onMouseEnter={stopAuto} onMouseLeave={startAuto}>
      <Track $index={index}>
        {slides.map((s, i) => (
          <Slide key={i}>
            <img src={s.src} alt={s.alt} />
          </Slide>
        ))}
      </Track>
      <NavBtn $side="prev" onClick={prev}>
        ❮
      </NavBtn>
      <NavBtn $side="next" onClick={next}>
        ❯
      </NavBtn>
    </Wrapper>
  );
}
