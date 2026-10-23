"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { TargetRole } from "@/data/profile";
import { useLocale } from "@/context/locale-context";

const roles: Array<{ value: TargetRole; label: { en: string; id: string } }> = [
  { value: "backend", label: { en: "Backend Engineer", id: "Backend Engineer" } },
  { value: "software", label: { en: "Software Engineer", id: "Software Engineer" } },
  { value: "fullstack", label: { en: "Full Stack Engineer", id: "Full Stack Engineer" } },
];

export function ResumeCustomizer({ current }: { current: TargetRole }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { locale } = useLocale();

  function select(role: TargetRole) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("role", role);
    router.replace(`/resume?${params.toString()}`);
  }

  return (
    <div className="role-selector" aria-label="CV target role selector">
      <span className="mono">{locale === "en" ? "Target role" : "Fokus peran"}</span>
      <div role="group">
        {roles.map((role) => (
          <button
            key={role.value}
            onClick={() => select(role.value)}
            className={current === role.value ? "active" : ""}
          >
            {role.label[locale]}
          </button>
        ))}
      </div>
    </div>
  );
}
