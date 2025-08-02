# API Documentation - Medical System

Esta documentación describe todos los endpoints disponibles en la API del sistema médico construido con NestJS y Prisma.

## Base URL
```
http://localhost:3000/api
```

## Formato de Respuesta Estándar
Todas las respuestas de la API siguen el siguiente formato:
```json
{
  "success": true,
  "data": {}, // Datos de respuesta
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Autenticación
Todos los endpoints requieren autenticación Bearer Token:
```
Authorization: Bearer <token>
```

---

## 1. USUARIOS (Users)

### Crear Usuario
- **POST** `/users`
- **Descripción**: Crear un nuevo usuario en el sistema
- **Body**:
```json
{
  "name": "Juan Pérez",
  "email": "juan.perez@email.com",
  "password": "securepassword", // Opcional
  "roleId": 1
}
```

### Obtener Usuarios
- **GET** `/users`
- **Descripción**: Obtener lista paginada de usuarios con filtros
- **Query Parameters**:
  - `page` (number): Número de página (default: 1)
  - `limit` (number): Elementos por página (default: 10)
  - `search` (string): Buscar por nombre o email
  - `sortBy` (string): Campo para ordenar (`name`, `email`, `createdAt`, `updatedAt`)
  - `sortOrder` (string): Orden (`asc`, `desc`)
  - `roleId` (number): Filtrar por ID de rol

### Obtener Usuario por ID
- **GET** `/users/:id`
- **Descripción**: Obtener un usuario específico por su ID

### Actualizar Usuario
- **PATCH** `/users/:id`
- **Descripción**: Actualizar datos de un usuario
- **Body**: Mismos campos que crear usuario (todos opcionales)

### Eliminar Usuario
- **DELETE** `/users/:id`
- **Descripción**: Eliminar un usuario (soft delete)

---

## 2. ROLES (Roles)

### Crear Rol
- **POST** `/roles`
- **Descripción**: Crear un nuevo rol
- **Body**:
```json
{
  "name": "ADMIN",
  "description": "Administrador del sistema", // Opcional
  "isSystem": false, // Opcional
  "permissionIds": [1, 2, 3] // Opcional
}
```

### Obtener Roles
- **GET** `/roles`
- **Descripción**: Obtener lista paginada de roles
- **Query Parameters**:
  - `page`, `limit`, `search` (igual que usuarios)
  - `sortBy`: `name`, `createdAt`, `updatedAt`
  - `sortOrder`: `asc`, `desc`

### Obtener Rol por ID
- **GET** `/roles/:id`

### Actualizar Rol
- **PATCH** `/roles/:id`

### Eliminar Rol
- **DELETE** `/roles/:id`

### Asignar Permisos a Rol
- **POST** `/roles/:id/permissions`
- **Body**:
```json
{
  "permissionIds": [1, 2, 3]
}
```

---

## 3. PERMISOS (Permissions)

### Crear Permiso
- **POST** `/permissions`
- **Body**:
```json
{
  "name": "CREATE_USER",
  "description": "Crear usuarios",
  "resource": "users",
  "action": "create"
}
```

### Obtener Permisos
- **GET** `/permissions`
- **Query Parameters**: Similar a otros módulos

### Obtener Permiso por ID
- **GET** `/permissions/:id`

### Actualizar Permiso
- **PATCH** `/permissions/:id`

### Eliminar Permiso
- **DELETE** `/permissions/:id`

---

## 4. PACIENTES (Patients)

### Crear Paciente
- **POST** `/patients`
- **Body**:
```json
{
  "firstName": "Juan",
  "lastName": "Pérez",
  "identification": "12345678",
  "phone": "+57 300 123 4567", // Opcional
  "email": "juan.perez@email.com",
  "birthdate": "1990-05-15T00:00:00.000Z", // No puede ser futuro
  "gender": "Masculino",
  "active": true, // Opcional
  "userId": "cluid123" // Opcional
}
```

### Obtener Pacientes
- **GET** `/patients`
- **Query Parameters**:
  - Parámetros básicos de paginación y búsqueda
  - `sortBy`: `firstName`, `lastName`, `identification`, `email`, `birthdate`, `createdAt`
  - `active` (boolean): Filtrar por estado activo
  - `gender` (string): Filtrar por género

### Obtener Paciente por ID
- **GET** `/patients/:id`

### Obtener Paciente por Identificación
- **GET** `/patients/identification/:identification`

### Obtener Paciente por Email
- **GET** `/patients/email/:email`

### Actualizar Paciente
- **PATCH** `/patients/:id`

### Eliminar Paciente
- **DELETE** `/patients/:id`

### Convertir Paciente a Usuario
- **POST** `/patients/:id/convert-to-user`
- **Descripción**: Crear automáticamente una cuenta de usuario para el paciente

### Estadísticas de Pacientes
- **GET** `/patients/stats`
- **Descripción**: Obtener estadísticas generales de pacientes

---

## 5. ESPECIALIDADES (Specialties)

### Crear Especialidad
- **POST** `/specialties`
- **Body**:
```json
{
  "name": "Cardiología",
  "description": "Especialidad médica que se ocupa del corazón", // Opcional
  "active": true // Opcional
}
```

### Obtener Especialidades
- **GET** `/specialties`
- **Query Parameters**:
  - Parámetros básicos de paginación
  - `sortBy`: `name`, `createdAt`, `updatedAt`
  - `active` (boolean): Filtrar por estado activo

### Obtener Especialidad por ID
- **GET** `/specialties/:id`

### Actualizar Especialidad
- **PATCH** `/specialties/:id`

### Eliminar Especialidad
- **DELETE** `/specialties/:id`

---

## 6. MÉDICOS (Medics)

### Crear Médico
- **POST** `/medics`
- **Body**:
```json
{
  "name": "Dr. Carlos",
  "lastName": "Rodríguez",
  "identification": "87654321",
  "phone": "+57 301 234 5678", // Opcional
  "email": "carlos.rodriguez@hospital.com",
  "professionalTitle": "Médico Cardiólogo",
  "specialtyId": "specialty-id-123",
  "active": true, // Opcional
  "userId": "user-id-123" // Opcional
}
```

### Obtener Médicos
- **GET** `/medics`
- **Query Parameters**:
  - Parámetros básicos de paginación y búsqueda
  - `sortBy`: `name`, `lastName`, `identification`, `email`, `createdAt`
  - `active` (boolean): Filtrar por estado activo
  - `specialty` (string): Filtrar por nombre de especialidad

### Obtener Médico por ID
- **GET** `/medics/:id`

### Obtener Médico por Identificación
- **GET** `/medics/identification/:identification`

### Obtener Médico por Email
- **GET** `/medics/email/:email`

### Actualizar Médico
- **PATCH** `/medics/:id`

### Eliminar Médico
- **DELETE** `/medics/:id`

### Convertir Médico a Usuario
- **POST** `/medics/:id/convert-to-user`
- **Descripción**: Crear automáticamente una cuenta de usuario para el médico

### Obtener Médicos Activos
- **GET** `/medics/active`
- **Descripción**: Lista simple de médicos activos

### Estadísticas de Médicos
- **GET** `/medics/stats`

---

## 7. CITAS (Appointments)

### Crear Cita
- **POST** `/appointments`
- **Body**:
```json
{
  "patientId": "patient-id-123",
  "medicId": "medic-id-123",
  "dateTime": "2024-12-01T10:00:00Z", // No puede ser pasado
  "appointmentType": "first_time",
  "appointmentStatus": "pending",
  "reason": "Consulta general", // Opcional
  "notes": "El paciente tiene antecedentes de alergias" // Opcional
}
```

### Obtener Citas
- **GET** `/appointments`
- **Query Parameters**:
  - Parámetros básicos de paginación y búsqueda
  - `sortBy`: `dateTime`, `appointmentType`, `appointmentStatus`, `createdAt`
  - `patientId` (string): Filtrar por paciente
  - `medicId` (string): Filtrar por médico
  - `appointmentStatus` (string): Filtrar por estado
  - `appointmentType` (string): Filtrar por tipo
  - `startDate` (string): Filtrar desde fecha
  - `endDate` (string): Filtrar hasta fecha

### Obtener Cita por ID
- **GET** `/appointments/:id`

### Actualizar Cita
- **PATCH** `/appointments/:id`

### Eliminar Cita
- **DELETE** `/appointments/:id`

### Citas por Paciente
- **GET** `/appointments/patient/:patientId`

### Citas por Médico
- **GET** `/appointments/medic/:medicId`

---

## 8. REPROGRAMACIONES (Reschedules)

### Crear Reprogramación
- **POST** `/reschedules`
- **Body**:
```json
{
  "appointmentId": "appointment-id-123",
  "previousDateTime": "2023-10-01T10:00:00Z",
  "newDateTime": "2023-10-02T14:00:00Z", // No puede ser pasado
  "rescheduleReason": "patient_request", // Enum: patient_request, medic_unavailable, emergency, system_error, other
  "requestedBy": "PATIENT", // Enum: PATIENT, MEDIC, SYSTEM
  "notes": "El paciente tuvo una emergencia familiar" // Opcional
}
```

### Obtener Reprogramaciones
- **GET** `/reschedules`
- **Query Parameters**:
  - Parámetros básicos de paginación
  - `sortBy`: `createdAt`, `newDateTime`, `rescheduleStatus`
  - `appointmentId` (string): Filtrar por cita
  - `rescheduleStatus` (string): Filtrar por estado
  - `requestedBy` (string): Filtrar por quien solicitó
  - `rescheduleReason` (string): Filtrar por razón

### Obtener Reprogramación por ID
- **GET** `/reschedules/:id`

### Actualizar Reprogramación
- **PATCH** `/reschedules/:id`
- **Descripción**: Para cambiar estado a 'completed' y actualizar la cita original

### Eliminar Reprogramación
- **DELETE** `/reschedules/:id`

### Reprogramaciones por Cita
- **GET** `/reschedules/appointment/:appointmentId`

---

## Códigos de Estado HTTP

- `200` - OK: Operación exitosa
- `201` - Created: Recurso creado exitosamente
- `400` - Bad Request: Datos inválidos o faltantes
- `401` - Unauthorized: Token de autorización requerido/inválido
- `403` - Forbidden: Sin permisos para la operación
- `404` - Not Found: Recurso no encontrado
- `409` - Conflict: Conflicto con datos existentes (ej. email duplicado)
- `500` - Internal Server Error: Error interno del servidor

## Validaciones Importantes

1. **Fechas**: 
   - Fechas de nacimiento no pueden ser futuras
   - Fechas de citas no pueden ser pasadas
   - Fechas de reprogramación no pueden ser pasadas

2. **Relaciones**:
   - Médicos tienen relación 1:1 con especialidades
   - Usuarios pueden estar relacionados con pacientes o médicos
   - Cada cita puede tener múltiples reprogramaciones

3. **Campos Únicos**:
   - Emails de usuarios, pacientes y médicos deben ser únicos
   - Identificaciones de pacientes y médicos deben ser únicas
   - Nombres de roles y especialidades deben ser únicos

4. **Estados**:
   - `appointmentStatus`: pending, confirmed, completed, cancelled
   - `rescheduleStatus`: pending, completed
   - `requestedBy`: PATIENT, MEDIC, SYSTEM

## Ejemplos de Flujo de Trabajo

### 1. Crear un Nuevo Paciente y Asignarle una Cita
```
1. POST /patients - Crear paciente
2. POST /patients/:id/convert-to-user - Convertir a usuario (opcional)
3. POST /appointments - Crear cita para el paciente
```

### 2. Reprogramar una Cita
```
1. POST /reschedules - Crear reprogramación
2. PATCH /reschedules/:id - Marcar como completada (actualiza la cita original)
```

### 3. Gestión de Roles y Permisos
```
1. POST /permissions - Crear permisos necesarios
2. POST /roles - Crear rol
3. POST /roles/:id/permissions - Asignar permisos al rol
4. POST /users - Crear usuario con roleId
```