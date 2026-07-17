import type { MockUser } from "@/shared/types";

export const MOCK_USERS: MockUser[] = [
  {
    id: "u1",
    name: "สมชาย มีสุข",
    phone: "081-234-5678",
    studentId: "64010001",
    residence: "หอพักนักศึกษา อาคาร A",
    role: "user",
    email: "user@cis.ac.th",
  },
  {
    id: "u2",
    name: "วิภาวดี ใจดี",
    phone: "082-345-6789",
    studentId: "64010042",
    residence: "หอพักนักศึกษา อาคาร B",
    role: "user",
    email: "user2@cis.ac.th",
  },
  {
    id: "s1",
    name: "ร.ต.ท. ประเสริฐ รักษาดี",
    phone: "083-456-7890",
    studentId: undefined,
    residence: "อาคารความปลอดภัย ชั้น 1",
    role: "staff",
    email: "staff@cis.ac.th",
  },
  {
    id: "s2",
    name: "จ.ส.ต. มานพ กล้าหาญ",
    phone: "084-567-8901",
    studentId: undefined,
    residence: "อาคารความปลอดภัย ชั้น 1",
    role: "staff",
    email: "staff2@cis.ac.th",
  },
  {
    id: "a1",
    name: "ผศ.ดร. สุรชัย พัฒนาการ",
    phone: "085-678-9012",
    studentId: undefined,
    residence: "อาคารบริหาร ชั้น 3",
    role: "admin",
    email: "admin@cis.ac.th",
  },
];
