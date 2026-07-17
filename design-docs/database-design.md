# Database Design — CIS Help Me Please

โครงสร้างฐานข้อมูลสำหรับการจัดเก็บข้อมูลผู้ใช้งาน เหตุฉุกเฉิน และบันทึกการช่วยเหลือ

```mermaid
erDiagram
    users ||--o{ incidents : reports
    users ||--o{ rescue_logs : handles
    incidents ||--o{ rescue_logs : logs
    
    users {
        int id PK
        string name
        string phone
        string student_id "nullable"
        string residence
        string role "user / staff / admin"
        string password_hash
        timestamp created_at
    }
    
    incidents {
        int id PK
        int reporter_id FK
        string category "accident / sickness / violence / fight / fire / other"
        text description
        string location_name
        float latitude "nullable"
        float longitude "nullable"
        string image_url "nullable"
        string status "pending / processing / resolved"
        timestamp created_at
        timestamp updated_at
    }
    
    rescue_logs {
        int id PK
        int incident_id FK
        int staff_id FK
        text action_taken
        timestamp created_at
    }
```

## Tables

### users
| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | int | PK, Auto Increment | ไอดีผู้ใช้ |
| name | string | Not Null | ชื่อ-นามสกุล |
| phone | string | Not Null | เบอร์โทรศัพท์ |
| student_id | string | Nullable | รหัสนักศึกษา/บุคลากร |
| residence | string | Not Null | สถานที่พัก/หน่วยงานสังกัด |
| role | string | Not Null, Default: 'user' | บทบาท ('user', 'staff', 'admin') |
| password_hash | string | Not Null | รหัสผ่านเข้ารหัส |
| created_at | timestamp | Not Null, Default: Current Time | วันที่สมัครสมาชิก |

### incidents
| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | int | PK, Auto Increment | ไอดีเหตุการณ์ |
| reporter_id | int | FK -> users(id), Not Null | ไอดีผู้แจ้งเหตุ |
| category | string | Not Null | ประเภทเหตุการณ์ |
| description | text | Not Null | รายละเอียดเหตุการณ์ |
| location_name | string | Not Null | สถานที่เกิดเหตุ |
| latitude | float | Nullable | พิกัดละติจูด |
| longitude | float | Nullable | พิกัดลองจิจูด |
| image_url | string | Nullable | ลิงก์ภาพแนบ |
| status | string | Not Null, Default: 'pending' | สถานะ ('pending', 'processing', 'resolved') |
| created_at | timestamp | Not Null, Default: Current Time | วันที่แจ้งเหตุ |
| updated_at | timestamp | Not Null, Default: Current Time | วันที่อัปเดตเหตุการณ์ |

### rescue_logs
| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | int | PK, Auto Increment | ไอดีบันทึกช่วยเหลือ |
| incident_id | int | FK -> incidents(id), Not Null | ไอดีเหตุการณ์ |
| staff_id | int | FK -> users(id), Not Null | ไอดีเจ้าหน้าที่ผู้บันทึก |
| action_taken | text | Not Null | รายละเอียดการดำเนินงานช่วยเหลือ |
| created_at | timestamp | Not Null, Default: Current Time | วันที่บันทึก |
