import Link from "next/link";
import MaterialIcon from "@/shared/components/icons/MaterialIcon";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-dvh gap-6 px-6 bg-surface fade-up">
      {/* Logo area */}
      <div className="flex flex-col items-center gap-3">
        <div
          className="flex items-center justify-center rounded-2xl"
          style={{
            width: 80,
            height: 80,
            backgroundColor: "var(--color-primary-light)",
          }}
        >
          <MaterialIcon
            name="emergency"
            filled
            size={48}
            style={{ color: "var(--color-primary)" }}
          />
        </div>
        <h1
          className="text-2xl font-medium tracking-tight text-center"
          style={{ color: "var(--color-on-surface)" }}
        >
          CIS Help Me Please
        </h1>
        <p
          className="text-sm text-center"
          style={{ color: "var(--color-on-surface-low)" }}
        >
          ระบบแจ้งเหตุฉุกเฉินภายในมหาวิทยาลัย
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <Link
          href="/login"
          className="flex items-center justify-center gap-2 w-full h-12 rounded-full text-sm font-medium transition-all active:opacity-80"
          style={{
            backgroundColor: "var(--color-primary)",
            color: "var(--color-on-primary)",
          }}
        >
          <MaterialIcon name="login" size={20} />
          เข้าสู่ระบบ
        </Link>
        <Link
          href="/register"
          className="flex items-center justify-center gap-2 w-full h-12 rounded-full text-sm font-medium border transition-all active:opacity-80"
          style={{
            borderColor: "var(--color-outline)",
            color: "var(--color-primary)",
            backgroundColor: "transparent",
          }}
        >
          <MaterialIcon name="person_add" size={20} />
          สมัครสมาชิก
        </Link>
      </div>

      {/* Dev: Preview link */}
      <Link
        href="/preview"
        className="text-xs mt-4"
        style={{ color: "var(--color-on-surface-faint)" }}
      >
        UI Preview →
      </Link>
    </main>
  );
}
