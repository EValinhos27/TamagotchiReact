import { Link } from "react-router-dom";
import { FooterLogo, FooterSection, FooterWrapper } from "./style";
import logo from "../../assets/home/Logo.jpeg";

export default function Footer() {
  return (
    <FooterWrapper>
      <FooterLogo src={logo} alt="Logo tamagoshi" />

      <FooterSection>
        <Link to="/">Home</Link>
        <Link to="/acessorios">Acessórios</Link>
        <Link to="/personagens">Personagens</Link>
        <Link to="/sobre">Quem somos</Link>
      </FooterSection>

      <FooterSection>
        <a href="#">@tamagoshi_virtual</a>
        <a href="mailto:tamagoshi@compre.ja.com">tamagoshi@compre.ja.com</a>
      </FooterSection>
    </FooterWrapper>
  );
}
