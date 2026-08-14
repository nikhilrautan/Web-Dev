
logout api

 1st solution : response me Invalid cookies send krdo taaki wo firse jo nya token bheja tha usse login na ho pae

 2nd solution : jo cookies hai vhi expire krdo 

 (yha pr bhi ek glti hai : jaise agr user ne apni cookies copy kr k rkhi hongi to wo dobara usse use kr k firse login kr skta haii)

 ab hum aisa krenge ki hum jin jin tokens se logout hue the unko ek saath rkh denge(block list m) aur ab user jb bhi un blocked tokens se login krna chahega to nhi kr paega (bs wo jo humne usse bna kr diye hai usse kr paega)

 hum usse compare krnege header.payload.digitalSignature se (kye ye humne hi bnaya hai kya? agr nhi to isse bhi wo login nhi kr paega)

 1: Token invalid hota hai to usko DB se delete krdo to fir agr ab jb user is expired token se login krta hai to hum is 'header.payload.DigitalSignature' se check kr skte hai ki wo valid hai bhi ki nhii? (pr ye bda headache ka kaam hai aur bde server pr use krne layak bhi nhii hai) + faltu m DB ki call 

     + 

agr hum DB use na kr k seedhe apni RAM pr hi ye saare operations perform kre to ?? ---> yha pr bhi ek dikkat hai ki wo jo blocklist hai wo sirf hmari RAM m hai (users k pass bhi wo info phuchane k liye fir aur dikkt aur extra mehnat) (normally in servers ki 3 replicas hoti hai to sb ko ek sath vhi info phuchna mushkil hai )

NOW,
 
 ab yha intoduction hota hai ek nye DB ka -> Redis
 