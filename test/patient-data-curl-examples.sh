#!/bin/bash

# ==============================================================================
# EJEMPLOS DE CURL PARA OBTENER DATOS MÉDICOS DEL PACIENTE
# ==============================================================================

# Variables
BASE_URL="http://localhost:3001/api/v1"
PATIENT_ID="cmg4iykys0000u8wkx0o1qepf"
TOKEN="YOUR_JWT_TOKEN_HERE"

echo "🏥 OBTENIENDO DATOS MÉDICOS DEL PACIENTE: $PATIENT_ID"
echo "=============================================================================="

# 🧬 ANTECEDENTES MÉDICOS (familiares y personales)
echo ""
echo "📋 1. ANTECEDENTES MÉDICOS"
echo "Endpoint: $BASE_URL/antecedents/patient/$PATIENT_ID"
curl -X GET "$BASE_URL/antecedents/patient/$PATIENT_ID" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  | jq '.'

echo ""
echo "=============================================================================="

# 🩺 SÍNTOMAS REPORTADOS
echo ""
echo "🩺 2. SÍNTOMAS REPORTADOS"
echo "Endpoint: $BASE_URL/symptoms/patients/$PATIENT_ID"
curl -X GET "$BASE_URL/symptoms/patients/$PATIENT_ID" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  | jq '.'

echo ""
echo "=============================================================================="

# 📏 EXÁMENES FÍSICOS
echo ""
echo "📏 3. EXÁMENES FÍSICOS (ÚLTIMOS)"
echo "Endpoint: $BASE_URL/physical-examinations/patient/$PATIENT_ID"
curl -X GET "$BASE_URL/physical-examinations/patient/$PATIENT_ID" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  | jq '.'

echo ""
echo "=============================================================================="

# 📈 HISTORIAL DE EXÁMENES FÍSICOS
echo ""
echo "📈 4. HISTORIAL COMPLETO DE EXÁMENES FÍSICOS"
echo "Endpoint: $BASE_URL/physical-examinations/patient/$PATIENT_ID/history"
curl -X GET "$BASE_URL/physical-examinations/patient/$PATIENT_ID/history" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  | jq '.'

echo ""
echo "=============================================================================="

# 🔬 DIAGNÓSTICOS DEL PACIENTE
echo ""
echo "🔬 5. DIAGNÓSTICOS DEL PACIENTE (TODOS CON PAGINACIÓN)"
echo "Endpoint: $BASE_URL/diagnostics/patients/$PATIENT_ID"
curl -X GET "$BASE_URL/diagnostics/patients/$PATIENT_ID?page=1&limit=10" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  | jq '.'

echo ""
echo "=============================================================================="

# 🎯 DIAGNÓSTICOS MÁS RECIENTES
echo ""
echo "🎯 6. DIAGNÓSTICOS MÁS RECIENTES (UNO POR GRUPO)"
echo "Endpoint: $BASE_URL/diagnostics/patients/$PATIENT_ID/latest"
curl -X GET "$BASE_URL/diagnostics/patients/$PATIENT_ID/latest" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  | jq '.'

echo ""
echo "=============================================================================="

# 📋 CUESTIONARIOS COMPLETADOS
echo ""
echo "📋 7. CUESTIONARIOS COMPLETADOS (DETALLADO)"
echo "Endpoint: $BASE_URL/questionnaires/patients/$PATIENT_ID/questionnaires"
curl -X GET "$BASE_URL/questionnaires/patients/$PATIENT_ID/questionnaires" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  | jq '.'

echo ""
echo "=============================================================================="
echo "✅ COMPLETADO - Todos los datos médicos del paciente obtenidos"

# ==============================================================================
# EJEMPLOS PARA POSTMAN/INSOMNIA
# ==============================================================================

echo ""
echo "📤 PARA POSTMAN/INSOMNIA:"
echo "=============================================================================="
echo "1. ANTECEDENTES:"
echo "   GET $BASE_URL/antecedents/patient/$PATIENT_ID"
echo ""
echo "2. SÍNTOMAS:"
echo "   GET $BASE_URL/symptoms/patients/$PATIENT_ID"
echo ""
echo "3. EXÁMENES FÍSICOS:"
echo "   GET $BASE_URL/physical-examinations/patient/$PATIENT_ID"
echo ""
echo "4. HISTORIAL EXÁMENES:"
echo "   GET $BASE_URL/physical-examinations/patient/$PATIENT_ID/history"
echo ""
echo "5. DIAGNÓSTICOS (TODOS):"
echo "   GET $BASE_URL/diagnostics/patients/$PATIENT_ID"
echo "   GET $BASE_URL/diagnostics/patients/$PATIENT_ID?page=1&limit=5&search=nutricion"
echo ""
echo "6. DIAGNÓSTICOS (ÚLTIMOS):"
echo "   GET $BASE_URL/diagnostics/patients/$PATIENT_ID/latest"
echo ""
echo "7. CUESTIONARIOS COMPLETADOS:"
echo "   GET $BASE_URL/questionnaires/patients/$PATIENT_ID/questionnaires"
echo ""
echo "Headers para todos:"
echo "   Authorization: Bearer YOUR_JWT_TOKEN"
echo "   Content-Type: application/json"