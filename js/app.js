document
.getElementById("dataAnakForm")
.addEventListener("submit", function(event){

    event.preventDefault();


    // Ambil input
    const nama =
    document.getElementById("nama").value;


    const tanggalLahir =
    document.getElementById("tanggalLahir").value;


    const jenisKelamin =
    document.getElementById("jenisKelamin").value;


    const berat =
    parseFloat(document.getElementById("berat").value);


    const tinggi =
    parseFloat(document.getElementById("tinggi").value);



    // Hitung umur
    const umurBulan =
    hitungUmurBulan(tanggalLahir);



    // Hitung IMT
    const tinggiMeter =
    tinggi / 100;


    const imt =
    berat / (tinggiMeter * tinggiMeter);



    // Ambil status antropometri
    const hasilBBU =
    cekBBU(berat, umurBulan, jenisKelamin);


    const hasilTBU =
    cekTBU(tinggi, umurBulan, jenisKelamin);


    const hasilBBTB =
    cekBBTB(berat, tinggi, jenisKelamin);


    const hasilIMTU =
    cekIMTU(imt, umurBulan, jenisKelamin);



    // Tampilkan hasil

    document
    .getElementById("hasil")
    .innerHTML = `

    <h3>Hasil Pemeriksaan</h3>

    <p>
    Nama: ${nama}
    </p>

    <p>
    Umur: ${umurBulan} bulan
    </p>

    <p>
    Berat:
    ${berat} kg
    </p>

    <p>
    Tinggi:
    ${tinggi} cm
    </p>

    <p>
    IMT:
    ${imt.toFixed(2)}
    </p>


    <hr>


    <p>
    BB/U:
    <b>${hasilBBU}</b>
    </p>


    <p>
    TB/U:
    <b>${hasilTBU}</b>
    </p>


    <p>
    BB/TB:
    <b>${hasilBBTB}</b>
    </p>


    <p>
    IMT/U:
    <b>${hasilIMTU}</b>
    </p>

    `;


});




// ==========================
// Fungsi umur
// ==========================

function hitungUmurBulan(tglLahir){

    const lahir =
    new Date(tglLahir);


    const sekarang =
    new Date();


    let bulan =
    (sekarang.getFullYear()
    - lahir.getFullYear()) * 12;


    bulan +=
    sekarang.getMonth()
    - lahir.getMonth();


    if(
        sekarang.getDate()
        <
        lahir.getDate()
    ){
        bulan--;
    }


    return bulan;

}



// ==========================
// Database sementara
// ==========================

const databaseAntropometri = {

    laki:{
        BB_U:[],
        TB_U:[],
        BB_TB:[],
        IMT_U:[]
    },


    perempuan:{
        BB_U:[],
        TB_U:[],
        BB_TB:[],
        IMT_U:[]
    }

};



// ==========================
// Fungsi status sementara
// ==========================

function cekBBU(bb, umur, jk){

    /*
    Nanti diganti
    pencarian Z-score WHO
    */

    if(bb < 5)
        return "Berat sangat kurang";


    return "Normal";

}



function cekTBU(tb, umur, jk){

    if(tb < 50)
        return "Sangat pendek";


    return "Normal";

}



function cekBBTB(bb,tb,jk){

    const nilai =
    bb / ((tb/100)*(tb/100));


    if(nilai < 13)
        return "Kurus";


    return "Normal";

}



function cekIMTU(imt,umur,jk){

    if(imt < 14)
        return "Kurus";


    return "Normal";

}
