# Class Diagram — CIS Help Me Please

โครงสร้างคลาสและโมดูลการทำงานภายในระบบเว็บแอปพลิเคชันแจ้งเหตุฉุกเฉิน

```mermaid
classDiagram
    class MockUser {
        +string id
        +string name
        +string phone
        +string studentId
        +string residence
        +Role role
        +string email
    }

    class Incident {
        +string id
        +string reporterId
        +string reporterName
        +IncidentCategory category
        +string description
        +string locationName
        +float latitude
        +float longitude
        +string imageUrl
        +IncidentStatus status
        +string createdAt
        +string updatedAt
        +RescueLog[] rescueLogs
    }

    class RescueLog {
        +string id
        +string incidentId
        +string staffId
        +string staffName
        +string actionTaken
        +string createdAt
    }

    class AuthContext {
        +MockUser user
        +Role role
        +boolean isLoggedIn
        +loginAs(role: Role) void
        +logout() void
        +updateUserRole(userId: string, newRole: Role) void
    }

    class IncidentsContext {
        +Incident[] incidents
        +getById(id: string) Incident
        +getByReporter(reporterId: string) Incident[]
        +createIncident(input) Incident
        +updateStatus(id: string, status: IncidentStatus) void
        +addRescueLog(input) void
    }

    MockUser "1" --> "*" Incident : reports
    MockUser "1" --> "*" RescueLog : handles (staff)
    Incident "1" --> "*" RescueLog : contains
    
    AuthContext ..> MockUser : manages state
    IncidentsContext ..> Incident : manages state
    IncidentsContext ..> RescueLog : creates / appends
```
