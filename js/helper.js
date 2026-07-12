/* ==========================================================
   KILAT v1.0
   Helper Functions
   UPTD Puskesmas Pelangiran
========================================================== */

//===========================================================
// Shortcut Element
//===========================================================

function $(id){
    return document.getElementById(id);
}

//===========================================================
// Hitung Umur
// Berdasarkan Tanggal Pemeriksaan
//===========================================================

function hitungUmur(tglLahir, tglPeriksa){

    const lahir = new Date(tglLahir);
    const periksa = new Date(tglPeriksa);

    let tahun = periksa.getFullYear() - lahir.getFullYear();
    let bulan = periksa.getMonth() - lahir.getMonth();
    let hari = periksa.getDate() - lahir.getDate();

    if(hari < 0){

        bulan--;

        const lastMonth =
        new Date(
            periksa.getFullYear(),
            periksa.getMonth(),
            0
        ).getDate();

        hari += lastMonth;

    }

    if(bulan < 0){

        tahun--;

        bulan += 12;

    }

    return{

        tahun:tahun,

        bulan:bulan,

        hari:hari,

        bulanTotal:(tahun*12)+bulan

    };

}

//===========================================================
// Format Umur
//===========================================================

function formatUmur(u){

    return `${u.tahun} Tahun ${u.bulan} Bulan ${u.hari} Hari`;

}

//===========================================================
// Hitung IMT
//===========================================================

function hitungIMT(bb,tb){

    let meter = tb/100;

    let hasil = bb/(meter*meter);

    return Number(hasil.toFixed(2));

}

//===========================================================
// Validasi
//===========================================================

function validasi(){

    if($("nama").value.trim()==""){

        Swal.fire(
            "Perhatian",
            "Nama balita belum diisi.",
            "warning"
        );

        return false;

    }

    if($("jk").value==""){

        Swal.fire(
            "Perhatian",
            "Jenis kelamin belum dipilih.",
            "warning"
        );

        return false;

    }

    if($("lahir").value==""){

        Swal.fire(
            "Perhatian",
            "Tanggal lahir belum diisi.",
            "warning"
        );

        return false;

    }

    if($("periksa").value==""){

        Swal.fire(
            "Perhatian",
            "Tanggal pemeriksaan belum diisi.",
            "warning"
        );

        return false;

    }

    if($("bb").value==""){

        Swal.fire(
            "Perhatian",
            "Berat badan belum diisi.",
            "warning"
        );

        return false;

    }

    if($("tb").value==""){

        Swal.fire(
            "Perhatian",
            "Tinggi/Panjang badan belum diisi.",
            "warning"
        );

        return false;

    }

    let umur = hitungUmur(
        $("lahir").value,
        $("periksa").value
    );

    if(umur.bulanTotal<0){

        Swal.fire(
            "Kesalahan",
            "Tanggal pemeriksaan tidak boleh sebelum tanggal lahir.",
            "error"
        );

        return false;

    }

    if(umur.bulanTotal>60){

        Swal.fire(
            "Perhatian",
            "Aplikasi ini hanya untuk balita usia 0–60 bulan.",
            "warning"
        );

        return false;

    }

    return true;

}

//===========================================================
// Reset
//===========================================================

function resetForm(){

    document.querySelector("form")?.reset();

    $("nama").value="";
    $("jk").value="";
    $("lahir").value="";
    $("periksa").value="";
    $("bb").value="";
    $("tb").value="";

    $("hNama").innerHTML="-";
    $("hUmur").innerHTML="-";
    $("hIMT").innerHTML="-";
    $("hBBU").innerHTML="-";
    $("hTBU").innerHTML="-";
    $("hBBTB").innerHTML="-";
    $("hIMTU").innerHTML="-";

    $("status").className="alert alert-secondary fw-bold text-center";

    $("status").innerHTML="Belum dilakukan perhitungan";

}

//===========================================================
// Loading
//===========================================================

function tampilLoading(){

    $("loading").classList.remove("d-none");

}

function sembunyiLoading(){

    $("loading").classList.add("d-none");

}

//===========================================================
// Status
//===========================================================

function tampilkanStatus(text,warna){

    $("status").innerHTML=text;

    $("status").className="alert text-center fw-bold";

    switch(warna){

        case "success":

            $("status").classList.add("alert-success");

        break;

        case "warning":

            $("status").classList.add("alert-warning");

        break;

        case "danger":

            $("status").classList.add("alert-danger");

        break;

        case "primary":

            $("status").classList.add("alert-primary");

        break;

        default:

            $("status").classList.add("alert-secondary");

    }

}

//===========================================================
// Format Angka
//===========================================================

function angka(nilai){

    return Number(nilai).toFixed(2);

}

//===========================================================
// Tanggal Hari Ini
//===========================================================

window.onload=function(){

    const hariIni=new Date().toISOString().split("T")[0];

    $("periksa").value=hariIni;

}
