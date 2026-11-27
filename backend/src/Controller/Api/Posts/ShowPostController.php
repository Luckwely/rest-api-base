<?php

namespace App\Controller\Api\Posts;

use App\Services\PostService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/posts')]
final class ShowPostController extends AbstractController
{
    #[Route('/{id}', name: 'posts.show', methods: ['GET'])]
    public function __invoke(int $id, PostService $postService)
    {
        return $this->json([
            'post' => $postService->findById($id)
        ]);
    }
}
