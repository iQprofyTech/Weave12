import { prisma } from "@weave12/db";

async function main() {
  await prisma.node.updateMany({
    where: { modelId: null as any },
    data: { modelId: "openai:gpt-4o-mini" }
  });
  console.log("✅ Ноды обновлены с дефолтной моделью");
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
