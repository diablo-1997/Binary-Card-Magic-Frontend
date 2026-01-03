import type { Route } from "./+types/home";
import BinaryMagic from "~/welcome/BinaryMagic";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Binary Card Magic Trick" },
    { name: "Binary Card Magic Trick - This magic trick or game using binary numbers.", content: "This trick uses binary numbers." },
  ];
}

export default function Home() {
  return <BinaryMagic />;
}
