
logout api

 1st solution : response me Invalid cookies send krdo taaki wo firse jo nya token bheja tha usse login na ho pae

 2nd solution : jo cookies hai vhi expire krdo 

 (yha pr bhi ek glti hai : jaise agr user ne apni cookies copy kr k rkhi hongi to wo dobara usse use kr k firse login kr skta haii)

 ab hum aisa krenge ki hum jin jin tokens se logout hue the unko ek saath rkh denge(block list m) aur ab user jb bhi un blocked tokens se login krna chahega to nhi kr paega (bs wo jo humne usse bna kr diye hai usse kr paega)

 hum usse compare krnege header.payload.digitalSignature se (kye ye humne hi bnaya hai kya? agr nhi to isse bhi wo login nhi kr paega)