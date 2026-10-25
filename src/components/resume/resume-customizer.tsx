"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { targetRoles, type TargetRole } from "@/data/profile";
import { useLocale } from "@/context/locale-context";

const roleKeys: TargetRole[] = ["backend", "software", "fullstack"];

export function ResumeCustomizer({ current }: { current: TargetRole }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { locale } = useLocale();

  function select(role: TargetRole) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("role", role);
    router.replace(`/resume?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="role-selector" aria-label="CV target role selector">
      <div className="role-selector-header">
        <span className="mono role-selector-label">
          {locale === "en" ? "Target role" : "Fokus peran"}
        </span>
        <span className="mono role-selector-count">{locale === "en" ? "3 options" : "3 opsi"}</span>
      </div>
      <div
        className="role-selector-group"
        role="radiogroup"
        aria-label={locale === "en" ? "Target role selection" : "Pemilihan fokus peran"}
      >
        {roleKeys.map((key) => {
          const roleData = targetRoles[key];
          const isSelected = current === key;
          return (
            <button
              key={key}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => select(key)}
              className={`role-button ${isSelected ? "is-selected" : ""}`}
            >
              <span className="role-button-indicator" aria-hidden="true" />
              <span>{roleData.label[locale]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
