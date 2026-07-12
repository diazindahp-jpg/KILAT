document
.getElementById("dataAnakForm")
.addEventListener(
"submit",
function(e){


e.preventDefault();


let nama =
document.getElementById("nama").value;


let lahir =
document.getElementById("tanggalLahir").value;


let jk =
document.getElementById("jenisKelamin").value;


let berat =
parseFloat(
document.getElementById("berat").value
);


let tinggi =
parseFloat(
document.getElementById("tinggi").value
);



let umur =
hitungUmur(lahir);



let hasil =
analisisAntropometri(
berat,
tinggi,
umur,
jk
);



document
.getElementById("hasil")
.innerHTML=`

<h3>Hasil Pemeriksaan</h3>

Nama :
${nama}

<br>

Umur :
${umur} bulan

<hr>


BB/U :
${hasil.BB_U.status}
(Z=${hasil.BB_U.z})


<br><br>


TB/U :
${hasil.TB_U.status}
(Z=${hasil.TB_U.z})


<br><br>


IMT/U :
${hasil.IMT_U.status}
(Z=${hasil.IMT_U.z})


`;



});




// ===================
// UMUR
// ===================

function hitungUmur(tanggal){

let lahir =
new Date(tanggal);


let sekarang =
new Date();


let bulan =
(
sekarang.getFullYear()
-
lahir.getFullYear()
)
*12;


bulan +=
sekarang.getMonth()
-
lahir.getMonth();


return bulan;

}




// ===================
// REFERENSI WHO
// ===================


function cariReferensi(
parameter,
umur,
jk
){

let data =
WHO_DATABASE[jk][parameter];


return data.reduce(
(a,b)=>

Math.abs(b.umur-umur)
<
Math.abs(a.umur-umur)
?
b
:
a

);

}





function hitungZ(
nilai,
median,
sd
){

return(
nilai-median
)/sd;

}





function analisisAntropometri(
berat,
tinggi,
umur,
jk
){


let bb =
cariReferensi(
"BB_U",
umur,
jk
);


let tb =
cariReferensi(
"TB_U",
umur,
jk
);



let imt =
berat /
(
(tinggi/100)
*
(tinggi/100)
);



let imtRef =
cariReferensi(
"IMT_U",
umur,
jk
);



let zBB =
hitungZ(
berat,
bb.median,
bb.sd
);


let zTB =
hitungZ(
tinggi,
tb.median,
tb.sd
);


let zIMT =
hitungZ(
imt,
imtRef.median,
imtRef.sd
);



return{


BB_U:{
z:zBB.toFixed(2),
status:kategoriBBU(zBB)
},


TB_U:{
z:zTB.toFixed(2),
status:kategoriTBU(zTB)
},


IMT_U:{
z:zIMT.toFixed(2),
status:kategoriIMTU(zIMT)
}

};


}





function kategoriBBU(z){

if(z<-3)
return"Sangat kurang";

if(z<-2)
return"Kurang";

if(z<=1)
return"Normal";

return"Risiko lebih";

}



function kategoriTBU(z){

if(z<-3)
return"Sangat pendek";

if(z<-2)
return"Pendek";

return"Normal";

}



function kategoriIMTU(z){

if(z<-3)
return"Sangat kurus";

if(z<-2)
return"Kurus";

if(z<=1)
return"Normal";

return"Gemuk";

}
