"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TextField } from "@/shared/components/ui/index";
import Button from "@/shared/components/ui/Button";
import MaterialIcon from "@/shared/components/icons/MaterialIcon";
import { useAuth } from "@/features/auth/hooks/useAuth";

export default function RegisterPage() {
  const router = useRouter();
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
    <div className="flex flex-col min-h-dvh bg-surface">
      <main className="flex-1 px-5 py-6 flex flex-col gap-5 fade-up">
        {/* Icon */}
        <div className="flex items-center gap-3 mb-2">
          <div
            className="flex items-center justify-center rounded-xl"
            style={{ width: 48, height: 48, backgroundColor: "#e8f0fe" }}
          >
            <MaterialIcon name="person_add" filled size={26} style={{ color: "#1a73e8" }} />
          </div>
          <div>
            <p className="font-medium text-on-surface">สร้างบัญชีใหม่</p>
            <p className="text-xs text-on-surface-faint">กรอกข้อมูลเพื่อสมัครสมาชิก</p>
          </div>
        </div>

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
          className="mt-2"
        >
          <MaterialIcon name="check" size={20} />
          สมัครสมาชิก
        </Button>

        <p className="text-sm text-center" style={{ color: "var(--color-on-surface-low)" }}>
          มีบัญชีแล้ว?{" "}
          <button
            onClick={() => router.push("/login")}
            className="font-medium"
            style={{ color: "var(--color-primary)" }}
          >
            เข้าสู่ระบบ
          </button>
        </p>
      </main>
    </div>
  );
}
