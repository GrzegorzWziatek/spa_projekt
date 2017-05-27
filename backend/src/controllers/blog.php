<?php

use Symfony\Component\HttpFoundation\Request;

$app->get('/blog', function (Request $request, Silex\Application $app) {
    $message = $request->get('message');

    $object = new stdClass();
    $object->test = "Grzegorz";

    return $app->json($object);

});

