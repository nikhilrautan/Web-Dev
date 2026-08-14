# Logout API — Notes
 
## Solution 1: Return "Invalid cookies"
- Send invalid cookie response so client can't use new token to login again.
- **Problem:** token itself still valid server-side. If copied, attacker can still use it.
## Solution 2: Expire the cookie
- Just expire the cookie on client.
- **Problem:** same issue — if user copied the cookie beforehand, they can reuse it to login again.
## Solution 3: Blocklist
- Keep all tokens we logged out from in one place → **blocklist**.
- User tries to login with a blocklisted token → rejected.
- Only tokens issued by us (that we didn't block) will work.
## Verifying token authenticity
- Compare `header.payload.digitalSignature`.
- Check: did **we** generate this signature?
- If not → reject, can't login with it.
## Where to store the blocklist?
 

**Option 1: DB**
- Token invalid → delete from DB.
- Next login attempt with expired token → check `header.payload.signature` validity.
- **Problem:** heavy operation, not good for large servers + extra DB call every time.
**Option 2: Server RAM (no DB)**
- Store blocklist directly in RAM.
- **Problem:** blocklist exists only on that one server's RAM.
- Servers usually run 3+ replicas → hard to sync blocklist info to all of them.
## Enter Redis
 
**What it is:** in-memory DB.
 
**Speed:**
- MongoDB: ~200–300 ms per operation
- Redis: ~50–100 µs per operation
**MongoDB:** stores data in secondary memory → loads into RAM when needed → then works on it.
 
**Redis (in-memory):** data lives directly in RAM.
- Used for data needed only temporarily (not permanent).
- Deleted after some time.
- Still has secondary memory — used for backup only.
**Example:** visiting a site and refreshing repeatedly → not every refresh hits the DB. Actual data stays in DB, but frequently used data is cached in Redis.
 
## Important note
- Don't allocate the same RAM to Node.js and Redis.
- Doing so causes scalability issues.