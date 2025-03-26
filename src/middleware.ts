import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

// ⚠️ Corrigido: matcher e publicRoutes aceitando catch-all
export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)"
  ]
};

// ✅ Incluímos "(.*)" para permitir todas as variações de rota
export const publicRoutes = ['/', '/product', '/sign-in(.*)', '/sign-up(.*)'];
