<?php

echo "Try programiz.pro";
$employee=array(
    "name"=>"alex",
    "email"=>"alex@gmail.com",
    "age"=>20,
    "genedr"=>"male"
);
foreach ($employee as $key=>$element)
{
    echo $key. ":".$element;
    echo "</br>";
}
?>