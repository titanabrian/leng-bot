import { Router } from 'express';
import AyatController from '../controllers';

export default function registerRoutes(router :Router) {
  const ayatController = new AyatController();
  router.post('/ayat/share', ayatController.shareAyat());
}
