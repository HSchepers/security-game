<?php

//$verbindung = mysql_connect("localhost","root","");
$verbindung = new mysqli('localhost', 'root', '', 'securitygame');
//mysql_select_db ("securitygame", $verbindung);
if (!$verbindung) {
   exit ( "keine Verbindung möglich");
   } else {
       echo "Verbunden";
   }

//Formular-Daten auslesen

/*

//Abfrage

$sql =


//echo $sql;

$ergebnis= mysql_query ( $sql, $verbindung);

$anzahl= mysql_num_rows($ergebnis) ;

if (!$anzahl) {      // !$anzahl: keine Datensätze
   exit("Es wurden keine Datensätze gefunden!");
   }

//Ausgabevorbereitung z. B. Tabelle


while ($datensatz= mysql_fetch_array($ergebnis))  {

//Ausgabe (Schleife)


};

// Serververbindung schließen
mysql_close($verbindung);
*/
?>