import { mutation } from "./_generated/server";

export const createUser = mutation({
  async handler(
    ctx: any,
    args: { email: string; imageUrl: string; name: string }
  ) {
    const user = await ctx.db
      .query("userTable")
      .filter((q: { eq: (arg0: any, arg1: string) => any; field: (arg0: string) => any; }) => q.eq(q.field("email"), args.email))
      .collect();

    if (user.length === 0) {
      const data = {
        email: args.email,
        imageUrl: args.imageUrl,
        name: args.name,
        createdAt: Date.now(),   // <-- Use number
        updatedAt: Date.now(),   // <-- Use number
      };
      const result = await ctx.db.insert("userTable", {
        ...data,
      });

      return {
        ...data,
        id: result,
      };
    } else {
      return { message: "User already exists" };
    }
  },
});