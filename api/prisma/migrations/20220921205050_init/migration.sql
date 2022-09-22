-- CreateTable
CREATE TABLE `Students` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `register` INTEGER NOT NULL,

    UNIQUE INDEX `Students_email_key`(`email`),
    UNIQUE INDEX `Students_cpf_key`(`cpf`),
    UNIQUE INDEX `Students_register_key`(`register`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
