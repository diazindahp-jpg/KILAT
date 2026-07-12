// ==================================================
// APP.JS FINAL
// Mesin Antropometri Anak WHO + Permenkes
// ==================================================


// ===============================
// EVENT FORM
// ===============================

document
.getElementById("dataAnakForm")
.addEventListener("submit", function(e){

    e.preventDefault();


    const nama =
    document.getElementById("nama").value;


    const tanggalLahir =
    document.getElementById("tanggalLahir").value;


    const jk =
    document.getElementById("jenisKelamin").value;


    const berat =
    Number(document.getElementById("berat").value);


    const tinggi =
    Number(document.getElementById("tinggi").value);



    if(!jk || !berat || !tinggi || !tanggalLahir){

        alert("Data belum lengkap");
        return;

    }



    const umur =
    hitungUmurBulan(tanggalLahir);



    const imt =
    hitungIMT(
        berat,
        tinggi
    );



    const hasil =
    analisisAntropometri(
        berat,
        tinggi,
        imt,
        umur,
        jk
    );



    tampilkanHasil(
        nama,
        umur,
        berat,
        tinggi,
        imt,
        hasil
    );


});





// ==================================================
// HITUNG UMUR DALAM BULAN
// ==================================================

function hitungUmurBulan(tanggalLahir){


    const lahir =
    new Date(tanggalLahir);


    const sekarang =
    new Date();


    let umur =

    (
        sekarang.getFullYear()
        -
        lahir.getFullYear()
    )
    *
    12;


    umur +=

    (
        sekarang.getMonth()
        -
        lahir.getMonth()
    );



    if(
        sekarang.getDate()
        <
        lahir.getDate()
    ){

        umur--;

    }


    return umur;

}






// ==================================================
// HITUNG IMT
// ==================================================

function hitungIMT(
    berat,
    tinggi
){

    const meter =
    tinggi / 100;


    return (
        berat /
        (meter * meter)
    );

}






// ==================================================
// ANALISIS ANTROPOMETRI
// ==================================================

function analisisAntropometri(
    berat,
    tinggi,
    imt,
    umur,
    jk
){


    const refBBU =
    cariReferensi(
        "BB_U",
        umur,
        jk
    );


    const refTBU =
    cariReferensi(
        "TB_U",
        umur,
        jk
    );


    const refBBTB =
    cariReferensi(
        "BB_TB",
        tinggi,
        jk
    );


    const refIMTU =
    cariReferensi(
        "IMT_U",
        umur,
        jk
    );




    const zBBU =
    hitungZScore(
        berat,
        refBBU
    );



    const zTBU =
    hitungZScore(
        tinggi,
        refTBU
    );



    const zBBTB =
    hitungZScore(
        berat,
        refBBTB
    );



    const zIMTU =
    hitungZScore(
        imt,
        refIMTU
    );



    return {

        BB_U:{
            z:zBBU,
            status:kategoriBBU(zBBU)
        },


        TB_U:{
            z:zTBU,
            status:kategoriTBU(zTBU)
        },


        BB_TB:{
            z:zBBTB,
            status:kategoriBBTB(zBBTB)
        },


        IMT_U:{
            z:zIMTU,
            status:kategoriIMTU(zIMTU)
        }

    };


}






// ==================================================
// CARI DATA WHO
// ==================================================

function cariReferensi(
    indikator,
    nilai,
    jk
){


    const tabel =
    WHO_DATABASE[jk][indikator];


    if(!tabel || tabel.length===0){

        return {
            median:0,
            sd:1
        };

    }



    let data =
    tabel[0];



    let jarak =
    Math.abs(
        data.umur - nilai
    );



    tabel.forEach(item=>{


        let selisih =
        Math.abs(
            item.umur - nilai
        );


        if(
            selisih < jarak
        ){

            data=item;
            jarak=selisih;

        }


    });



    return data;


}






// ==================================================
// Z SCORE
// ==================================================

function hitungZScore(
    nilai,
    referensi
){


    return (

        (
            nilai -
            referensi.median
        )
        /
        referensi.sd

    ).toFixed(2);


}






// ==================================================
// KATEGORI PERMENKES
// ==================================================


function kategoriBBU(z){

z=Number(z);


if(z < -3)
return "Berat badan sangat kurang";


if(z < -2)
return "Berat badan kurang";


if(z <= 1)
return "Berat badan normal";


return "Risiko berat badan lebih";

}




function kategoriTBU(z){

z=Number(z);


if(z < -3)
return "Sangat pendek";


if(z < -2)
return "Pendek";


if(z <= 3)
return "Normal";


return "Tinggi";

}




function kategoriBBTB(z){

z=Number(z);


if(z < -3)
return "Sangat kurus";


if(z < -2)
return "Kurus";


if(z <= 1)
return "Normal";


if(z <= 2)
return "Gemuk";


return "Obesitas";

}




function kategoriIMTU(z){

z=Number(z);


if(z < -3)
return "Sangat kurus";


if(z < -2)
return "Kurus";


if(z <= 1)
return "Normal";


if(z <= 2)
return "Gemuk";


return "Obesitas";

}






// ==================================================
// TAMPIL HASIL
// ==================================================

function tampilkanHasil(
nama,
umur,
berat,
tinggi,
imt,
hasil
){


document
.getElementById("hasil")
.innerHTML = `


<h3>
Hasil Antropometri
</h3>


<p>
Nama : ${nama}
</p>


<p>
Umur : ${umur} bulan
</p>


<p>
Berat : ${berat} kg
</p>


<p>
Tinggi : ${tinggi} cm
</p>


<p>
IMT : ${imt.toFixed(2)}
</p>


<hr>


<p>
<b>BB/U</b><br>
Z-score : ${hasil.BB_U.z}<br>
Status : ${hasil.BB_U.status}
</p>


<p>
<b>TB/U</b><br>
Z-score : ${hasil.TB_U.z}<br>
Status : ${hasil.TB_U.status}
</p>


<p>
<b>BB/TB</b><br>
Z-score : ${hasil.BB_TB.z}<br>
Status : ${hasil.BB_TB.status}
</p>


<p>
<b>IMT/U</b><br>
Z-score : ${hasil.IMT_U.z}<br>
Status : ${hasil.IMT_U.status}
</p>


`;

}
