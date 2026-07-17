# Flowchart — Emergency Reporting and Rescue Flow

กระบวนการแจ้งเหตุฉุกเฉินและประสานงานเข้าช่วยเหลือภายในมหาวิทยาลัย

```mermaid
flowchart TD
    Start([เริ่มต้น]) --> AuthCheck{เข้าสู่ระบบหรือยัง?}
    AuthCheck -->|ไม่ใช่| Register[สมัครสมาชิก / เข้าสู่ระบบ]
    Register --> Report[แจ้งเหตุฉุกเฉิน]
    AuthCheck -->|ใช่| Report
    
    Report --> InputDetails[กรอกรายละเอียด เลือกประเภท ระบุสถานที่ แนบรูปถ่าย]
    InputDetails --> Submit[ส่งข้อมูลแจ้งเหตุ]
    
    Submit --> NotifyStaff[ระบบแจ้งเตือนเจ้าหน้าที่ + แสดงในรายการ]
    NotifyStaff --> StaffClaim{เจ้าหน้าที่รับเรื่อง?}
    
    StaffClaim -->|รอการตอบสนอง| NotifyStaff
    StaffClaim -->|ใช่| UpdateProcessing[เปลี่ยนสถานะ: กำลังดำเนินการ]
    UpdateProcessing --> NotifyReporterProcessing[ส่งการแจ้งเตือนอัปเดตถึงผู้แจ้ง: กำลังดำเนินการ]
    NotifyReporterProcessing --> PerformRescue[เจ้าหน้าที่เข้าช่วยเหลือและบันทึกการดำเนินการ]
    
    PerformRescue --> FinishRescue[เปลี่ยนสถานะ: เสร็จสิ้น]
    FinishRescue --> NotifyReporterResolved[ส่งการแจ้งเตือนอัปเดตถึงผู้แจ้ง: เสร็จสิ้น]
    NotifyReporterResolved --> End([สิ้นสุดขั้นตอน])
```

---

# Flowchart — Admin Management Flow

กระบวนการตรวจสอบสถิติและจัดการสิทธิ์ของสมาชิกโดยผู้ดูแลระบบ (Admin)

```mermaid
flowchart TD
    StartAdmin([เริ่มต้น]) --> ViewStats[เข้าสู่หน้าสถิติภาพรวม /stats]
    
    ViewStats --> ChooseAction{เลือกดำเนินการ}
    
    ChooseAction -->|ดูข้อมูลสถิติ| AnalyseStats[วิเคราะห์ข้อมูล: จำนวนเหตุ, Resolved Rate, เวลาตอบสนองเฉลี่ย]
    AnalyseStats --> ChooseAction
    
    ChooseAction -->|จัดการสิทธิ์สมาชิก| ManageUsers[เข้าสู่หน้าจัดการสมาชิก /users]
    ManageUsers --> FilterUsers[ค้นหา / กรองรายชื่อตามบทบาท]
    FilterUsers --> SelectUser[เลือกผู้ใช้ที่ต้องการแก้ไขสิทธิ์]
    SelectUser --> EditRole[ปรับเปลี่ยนบทบาท: user / staff / admin]
    EditRole --> SaveRole[ระบบบันทึกการเปลี่ยนสิทธิ์สำเร็จ]
    SaveRole --> ManageUsers
    
    ManageUsers --> ChooseAction
    
    ChooseAction -->|ออกจากระบบ| LogoutAdmin[กดออกจากระบบ]
    LogoutAdmin --> EndAdmin([สิ้นสุดขั้นตอน])
```
