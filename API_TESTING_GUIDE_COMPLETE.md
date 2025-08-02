# 🚀 Guía Completa de Pruebas API - Sistema Médico NestJS

## 📋 Información General

**Base URL:** `http://localhost:3001/api/v1`  
**Documentación Swagger:** `http://localhost:3001/api/docs`  
**Autenticación:** Bearer Token (donde aplicable)

---

## 🔄 ESTADOS Y TRANSICIONES DEL SISTEMA

### 📅 Estados de Citas (`appointmentStatus`)
```
pending → scheduled → completed
pending → scheduled → canceled  
pending → scheduled → no_show
pending → canceled
```

**Tipos de Cita (`appointmentType`):**
- `first_time` - Primera vez
- `follow_up` - Seguimiento  
- `emergency` - Emergencia
- `specialty` - Especialidad

### 🔄 Estados de Seguimiento (`FollowUpStatus`)
```
PENDING → IN_PROGRESS → COMPLETED_WITH_APPOINTMENT
PENDING → IN_PROGRESS → COMPLETED_NO_APPOINTMENT
PENDING → IN_PROGRESS → FAILED → TRANSFERRED_TO_RESCUE
PENDING → CANCELLED
PENDING → IN_PROGRESS → POSTPONED_INDEFINITELY
```

### 📞 Resultados de Contacto (`ContactResult`)
- `SUCCESSFUL` - Contacto exitoso
- `NO_ANSWER` - No contestó
- `BUSY` - Ocupado
- `INVALID_NUMBER` - Número inválido
- `PATIENT_DECLINED` - Paciente declinó
- `APPOINTMENT_CONFIRMED` - Cita confirmada
- `APPOINTMENT_CANCELLED` - Cita cancelada
- `RESCHEDULE_REQUESTED` - Solicitó reprogramación
- `INDEFINITE_POSTPONE` - Pospuso indefinidamente
- `PATIENT_UNAVAILABLE` - Paciente no disponible

### 🔄 Estados de Reprogramación (`rescheduleStatus`)
```
pending → approved → completed
pending → rejected
```

### 🆘 Estados de Directorio de Rescate (`RescueStatus`)
```
ACTIVE → REACTIVATED
ACTIVE → ARCHIVED
ACTIVE → TRANSFERRED
```

---

## 🧪 CASOS DE PRUEBA POR ESTADOS

### 📅 1. PRUEBAS DE ESTADOS DE CITAS

#### ✅ Transición: pending → scheduled
```json
POST /appointments
{
  "patientId": "{{patientId}}",
  "medicId": "{{medicId}}",
  "dateTime": "2024-12-15T10:00:00.000Z",
  "appointmentType": "first_time",
  "appointmentStatus": "pending",
  "reason": "Consulta general"
}

PATCH /appointments/{{appointmentId}}
{
  "appointmentStatus": "scheduled"
}
```

#### ✅ Transición: scheduled → completed
```json
PATCH /appointments/{{appointmentId}}
{
  "appointmentStatus": "completed",
  "notes": "Consulta realizada exitosamente"
}
```

#### ✅ Transición: scheduled → no_show
```json
PATCH /appointments/{{appointmentId}}
{
  "appointmentStatus": "no_show",
  "notes": "Paciente no se presentó a la cita"
}
```

#### ❌ Transiciones Inválidas a Probar:
- `completed → pending` (debe fallar)
- `canceled → scheduled` (debe fallar)
- `no_show → completed` (debe fallar)

### 🔄 2. PRUEBAS DE ESTADOS DE SEGUIMIENTO

