"use client";
import { useRouter, useSearchParams } from "next/navigation";
import type { TargetRole } from "@/data/profile";

const roles: Array<{ value: TargetRole; label: string }> = [
  { value: "backend", label: "Backend Engineer" },
  { value: "software", label: "Software Engineer" },
  { value: "fullstack", label: "Full Stack Engineer" },
];
export function ResumeCustomizer({ current }: { current: TargetRole }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  function select(role: TargetRole) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("role", role);
    router.replace(`/resume?${params.toString()}`);
  }
  return (
    <div className="role-selector" aria-label="CV target role">
      <span className="mono">Target role</span>
      <div role="group">
        {roles.map((role) => (
          <button
            key={role.value}
            onClick={() => select(role.value)}
            className={current === role.value ? "active" : ""}
          >
            {role.label}
          </button>
        ))}
      </div>
    </div>
  );
}
