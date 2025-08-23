# Sistema Médico API - Documentación Completa del Proyecto

## 📋 Tabla de Contenidos
- [Información General](#información-general)
- [Arquitectura del Sistema](#arquitectura-del-sistema)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Estructura de la Base de Datos](#estructura-de-la-base-de-datos)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Módulos y Funcionalidades](#módulos-y-funcionalidades)
- [APIs y Endpoints](#apis-y-endpoints)
- [Comandos de Desarrollo](#comandos-de-desarrollo)
- [Configuración y Instalación](#configuración-y-instalación)
- [Patrones y Convenciones](#patrones-y-convenciones)

---

## 🏥 Información General

**Sistema Médico API** es una aplicación backend desarrollada con **NestJS** y **Prisma** que gestiona un sistema completo de atención médica. El sistema permite administrar pacientes, médicos, citas médicas, consultas, especialidades y un sistema completo de seguimiento y rescate de pacientes.

### Características Principales
- ✅ Gestión completa de usuarios con roles y permisos
- 🏥 Administración de pacientes y médicos
- 📅 Sistema de citas médicas con reprogramación
- 🩺 Registro de consultas médicas
- 🔄 Sistema de seguimiento de pacientes
- 📞 Intentos de contacto y directorio de rescate
- 🔐 Autenticación y autorización basada en roles
- 📊 API RESTful con documentación Swagger
- 🗄️ Base de datos PostgreSQL con Prisma ORM

---

## 🏗️ Arquitectura del Sistema

### Arquitectura General
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend/     │◄──►│   NestJS API    │◄──►│   PostgreSQL    │
│   Mobile App    │    │                 │    │   Database      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                              ▼
                       ┌─────────────────┐
                       │   Prisma ORM    │
                       │   (Data Layer)  │
                       └─────────────────┘
```

### Patrón de Arquitectura NestJS
- **Modular**: Cada dominio tiene su propio módulo
- **Inyección de dependencias**: Servicios inyectados en controladores
- **Interceptores globales**: Transformación de respuestas
- **Filtros de excepción**: Manejo centralizado de errores
- **Guards y middlewares**: Autenticación y autorización

---

## 🛠️ Tecnologías Utilizadas

### Backend Framework
- **NestJS 11.0.1** - Framework de Node.js basado en TypeScript
- **Express** - Servidor HTTP subyacente

### Base de Datos y ORM
- **PostgreSQL** - Base de datos relacional principal
- **Prisma 6.12.0** - ORM moderno para TypeScript/JavaScript
- **Prisma Client** - Cliente de base de datos auto-generado

### Autenticación y Seguridad
- **JWT (JSON Web Tokens)** - Autenticación stateless
- **Passport.js** - Middleware de autenticación
- **bcrypt** - Hashing de contraseñas

### Validación y Transformación
- **class-validator** - Validación de DTOs
- **class-transformer** - Transformación de objetos

### Documentación
- **Swagger/OpenAPI** - Documentación automática de APIs

### Desarrollo y Testing
- **TypeScript** - Lenguaje principal
- **Jest** - Framework de testing
- **ESLint + Prettier** - Linting y formateo de código
- **pnpm** - Gestor de paquetes

---

## 🗄️ Estructura de la Base de Datos

### Entidades Principales

#### 👤 **Usuarios y Autenticación**
```typescript
User {
  id: String (CUID)
  name: String?
  email: String (unique)
  password: String?
  roleId: Int
  createdAt: DateTime
  updatedAt: DateTime
  // Relaciones
  role: Role
  accounts: Account[]
  medics: Medic?
  patients: Patient?
}

Role {
  id: Int
  name: String (unique)
  description: String?
  active: Boolean
  // Relaciones
  users: User[]
  permissions: Permission[]
}

Permission {
  id: Int
  name: String (unique)
  description: String?
  active: Boolean
  // Relaciones
  roles: Role[]
}
```

#### 🏥 **Pacientes y Médicos**
```typescript
Patient {
  id: String (CUID)
  firstName: String
  lastName: String
  identification: String (unique)
  phone: String?
  email: String (unique)
  birthdate: DateTime
  gender: String
  active: Boolean
  userId: String? (unique)
  // Relaciones
  user: User?
  appointments: Appointment[]
  followUps: PatientFollowUp[]
  rescueEntries: RescueDirectory[]
}

Medic {
  id: String (CUID)
  name: String
  lastName: String
  identification: String (unique)
  phone: String?
  email: String (unique)
  professionalTitle: String
  active: Boolean
  userId: String? (unique)
  specialtyId: String
  // Relaciones
  user: User?
  specialty: Specialty
  appointments: Appointment[]
}

Specialty {
  id: String (CUID)
  name: String (unique)
  description: String?
  active: Boolean
  // Relaciones
  medics: Medic[]
}
```

#### 📅 **Citas y Consultas**
```typescript
Appointment {
  id: String (CUID)
  patientId: String
  medicId: String
  dateTime: DateTime
  appointmentType: String // 'first_time', 'follow_up', 'emergency', 'specialty'
  appointmentStatus: String // 'pending', 'scheduled', 'canceled', 'completed', 'no_show'
  modality: String // 'presencial', 'online'
  reason: String?
  notes: String?
  requiresFollowUp: Boolean
  followUpDate: DateTime?
  followUpPriority: FollowUpPriority
  active: Boolean
  // Relaciones
  patient: Patient
  medic: Medic
  consultation: Consultation?
  reschedules: Reschedule[]
  generatedFollowUps: PatientFollowUp[]
  contactAttempts: ContactAttempt[]
}

Consultation {
  id: String (CUID)
  appointmentId: String (unique)
  symptoms: String?
  diagnosis: String?
  treatment: String?
  notes: String?
  followUpRequired: Boolean
  followUpDate: DateTime?
  // Relaciones
  appointment: Appointment
}
```

#### 🔄 **Sistema de Seguimiento**
```typescript
PatientFollowUp {
  id: String (CUID)
  patientId: String
  appointmentId: String?
  followUpType: FollowUpType
  priority: FollowUpPriority
  scheduledDate: DateTime
  status: FollowUpStatus
  notes: String?
  // Relaciones
  patient: Patient
  appointment: Appointment?
  contactAttempts: ContactAttempt[]
  resultingAppointments: Appointment[]
}

ContactAttempt {
  id: String (CUID)
  followUpId: String?
  appointmentId: String?
  patientId: String
  contactMethod: ContactMethod
  contactDate: DateTime
  successful: Boolean
  notes: String?
  nextAttemptDate: DateTime?
  // Relaciones
  followUp: PatientFollowUp?
  appointment: Appointment?
}

RescueDirectory {
  id: String (CUID)
  patientId: String
  reason: RescueReason
  lastContactDate: DateTime
  contactAttempts: Int
  status: RescueStatus
  notes: String?
  assignedTo: String?
  // Relaciones
  patient: Patient
}
```

### Relaciones Clave
- **Usuario** puede ser **Paciente** o **Médico** (1:1 opcional)
- **Paciente** tiene múltiples **Citas** (1:N)
- **Médico** tiene múltiples **Citas** (1:N)
- **Cita** puede tener una **Consulta** (1:1)
- **Cita** puede generar múltiples **Seguimientos** (1:N)
- **Seguimiento** puede resultar en múltiples **Intentos de Contacto** (1:N)

---

## 📁 Estructura del Proyecto

```
nestjs-prisma-app/
├── 📁 prisma/
│   ├── 📁 migrations/          # Migraciones de base de datos
│   ├── 📁 models/              # Modelos Prisma separados
│   │   ├── appointments.prisma
│   │   ├── auth.prisma
│   │   ├── consultation.prisma
│   │   ├── medics.prisma
│   │   ├── patients.prisma
│   │   ├── permissions.prisma
│   │   └── ... (otros modelos)
│   ├── schema.prisma          # Schema principal de Prisma
│   └── seed.ts               # Script de datos iniciales
├── 📁 src/
│   ├── 📁 common/            # Utilidades compartidas
│   │   ├── 📁 decorators/    # Decoradores personalizados
│   │   ├── 📁 filters/       # Filtros de excepción
│   │   ├── 📁 interceptors/  # Interceptores globales
│   │   └── 📁 pipes/         # Pipes de validación
│   ├── 📁 config/            # Configuraciones
│   │   └── 📁 database/      # Configuración de Prisma
│   ├── 📁 modules/           # Módulos de funcionalidades
│   │   ├── 📁 appointments/  # Gestión de citas
│   │   ├── 📁 consultations/ # Gestión de consultas
│   │   ├── 📁 medics/        # Gestión de médicos
│   │   ├── 📁 patients/      # Gestión de pacientes
│   │   ├── 📁 users/         # Gestión de usuarios
│   │   └── ... (otros módulos)
│   ├── app.module.ts         # Módulo raíz de la aplicación
│   └── main.ts              # Punto de entrada de la aplicación
├── 📁 test/                 # Tests end-to-end
├── package.json             # Dependencias y scripts
└── README.md               # Documentación básica
```

### Estructura de Módulos (Ejemplo: Appointments)
```
modules/appointments/
├── dto/                     # Data Transfer Objects
│   ├── create-appointment.dto.ts
│   ├── update-appointment.dto.ts
│   └── query-appointment.dto.ts
├── appointments.controller.ts # Controlador REST
├── appointments.service.ts    # Lógica de negocio
└── appointments.module.ts     # Definición del módulo
```

---

## 🎯 Módulos y Funcionalidades

### 1. **👤 Módulo de Usuarios** (`users`)
- **Funcionalidad**: Gestión de usuarios del sistema
- **Endpoints**: CRUD completo de usuarios
- **Características**:
  - Registro y autenticación de usuarios
  - Asignación de roles
  - Gestión de perfiles

### 2. **🔐 Módulo de Roles** (`roles`)
- **Funcionalidad**: Sistema de roles y permisos
- **Endpoints**: Gestión de roles y asignación de permisos
- **Características**:
  - Control de acceso basado en roles (RBAC)
  - Permisos granulares
  - Asignación dinámica de permisos

### 3. **🏥 Módulo de Pacientes** (`patients`)
- **Funcionalidad**: Gestión de pacientes
- **Endpoints**: CRUD de pacientes con búsqueda y paginación
- **Características**:
  - Registro de datos demográficos
  - Historial médico básico
  - Vinculación con usuario (opcional)

### 4. **👨‍⚕️ Módulo de Médicos** (`medics`)
- **Funcionalidad**: Gestión de médicos
- **Endpoints**: CRUD de médicos con especialidades
- **Características**:
  - Información profesional
  - Asignación de especialidades
  - Vinculación con usuario (opcional)

### 5. **🏷️ Módulo de Especialidades** (`specialties`)
- **Funcionalidad**: Catálogo de especialidades médicas
- **Endpoints**: CRUD de especialidades
- **Características**:
  - Clasificación de especialidades médicas
  - Asignación a médicos

### 6. **📅 Módulo de Citas** (`appointments`)
- **Funcionalidad**: Sistema de citas médicas
- **Endpoints**: Gestión completa de citas
- **Características**:
  - Programación de citas
  - Estados de cita (pendiente, programada, completada, etc.)
  - Modalidades (presencial, online)
  - Tipos de cita (primera vez, seguimiento, emergencia)
  - Sistema de seguimiento automatizado

### 7. **🩺 Módulo de Consultas** (`consultations`)
- **Funcionalidad**: Registro de consultas médicas
- **Endpoints**: CRUD de consultas médicas
- **Características**:
  - Síntomas y diagnósticos
  - Tratamientos prescritos
  - Indicaciones de seguimiento

### 8. **🔄 Módulo de Reprogramaciones** (`reschedules`)
- **Funcionalidad**: Gestión de cambios de citas
- **Endpoints**: Historial de reprogramaciones
- **Características**:
  - Registro de cambios de fecha/hora
  - Motivos de reprogramación
  - Historial completo

### 9. **📋 Módulo de Seguimiento** (`patient-follow`)
- **Funcionalidad**: Sistema de seguimiento de pacientes
- **Endpoints**: Gestión de seguimientos
- **Características**:
  - Tipos de seguimiento
  - Prioridades
  - Estados de seguimiento
  - Programación automática

### 10. **📞 Módulo de Intentos de Contacto** (`contact-attempt`)
- **Funcionalidad**: Registro de intentos de contacto
- **Endpoints**: CRUD de intentos de contacto
- **Características**:
  - Métodos de contacto
  - Éxito/fallo de contacto
  - Programación de próximos intentos

### 11. **🆘 Módulo de Directorio de Rescate** (`rescue-directory`)
- **Funcionalidad**: Pacientes que requieren rescate
- **Endpoints**: Gestión de pacientes en riesgo
- **Características**:
  - Razones de rescate
  - Estados de rescate
  - Asignación de responsables

---

## 🌐 APIs y Endpoints

### Formato de Respuesta Estándar
Todas las respuestas de la API siguen el siguiente formato:
```json
{
  "success": true,
  "data": { /* datos de respuesta */ },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Principales Endpoints

#### **👤 Usuarios** (`/users`)
```
GET    /users              # Listar usuarios con paginación
POST   /users              # Crear nuevo usuario
GET    /users/:id          # Obtener usuario por ID
PATCH  /users/:id          # Actualizar usuario
DELETE /users/:id          # Eliminar usuario
```

#### **📅 Citas** (`/appointments`)
```
GET    /appointments       # Listar citas con filtros
POST   /appointments       # Crear nueva cita
GET    /appointments/:id   # Obtener cita por ID
PATCH  /appointments/:id   # Actualizar cita
DELETE /appointments/:id   # Eliminar cita
```

#### **🏥 Pacientes** (`/patients`)
```
GET    /patients           # Listar pacientes
POST   /patients           # Crear nuevo paciente
GET    /patients/:id       # Obtener paciente por ID
PATCH  /patients/:id       # Actualizar paciente
DELETE /patients/:id       # Eliminar paciente
```

#### **👨‍⚕️ Médicos** (`/medics`)
```
GET    /medics             # Listar médicos
POST   /medics             # Crear nuevo médico
GET    /medics/:id         # Obtener médico por ID
PATCH  /medics/:id         # Actualizar médico
DELETE /medics/:id         # Eliminar médico
```

### Parámetros de Consulta Comunes
- `page`: Número de página (default: 1)
- `limit`: Elementos por página (default: 10)
- `search`: Búsqueda por texto
- `active`: Filtrar por estado activo/inactivo

---

## ⚙️ Comandos de Desarrollo

### Instalación de Dependencias
```bash
pnpm install
```

### Desarrollo
```bash
pnpm run start:dev      # Servidor de desarrollo con hot reload
pnpm run start:debug    # Modo debug con hot reload
pnpm run build          # Construir aplicación
pnpm run start:prod     # Servidor de producción
```

### Base de Datos (Prisma)
```bash
pnpm run db:generate    # Generar cliente Prisma
pnpm run db:push        # Sincronizar esquema con BD
pnpm run db:migrate     # Ejecutar migraciones
pnpm run db:studio      # Abrir Prisma Studio
```

### Testing
```bash
pnpm run test          # Ejecutar tests unitarios
pnpm run test:watch    # Tests en modo watch
pnpm run test:e2e      # Tests end-to-end
pnpm run test:cov      # Tests con cobertura
```

### Calidad de Código
```bash
pnpm run lint          # ESLint con auto-fix
pnpm run format        # Formatear con Prettier
```

---

## 🔧 Configuración y Instalación

### Requisitos Previos
- **Node.js** (versión 18+)
- **PostgreSQL** (versión 12+)
- **pnpm** (gestor de paquetes)

### Variables de Entorno
Crear archivo `.env` con:
```env
# Base de datos
DATABASE_URL="postgresql://usuario:password@localhost:5432/sistema_medico"

# JWT
JWT_SECRET="tu-secret-key-muy-seguro"
JWT_EXPIRES_IN="7d"

# Configuración de aplicación
PORT=3000
NODE_ENV="development"
```

### Pasos de Instalación
1. **Clonar repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd nestjs-prisma-app
   ```

2. **Instalar dependencias**
   ```bash
   pnpm install
   ```

3. **Configurar base de datos**
   ```bash
   # Ejecutar migraciones
   pnpm run db:migrate
   
   # Generar cliente Prisma
   pnpm run db:generate
   
   # (Opcional) Ejecutar seed
   npx prisma db seed
   ```

4. **Iniciar aplicación**
   ```bash
   pnpm run start:dev
   ```

5. **Acceder a documentación**
   - API: `http://localhost:3000`
   - Swagger UI: `http://localhost:3000/api`
   - Prisma Studio: `pnpm run db:studio`

---

## 📐 Patrones y Convenciones

### Arquitectura de Módulos
Cada módulo sigue el patrón **Controller → Service → Repository (Prisma)**:
- **Controller**: Manejo de peticiones HTTP y validación
- **Service**: Lógica de negocio y operaciones
- **Prisma**: Acceso a datos y consultas

### Convenciones de Código
- **Naming**: camelCase para variables, PascalCase para clases
- **DTOs**: Validación con `class-validator`
- **Responses**: Interceptor global para formato consistente
- **Errors**: Filtro global para manejo de excepciones Prisma

### Patrón de Paginación
```typescript
interface QueryDto {
  page?: number;
  limit?: number;
  search?: string;
  active?: boolean;
}

interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
```

### Manejo de Errores
- **Prisma Errors**: Transformados automáticamente a HTTP exceptions
- **Validation Errors**: Manejados por ValidationPipe global
- **Custom Errors**: Excepciones HTTP específicas del dominio

### Logging
- **Service Level**: Logger de NestJS para operaciones importantes
- **Request Level**: Interceptor para logging de requests/responses
- **Error Level**: Logging automático de excepciones

---

## 🚀 Próximos Pasos

### Funcionalidades Futuras
- [ ] Sistema de notificaciones
- [ ] Reportes y analytics
- [ ] Integración con sistemas externos
- [ ] API de pagos
- [ ] Sistema de archivos médicos
- [ ] Telemedicina integrada

### Mejoras Técnicas
- [ ] Caché con Redis
- [ ] Rate limiting
- [ ] Monitoreo con Prometheus
- [ ] CI/CD pipeline
- [ ] Docker containers
- [ ] Tests automatizados completos

---

## 📞 Contacto y Soporte

Para preguntas sobre el proyecto o solicitudes de nuevas funcionalidades, contactar al equipo de desarrollo.

---

*Documentación generada el: {{ fecha_actual }}*
*Versión del proyecto: 0.0.1*