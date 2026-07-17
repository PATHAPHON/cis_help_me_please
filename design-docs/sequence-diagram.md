# Sequence Diagram — Emergency Reporting & Resolution Flow

ลำดับการทำงานและปฏิสัมพันธ์ระหว่างผู้ใช้งาน, ระบบเว็บแอปพลิเคชัน และฐานข้อมูล สำหรับกระบวนการแจ้งเหตุฉุกเฉินจนกระทั่งช่วยเหลือเสร็จสิ้น

```mermaid
sequenceDiagram
    actor Reporter as ผู้แจ้งเหตุ (User)
    participant Client as Web Frontend (Client)
    participant Server as API Server (Next.js App)
    participant DB as Database
    actor Staff as เจ้าหน้าที่ (Staff)

    Reporter->>Client: กรอกข้อมูลแจ้งเหตุ (ประเภท, รายละเอียด, พิกัด, ภาพ) และกดส่ง
    Client->>Server: POST /api/incidents
    Server->>DB: บันทึกข้อมูลเหตุการณ์ใหม่ (สถานะ 'pending')
    DB-->>Server: บันทึกสำเร็จ (Incident Object)
    Server-->>Client: ส่งกลับ HTTP 201 + ข้อมูลเหตุการณ์
    Client-->>Reporter: แสดงหน้าจอแจ้งเหตุสำเร็จ + แนะนำให้รอการช่วยเหลือ

    note over Server, Staff: ระบบแจ้งเตือนหรืออัปเดตแบบเรียลไทม์ / ดึงข้อมูลใหม่
    Staff->>Client: เปิดดูหน้าควบคุม (Dashboard) และดูเหตุการณ์ล่าสุด
    Client->>Server: GET /api/incidents?status=pending
    Server->>DB: ดึงข้อมูลเหตุการณ์ที่ยังค้างอยู่
    DB-->>Server: รายการเหตุการณ์
    Server-->>Client: แสดงรายการเหตุการณ์บน Dashboard เจ้าหน้าที่
    
    Staff->>Client: กดปุ่ม "รับเรื่องเพื่อเข้าช่วยเหลือ"
    Client->>Server: PATCH /api/incidents/[id] (status = 'processing')
    Server->>DB: อัปเดตสถานะเหตุการณ์เป็น 'processing'
    DB-->>Server: อัปเดตสำเร็จ
    Server-->>Client: อัปเดตสถานะสำเร็จ
    Client-->>Staff: แสดงสถานะเหตุการณ์เปลี่ยนเป็น "กำลังดำเนินการ"
    
    note over Reporter, Client: ผู้แจ้งเหตุตรวจพบสถานะอัปเดตผ่านหน้าติดตาม
    Reporter->>Client: ตรวจสอบสถานะเหตุการณ์
    Client->>Server: GET /api/incidents/[id]
    Server-->>Client: ส่งกลับข้อมูลเหตุการณ์ล่าสุด (สถานะ 'processing')
    Client-->>Reporter: อัปเดตหน้าจอเป็น "เจ้าหน้าที่กำลังดำเนินการช่วยเหลือ"

    note over Staff: เจ้าหน้าที่เดินทางไปที่เกิดเหตุและเคลียร์เหตุการณ์เรียบร้อย
    
    Staff->>Client: บันทึกการช่วยเหลือและกด "เสร็จสิ้นการช่วยเหลือ"
    Client->>Server: POST /api/rescue-logs & PATCH /api/incidents/[id] (status = 'resolved')
    Server->>DB: บันทึก Rescue Log และอัปเดตสถานะ incident เป็น 'resolved'
    DB-->>Server: บันทึกข้อมูลเรียบร้อย
    Server-->>Client: ส่งกลับผลการทำงานสำเร็จ
    Client-->>Staff: แสดงสถานะว่าเคลียร์เหตุการณ์เสร็จสิ้น
    
    Reporter->>Client: ตรวจสอบสถานะอีกครั้ง
    Client->>Server: GET /api/incidents/[id]
    Server-->>Client: ส่งกลับข้อมูลเหตุการณ์ล่าสุด (สถานะ 'resolved')
    Client-->>Reporter: อัปเดตหน้าจอเป็น "การช่วยเหลือเสร็จสิ้น"
```

---

## Use Case Diagram

