/* =====================================================
   KILAT v1.0
   Kalkulator Status Gizi Balita Cepat
   UPTD Puskesmas Pelangiran
====================================================== */

:root{
    --primary:#2E7D32;
    --secondary:#66BB6A;
    --accent:#26C6DA;
    --background:#F4F8FB;
    --card:#FFFFFF;
    --text:#37474F;
    --shadow:0 8px 25px rgba(0,0,0,.10);
    --radius:20px;
}

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

body{
    font-family:'Poppins',sans-serif;
    background:var(--background);
    color:var(--text);
}

/* ================= NAVBAR ================= */

.navbar{
    background:linear-gradient(90deg,#2E7D32,#43A047)!important;
}

.navbar-brand{
    font-size:1.4rem;
    font-weight:700;
}

/* ================= HERO ================= */

.hero{
    background:linear-gradient(135deg,#43A047,#26C6DA);
    color:#fff;
    padding:50px 20px 120px;
    position:relative;
    overflow:hidden;
}

.hero::before{
    content:"";
    position:absolute;
    width:250px;
    height:250px;
    background:rgba(255,255,255,.12);
    border-radius:50%;
    top:-120px;
    right:-80px;
}

.hero::after{
    content:"";
    position:absolute;
    width:180px;
    height:180px;
    background:rgba(255,255,255,.08);
    border-radius:50%;
    bottom:-60px;
    left:-40px;
}

.logo{
    width:120px;
    height:120px;
    object-fit:contain;
    background:#fff;
    padding:10px;
    border-radius:50%;
    box-shadow:var(--shadow);
    margin-bottom:20px;
}

.hero h1{
    font-size:3rem;
    font-weight:700;
}

.hero p{
    margin-bottom:5px;
}

/* ================= CARD ================= */

.form-card{
    margin-top:-80px;
    position:relative;
    z-index:100;
}

.card{
    border:none;
    border-radius:var(--radius);
    box-shadow:var(--shadow);
}

.card-body{
    padding:30px;
}

.card h3{
    color:var(--primary);
    font-weight:700;
}

/* ================= FORM ================= */

label{
    font-weight:600;
    margin-bottom:8px;
}

.form-control,
.form-select{
    height:55px;
    border-radius:15px;
    border:2px solid #DCE8EF;
}

.form-control:focus,
.form-select:focus{
    border-color:var(--accent);
    box-shadow:0 0 0 .25rem rgba(38,198,218,.15);
}

/* ================= BUTTON ================= */

.btn{
    border-radius:15px;
    font-weight:600;
    padding:13px;
    transition:.25s;
}

.btn-success{
    background:#2E7D32;
    border:none;
}

.btn-success:hover{
    transform:translateY(-2px);
}

.btn-outline-success:hover{
    transform:translateY(-2px);
}

.btn-danger:hover{
    transform:translateY(-2px);
}

/* ================= TABLE ================= */

.table{
    margin-top:15px;
}

.table th{
    color:#1565C0;
    width:40%;
}

.table td{
    font-weight:500;
}

/* ================= STATUS ================= */

#status{
    border-radius:15px;
    font-size:18px;
    margin-top:20px;
}

/* ================= LOADING ================= */

#loading{
    padding:20px;
}

.spinner-border{
    width:3rem;
    height:3rem;
}

/* ================= CHART ================= */

#chartPertumbuhan{
    width:100%;
    max-height:350px;
}

/* ================= FOOTER ================= */

footer{
    color:#607D8B;
    font-size:14px;
}

/* ================= ANIMATION ================= */

.card{
    animation:muncul .5s ease;
}

@keyframes muncul{

    from{
        opacity:0;
        transform:translateY(20px);
    }

    to{
        opacity:1;
        transform:translateY(0);
    }

}

/* ================= MOBILE ================= */

@media(max-width:768px){

.hero{

padding:35px 15px 100px;

}

.hero h1{

font-size:2.2rem;

}

.logo{

width:90px;
height:90px;

}

.card-body{

padding:20px;

}

.table{

font-size:14px;

}

.btn{

font-size:15px;

}

}

/* ================= HASIL STATUS ================= */

.status-normal{
    background:#E8F5E9;
    color:#2E7D32;
    border-left:6px solid #2E7D32;
}

.status-kurang{
    background:#FFF8E1;
    color:#F57F17;
    border-left:6px solid #F9A825;
}

.status-buruk{
    background:#FFEBEE;
    color:#C62828;
    border-left:6px solid #E53935;
}

.status-lebih{
    background:#E3F2FD;
    color:#1565C0;
    border-left:6px solid #1976D2;
}

/* ================= SCROLLBAR ================= */

::-webkit-scrollbar{
    width:8px;
}

::-webkit-scrollbar-thumb{
    background:#81C784;
    border-radius:10px;
}

::-webkit-scrollbar-track{
    background:#E8F5E9;
}
