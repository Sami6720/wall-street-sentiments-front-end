"use client";

import { Container } from "@mui/material";
import { HeroComp } from "./homeComponents/HeroComp";
import NavbarComp from "./homeComponents/NavbarComp";

export default function Home() {
  return (
    <main>
      <NavbarComp />
      <Container>
        <HeroComp />
      </Container>
    </main>
  );
}
