import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { SparklesIcon } from "@hugeicons/core-free-icons";

export function Brand() {
  return (
    <Link href="/" className="flex items-center gap-2 font-bold text-xl">
      <HugeiconsIcon icon={SparklesIcon} className="h-6 w-6 text-primary" />
      <span>TurboApp</span>
    </Link>
  );
}
