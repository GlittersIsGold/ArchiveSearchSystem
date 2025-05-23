import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class Admin {
  public async handle(
    { auth, response }: HttpContextContract,
    next: () => Promise<void>
  ) {
    if (!auth.user!.is_admin) {
      return response.badRequest("=(");
    }

    // code for middleware goes here. ABOVE THE NEXT CALL
    await next();
  }
}
