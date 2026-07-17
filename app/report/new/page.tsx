"use client";

import { useState, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/shared/components/ui/Button";
import { TextField } from "@/shared/components/ui/index";
import MaterialIcon from "@/shared/components/icons/MaterialIcon";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useIncidents } from "@/features/incidents/hooks/useIncidents";
import { categoryMeta } from "@/features/incidents/utils/categoryMeta";
import type { IncidentCategory } from "@/shared/types";

const CATEGORIES: IncidentCategory[] = [
  "accident", "sickness", "fire", "violence", "fight", "other",
];

const STEP_LABELS = ["เลือกประเภท", "กรอกรายละเอียด", "ยืนยัน"];
const STEP_SUBTITLES = [
  "เลือกประเภทเหตุการณ์ที่คุณต้องการแจ้ง",
  "อธิบายเหตุการณ์และสถานที่ให้ครบถ้วน",
  "ตรวจสอบข้อมูลก่อนส่งให้เจ้าหน้าที่",
];

interface FormState {
  category: IncidentCategory | "";
  description: string;
  locationName: string;
  latitude?: number;
  longitude?: number;
  imagePreview?: string;
}

export default function ReportNewPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-dvh">
          <span style={{ color: "var(--color-on-surface-faint)" }}>กำลังโหลด...</span>
        </div>
      }
    >
      <ReportNewContent />
    </Suspense>
  );
}

