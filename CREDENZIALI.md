# 🔐 Credenziali di Accesso

## Utente Amministratore (Default)

All'avvio del sistema viene creato automaticamente un utente amministratore:

- **Username**: `admin`
- **Password**: `admin123`

## ⚠️ Sicurezza

1. **Cambia la password** dopo il primo accesso
2. In produzione, rimuovi o proteggi l'endpoint `/api/auth/register`
3. Usa password complesse per gli utenti
4. Il token JWT scade dopo 24 ore

## 📝 Creare Nuovi Utenti

Puoi creare nuovi utenti tramite API:

```bash
POST http://localhost:3001/api/auth/register
Content-Type: application/json

{
  "username": "nuovo_utente",
  "password": "password_sicura",
  "nome": "Nome Utente",
  "email": "email@example.com",
  "ruolo": "user"
}
```

**Ruoli disponibili:**
- `admin` - Accesso completo
- `user` - Accesso standard