#### ✅ Flujo Completo: PENDING → IN_PROGRESS → COMPLETED_WITH_APPOINTMENT
```json
// 1. Crear seguimiento
POST /patient-follow
{
  "patientId": "{{patientId}}",
  "status": "PENDING",
  "scheduledContactDate": "2024-12-01T09:00:00.000Z",
  "followUpType": "POST_CONSULTATION",
  "priority": "NORMAL"
}

// 2. Cambiar a IN_PROGRESS al primer intento
PATCH /patient-follow/{{followUpId}}
{
  "status": "IN_PROGRESS"
}

// 3. Registrar intento exitoso
POST /contact-attempt
{
  "followUpId": "{{followUpId}}",
  "attemptNumber": 1,
  "contactMethod": "PHONE",
  "contactResult": "SUCCESSFUL",
  "appointmentScheduled": true,
  "newAppointmentId": "{{newAppointmentId}}"
}

// 4. Completar con cita
PATCH /patient-follow/{{followUpId}}
{
  "status": "COMPLETED_WITH_APPOINTMENT",
  "resultingAppointmentId": "{{newAppointmentId}}"
}
```

#### ✅ Flujo de Fallo: PENDING → IN_PROGRESS → FAILED → TRANSFERRED_TO_RESCUE
```json
// 1. Crear seguimiento
POST /patient-follow
{
  "patientId": "{{patientId}}",
  "status": "PENDING",
  "maxAttempts": 3
}

// 2. Intento 1 - No contesta
POST /contact-attempt
{
  "followUpId": "{{followUpId}}",
  "attemptNumber": 1,
  "contactResult": "NO_ANSWER"
}

PATCH /patient-follow/{{followUpId}}/increment-attempt

// 3. Intento 2 - Ocupado
POST /contact-attempt
{
  "followUpId": "{{followUpId}}",
  "attemptNumber": 2,
  "contactResult": "BUSY"
}

PATCH /patient-follow/{{followUpId}}/increment-attempt

// 4. Intento 3 - No contesta
POST /contact-attempt
{
  "followUpId": "{{followUpId}}",
  "attemptNumber": 3,
  "contactResult": "NO_ANSWER"
}

PATCH /patient-follow/{{followUpId}}/increment-attempt
// Status debe cambiar automáticamente a FAILED

// 5. Transferir a rescate
POST /rescue-directory
{
  "patientId": "{{patientId}}",
  "originalFollowUpId": "{{followUpId}}",
  "rescueReason": "MAX_ATTEMPTS_REACHED",
  "totalPreviousAttempts": 3
}

PATCH /patient-follow/{{followUpId}}
{
  "status": "TRANSFERRED_TO_RESCUE"
}
```

### 🔄 3. PRUEBAS DE REPROGRAMACIONES

#### ✅ Flujo: pending → approved → completed
```json
// 1. Crear reprogramación
POST /reschedules
{
  "appointmentId": "{{appointmentId}}",
  "previousDateTime": "2024-12-01T10:00:00.000Z",
  "newDateTime": "2024-12-02T14:00:00.000Z",
  "rescheduleReason": "patient_request",
  "rescheduleStatus": "pending",
  "requestedBy": "patient"
}

// 2. Aprobar reprogramación
PATCH /reschedules/{{rescheduleId}}
{
  "rescheduleStatus": "approved",
  "approvedBy": "{{adminUserId}}",
  "approvedAt": "2024-11-30T16:00:00.000Z"
}

// 3. Completar reprogramación
PATCH /reschedules/{{rescheduleId}}
{
  "rescheduleStatus": "completed"
}

// 4. Actualizar cita original
PATCH /appointments/{{appointmentId}}
{
  "dateTime": "2024-12-02T14:00:00.000Z"
}
```

#### ✅ Flujo: pending → rejected
```json
PATCH /reschedules/{{rescheduleId}}
{
  "rescheduleStatus": "rejected",
  "rejectedBy": "{{adminUserId}}",
  "rejectedAt": "2024-11-30T16:00:00.000Z",
  "rejectionReason": "No disponibilidad en horario solicitado"
}
```

### 🆘 4. PRUEBAS DE DIRECTORIO DE RESCATE

#### ✅ Flujo: ACTIVE → REACTIVATED
```json
// 1. Crear entrada en rescate
POST /rescue-directory
{
  "patientId": "{{patientId}}",
  "originalFollowUpId": "{{followUpId}}",
  "rescueReason": "MAX_ATTEMPTS_REACHED",
  "status": "ACTIVE",
  "rescueCategory": "HIGH_VALUE",
  "priority": "HIGH"
}

// 2. Reactivar paciente
PATCH /rescue-directory/{{rescueId}}/reactivate
{
  "reactivationNotes": "Paciente contactado exitosamente, acepta seguimiento"
}
```