function ReportNewContent() {
  const router = useRouter();
  const params = useSearchParams();
  const { user } = useAuth();
  const { createIncident } = useIncidents();

  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>({
    category: (params.get("category") as IncidentCategory) || "",
    description: "",
    locationName: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  /* ── Validation ─────────────────────────────────── */
  const validateStep1 = (): Record<string, string> => {
    if (!form.category) return { category: "กรุณาเลือกประเภทเหตุการณ์" };
    return {};
  };

  const validateStep2 = (): Record<string, string> => {
    const e: Record<string, string> = {};
    if (!form.description.trim()) e.description = "กรุณากรอกรายละเอียด";
    if (!form.locationName.trim()) e.locationName = "กรุณากรอกสถานที่";
    return e;
  };

  /* ── Handlers ───────────────────────────────────── */
  const handleNext = () => {
    const e = step === 1 ? validateStep1() : validateStep2();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    setErrors({});
    setStep((s) => s + 1);
  };

  const handleBack = () => {
    if (step === 1) router.back();
    else setStep((s) => s - 1);
  };

  const handleLocate = () => {
    setForm((f) => ({
      ...f,
      latitude: 13.7563 + Math.random() * 0.002,
      longitude: 100.5018 + Math.random() * 0.002,
      locationName: f.locationName || "ตำแหน่งปัจจุบัน (GPS)",
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setForm((f) => ({ ...f, imagePreview: url }));
  };

  const handleSubmit = async () => {
    if (!user) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const newInc = createIncident({
      reporterId: user.id,
      reporterName: user.name,
      category: form.category as IncidentCategory,
      description: form.description,
      locationName: form.locationName,
      latitude: form.latitude,
      longitude: form.longitude,
      imageUrl: form.imagePreview,
    });
    router.push(`/report/${newInc.id}`);
  };

  return (
    <div className="flex flex-col min-h-dvh" style={{ backgroundColor: "var(--color-background)" }}>
      <main className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-4 px-4 pt-6 pb-4 fade-up mx-auto w-full max-w-[480px]">
          {/* Header row — title + step counter */}
          <div className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-xs" style={{ color: "var(--color-on-surface-low)" }}>
                ขั้นตอนที่ {step} จาก 3
              </p>
              <p className="text-base font-bold text-on-surface truncate">
                แจ้งเหตุใหม่
              </p>
            </div>

            <span
              className="flex items-center justify-center w-10 h-10 rounded-full shrink-0"
              style={{
                backgroundColor: "var(--color-primary-light)",
                color: "var(--color-primary)",
                boxShadow: "0 1px 3px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.05)",
              }}
            >
              <MaterialIcon name="report" filled size={20} />
            </span>
          </div>

          {/* Hero step card — pastel like home */}
          <div
            className="relative rounded-3xl p-5 overflow-hidden"
            style={{
              backgroundColor:
                step === 1
                  ? "var(--color-card-blue)"
                  : step === 2
                  ? "var(--color-card-yellow)"
                  : "var(--color-card-green)",
            }}
          >
            <div className="flex gap-4 items-center">
              <div className="flex-1 min-w-0">
                <p
                  className="text-xs font-medium mb-1"
                  style={{ color: "var(--color-on-surface-mid)" }}
                >
                  {STEP_LABELS[step - 1]}
                </p>
                <h2 className="text-lg font-bold text-on-surface mb-1 leading-snug">
                  {step === 1
                    ? "เกิดอะไรขึ้น?"
                    : step === 2
                    ? "บอกรายละเอียดเพิ่มเติม"
                    : "พร้อมส่งแจ้งเหตุแล้ว"}
                </h2>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "var(--color-on-surface-mid)" }}
                >
                  {STEP_SUBTITLES[step - 1]}
                </p>
              </div>

              <span
                className="flex items-center justify-center rounded-2xl shrink-0"
                style={{
                  width: 72,
                  height: 72,
                  backgroundColor: "rgba(255,255,255,0.85)",
                }}
              >
                <MaterialIcon
                  name={step === 1 ? "category" : step === 2 ? "edit_note" : "task_alt"}
                  filled
                  size={40}
                  style={{ color: "var(--color-on-surface)" }}
                />
              </span>
            </div>

            {/* Step dots */}
            <div className="flex items-center gap-1.5 mt-4">
              {[1, 2, 3].map((n) => (
                <span
                  key={n}
                  className="h-1.5 rounded-full transition-all"
                  style={{
                    width: step === n ? 28 : 8,
                    backgroundColor:
                      step >= n
                        ? "var(--color-on-surface)"
                        : "rgba(0,0,0,0.15)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Step 1: Select category */}
          {step === 1 && (
            <div className="grid grid-cols-2 gap-3">
              {CATEGORIES.map((cat) => {
                const meta = categoryMeta[cat];
                const selected = form.category === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setForm((f) => ({ ...f, category: cat }));
                      setErrors({});
                    }}
                    className="flex flex-col items-center gap-3 p-5 rounded-3xl transition-all active:scale-[0.97]"
                    style={{
                      backgroundColor: meta.bg,
                      outline: selected ? `2px solid ${meta.color}` : "none",
                      outlineOffset: "-2px",
                    }}
                  >
                    <span
                      className="flex items-center justify-center rounded-2xl"
                      style={{
                        width: 56,
                        height: 56,
                        backgroundColor: selected
                          ? meta.color
                          : "rgba(255,255,255,0.7)",
                      }}
                    >
                      <MaterialIcon
                        name={meta.icon}
                        filled
                        size={30}
                        style={{ color: selected ? "white" : meta.color }}
                      />
                    </span>
                    <span
                      className="text-sm font-semibold"
                      style={{ color: meta.color }}
                    >
                      {meta.label}
                    </span>
                  </button>
                );
              })}
              {errors.category && (
                <p
                  className="col-span-2 text-xs mt-1"
                  style={{ color: "var(--color-error)" }}
                >
                  {errors.category}
                </p>
              )}
            </div>
          )}

          {/* Step 2: Details */}
          {step === 2 && (
            <div className="flex flex-col gap-3">
              {/* Selected category chip in a soft card */}
              {form.category && (
                <div
                  className="flex items-center gap-3 p-4 rounded-3xl"
                  style={{ backgroundColor: categoryMeta[form.category].bg }}
                >
                  <span
                    className="flex items-center justify-center rounded-2xl"
                    style={{
                      width: 44,
                      height: 44,
                      backgroundColor: "rgba(255,255,255,0.7)",
                    }}
                  >
                    <MaterialIcon
                      name={categoryMeta[form.category].icon}
                      filled
                      size={24}
                      style={{ color: categoryMeta[form.category].color }}
                    />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-xs"
                      style={{ color: "var(--color-on-surface-low)" }}
                    >
                      ประเภทที่เลือก
                    </p>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: categoryMeta[form.category].color }}
                    >
                      {categoryMeta[form.category].label}
                    </p>
                  </div>
                </div>
              )}

              {/* Form card */}
              <div
                className="flex flex-col gap-4 p-5 rounded-3xl bg-surface"
                style={{
                  boxShadow: "0 1px 3px rgba(0,0,0,.06), 0 1px 2px rgba(0,0,0,.04)",
                }}
              >
                <TextField
                  label="รายละเอียดเหตุการณ์ *"
                  placeholder="อธิบายสิ่งที่เกิดขึ้น เช่น นักศึกษาหกล้มบริเวณ..."
                  multiline
                  rows={4}
                  value={form.description}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      description: (e.target as HTMLTextAreaElement).value,
                    })
                  }
                  error={errors.description}
                />

                <TextField
                  label="สถานที่เกิดเหตุ *"
                  placeholder="เช่น อาคาร A ชั้น 2 ห้อง 201"
                  value={form.locationName}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      locationName: (e.target as HTMLInputElement).value,
                    })
                  }
                  error={errors.locationName}
                  leadingIcon="location_on"
                  trailingIcon={form.latitude ? "check_circle" : "my_location"}
                  onTrailingClick={handleLocate}
                />

                {form.latitude && form.longitude && (
                  <>
                    <div
                      className="flex items-center gap-2 px-3 py-2 rounded-2xl"
                      style={{ backgroundColor: "var(--color-resolved-bg)" }}
                    >
                      <MaterialIcon
                        name="gps_fixed"
                        size={16}
                        style={{ color: "var(--color-resolved)" }}
                      />
                      <span
                        className="text-xs"
                        style={{ color: "var(--color-resolved)" }}
                      >
                        พิกัด: {form.latitude.toFixed(4)}, {form.longitude.toFixed(4)}
                      </span>
                    </div>
                    <div className="rounded-2xl overflow-hidden" style={{ height: 160 }}>
                      <iframe
                        title="แผนที่ตำแหน่งที่เลือก"
                        src={`https://maps.google.com/maps?q=${form.latitude},${form.longitude}&z=17&output=embed`}
                        className="w-full h-full border-0"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Image upload card */}
              <div
                className="flex flex-col gap-2 p-5 rounded-3xl bg-surface"
                style={{
                  boxShadow: "0 1px 3px rgba(0,0,0,.06), 0 1px 2px rgba(0,0,0,.04)",
                }}
              >
                <label
                  className="text-xs font-medium"
                  style={{ color: "var(--color-on-surface-low)" }}
                >
                  แนบรูปภาพ (ไม่บังคับ)
                </label>
                {form.imagePreview ? (
                  <div className="relative rounded-2xl overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={form.imagePreview}
                      alt="รูปประกอบ"
                      className="w-full object-cover"
                      style={{ maxHeight: 180 }}
                    />
                    <button
                      onClick={() =>
                        setForm((f) => ({ ...f, imagePreview: undefined }))
                      }
                      className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full"
                      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                    >
                      <MaterialIcon name="close" size={18} style={{ color: "white" }} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => fileRef.current?.click()}
                    className="flex flex-col items-center gap-2 py-6 rounded-2xl border-2 border-dashed"
                    style={{ borderColor: "var(--color-outline)" }}
                  >
                    <MaterialIcon
                      name="add_photo_alternate"
                      size={32}
                      style={{ color: "var(--color-on-surface-faint)" }}
                    />
                    <span
                      className="text-sm"
                      style={{ color: "var(--color-on-surface-faint)" }}
                    >
                      แตะเพื่อเลือกรูปภาพ
                    </span>
                  </button>
                )}
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          )}

          {/* Step 3: Confirm */}
          {step === 3 && form.category && (
            <div className="flex flex-col gap-3">
              {/* Category card */}
              <div
                className="flex items-center gap-3 p-4 rounded-3xl"
                style={{ backgroundColor: categoryMeta[form.category].bg }}
              >
                <span
                  className="flex items-center justify-center rounded-2xl"
                  style={{
                    width: 52,
                    height: 52,
                    backgroundColor: "rgba(255,255,255,0.85)",
                  }}
                >
                  <MaterialIcon
                    name={categoryMeta[form.category].icon}
                    filled
                    size={28}
                    style={{ color: categoryMeta[form.category].color }}
                  />
                </span>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-xs"
                    style={{ color: "var(--color-on-surface-low)" }}
                  >
                    ประเภทเหตุการณ์
                  </p>
                  <p
                    className="text-base font-semibold"
                    style={{ color: categoryMeta[form.category].color }}
                  >
                    {categoryMeta[form.category].label}
                  </p>
                </div>
              </div>

              {/* Detail card */}
              <div
                className="rounded-3xl bg-surface overflow-hidden"
                style={{
                  boxShadow: "0 1px 3px rgba(0,0,0,.06), 0 1px 2px rgba(0,0,0,.04)",
                }}
              >
                <div className="px-5 pt-4 pb-2">
                  <p
                    className="text-xs font-medium"
                    style={{ color: "var(--color-on-surface-low)" }}
                  >
                    รายละเอียด
                  </p>
                </div>
                <div className="px-5 pb-4">
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--color-on-surface)" }}
                  >
                    {form.description}
                  </p>
                </div>

                <div
                  className="px-5 py-3 border-t flex items-center gap-2"
                  style={{ borderColor: "var(--color-outline)" }}
                >
                  <MaterialIcon
                    name="location_on"
                    size={18}
                    style={{ color: "var(--color-on-surface-faint)" }}
                  />
                  <p
                    className="text-sm"
                    style={{ color: "var(--color-on-surface)" }}
                  >
                    {form.locationName}
                  </p>
                </div>

                {form.latitude && form.longitude && (
                  <>
                    <div
                      className="px-5 py-3 border-t flex items-center gap-2"
                      style={{ borderColor: "var(--color-outline)" }}
                    >
                      <MaterialIcon
                        name="gps_fixed"
                        size={16}
                        style={{ color: "var(--color-resolved)" }}
                      />
                      <p
                        className="text-xs"
                        style={{ color: "var(--color-resolved)" }}
                      >
                        พิกัด GPS ถูกบันทึกแล้ว
                      </p>
                    </div>
                    <div
                      className="border-t overflow-hidden"
                      style={{ borderColor: "var(--color-outline)", height: 180 }}
                    >
                      <iframe
                        title={`แผนที่: ${form.locationName}`}
                        src={`https://maps.google.com/maps?q=${form.latitude},${form.longitude}&z=17&output=embed`}
                        className="w-full h-full border-0"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  </>
                )}
              </div>

              {form.imagePreview && (
                <div className="rounded-3xl overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={form.imagePreview}
                    alt="รูปประกอบ"
                    className="w-full object-cover"
                    style={{ maxHeight: 200 }}
                  />
                </div>
              )}

              {/* Info pastel card */}
              <div
                className="flex items-start gap-3 p-4 rounded-3xl"
                style={{ backgroundColor: "var(--color-card-blue)" }}
              >
                <span
                  className="flex items-center justify-center rounded-full shrink-0"
                  style={{
                    width: 36,
                    height: 36,
                    backgroundColor: "rgba(255,255,255,0.7)",
                  }}
                >
                  <MaterialIcon
                    name="info"
                    filled
                    size={20}
                    style={{ color: "var(--color-primary)" }}
                  />
                </span>
                <p
                  className="text-sm leading-relaxed flex-1 pt-1"
                  style={{ color: "var(--color-on-surface-mid)" }}
                >
                  เมื่อส่งแจ้งเหตุแล้ว เจ้าหน้าที่จะได้รับแจ้งทันทีและรีบเข้าช่วยเหลือ
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Bottom action bar */}
      <div
        style={{
          backgroundColor: "var(--color-background)",
        }}
      >
        <div
          className="mx-auto w-full max-w-[480px] px-4 py-4 flex gap-3"
          style={{ paddingBottom: "calc(1rem + var(--safe-bottom))" }}
        >
          {step > 1 && (
            <Button
              variant="outlined"
              size="lg"
              onClick={handleBack}
              className="flex-1"
            >
              ย้อนกลับ
            </Button>
          )}
          {step < 3 ? (
            <Button
              variant="filled"
              size="lg"
              onClick={handleNext}
              className="flex-1"
            >
              ถัดไป
              <MaterialIcon name="arrow_forward" size={18} />
            </Button>
          ) : (
            <Button
              variant="filled"
              size="lg"
              loading={loading}
              onClick={handleSubmit}
              className="flex-1"
              style={{ backgroundColor: "#d93025" }}
            >
              <MaterialIcon name="send" size={18} />
              ส่งแจ้งเหตุ
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
