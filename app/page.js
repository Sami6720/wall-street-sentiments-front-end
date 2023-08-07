"use client";

import { Container } from "@mui/material";
import { HeroComp } from "./homeComponents/HeroComp";

export default function Home() {
  return (
    <main>
      <Container>
        <HeroComp />
      </Container>
    </main>
  );
}
