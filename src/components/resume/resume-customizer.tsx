"use client";

import { useLocale } from "@/context/locale-context";
import { roleIds, rolePresets, type RoleId } from "@/data/resume/role-presets";

export function ResumeCustomizer({
  current,
  onSelect,
}: {
  current: RoleId;
  onSelect: (role: RoleId) => void;
}) {
  const { locale } = useLocale();

  return (
    <div className="role-selector" aria-label="CV target role selector">
      <div className="role-selector-header">
        <span className="mono role-selector-label">
          {locale === "en" ? "Role Positioning" : "Fokus Peran"}
        </span>
        <span className="mono role-selector-count">
          {roleIds.length} {locale === "en" ? "presets" : "opsi"}
        </span>
      </div>
      <div
        className="role-selector-group"
        role="radiogroup"
        aria-label={locale === "en" ? "Target role selection" : "Pemilihan fokus peran"}
      >
        {roleIds.map((key) => {
          const preset = rolePresets[key];
          const isSelected = current === key;
          return (
            <button
              key={key}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelect(key)}
              className={`role-button ${isSelected ? "is-selected" : ""}`}
            >
              <span className="role-button-indicator" aria-hidden="true" />
              <span>{preset.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