แผนภาพแสดงบทบาทการใช้งานแยกตาม 3 บทบาทหลัก โดยแสดงรายละเอียดการรับส่งข้อมูลและความสัมพันธ์ของฟังก์ชันต่างๆ อย่างครบถ้วน

### 1. ผู้แจ้งเหตุ (User - นักศึกษา / บุคลากร)
```mermaid
flowchart TB
    User["ผู้แจ้งเหตุ (User)"]
    
    subgraph RegisterUC [การลงทะเบียน]
        UC_Reg("(สมัครสมาชิก)")
        UC_Reg_Detail("(กรอกข้อมูล: ชื่อ, เบอร์โทร, รหัสนักศึกษา, ที่พัก)")
    end

    subgraph ReportUC [การแจ้งเหตุและการติดตาม]
        UC_Report("(แจ้งเหตุฉุกเฉิน)")
        UC_Category("(เลือกประเภทเหตุ:\nอุบัติเหตุ, เจ็บป่วย, รุนแรง, วิวาท, ไฟไหม้, อื่นๆ)")
        UC_Desc("(กรอกรายละเอียดเหตุการณ์)")
        UC_Loc("(กรอกสถานที่ & ปักหมุดแผนที่เกิดเหตุ)")
        UC_Photo("(แนบภาพถ่ายหรือไฟล์)")
        UC_Track("(ติดตามสถานะการช่วยเหลือ)")
    end
    
    UC_Login("(เข้าสู่ระบบ / ออกจากระบบ)")

    %% Relations for Register
    User --> UC_Reg
    UC_Reg -->|include| UC_Reg_Detail

    %% Relations for Login
    User --> UC_Login

    %% Relations for Report
    User --> UC_Report
    UC_Report -->|include| UC_Category
    UC_Report -->|include| UC_Desc
    UC_Report -->|include| UC_Loc
    UC_Photo -.->|extend| UC_Report

    %% Relations for Track
    User --> UC_Track
```

### 2. เจ้าหน้าที่ช่วยเหลือ (Staff)
```mermaid
flowchart TB
    Staff["เจ้าหน้าที่ช่วยเหลือ (Staff)"]
    
    UC_Login("(เข้าสู่ระบบ / ออกจากระบบ)")

    subgraph ManageUC [การจัดการเหตุและช่วยเหลือ]
        UC_View("(ดูรายการแจ้งเหตุทั้งหมด)")
        UC_Filter("(กรองตามสถานะ: รอตอบสนอง / ดำเนินการ / เสร็จสิ้น)")
        
        UC_Manage("(จัดการเหตุฉุกเฉิน)")
        UC_Claim("(รับเรื่อง & อัปเดตสถานะเป็น 'กำลังดำเนินการ')")
        UC_Log("(บันทึกการดำเนินการช่วยเหลือ)")
        UC_Close("(บันทึกเสร็จสิ้น & อัปเดตสถานะเป็น 'เสร็จสิ้น')")
    end

    UC_Notify("(รับการแจ้งเตือนเหตุใหม่)")

    %% Relations
    Staff --> UC_Login
    Staff --> UC_Notify
    
    Staff --> UC_View
    UC_View -->|include| UC_Filter
    
    Staff --> UC_Manage
    UC_Manage -->|include| UC_Claim
    UC_Manage -->|include| UC_Log
    UC_Manage -->|include| UC_Close
```

### 3. ผู้ดูแลระบบ / ผู้บริหาร (Admin)
```mermaid
flowchart TB
    Admin["ผู้ดูแลระบบ / ผู้บริหาร (Admin)"]
    
    UC_Login("(เข้าสู่ระบบ / ออกจากระบบ)")
    UC_ManageUser("(จัดการข้อมูลผู้ใช้งานและกำหนดสิทธิ์เจ้าหน้าที่)")

    subgraph ReportUCAdmin [รายงานและสถิติ]
        UC_Report("(ดูรายงานสถิติ)")
        UC_Stat_Cat("(สรุปจำนวนเหตุตามประเภท)")
        UC_Stat_Time("(สถิติเวลาการตอบสนองช่วยเหลือ)")
    end

    %% Relations
    Admin --> UC_Login
    Admin --> UC_ManageUser
    
    Admin --> UC_Report
    UC_Report -->|include| UC_Stat_Cat
    UC_Report -->|include| UC_Stat_Time
```

