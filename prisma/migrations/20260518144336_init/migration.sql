-- CreateTable
CREATE TABLE `parceiros` (
    `razao_social` VARCHAR(191) NOT NULL,
    `cnpj` VARCHAR(191) NOT NULL,
    `nomeResponsavel` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,
    `categoriaProduto` VARCHAR(191) NOT NULL,
    `aceitouTermos` BOOLEAN NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`cnpj`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `projeto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeProjeto` VARCHAR(191) NOT NULL,
    `descricaoProjeto` VARCHAR(191) NOT NULL,
    `dataInicio` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `menbrosProjeto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeMembro` VARCHAR(191) NOT NULL,
    `emailMembro` VARCHAR(191) NOT NULL,
    `projetoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `menbrosProjeto` ADD CONSTRAINT `menbrosProjeto_projetoId_fkey` FOREIGN KEY (`projetoId`) REFERENCES `projeto`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
