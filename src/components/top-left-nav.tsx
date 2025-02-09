import React from 'react';
import { Button } from "@/components/ui/button"
import Link from 'next/link';

export function TopLeftNav() {
  return (
    <nav className="absolute top-4 left-4 flex gap-2">
        <Link href="/">
          <Button variant="outline">Scanner</Button>
        </Link>
        <Link href="/generator">
          <Button variant="outline">Generator</Button>
        </Link>
        <Link href="https://pomodoro.love">
          <Button variant="outline">Pomodoro</Button>
        </Link>
    </nav>
  );
}
