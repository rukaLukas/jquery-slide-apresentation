<?php

$caminho = $_POST['caminho'];
$res['status'] = false;

// $uploaddir = './files/';
$uploaddir = $caminho;
if ($caminho == './musicas/') {
    $uploadfile = $uploaddir . basename($_FILES['musica']['name']);
    $tmpFile = $_FILES['musica']['tmp_name'];
    $res['status'] = true;
}
if ($caminho == './files/') {
    $uploadfile = $uploaddir . basename($_FILES['foto']['name']);
    $tmpFile = $_FILES['foto']['tmp_name'];

    $img = getimagesize($tmpFile);
    $width = $img[0];
    $height = $img[1];

    if ($width < 1800 || $height < 600) {
        $res['msg'] = 'Tamanho da imagem fora das medidas mínimas. Favor enviar uma imagem com mínimo de 1800x600';
        $res['status'] = false;
    } else {
        $res['status'] = true;
    }
}
    



if ($res['status']) {
    if (move_uploaded_file($tmpFile, $uploadfile)) {
        $res['msg'] = "Arquivo válido e enviado com sucesso.";
        $res['imagem_dir'] = $uploadfile;
        $res['status'] = true;
    } else {
        $res['msg'] = "Possível ataque de upload de arquivo!";
    }
}


echo json_encode($res);
