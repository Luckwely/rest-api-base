<?php

/**
 * This file has been auto-generated
 * by the Symfony Routing Component.
 */

return [
    false, // $matchHost
    [ // $staticRoutes
        '/api' => [[['_route' => 'home', '_controller' => 'App\\Controller\\Api\\HomeController::index'], null, ['GET' => 0], null, false, false, null]],
        '/api/posts' => [
            [['_route' => 'posts.create', '_format' => 'json', '_controller' => 'App\\Controller\\Api\\Posts\\CreatePostController'], null, ['POST' => 0], null, false, false, null],
            [['_route' => 'posts.index', '_controller' => 'App\\Controller\\Api\\Posts\\ListPostController'], null, ['GET' => 0], null, false, false, null],
        ],
    ],
    [ // $regexpList
        0 => '{^(?'
                .'|/_error/(\\d+)(?:\\.([^/]++))?(*:35)'
                .'|/api/posts/([^/]++)(?'
                    .'|(*:64)'
                .')'
            .')/?$}sDu',
    ],
    [ // $dynamicRoutes
        35 => [[['_route' => '_preview_error', '_controller' => 'error_controller::preview', '_format' => 'html'], ['code', '_format'], null, null, false, true, null]],
        64 => [
            [['_route' => 'posts.delete', '_controller' => 'App\\Controller\\Api\\Posts\\DeletePostController'], ['id'], ['DELETE' => 0], null, false, true, null],
            [['_route' => 'posts.update', '_controller' => 'App\\Controller\\Api\\Posts\\UpdatePostController'], ['id'], ['PUT' => 0], null, false, true, null],
            [null, null, null, null, false, false, 0],
        ],
    ],
    null, // $checkCondition
];
