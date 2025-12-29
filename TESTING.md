# FundooNotes API Testing Guide

Base URL: `http://localhost:5000`

---

## 1. USER REGISTRATION

**POST** `/api/v1/users/register`
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

---

## 2. USER LOGIN

**POST** `/api/v1/users/login`
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
**Save the token from response**

---

## 3. FORGOT PASSWORD

**POST** `/api/v1/users/forgot-password`
```json
{
  "email": "john@example.com"
}
```

---

## 4. RESET PASSWORD

**POST** `/api/v1/users/reset-password`
```json
{
  "token": "YOUR_RESET_TOKEN",
  "newPassword": "newpassword123"
}
```

---

## 5. CREATE NOTE

**POST** `/api/v1/notes`  
**Header:** `Authorization: Bearer YOUR_TOKEN`
```json
{
  "title": "Meeting Notes",
  "description": "Discuss project timeline and deliverables"
}
```
**Save the note _id from response**

---

## 6. GET ALL NOTES (Cached)

**GET** `/api/v1/notes`  
**Header:** `Authorization: Bearer YOUR_TOKEN`

---

## 7. GET SINGLE NOTE

**GET** `/api/v1/notes/NOTE_ID`  
**Header:** `Authorization: Bearer YOUR_TOKEN`

---

## 8. UPDATE NOTE

**PUT** `/api/v1/notes/NOTE_ID`  
**Header:** `Authorization: Bearer YOUR_TOKEN`
```json
{
  "title": "Updated Meeting Notes",
  "description": "Updated description with action items"
}
```

---

## 9. DELETE NOTE

**DELETE** `/api/v1/notes/NOTE_ID`  
**Header:** `Authorization: Bearer YOUR_TOKEN`

---

## 10. PIN NOTE

**PATCH** `/api/v1/notes/NOTE_ID/pin`  
**Header:** `Authorization: Bearer YOUR_TOKEN`

---

## 11. ARCHIVE NOTE

**PATCH** `/api/v1/notes/NOTE_ID/archive`  
**Header:** `Authorization: Bearer YOUR_TOKEN`

---

## 12. TRASH NOTE

**PATCH** `/api/v1/notes/NOTE_ID/trash`  
**Header:** `Authorization: Bearer YOUR_TOKEN`

---

## 13. GET ARCHIVED NOTES

**GET** `/api/v1/notes/archived`  
**Header:** `Authorization: Bearer YOUR_TOKEN`

---

## 14. GET TRASHED NOTES

**GET** `/api/v1/notes/trashed`  
**Header:** `Authorization: Bearer YOUR_TOKEN`

---

## 15. SEARCH NOTES

**GET** `/api/v1/notes/search?q=meeting`  
**Header:** `Authorization: Bearer YOUR_TOKEN`

---

## 16. CREATE LABEL

**POST** `/api/v1/labels`  
**Header:** `Authorization: Bearer YOUR_TOKEN`
```json
{
  "name": "Work"
}
```
**Save the label _id from response**

---

## 17. GET ALL LABELS

**GET** `/api/v1/labels`  
**Header:** `Authorization: Bearer YOUR_TOKEN`

---

## 18. GET SINGLE LABEL

**GET** `/api/v1/labels/LABEL_ID`  
**Header:** `Authorization: Bearer YOUR_TOKEN`

---

## 19. UPDATE LABEL

**PUT** `/api/v1/labels/LABEL_ID`  
**Header:** `Authorization: Bearer YOUR_TOKEN`
```json
{
  "name": "Personal"
}
```

---

## 20. DELETE LABEL

**DELETE** `/api/v1/labels/LABEL_ID`  
**Header:** `Authorization: Bearer YOUR_TOKEN`

---

## 21. ADD LABEL TO NOTE

**PUT** `/api/v1/notes/NOTE_ID`  
**Header:** `Authorization: Bearer YOUR_TOKEN`
```json
{
  "title": "Meeting Notes",
  "description": "Discuss project timeline",
  "labels": ["LABEL_ID"]
}
```

---

## 22. SEARCH NOTES BY LABEL

**GET** `/api/v1/notes/label/LABEL_ID`  
**Header:** `Authorization: Bearer YOUR_TOKEN`

---

## 23. ADD COLLABORATOR (Email Notification)

**POST** `/api/v1/notes/NOTE_ID/collaborator`  
**Header:** `Authorization: Bearer YOUR_TOKEN`
```json
{
  "email": "collaborator@example.com"
}
```
**Check server logs for email preview URL**

---

## Complete Test Flow

```bash
# 1. Register User 1
POST /api/v1/users/register
{
  "firstName": "Alice",
  "lastName": "Smith",
  "email": "alice@example.com",
  "password": "password123"
}

# 2. Register User 2 (Collaborator)
POST /api/v1/users/register
{
  "firstName": "Bob",
  "lastName": "Johnson",
  "email": "bob@example.com",
  "password": "password123"
}

# 3. Create Label (as Alice)
POST /api/v1/labels
Authorization: Bearer ALICE_TOKEN
{
  "name": "Important"
}

# 4. Create Note (as Alice)
POST /api/v1/notes
Authorization: Bearer ALICE_TOKEN
{
  "title": "Project Planning",
  "description": "Q1 2025 roadmap and milestones",
  "labels": ["LABEL_ID"]
}

# 5. Pin the Note
PATCH /api/v1/notes/NOTE_ID/pin
Authorization: Bearer ALICE_TOKEN

# 6. Add Collaborator
POST /api/v1/notes/NOTE_ID/collaborator
Authorization: Bearer ALICE_TOKEN
{
  "email": "bob@example.com"
}

# 7. Search Notes
GET /api/v1/notes/search?q=planning
Authorization: Bearer ALICE_TOKEN

# 8. Archive Note
PATCH /api/v1/notes/NOTE_ID/archive
Authorization: Bearer ALICE_TOKEN

# 9. Get Archived Notes
GET /api/v1/notes/archived
Authorization: Bearer ALICE_TOKEN

# 10. Trash Note
PATCH /api/v1/notes/NOTE_ID/trash
Authorization: Bearer ALICE_TOKEN
```

---

## Features Tested

✅ User Registration & Login  
✅ Password Reset  
✅ CRUD Notes  
✅ CRUD Labels  
✅ Pin/Archive/Trash Notes  
✅ Search Notes (by text & label)  
✅ Add Collaborators  
✅ Redis Caching (first 20 notes)  
✅ RabbitMQ Email Queue  
✅ Email Notifications (Ethereal SMTP)

---

## Check Logs For

**Redis Cache:**
```
info: Cache hit for user: [userId]
info: Cache set for user: [userId]
```

**Email Sent:**
```
info: Email queued for: bob@example.com
info: Email sent: <message-id>
info: Preview URL: https://ethereal.email/message/xxxxx
```

Copy the preview URL to view the email in browser.