#### ✅ Flujo: ACTIVE → ARCHIVED
```json
PATCH /rescue-directory/{{rescueId}}/archive
```

---

## 🔍 PRUEBAS DE VALIDACIÓN DE NEGOCIO

### ✅ 1. Restricciones de Citas
```json
// ❌ Crear cita en horario ocupado
POST /appointments
{
  "medicId": "{{medicId}}",
  "dateTime": "2024-12-01T10:00:00.000Z"  // Hora ya ocupada
}
// Esperado: 409 Conflict

// ❌ Crear cita en el pasado
POST /appointments
{
  "dateTime": "2023-01-01T10:00:00.000Z"
}
// Esperado: 400 Bad Request
```

### ✅ 2. Límites de Intentos de Seguimiento
```json
// ❌ Intentar crear más intentos del máximo
POST /contact-attempt
{
  "followUpId": "{{followUpId}}",
  "attemptNumber": 4  // Si maxAttempts = 3
}
// Esperado: 400 Bad Request
```

### ✅ 3. Integridad de Estados
```json
// ❌ Cambiar seguimiento completado a pendiente
PATCH /patient-follow/{{followUpId}}
{
  "status": "PENDING"  // Si status actual = COMPLETED_WITH_APPOINTMENT
}
// Esperado: 400 Bad Request
```

---

## 📊 PRUEBAS DE FILTROS Y BÚSQUEDAS

### ✅ Filtros por Estado
```http
GET /appointments?appointmentStatus=scheduled&appointmentType=follow_up
GET /patient-follow?status=PENDING&priority=HIGH
GET /contact-attempt?contactResult=SUCCESSFUL&appointmentScheduled=true
GET /rescue-directory?status=ACTIVE&priority=CRITICAL
GET /reschedules?rescheduleStatus=pending&requestedBy=patient
```

### ✅ Filtros por Fecha
```http
GET /appointments?dateFrom=2024-12-01&dateTo=2024-12-31
GET /patient-follow?scheduledContactDateFrom=2024-12-01
GET /contact-attempt?contactDateTimeFrom=2024-11-01&contactDateTimeTo=2024-11-30
GET /rescue-directory?entryDateFrom=2024-11-01
```

### ✅ Búsquedas Complejas
```http
GET /patients?search=maría&active=true&sortBy=lastName&sortOrder=asc
GET /appointments?patientId={{patientId}}&medicId={{medicId}}&status=scheduled
GET /patient-follow?patientId={{patientId}}&status=IN_PROGRESS&assignedTo={{userId}}
```

---

## 🧪 ESCENARIOS DE PRUEBA AVANZADOS

### 🔄 1. Flujo Completo de Atención al Paciente
```json
// Secuencia completa a probar:
1. POST /patients (Crear paciente)
2. POST /medics (Crear médico)
3. POST /appointments (Crear cita - status: pending)
4. PATCH /appointments/{id} (Cambiar a scheduled)
5. PATCH /appointments/{id} (Cambiar a completed)
6. POST /consultations (Crear consulta de la cita)
7. POST /patient-follow (Crear seguimiento post-consulta)
8. POST /contact-attempt (Primer intento de contacto)
9. POST /contact-attempt (Segundo intento si es necesario)
10. POST /rescue-directory (Si fallan todos los intentos)
```

### 🔄 2. Flujo de Reprogramación Completo
```json
1. POST /appointments (Crear cita)
2. POST /reschedules (Solicitar reprogramación)
3. PATCH /reschedules/{id} (Aprobar/Rechazar)
4. PATCH /appointments/{id} (Actualizar fecha si se aprueba)
```

