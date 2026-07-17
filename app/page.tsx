import Link from "next/link";
import MaterialIcon from "@/shared/components/icons/MaterialIcon";

export default function Home() {
  return (
    <main className="flex flex-col gap-6 px-4 pt-8 pb-6 fade-up mx-auto w-full">


      {/* Hero Welcome Card - matching the SOS card green style exactly */}
      <div
        className="relative rounded-3xl p-5 overflow-hidden"
        style={{ backgroundColor: "var(--color-card-green)" }}
      >
        <div className="flex gap-4">
          {/* Left content */}
          <div className="flex-1 flex flex-col justify-between min-h-[180px]">
            <span
              className="flex items-center justify-center w-11 h-11 rounded-full"
              style={{ backgroundColor: "rgba(255,255,255,0.7)" }}
            >
              <MaterialIcon
                name="shield"
                filled
                size={22}
                style={{ color: "var(--color-primary)" }}
              />
            </span>

            <div>
              <h2 className="text-xl font-bold text-on-surface mb-1">
                ปลอดภัย อุ่นใจ
              </h2>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "var(--color-on-surface-mid)" }}
              >
                ระบบแจ้งเหตุและขอความ
                <br />
                ช่วยเหลืออย่างรวดเร็ว
              </p>
            </div>

            <Link
              href="/login"
              className="self-start mt-3 px-4 py-2 rounded-full border text-xs font-medium transition-all active:scale-95 cursor-pointer"
              style={{
                borderColor: "var(--color-on-surface)",
                color: "var(--color-on-surface)",
                backgroundColor: "transparent",
              }}
            >
              เข้าใช้งานเลย
            </Link>
          </div>

          {/* Right — emergency icon in white card */}
          <div
            className="flex items-center justify-center rounded-2xl shrink-0"
            style={{
              width: 140,
              height: 180,
              backgroundColor: "rgba(255,255,255,0.85)",
            }}
          >
            <MaterialIcon
              name="local_police"
              filled
              size={72}
              style={{ color: "var(--color-primary)" }}
            />
          </div>
        </div>
      </div>

      {/* Feature cards - matching PastelStatCard style */}
      <div className="grid grid-cols-2 gap-3">
        <div
          className="flex flex-col gap-3 rounded-3xl p-4 min-h-[120px]"
          style={{ backgroundColor: "var(--color-card-blue)" }}
        >
          <span
            className="flex items-center justify-center w-10 h-10 rounded-full"
            style={{ backgroundColor: "rgba(255,255,255,0.7)" }}
          >
            <MaterialIcon name="bolt" size={20} style={{ color: "var(--color-primary)" }} />
          </span>
          <div>
            <p className="text-xs font-bold text-on-surface">
              รวดเร็ว 24 ชม.
            </p>
            <p className="text-[10px] mt-0.5 leading-relaxed" style={{ color: "var(--color-on-surface-low)" }}>
              เจ้าหน้าที่สแตนด์บายรับมือตลอดเวลา
            </p>
          </div>
        </div>

        <div
          className="flex flex-col gap-3 rounded-3xl p-4 min-h-[120px]"
          style={{ backgroundColor: "var(--color-card-purple)" }}
        >
          <span
            className="flex items-center justify-center w-10 h-10 rounded-full"
            style={{ backgroundColor: "rgba(255,255,255,0.7)" }}
          >
            <MaterialIcon name="share_location" size={20} style={{ color: "var(--color-violence)" }} />
          </span>
          <div>
            <p className="text-xs font-bold text-on-surface">
              ระบุพิกัดแม่นยำ
            </p>
            <p className="text-[10px] mt-0.5 leading-relaxed" style={{ color: "var(--color-on-surface-low)" }}>
              เข้าช่วยเหลือจุดเกิดเหตุได้ถูกต้องรวดเร็ว
            </p>
          </div>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col gap-3 w-full mt-2">
        <Link
          href="/login"
          className="flex items-center justify-center gap-2 w-full h-12 rounded-full text-sm font-medium transition-all active:scale-[0.98] shadow-sm cursor-pointer"
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
          className="flex items-center justify-center gap-2 w-full h-12 rounded-full text-sm font-medium border transition-all active:scale-[0.98] cursor-pointer"
          style={{
            borderColor: "var(--color-outline)",
            color: "var(--color-primary)",
            backgroundColor: "transparent",
          }}
        >
          <MaterialIcon name="person_add" size={20} />
          สมัครสมาชิกใหม่
        </Link>
      </div>

      {/* Footer info text */}
      <p className="text-[10px] text-center mt-4" style={{ color: "var(--color-on-surface-faint)" }}>
        พัฒนาขึ้นเพื่อความปลอดภัยของประชาคม CIS มหาวิทยาลัย
      </p>
    </main>
  );
}
