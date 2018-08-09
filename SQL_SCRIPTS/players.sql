CREATE TABLE `players` (
    `id` INT NOT NULL,
    `name` VARCHAR(15) NOT NULL DEFAULT 'PLAYER',
    `imageUrl` LONGTEXT NOT NULL DEFAULT 'https://fillmurray.com/50/50',
    `card` INT NULL DEFAULT NULL,
    `color` VARCHAR(15) NULL DEFAULT 'red',
    `pokemon1` SMALLINT(3) NULL DEFAULT 1,
    `pokemon2` SMALLINT(3) NULL DEFAULT 1,
    `pokemon3` SMALLINT(3) NULL DEFAULT 1,
    PRIMARY KEY (`id`));


INSERT INTO players (`name`, `color`) VALUES
('Player 1', 'green'),
('Player 2', 'orange'),
('Player 3', 'purple'),
('Player 4', 'red');
