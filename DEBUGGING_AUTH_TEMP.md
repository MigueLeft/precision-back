# DEBUGGING AUTH - CÓDIGO TEMPORAL

⚠️ **IMPORTANTE**: Este código es provisional solo para debugging. Debe ser restaurado en producción.

## Modificaciones Realizadas

### 1. JWT Auth Guard (`src/auth/guards/jwt-auth.guard.ts`)
- ✅ Agregado método `handleRequest()` con mensajes específicos de error
- ✅ Código original comentado al final del archivo

### 2. Permissions Guard (`src/auth/guards/permissions.guard.ts`) 
- ✅ Agregado mensajes detallados de permisos faltantes
- ✅ Muestra rol del usuario, permisos actuales y requeridos
- ✅ Código original comentado al final del archivo

### 3. JWT Strategy (`src/auth/jwt.strategy.ts`) - **NUEVO: Soporte JWE**
- ✅ Cambiado de JWT estándar a JWE (JSON Web Encryption)
- ✅ Implementación custom strategy para manejar descifrado JWE
- ✅ Helper temporal en `src/auth/jwe-helper.ts`
- ✅ Código original JWT comentado al final del archivo

## Tipos de Errores Específicos

### 🔑 Errores de Autenticación JWE (401)
- `🔑 JWE ERROR: No authorization token provided` - Falta header Authorization
- `🔑 JWE ERROR: Malformed JWE token` - Token JWE con formato incorrecto
- `🔑 JWE ERROR: Invalid JWE token or wrong secret` - Secret incorrecto o token inválido
- `🔑 JWE ERROR: Failed to decrypt JWE token` - Error general de descifrado
- `🔑 JWE ERROR: Invalid token payload` - Payload descifrado inválido
- `🔑 JWE ERROR: User associated with token not found in database` - Usuario no existe

### 🚫 Errores de Autorización (403)
- Muestra endpoint específico
- Muestra rol del usuario
- Lista permisos actuales del usuario
- Lista permisos faltantes
- Lista permisos requeridos para el endpoint

## Pasos para Implementar JWE Real

### 1. Instalar la librería jose
```bash
npm install jose
```

### 2. Actualizar jwt.strategy.ts
1. Descomentar: `import { jwtDecrypt } from 'jose';`
2. En el método `decryptJWE()`, reemplazar código temporal con:
```typescript
const secretKey = new TextEncoder().encode(secret);
const { payload } = await jwtDecrypt(token, secretKey);
return payload as JwtPayload;
```

### 3. Eliminar archivos temporales
- Eliminar `src/auth/jwe-helper.ts`

## Para Restaurar el Código Original (JWT estándar)

### Opción 1: Descomenta el código
1. En `jwt-auth.guard.ts`: Eliminar método `handleRequest()` y descomentar código original
2. En `permissions.guard.ts`: Eliminar lógica de mensajes detallados y descomentar código original
3. En `jwt.strategy.ts`: Reemplazar implementación JWE con código JWT comentado

### Opción 2: Revertir usando Git (si tienes control de versiones)
```bash
git checkout -- src/auth/guards/jwt-auth.guard.ts
git checkout -- src/auth/guards/permissions.guard.ts
```

### Opción 3: Usar código comentado
Simplemente copia el código que está en los comentarios `/* CÓDIGO ORIGINAL COMENTADO */` y reemplaza la implementación actual.

## Recomendaciones para Producción

- ✅ Usar mensajes genéricos de error
- ✅ No exponer información sensible del sistema
- ✅ Log detallado solo en servidor (no al cliente)
- ✅ Implementar rate limiting para ataques de fuerza bruta

---
📅 **Fecha de modificación**: $(date)  
🔧 **Propósito**: Debugging temporal - NO usar en producción