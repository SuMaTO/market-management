<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */

$routes->group('api', function ($routes) {

    // CORS preflight
    $routes->options('(:any)', static function () {
        return service('response')->setStatusCode(200);
    });

    // =========================
    // Auth
    // =========================

    // Login ไม่ต้องใช้ AuthFilter
    $routes->post('login', 'Api\Auth::login');

    // =========================
    // Zones
    // Admin + Manager
    // =========================

    $routes->group('zones', [
        'filter' => ['auth', 'role:admin,manager,staff']
    ], function ($routes) {

        $routes->get('/', 'Api\Zones::index');
        $routes->get('(:num)', 'Api\Zones::show/$1');

        $routes->post('/', 'Api\Zones::create');
        $routes->put('(:num)', 'Api\Zones::update/$1');
        $routes->delete('(:num)', 'Api\Zones::delete/$1');
    });

    // =========================
    // Stalls
    // Admin + Manager + Staff
    // =========================

    $routes->group('stalls', [
        'filter' => ['auth', 'role:admin,manager,staff']
    ], function ($routes) {

        $routes->get('/', 'Api\Stalls::index');
        $routes->get('(:num)', 'Api\Stalls::show/$1');

        $routes->post('/', 'Api\Stalls::create');
        $routes->put('(:num)', 'Api\Stalls::update/$1');
        $routes->delete('(:num)', 'Api\Stalls::delete/$1');
    });

    // =========================
    // Tenants
    // Admin + Manager + Staff
    // =========================

    $routes->group('tenants', [
        'filter' => ['auth', 'role:admin,manager,staff']
    ], function ($routes) {

        $routes->get('/', 'Api\Tenants::index');
        $routes->get('(:num)', 'Api\Tenants::show/$1');

        $routes->post('/', 'Api\Tenants::create');
        $routes->put('(:num)', 'Api\Tenants::update/$1');
        $routes->delete('(:num)', 'Api\Tenants::delete/$1');
    });

    // =========================
    // Contracts
    // Admin + Manager + Staff
    // =========================

    $routes->group('contracts', [
        'filter' => ['auth', 'role:admin,manager,staff']
    ], function ($routes) {

        $routes->get('/', 'Api\Contracts::index');
        $routes->get('(:num)', 'Api\Contracts::show/$1');

        $routes->post('/', 'Api\Contracts::create');
        $routes->put('(:num)', 'Api\Contracts::update/$1');
        $routes->delete('(:num)', 'Api\Contracts::delete/$1');
    });

    // =========================
    // Users
    // Admin เท่านั้น
    // =========================

    $routes->group('users', [
        'filter' => ['auth', 'role:admin']
    ], function ($routes) {

        $routes->get('/', 'Api\Users::index');
        $routes->get('(:num)', 'Api\Users::show/$1');

        $routes->post('/', 'Api\Users::create');
        $routes->put('(:num)', 'Api\Users::update/$1');
        $routes->delete('(:num)', 'Api\Users::delete/$1');
    });

    // =========================
    // Utilities
    // Admin + Staff
    // =========================

    $routes->group('utilities', [
        'filter' => ['auth', 'role:admin,staff']
    ], function ($routes) {

    $routes->get('/', 'Api\Utilities::index');
    $routes->get('(:num)', 'Api\Utilities::show/$1');
    $routes->post('/', 'Api\Utilities::create');
    $routes->put('(:num)', 'Api\Utilities::update/$1');
    $routes->delete('(:num)', 'Api\Utilities::delete/$1');
    });

    // =========================
    // Invoices
    // Admin + Staff
    // =========================

    $routes->group('invoices', [
        'filter' => ['auth', 'role:admin,staff']
    ], function ($routes) {

        $routes->get('/', 'Api\Invoices::index');
        $routes->get('(:num)', 'Api\Invoices::show/$1');
        $routes->post('/', 'Api\Invoices::create');
        $routes->put('(:num)', 'Api\Invoices::update/$1');
        $routes->delete('(:num)', 'Api\Invoices::delete/$1');

    });

    // =========================
    // Payments
    // Admin + Staff
    // =========================

    $routes->group('payments', [
        'filter' => ['auth', 'role:admin,staff']
    ], function ($routes) {

        $routes->get('/', 'Api\Payments::index');
        $routes->get('(:num)', 'Api\Payments::show/$1');
        $routes->post('/', 'Api\Payments::create');
        $routes->put('(:num)', 'Api\Payments::update/$1');
        $routes->delete('(:num)', 'Api\Payments::delete/$1');

    });

    // =========================
    // Receipts
    // Admin + Staff
    // =========================
    
    $routes->group('receipts', [
        'filter' => ['auth', 'role:admin,staff']
    ], function ($routes) {
    
        $routes->get('/', 'Api\Receipts::index');
        $routes->get('(:num)', 'Api\Receipts::show/$1');
        $routes->post('/', 'Api\Receipts::create');
        $routes->put('(:num)', 'Api\Receipts::update/$1');
        $routes->delete('(:num)', 'Api\Receipts::delete/$1');
    
    });

    // =========================
    // Reports
    // Admin + Manager
    // =========================

    $routes->group('reports', [
        'filter' => ['auth', 'role:admin,manager']
    ], function ($routes) {

        $routes->get('/', 'Api\Reports::index');
        $routes->get('(:num)', 'Api\Reports::show/$1');

    });

});