<!-- BEGIN:nextjs-agent-rules -->
# กฎสำหรับ Next.js 16, React 19 และโครงสร้างโปรเจกต์ (Next.js 16 & React 19 Rules)

โปรเจกต์นี้ใช้ Next.js 16.2.10 และ React 19.2.4 APIs สัญญาณเตือน และโครงสร้างไฟล์จะแตกต่างจากข้อมูลทั่วไป
- อ่านเอกสารใน `node_modules/next/dist/docs/` ก่อนเริ่มเขียนโค้ด
- ใส่ใจกับคำแจ้งเตือนการยกเลิกใช้งาน (deprecation notices) อย่างเคร่งครัด

## แนวทางการเขียน Component (Component Guidelines)
- **Server Components เป็นค่าเริ่มต้น**: คอมโพเนนต์ทั้งหมดใน `app` router จะเป็น Server Components โดยค่าเริ่มต้น ให้รักษาความเป็น Server Components ไว้เพื่อประสิทธิภาพและการดึงข้อมูลที่ดีที่สุด
- **Client Components ('use client')**: ใช้เมื่อจำเป็นสำหรับความสามารถในการโต้ตอบกับผู้ใช้ (Interactivity) เท่านั้น (เช่น การตรวจจับเหตุการณ์/event listeners หรือ React hooks เช่น `useState`, `useEffect`, `useContext`)
- **การแยกส่วน (Isolation)**: แยก Client Components ที่โต้ตอบได้ไว้ที่ปลายสุด of component tree (leaf nodes) เพื่อหลีกเลี่ยงการเปลี่ยนกิ่งขนาดใหญ่ใน component tree ให้กลายเป็นการเรนเดอร์ฝั่งคลื่น (client-side rendering)

## การจัดสไตล์ด้วย Tailwind CSS v4 (Styling with Tailwind CSS v4)
- **ใช้ Tailwind CSS v4**: นำเข้าด้วยโค้ด `@import "tailwindcss";` ภายในไฟล์ `app/globals.css`
- **ไม่มี tailwind.config.js**: ห้ามสร้างหรือแก้ไขไฟล์ `tailwind.config.js` เนื่องจากไม่รองรับใน Tailwind v4
- **การตั้งค่าธีม**: ปรับแต่งธีมโดยการเขียน `@theme inline` หรือ `@theme` ครอบคำสั่งโดยตรงภายในไฟล์ `app/globals.css`
- **ไวยากรณ์สมัยใหม่**: ใช้ชื่อคลาสมาตรฐานของ Tailwind CSS v4 และการอ้างอิง CSS variables ตามมาตรฐานใหม่

## ข้อกำหนดการออกแบบ (Design Requirements)
- **เน้นการออกแบบเฉพาะมือถือ (Mobile-Only Design)**: UI Components, Layouts และหน้าเว็บทั้งหมดในโปรเจกต์นี้ต้องถูกออกแบบและปรับแต่งให้เหมาะสมกับการใช้งานบนอุปกรณ์มือถือ (Mobile) เป็นหลัก โดยเน้นการจัดหน้าและการจัดวางองค์ประกอบให้แสดงผลได้อย่างสมบูรณ์แบบบนหน้าจอสมาร์ทโฟน

## สถาปัตยกรรมแบบ Feature-Driven (Feature-Driven Architecture)
จัดระเบียบโค้ดเบสตามโดเมน/ฟีเจอร์ โดยแบ่งแยกสามโฟลเดอร์หลักที่รูท:
- **`app/`**: จัดการเรื่อง routing, layouts และ pages ของ Next.js พยายามทำให้คอมโพเนนต์ในนี้มีขนาดเล็กและเบาที่สุด แล้วส่งต่อนำเสนอ UI และตรรกะทางธุรกิจไปที่ `features/` หรือ `shared/`
- **`features/`**: โมดูลฟีเจอร์เฉพาะโดเมน แต่ละฟีเจอร์ (เช่น `features/auth/`) จะต้องทำงานได้สมบูรณ์ในตัวเองและมีโครงสร้างดังนี้:
  - `components/`: UI components ที่ใช้งานภายในฟีเจอร์นั้นๆ เท่านั้น
  - `hooks/`: Custom hooks ที่ใช้จัดการตรรกะภายในฟีเจอร์
  - `api/`: ตรรกะการดึงข้อมูล (API fetching) หรือ server actions เฉพาะของฟีเจอร์
  - `types/`: ตัวประกาศประเภท TypeScript (TypeScript declarations) เฉพาะโดเมน
  - `index.ts`: Public API ที่ export เฉพาะสิ่งที่โมดูลอื่นภายนอกต้องการใช้งานจริง
- **`shared/`**: โมดูลที่สามารถนำกลับมาใช้ใหม่ข้ามฟีเจอร์ได้ (เช่น `shared/components/ui/`, `shared/hooks/`, `shared/utils/`, `shared/types/`)

## แนวทางการเขียนโค้ดและฐานข้อมูล (Coding)
- **TypeScript**: ใช้ TypeScript ในทุกไฟล์โค้ด รักษาความปลอดภัยของประเภทข้อมูล (type safety) และห้ามใช้งานประเภทข้อมูล `any`
- **การตั้งชื่อ Component**: ตั้งชื่อ React components ทั้งหมดด้วยรูปแบบ PascalCase (ตัวอย่างเช่น `UserProfile.tsx`)

## การใช้งานทักษะเสริม (Skills Usage)
- **ตรวจสอบและใช้งานทักษะเสริม (Skills)**: ให้เปิดอ่านและนำแนวทางจากทักษะเสริมที่เก็บไว้ภายใต้โฟลเดอร์ [.agents/skills/](file:///Users/pat/Project/CIS_Help_Me_Please/cis_help_me_please/.agents/skills/) มาใช้งานร่วมด้วยเสมอ โดยอิงรายการจากไฟล์ [skills-lock.json](file:///Users/pat/Project/CIS_Help_Me_Please/cis_help_me_please/skills-lock.json) เช่น:
  - **`karpathy-guidelines`**: คำแนะนำและกฎเกณฑ์พฤติกรรมเพื่อลดข้อผิดพลาดทั่วไปในการเขียนโค้ดและหลีกเลี่ยงการทำโค้ดให้ซับซ้อนเกินไป
  - **`ui-ux-pro-max`**: คลังข้อมูลความรู้และแนวทางการออกแบบ UI/UX ระดับมืออาชีพสำหรับการพัฒนาเว็บและแอปพลิเคชัน
  - **`design-docs`**: การสร้างเอกสารการออกแบบโครงการ เช่น flowchart, ER diagram หรือโครงสร้างระบบโดยใช้ Markdown และ Mermaid
  - **`caveman`**: ทักษะการสื่อสารแบบย่อเพื่อลดโทเค็นที่ไม่จำเป็น
<!-- END:nextjs-agent-rules -->
