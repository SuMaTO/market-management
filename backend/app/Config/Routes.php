<?php

use CodeIgniter\Router\RouteCollection;

/** @var RouteCollection $routes */
$routes->group('api', function ($routes) {

    // รองรับ CORS preflight (OPTIONS) ให้ครอบคลุมทุก endpoint ใน group นี้
    $routes->options('(:any)', static function () {
        return service('response')->setStatusCode(200);
    });

    // Zones
    $routes->get('zones', 'Api\Zones::index');
    $routes->get('zones/(:num)', 'Api\Zones::show/$1');
    $routes->post('zones', 'Api\Zones::create');
    $routes->put('zones/(:num)', 'Api\Zones::update/$1');
    $routes->delete('zones/(:num)', 'Api\Zones::delete/$1');

    // Stalls
    $routes->get('stalls', 'Api\Stalls::index');
    $routes->get('stalls/(:num)', 'Api\Stalls::show/$1');
    $routes->post('stalls', 'Api\Stalls::create');
    $routes->put('stalls/(:num)', 'Api\Stalls::update/$1');
    $routes->delete('stalls/(:num)', 'Api\Stalls::delete/$1');

});
