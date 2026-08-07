 JWT : Header.Payload.DigitalSignature

 Header aur Payload hashed nhi hote bs DigitalSignature hashed hota hai yha..(kyuki agr unpe hashing lg gyi to hum unki actual value nikaal hi nhi paenge)
 *** (coz Hashing is irreversible) ***

 (Header + Payload)=> HashCode
 (Encrypt The hashcode) => DigitalSignature