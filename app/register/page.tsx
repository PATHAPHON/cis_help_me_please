"use client";

import { useState } from "react";

import Link from "next/link";
import { TextField } from "@/shared/components/ui/index";
import Button from "@/shared/components/ui/Button";
import MaterialIcon from "@/shared/components/icons/MaterialIcon";
import { useAuth } from "@/features/auth/hooks/useAuth";

export default function RegisterPage() {

  const { loginAs } = useAuth();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    studentId: "",
    residence: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "กรุณากรอกชื่อ-นามสกุล";
    if (!form.phone.trim()) e.phone = "กรุณากรอกเบอร์โทรศัพท์";
    if (!form.residence.trim()) e.residence = "กรุณากรอกที่พักอาศัย";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    setLoading(true);
    // Simulate register delay then login as user
    await new Promise((r) => setTimeout(r, 800));
    loginAs("user");
  };

  return (
    <main className="flex flex-col gap-5 px-4 pt-8 pb-6 fade-up mx-auto w-full">


      {/* Register Welcome Hero Card - matching SOS green card format, but with purple theme */}
      <div
        className="relative rounded-3xl p-5 overflow-hidden"
        style={{ backgroundColor: "var(--color-card-purple)" }}
      >
        <div className="flex gap-4">
          {/* Left content */}
          <div className="flex-1 flex flex-col justify-between min-h-[140px]">
            <span
              className="flex items-center justify-center w-11 h-11 rounded-full"
              style={{ backgroundColor: "rgba(255,255,255,0.7)" }}
            >
              <MaterialIcon
                name="person_add"
                filled
                size={22}
                style={{ color: "var(--color-violence)" }}
              />
            </span>

            <div>
              <h2 className="text-xl font-bold text-on-surface mb-1">
                สมัครสมาชิก
              </h2>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "var(--color-on-surface-mid)" }}
              >
                กรอกข้อมูลของคุณให้ครบถ้วน
                <br />
                เพื่อรับสิทธิ์ในการส่งรายงานแจ้งเหตุ
              </p>
            </div>
          </div>

          {/* Right — register icon in white card */}
          <div
            className="flex items-center justify-center rounded-2xl shrink-0"
            style={{
              width: 110,
              height: 140,
              backgroundColor: "rgba(255,255,255,0.85)",
            }}
          >
            <MaterialIcon
              name="how_to_reg"
              filled
              size={56}
              style={{ color: "var(--color-violence)" }}
            />
          </div>
        </div>
      </div>

      {/* Form Fields container */}
      <div className="flex flex-col gap-4 mt-1">
        <TextField
          label="ชื่อ-นามสกุล *"
          placeholder="เช่น สมชาย มีสุข"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: (e.target as HTMLInputElement).value })
          }
          error={errors.name}
          leadingIcon="badge"
        />

        <TextField
          label="เบอร์โทรศัพท์ *"
          placeholder="เช่น 081-234-5678"
          type="tel"
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: (e.target as HTMLInputElement).value })
          }
          error={errors.phone}
          leadingIcon="phone"
        />

        <TextField
          label="รหัสนักศึกษา / บุคลากร"
          placeholder="เช่น 64010001 (ไม่บังคับ)"
          value={form.studentId}
          onChange={(e) =>
            setForm({
              ...form,
              studentId: (e.target as HTMLInputElement).value,
            })
          }
          leadingIcon="school"
        />

        <TextField
          label="ที่พัก / หน่วยงานสังกัด *"
          placeholder="เช่น หอพักอาคาร A"
          value={form.residence}
          onChange={(e) =>
            setForm({
              ...form,
              residence: (e.target as HTMLInputElement).value,
            })
          }
          error={errors.residence}
          leadingIcon="apartment"
        />

        <Button
          variant="filled"
          size="lg"
          fullWidth
          loading={loading}
          onClick={handleSubmit}
          className="mt-3 cursor-pointer"
        >
          <MaterialIcon name="check" size={20} />
          สมัครสมาชิก
        </Button>
      </div>

      {/* Login link */}
      <p
        className="text-xs text-center mt-4"
        style={{ color: "var(--color-on-surface-low)" }}
      >
        มีบัญชีสมาชิกแล้ว?{" "}
        <Link
          href="/login"
          className="font-bold underline"
          style={{ color: "var(--color-primary)" }}
        >
          เข้าสู่ระบบที่นี่
        </Link>
      </p>
    </main>
  );
}
