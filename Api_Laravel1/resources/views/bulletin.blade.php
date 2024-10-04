<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>

    <style>
        @page {
            size: A4 landscape;
            margin: 5px;
            /* width: 200% */
            height:100%
        }
        .header-table {
            width: 100%;
            border-collapse: collapse;
        }
        .header-table td {
            width: 33%;
            text-align: center;
            vertical-align: middle;
        }
        .header-table .left, .header-table .right {
            text-align: left;
            margin: 10px
        }
        .header-text {
            font-weight: bold;
            color: red;
        }
        .header-image img {
            width: 50px;
            height: 50px;
        }
    </style>
</head>
<body>

    <div class="first-section" style="width:100%; float:left">

         {{-- <h1>Test {{ $trancheData[0]->nom }}</h1> --}}

        <h3>Année Académique</h3>

        <section>
            <table class="header-table">
                <tr>
                    <td class="left">
                        <p class="header-text">MINISTERE DE L'EDUCATION DE BASE</p>
                        <p>Ecole Primaire</p>
                        <p>BP</p>
                        <p>Email:</p>
                        <p>Tel:</p>
                    </td>
                    <td class="header-image">
                        <img src="img/logo.png" alt="Logo">
                    </td>
                    <td class="right">
                        <p class="header-text">MINISTERE DE L'EDUCATION DE BASE</p>
                        <p>Ecole Primaire</p>
                        <p>BP</p>
                        <p>Email:</p>
                        <p>Tel:</p>
                    </td>
                </tr>
            </table>
        </section>



       <h2 style="text-align:center; color:blue"><u>BULLETIN DE NOTES</u> </h2>

        <div style="padding:5px">
            <p>Matricule: <span style="font-weight:bold"></span>
            <p>Nom: <span style="font </p>-weight:bold">{{ $student->nomEtud }}</span>
            <p>Classe: <span style="f </p>ont-weight:bold">{{ $student->nomForm }}</span>
            <p>Nom de l'enseignant:</p>
        </div>



        <table border="0px" style="border-collapse:collapse; padding:5px">
            <thead>
                <tr>
                    <th>MATIERES</th>
                    <th>MOYENNE</th>
                    <th>RANG</th>
                    <th>APPRECIATION</th>
                    <th>OBSERVATIONS</th>
                </tr>
            </thead>

            <tbody>
                { {
                    @foreach ($notes as $item)
                        <tr>
                            <td>{{ $item->nomCours }}</td>
                            <td>{{ $item->valeur }}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    @endforeach
                } }

                <tr>
                    <td colspan="5">
                        <span>TOTAL: ..........</span>
                        <span>Moy: .........</span>
                        <span>Rang:......</span>
                        <span>Sur........</span>
                    </td>
                </tr>

                <tr>
                    <td colspan="2">
                        <u>Distinctions</u>
                        <p>Tableau d'honneur + Félicitations  <input type="checkbox" name="" id=""> </p>
                        <p>Travail bien  <input type="checkbox" name="" id=""> </p>
                        <p>Travail assez bien  <input type="checkbox" name="" id=""> </p>
                        <p>Travail passable  <input type="checkbox" name="" id=""> </p>
                        <p>Travail médiocre  <input type="checkbox" name="" id=""> </p>
                        <p>Travail mauvais  <input type="checkbox" name="" id=""> </p>

                    </td>

                    <td colspan="3">
                        <p>Observations</p>
                        <textarea name="" id="" cols="30" rows="5"></textarea>
                    </td>

                </tr>

                <tr>
                    <td colspan="2">
                        <p><strong>Visa du maitre ou de la maitresse</strong></p>
                    </td>

                    <td colspan="2">
                        <p><strong>Visa du père ou de la mère/tuteur</strong></p>
                    </td>

                    <td colspan="3">
                        <p>Décision finale de l'année</p>

                        <p>Admis (e) <input type="checkbox" name="" id=""></p>
                        <p>Refusé (e) <input type="checkbox" name="" id=""></p>
                    </td>

                    <td colspan="2">
                        <p>Visa du Directeur</p>
                        <p>Nom et prenoms signature</p>
                    </td>
                </tr>

            </tbody>
        </table>


    </div>

</body>
</html>
