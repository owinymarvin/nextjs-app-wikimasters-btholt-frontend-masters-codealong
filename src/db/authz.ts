import prisma from "@/db/index";

export const authorizeUserToEditArticle = async function authorizeArticle(
  loggedInUserId: string,
  articleId: number,
): Promise<boolean> {
  const article = await prisma.article.findUnique({
    where: { id: articleId },
    select: { authorId: true }
  });

  if (!article) {
    return false;
  }

  return article.authorId === loggedInUserId;
};
