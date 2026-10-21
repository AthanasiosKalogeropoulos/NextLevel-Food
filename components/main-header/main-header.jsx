import Link from "next/link";
import Image from "next/image";
import logoImg from "@/assets/logo.png";
import mainHeaderStyle from "./main-header.module.css";
import MainHeaderBackground from "@/components/main-header/main-header-background";
import NavLink from "./nav-link";

export default function MainHeader() {
  return (
    <>
      {/* Header Bckground */}
      <MainHeaderBackground />

      <header className={mainHeaderStyle.header}>
        <Link className={mainHeaderStyle.logo} href="/">
          <Image src={logoImg} alt="A plate with food on it" priority />
          NextLevel Food
        </Link>

        <nav className={mainHeaderStyle.nav}>
          <ul>
            <li>
              <NavLink href="/meals">Browse Meals</NavLink>
            </li>
            <li>
              <NavLink href="/community">Foodies Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