### 🔄 3. Flujo de Recuperación de Pacientes
```json
1. GET /rescue-directory/active (Obtener pacientes en rescate)
2. GET /rescue-directory/high-priority (Priorizar casos)
3. PATCH /rescue-directory/{id}/reactivate (Reactivar paciente)
4. POST /patient-follow (Crear nuevo seguimiento)
```

---

## 🎯 CASOS EDGE Y VALIDACIONES ESPECIALES

### ✅ Concurrencia
```json
// Probar actualizaciones simultáneas del mismo registro
PATCH /appointments/{{appointmentId}} (Usuario A)
PATCH /appointments/{{appointmentId}} (Usuario B)
// Verificar que no se pierdan datos
```

### ✅ Volúmenes de Datos
```json
// Crear múltiples seguimientos para el mismo paciente
POST /patient-follow (x10 seguimientos)
GET /patient-follow/patient/{{patientId}}
// Verificar paginación y performance
```

### ✅ Integridad Referencial
```json
// ❌ Intentar eliminar paciente con citas activas
DELETE /patients/{{patientId}}
// Esperado: 400 Bad Request

// ❌ Crear seguimiento con paciente inexistente
POST /patient-follow
{
  "patientId": "inexistent_id"
}
// Esperado: 404 Not Found
```

---

## 🛠️ CONFIGURACIÓN DE VARIABLES

### Variables de Entorno para Postman:
```json
{
  "baseUrl": "http://localhost:3001/api/v1",
  "bearerToken": "your_jwt_token_here",
  "patientId": "",
  "medicId": "",
  "appointmentId": "",
  "followUpId": "",
  "contactAttemptId": "",
  "rescueId": "",
  "rescheduleId": "",
  "userId": "",
  "adminUserId": ""
}
```

---

## 📝 CHECKLIST DE VALIDACIÓN POR MÓDULO

### ✅ Citas (Appointments)
- [ ] Crear cita en todos los estados válidos
- [ ] Transiciones de estado válidas e inválidas
- [ ] Validación de conflictos de horario
- [ ] Validación de fechas pasadas/futuras
- [ ] Filtros por estado, tipo, fecha, paciente, médico
- [ ] Relaciones con seguimientos y consultas

### ✅ Seguimientos (Patient Follow)
- [ ] Crear seguimiento en todos los estados válidos
- [ ] Incremento automático de intentos
- [ ] Transferencia automática a rescate al alcanzar límite
- [ ] Validación de fechas de contacto
- [ ] Filtros por estado, prioridad, asignado
- [ ] Relaciones con intentos de contacto y rescate

### ✅ Intentos de Contacto (Contact Attempt)
- [ ] Crear intentos con todos los resultados posibles
- [ ] Validación de número de intento vs máximo
- [ ] Creación automática de citas en intentos exitosos
- [ ] Duración de contacto opcional
- [ ] Filtros por método, resultado, seguimiento
- [ ] Relaciones con citas y reprogramaciones

### ✅ Directorio de Rescate (Rescue Directory)
- [ ] Crear entradas con todas las razones y categorías
- [ ] Transiciones de estado de rescate
- [ ] Reactivación y archivo de entradas
- [ ] Priorización de casos críticos
- [ ] Filtros por estado, categoría, prioridad
- [ ] Historial de intentos previos

### ✅ Reprogramaciones (Reschedules)
- [ ] Crear reprogramaciones con todos los motivos
- [ ] Flujo de aprobación/rechazo
- [ ] Validación de fechas originales vs nuevas
- [ ] Diferentes solicitantes (paciente, médico, admin)
- [ ] Filtros por estado, motivo, solicitante
- [ ] Actualización automática de citas al aprobar

---

## 🎯 MÉTRICAS DE ÉXITO

### KPIs a Medir:
- **Tiempo de respuesta** < 200ms promedio
- **Tasa de éxito** > 99% en endpoints principales
- **Cobertura de casos** 100% de estados y transiciones
- **Integridad de datos** 0% de inconsistencias
- **Manejo de errores** 100% de códigos HTTP apropiados

---

**✨ ¡Testing Completo Garantizado! ✨**

*Documentación con estados y transiciones completas para sistema médico NestJS*