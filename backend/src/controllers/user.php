<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Cookie;

$app->get('/login', function (Request $request, Silex\Application $app) {
    $user = $request->get('user');
    $pwd = $request->get('pwd');




    $result = new stdClass();
    $result->id = 1;
    $result->name = 'Grzegoz';

    $cookies = $request->cookies;

    // validation
    if (true) {
        $response = new JsonResponse();
        $response->setData(array('status'=> 'OK'));
        $response->headers->setCookie(new Cookie('uId', $result->id));

        return $response;
    } else {
        return $app->json(array('status' => "ERROR"));
    }


    return $app->json($object);

});

