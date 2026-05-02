-- -------------------------------------------------------------
-- -------------------------------------------------------------
-- TablePlus 1.5.4
--
-- https://tableplus.com/
--
-- Database: mysql
-- Generation Time: 2026-05-05 04:53:30.968774
-- -------------------------------------------------------------

-- Save current session settings and set optimal values for import
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO';
SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0;
SET NAMES utf8mb4;

DROP TABLE `syshub_db_crud`.`actividade`;


CREATE TABLE `actividade` (
  `id` int NOT NULL AUTO_INCREMENT,
  `referencia_id` int unsigned DEFAULT NULL,
  `detalle` text,
  `creado_en` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `tipo_accion` varchar(80) NOT NULL,
  `usuario_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_25fdbe2013484f24f7794e83c0a` (`usuario_id`),
  CONSTRAINT `FK_25fdbe2013484f24f7794e83c0a` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE `syshub_db_crud`.`archivos_proyecto`;


CREATE TABLE `archivos_proyecto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `subido_en` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `tipo_mime` varchar(100) DEFAULT NULL,
  `tamano_bytes` int unsigned DEFAULT NULL,
  `url` varchar(500) NOT NULL,
  `proyecto_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_500e4c25f14ddb29b8ae138d4b7` (`proyecto_id`),
  CONSTRAINT `FK_500e4c25f14ddb29b8ae138d4b7` FOREIGN KEY (`proyecto_id`) REFERENCES `proyecto` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE `syshub_db_crud`.`blog_articulo`;


CREATE TABLE `blog_articulo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descripcion` text NOT NULL,
  `cant_valoracion` int NOT NULL DEFAULT '0',
  `hora_creacion` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `hora_modificado` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `titulo` varchar(300) NOT NULL,
  `id_creador` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_bf4100cac0d1b32b08b59cf9e6c` (`id_creador`),
  CONSTRAINT `FK_bf4100cac0d1b32b08b59cf9e6c` FOREIGN KEY (`id_creador`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE `syshub_db_crud`.`blog_etiqueta`;


CREATE TABLE `blog_etiqueta` (
  `blog_id` int NOT NULL,
  `etiqueta_id` int NOT NULL,
  PRIMARY KEY (`blog_id`,`etiqueta_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE `syshub_db_crud`.`blog_etiquetas`;


CREATE TABLE `blog_etiquetas` (
  `blog_id` int NOT NULL,
  `etiqueta_id` int NOT NULL,
  PRIMARY KEY (`blog_id`,`etiqueta_id`),
  KEY `IDX_ca7fa281327c0b06d8b5954963` (`blog_id`),
  KEY `IDX_18d3d45332379a0f841f849801` (`etiqueta_id`),
  CONSTRAINT `FK_18d3d45332379a0f841f8498012` FOREIGN KEY (`etiqueta_id`) REFERENCES `etiqueta` (`id`),
  CONSTRAINT `FK_ca7fa281327c0b06d8b59549637` FOREIGN KEY (`blog_id`) REFERENCES `blog_articulo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE `syshub_db_crud`.`blog_respuesta`;


CREATE TABLE `blog_respuesta` (
  `blog_id` int NOT NULL,
  `respuesta_id` int NOT NULL,
  PRIMARY KEY (`blog_id`,`respuesta_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE `syshub_db_crud`.`blog_respuestas`;


CREATE TABLE `blog_respuestas` (
  `blog_id` int NOT NULL,
  `respuesta_id` int NOT NULL,
  PRIMARY KEY (`blog_id`,`respuesta_id`),
  KEY `IDX_04dffb6d8a0532356cfe44901c` (`blog_id`),
  KEY `IDX_85f26d1fd83ba8004b62d860e7` (`respuesta_id`),
  CONSTRAINT `FK_04dffb6d8a0532356cfe44901ce` FOREIGN KEY (`blog_id`) REFERENCES `blog_articulo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_85f26d1fd83ba8004b62d860e74` FOREIGN KEY (`respuesta_id`) REFERENCES `respuesta` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE `syshub_db_crud`.`carrera`;


CREATE TABLE `carrera` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `deletedAt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE `syshub_db_crud`.`clases_grabada`;


CREATE TABLE `clases_grabada` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `fecha` datetime NOT NULL,
  `enlace` varchar(255) NOT NULL,
  `clasificacion` enum('magistral','laboratorio') NOT NULL,
  `id_creador` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_1ee7675cab56a63e4811932014a` (`id_creador`),
  CONSTRAINT `FK_1ee7675cab56a63e4811932014a` FOREIGN KEY (`id_creador`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE `syshub_db_crud`.`curso_espacio`;


CREATE TABLE `curso_espacio` (
  `id` int NOT NULL AUTO_INCREMENT,
  `curso_disponible_id` int DEFAULT NULL,
  `year` year NOT NULL,
  `seccion` varchar(10) NOT NULL,
  `semestre` tinyint unsigned NOT NULL,
  `catedratico_id` int DEFAULT NULL,
  `publicacion_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_a315cdaf8e793947e8c5cf0d95` (`publicacion_id`),
  KEY `FK_bd2c4cce62431a2ac33b5329992` (`curso_disponible_id`),
  KEY `FK_907e20a2df6ee7c8a12bd4e64ec` (`catedratico_id`),
  CONSTRAINT `FK_907e20a2df6ee7c8a12bd4e64ec` FOREIGN KEY (`catedratico_id`) REFERENCES `usuario` (`id`),
  CONSTRAINT `FK_a315cdaf8e793947e8c5cf0d95e` FOREIGN KEY (`publicacion_id`) REFERENCES `publicaciones_curso` (`id`),
  CONSTRAINT `FK_bd2c4cce62431a2ac33b5329992` FOREIGN KEY (`curso_disponible_id`) REFERENCES `cursos_disponible` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE `syshub_db_crud`.`curso_espacio_auxiliare`;


CREATE TABLE `curso_espacio_auxiliare` (
  `curso_espacio_id` int NOT NULL,
  `auxiliar_id` varchar(255) NOT NULL,
  PRIMARY KEY (`curso_espacio_id`,`auxiliar_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE `syshub_db_crud`.`curso_espacio_auxiliares`;


CREATE TABLE `curso_espacio_auxiliares` (
  `curso_espacio_id` int NOT NULL,
  `auxiliar_id` int NOT NULL,
  PRIMARY KEY (`curso_espacio_id`,`auxiliar_id`),
  KEY `IDX_55d140157407fbd3f305297b19` (`curso_espacio_id`),
  KEY `IDX_d636b19b1039a6293163b8632e` (`auxiliar_id`),
  CONSTRAINT `FK_55d140157407fbd3f305297b194` FOREIGN KEY (`curso_espacio_id`) REFERENCES `curso_espacio` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_d636b19b1039a6293163b8632e7` FOREIGN KEY (`auxiliar_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE `syshub_db_crud`.`curso_espacio_estudiante`;


CREATE TABLE `curso_espacio_estudiante` (
  `curso_espacio_id` int NOT NULL,
  `estudiante_id` int NOT NULL,
  PRIMARY KEY (`curso_espacio_id`,`estudiante_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE `syshub_db_crud`.`curso_espacio_estudiantes`;


CREATE TABLE `curso_espacio_estudiantes` (
  `curso_espacio_id` int NOT NULL,
  `estudiante_id` int NOT NULL,
  PRIMARY KEY (`curso_espacio_id`,`estudiante_id`),
  KEY `IDX_20679b63dc3f5975f49a98ba19` (`curso_espacio_id`),
  KEY `IDX_ca0f0fb90c44961d379113960c` (`estudiante_id`),
  CONSTRAINT `FK_20679b63dc3f5975f49a98ba19d` FOREIGN KEY (`curso_espacio_id`) REFERENCES `curso_espacio` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_ca0f0fb90c44961d379113960c5` FOREIGN KEY (`estudiante_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE `syshub_db_crud`.`curso_prerequisito`;


CREATE TABLE `curso_prerequisito` (
  `curso_id` int NOT NULL,
  `prerequisito_id` int NOT NULL,
  PRIMARY KEY (`curso_id`,`prerequisito_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE `syshub_db_crud`.`curso_prerequisitos`;


CREATE TABLE `curso_prerequisitos` (
  `curso_id` int NOT NULL,
  `prerequisito_id` int NOT NULL,
  PRIMARY KEY (`curso_id`,`prerequisito_id`),
  KEY `IDX_61fa62b96affeed494d06bde83` (`curso_id`),
  KEY `IDX_1a7f8685b0d4026bb12d03728a` (`prerequisito_id`),
  CONSTRAINT `FK_1a7f8685b0d4026bb12d03728ae` FOREIGN KEY (`prerequisito_id`) REFERENCES `cursos_disponible` (`id`),
  CONSTRAINT `FK_61fa62b96affeed494d06bde834` FOREIGN KEY (`curso_id`) REFERENCES `cursos_disponible` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE `syshub_db_crud`.`cursos_disponible`;


CREATE TABLE `cursos_disponible` (
  `id` int NOT NULL AUTO_INCREMENT,
  `obligatorio` tinyint NOT NULL DEFAULT '1',
  `clar` tinyint NOT NULL DEFAULT '0',
  `descripcion` text,
  `carrera_id` int DEFAULT NULL,
  `nombre` varchar(150) NOT NULL,
  `codigo` varchar(20) NOT NULL,
  `creditos` tinyint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_e6405ae37a4335e62f86f1de95` (`codigo`),
  KEY `FK_4b012417e713791babc562779b7` (`carrera_id`),
  CONSTRAINT `FK_4b012417e713791babc562779b7` FOREIGN KEY (`carrera_id`) REFERENCES `carrera` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE `syshub_db_crud`.`estado_perfil`;


CREATE TABLE `estado_perfil` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` enum('activo','inactivo','suspendido','eliminado') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_10f9e847f6add934487953f888` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE `syshub_db_crud`.`etiqueta`;


CREATE TABLE `etiqueta` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_c24e444690deb02aa6202719e5` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE `syshub_db_crud`.`material_extra`;


CREATE TABLE `material_extra` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fecha_subido` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `fecha_modificado` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `id_creador` int DEFAULT NULL,
  `proyecto_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_a70e7be944ec46f42eafdaf905` (`proyecto_id`),
  KEY `FK_8e423f22454476f668f93f10725` (`id_creador`),
  CONSTRAINT `FK_8e423f22454476f668f93f10725` FOREIGN KEY (`id_creador`) REFERENCES `usuario` (`id`),
  CONSTRAINT `FK_a70e7be944ec46f42eafdaf9055` FOREIGN KEY (`proyecto_id`) REFERENCES `proyecto` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE `syshub_db_crud`.`pensum`;


CREATE TABLE `pensum` (
  `id` int NOT NULL AUTO_INCREMENT,
  `semestre` int NOT NULL,
  `year_pensum_id` int DEFAULT NULL,
  `carrera_id` int DEFAULT NULL,
  `curso_disponible_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_a62e92b49ebdcd78c708ef3b355` (`year_pensum_id`),
  KEY `FK_bbc1a602dcafff597cb50b600aa` (`carrera_id`),
  KEY `FK_141e5162e117610fa0a4bce5fab` (`curso_disponible_id`),
  CONSTRAINT `FK_141e5162e117610fa0a4bce5fab` FOREIGN KEY (`curso_disponible_id`) REFERENCES `cursos_disponible` (`id`),
  CONSTRAINT `FK_a62e92b49ebdcd78c708ef3b355` FOREIGN KEY (`year_pensum_id`) REFERENCES `year_pensum` (`id`),
  CONSTRAINT `FK_bbc1a602dcafff597cb50b600aa` FOREIGN KEY (`carrera_id`) REFERENCES `carrera` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE `syshub_db_crud`.`proyecto`;


CREATE TABLE `proyecto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_creador` int DEFAULT NULL,
  `descripcion` text NOT NULL,
  `stack` text,
  `fecha_publicado` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `titulo` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_a786b03c327c1674d6ec482c941` (`id_creador`),
  CONSTRAINT `FK_a786b03c327c1674d6ec482c941` FOREIGN KEY (`id_creador`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE `syshub_db_crud`.`proyecto_etiqueta`;


CREATE TABLE `proyecto_etiqueta` (
  `proyecto_id` varchar(255) NOT NULL,
  `etiqueta_id` varchar(255) NOT NULL,
  PRIMARY KEY (`proyecto_id`,`etiqueta_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE `syshub_db_crud`.`proyecto_etiquetas`;


CREATE TABLE `proyecto_etiquetas` (
  `proyecto_id` int NOT NULL,
  `etiqueta_id` int NOT NULL,
  PRIMARY KEY (`proyecto_id`,`etiqueta_id`),
  KEY `IDX_4b9e4af122fcb688140ebe4ea0` (`proyecto_id`),
  KEY `IDX_585531b28501a503f017b74ceb` (`etiqueta_id`),
  CONSTRAINT `FK_4b9e4af122fcb688140ebe4ea05` FOREIGN KEY (`proyecto_id`) REFERENCES `proyecto` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_585531b28501a503f017b74ceb1` FOREIGN KEY (`etiqueta_id`) REFERENCES `etiqueta` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE `syshub_db_crud`.`publicacion_clase`;


CREATE TABLE `publicacion_clase` (
  `publicacion_id` int NOT NULL,
  `clase_id` int NOT NULL,
  PRIMARY KEY (`publicacion_id`,`clase_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE `syshub_db_crud`.`publicacion_clases`;


CREATE TABLE `publicacion_clases` (
  `publicacion_id` int NOT NULL,
  `clase_id` int NOT NULL,
  PRIMARY KEY (`publicacion_id`,`clase_id`),
  KEY `IDX_55ff254a2ba547142402960b41` (`publicacion_id`),
  KEY `IDX_6941f5d009f6954acb1d3b846a` (`clase_id`),
  CONSTRAINT `FK_55ff254a2ba547142402960b41d` FOREIGN KEY (`publicacion_id`) REFERENCES `publicaciones_curso` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_6941f5d009f6954acb1d3b846a1` FOREIGN KEY (`clase_id`) REFERENCES `clases_grabada` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE `syshub_db_crud`.`publicacion_etiquetas`;


CREATE TABLE `publicacion_etiquetas` (
  `publicacion_id` int NOT NULL,
  `etiqueta_id` int NOT NULL,
  PRIMARY KEY (`publicacion_id`,`etiqueta_id`),
  KEY `IDX_53ac65bfdf2be416bee38595ee` (`publicacion_id`),
  KEY `IDX_c9a63fd3036f1d6f38f3dd7d7f` (`etiqueta_id`),
  CONSTRAINT `FK_53ac65bfdf2be416bee38595eeb` FOREIGN KEY (`publicacion_id`) REFERENCES `publicaciones_foro` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_c9a63fd3036f1d6f38f3dd7d7f7` FOREIGN KEY (`etiqueta_id`) REFERENCES `etiqueta` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE `syshub_db_crud`.`publicacion_material`;


CREATE TABLE `publicacion_material` (
  `publicacion_id` int NOT NULL,
  `material_id` int NOT NULL,
  PRIMARY KEY (`publicacion_id`,`material_id`),
  KEY `IDX_fe03696fbc8ef4566bc78aa8e1` (`publicacion_id`),
  KEY `IDX_7abc796cdde68df3540818434a` (`material_id`),
  CONSTRAINT `FK_7abc796cdde68df3540818434a6` FOREIGN KEY (`material_id`) REFERENCES `material_extra` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_fe03696fbc8ef4566bc78aa8e1d` FOREIGN KEY (`publicacion_id`) REFERENCES `publicaciones_curso` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE `syshub_db_crud`.`publicacion_proyecto`;


CREATE TABLE `publicacion_proyecto` (
  `publicacion_id` int NOT NULL,
  `proyecto_id` int NOT NULL,
  PRIMARY KEY (`publicacion_id`,`proyecto_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE `syshub_db_crud`.`publicacion_proyectos`;


CREATE TABLE `publicacion_proyectos` (
  `publicacion_id` int NOT NULL,
  `proyecto_id` int NOT NULL,
  PRIMARY KEY (`publicacion_id`,`proyecto_id`),
  KEY `IDX_71de35fd9e41abb3af9c741adc` (`publicacion_id`),
  KEY `IDX_634d96a6e3506ed2a34d890dd4` (`proyecto_id`),
  CONSTRAINT `FK_634d96a6e3506ed2a34d890dd43` FOREIGN KEY (`proyecto_id`) REFERENCES `proyecto` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_71de35fd9e41abb3af9c741adc9` FOREIGN KEY (`publicacion_id`) REFERENCES `publicaciones_curso` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE `syshub_db_crud`.`publicacion_respuesta`;


CREATE TABLE `publicacion_respuesta` (
  `publicacion_id` int NOT NULL,
  `respuesta_id` int NOT NULL,
  PRIMARY KEY (`publicacion_id`,`respuesta_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE `syshub_db_crud`.`publicacion_respuestas`;


CREATE TABLE `publicacion_respuestas` (
  `publicacion_id` int NOT NULL,
  `respuesta_id` int NOT NULL,
  PRIMARY KEY (`publicacion_id`,`respuesta_id`),
  KEY `IDX_0625166f8f3fdf126f640222dd` (`publicacion_id`),
  KEY `IDX_d5eecb45e39eab7564d752ca51` (`respuesta_id`),
  CONSTRAINT `FK_0625166f8f3fdf126f640222dd4` FOREIGN KEY (`publicacion_id`) REFERENCES `publicaciones_foro` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_d5eecb45e39eab7564d752ca51f` FOREIGN KEY (`respuesta_id`) REFERENCES `respuesta` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE `syshub_db_crud`.`publicaciones_curso`;


CREATE TABLE `publicaciones_curso` (
  `id` int NOT NULL AUTO_INCREMENT,
  `destacado_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_a9eeea0789877d48fbb7a990a4` (`destacado_id`),
  CONSTRAINT `FK_a9eeea0789877d48fbb7a990a4d` FOREIGN KEY (`destacado_id`) REFERENCES `proyecto` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE `syshub_db_crud`.`publicaciones_etiqueta`;


CREATE TABLE `publicaciones_etiqueta` (
  `publicacion_id` int NOT NULL,
  `etiqueta_id` int NOT NULL,
  PRIMARY KEY (`publicacion_id`,`etiqueta_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE `syshub_db_crud`.`publicaciones_foro`;


CREATE TABLE `publicaciones_foro` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(2500) NOT NULL,
  `cant_valoracion` int NOT NULL DEFAULT '0',
  `hora_creacion` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `hora_modificado` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `id_creador` int DEFAULT NULL,
  `titulo` varchar(300) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_6400afae19ab7d392cb56fb0554` (`id_creador`),
  CONSTRAINT `FK_6400afae19ab7d392cb56fb0554` FOREIGN KEY (`id_creador`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE `syshub_db_crud`.`reporte`;


CREATE TABLE `reporte` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipo` varchar(10) NOT NULL,
  `referencia_id` int NOT NULL,
  `motivo` varchar(500) NOT NULL,
  `estado` varchar(20) NOT NULL DEFAULT 'pendiente',
  `creado_en` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `reportado_por_id` int DEFAULT NULL,
  `deletedAt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_2cddc976fe78ec228f48f87b1fa` (`reportado_por_id`),
  CONSTRAINT `FK_2cddc976fe78ec228f48f87b1fa` FOREIGN KEY (`reportado_por_id`) REFERENCES `usuario` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE `syshub_db_crud`.`respuesta`;


CREATE TABLE `respuesta` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_creador` int DEFAULT NULL,
  `cant_valoracion` int NOT NULL DEFAULT '0',
  `creado_en` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `descripcion` varchar(2000) NOT NULL,
  `respuesta_padre` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_c316409cb45718b925eacdd8384` (`id_creador`),
  KEY `FK_bece47d5e2ca1bf3803e24c37bc` (`respuesta_padre`),
  CONSTRAINT `FK_bece47d5e2ca1bf3803e24c37bc` FOREIGN KEY (`respuesta_padre`) REFERENCES `respuesta` (`id`),
  CONSTRAINT `FK_c316409cb45718b925eacdd8384` FOREIGN KEY (`id_creador`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE `syshub_db_crud`.`role`;


CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` enum('admin','estudiante','auxiliar','catedratico','investigador') NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE `syshub_db_crud`.`usuario`;


CREATE TABLE `usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `apellidos` varchar(255) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `creado_en` datetime DEFAULT NULL,
  `ultimo_acceso` datetime DEFAULT NULL,
  `deletedAt` datetime(6) DEFAULT NULL,
  `rol_id` int DEFAULT NULL,
  `estado_perfil_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_349ecb64acc4355db443ca17cb` (`correo`),
  KEY `FK_6c336b0a51b5c4d22614cb02533` (`rol_id`),
  KEY `FK_b236e9f0bf940e0b071f5d852ee` (`estado_perfil_id`),
  CONSTRAINT `FK_6c336b0a51b5c4d22614cb02533` FOREIGN KEY (`rol_id`) REFERENCES `role` (`id`),
  CONSTRAINT `FK_b236e9f0bf940e0b071f5d852ee` FOREIGN KEY (`estado_perfil_id`) REFERENCES `estado_perfil` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE `syshub_db_crud`.`usuario_carrera`;


CREATE TABLE `usuario_carrera` (
  `usuario_id` int NOT NULL,
  `carrera_id` int NOT NULL,
  PRIMARY KEY (`usuario_id`,`carrera_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE `syshub_db_crud`.`usuario_carreras`;


CREATE TABLE `usuario_carreras` (
  `usuario_id` int NOT NULL,
  `carrera_id` int NOT NULL,
  PRIMARY KEY (`usuario_id`,`carrera_id`),
  KEY `IDX_34bf1ed75c6e3f312e5446d286` (`usuario_id`),
  KEY `IDX_8496793b3887774660afaa529c` (`carrera_id`),
  CONSTRAINT `FK_34bf1ed75c6e3f312e5446d2864` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_8496793b3887774660afaa529cd` FOREIGN KEY (`carrera_id`) REFERENCES `carrera` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE `syshub_db_crud`.`year_pensum`;


CREATE TABLE `year_pensum` (
  `id` int NOT NULL AUTO_INCREMENT,
  `year` year NOT NULL,
  `deletedAt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_6b2051a2e806223b887bce7bb4` (`year`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `blog_articulo` (`id`, `descripcion`, `cant_valoracion`, `hora_creacion`, `hora_modificado`, `titulo`, `id_creador`) VALUES 
(1, 'Priebna de articulo', 0, '2026-05-05 04:57:47.106106', '2026-05-05 04:57:47.106106', 'este es un articulo', 8),
(2, 'fghfghjfhjfjhfhjfhjgfhg', 0, '2026-05-05 06:48:55.883009', '2026-05-05 06:48:55.883009', 'fgghfghfhgjfhjgf', 8),
(3, 'Quiero agregar etiquetas', 0, '2026-05-05 08:47:43.598038', '2026-05-05 08:47:43.598038', 'Perueba Etiquta', 8),
(4, 'Linux', 4, '2026-05-05 09:32:14.792783', '2026-05-05 10:39:10.000000', 'Linux', 8),
(5, 'Install', 0, '2026-05-05 11:21:12.897180', '2026-05-05 11:24:18.000000', 'instal', 8),
(6, 'n,mnm,nm,n,n,n', 1, '2026-05-05 11:24:32.615931', '2026-05-05 12:17:17.000000', 'm,nm,n,m', 8),
(7, 'blog o articulo', 0, '2026-05-05 13:18:25.457272', '2026-05-05 13:18:25.457272', 'blog', 8);

INSERT INTO `blog_etiquetas` (`blog_id`, `etiqueta_id`) VALUES 
(3, 1),
(3, 2),
(3, 3),
(4, 4),
(5, 6),
(6, 4),
(7, 8);

INSERT INTO `carrera` (`id`, `nombre`, `descripcion`, `deletedAt`) VALUES 
(1, 'Ingenieria en Sistemas', '', NULL),
(2, 'Ingenieria Civil', '', NULL),
(3, 'Ingenieria Industrial', '', NULL),
(4, 'Ingenieria Mecanica', '', NULL);

INSERT INTO `curso_espacio` (`id`, `curso_disponible_id`, `year`, `seccion`, `semestre`, `catedratico_id`, `publicacion_id`) VALUES 
(1, 1, '2026', 'A', 1, 10, NULL),
(2, 3, '2026', 'A', 1, 10, NULL);

INSERT INTO `curso_espacio_auxiliares` (`curso_espacio_id`, `auxiliar_id`) VALUES 
(1, 3),
(2, 3);

INSERT INTO `curso_espacio_estudiantes` (`curso_espacio_id`, `estudiante_id`) VALUES (1, 9);

INSERT INTO `cursos_disponible` (`id`, `obligatorio`, `clar`, `descripcion`, `carrera_id`, `nombre`, `codigo`, `creditos`) VALUES 
(1, 1, 0, '', 1, 'Social Humanistica', '28', 4),
(2, 1, 1, '', 1, 'Area Social Humanistica 1', '3003', 3),
(3, 1, 1, '', 3, 'Fisica 1', '3014', 9);

INSERT INTO `estado_perfil` (`id`, `nombre`) VALUES 
(1, 'activo'),
(2, 'inactivo'),
(4, 'suspendido'),
(3, 'eliminado');

INSERT INTO `etiqueta` (`id`, `nombre`) VALUES 
(8, 'blog'),
(1, 'Etiquetas¡'),
(5, 'Etqueta'),
(6, 'Java'),
(4, 'Linux'),
(2, 'Linuxz'),
(7, 'publicar'),
(3, 'Teo1');

INSERT INTO `publicacion_etiquetas` (`publicacion_id`, `etiqueta_id`) VALUES 
(6, 5),
(8, 7);

INSERT INTO `publicacion_respuestas` (`publicacion_id`, `respuesta_id`) VALUES 
(1, 1),
(1, 2),
(1, 4),
(1, 5),
(2, 3),
(7, 6);

INSERT INTO `publicaciones_foro` (`id`, `descripcion`, `cant_valoracion`, `hora_creacion`, `hora_modificado`, `id_creador`, `titulo`) VALUES 
(1, 'adhakjdhasldjsdjslk djasklfjskalsjfkjklfjslkdjsklasklfjskljsjklfjdskljsñldjs', 2, '2026-05-04 02:20:01.740815', '2026-05-05 06:56:36.000000', 3, 'asdsad'),
(2, 'Soy nuevo en la carrera y quiero saber como instalar linux y como usarlo', 1, '2026-05-04 02:33:45.536358', '2026-05-05 06:56:43.000000', 8, 'Como usar linux'),
(3, 'Quiero usa PikaOs', 0, '2026-05-04 06:34:50.430331', '2026-05-04 06:34:55.000000', 7, 'como usar pikaOS'),
(4, 'Les voy a enseñar a publicar', 1, '2026-05-05 04:56:51.040131', '2026-05-05 10:39:03.000000', 3, 'Como Publicar'),
(5, 'hjkhkjhkjhlklkh', 1, '2026-05-05 06:52:06.662375', '2026-05-05 08:46:29.000000', 7, 'esadsadas'),
(6, 'etiwurtqaw', -1, '2026-05-05 09:38:22.895467', '2026-05-05 12:14:53.000000', 8, 'prueba etiqeuta'),
(7, 'asdfgvhb', 4, '2026-05-05 11:31:08.329436', '2026-05-05 12:15:05.000000', 8, 'asdfg'),
(8, 'publicacion', 0, '2026-05-05 13:08:26.101570', '2026-05-05 13:08:26.101570', 11, 'Publicacion');

INSERT INTO `reporte` (`id`, `tipo`, `referencia_id`, `motivo`, `estado`, `creado_en`, `reportado_por_id`, `deletedAt`) VALUES 
(1, 'foro', 2, 'no tiene sentido', 'descartado', '2026-05-05 06:56:19.396842', 8, NULL),
(2, 'foro', 1, 'reportado por eso', 'descartado', '2026-05-05 08:50:05.702311', 9, NULL),
(3, 'foro', 1, 'ma reporte', 'revisado', '2026-05-05 08:50:35.046218', 7, NULL),
(4, 'foro', 4, 'piv', 'descartado', '2026-05-05 10:32:20.938334', 8, NULL);

INSERT INTO `respuesta` (`id`, `id_creador`, `cant_valoracion`, `creado_en`, `descripcion`, `respuesta_padre`) VALUES 
(1, 7, 0, '2026-05-04 02:21:17.882860', 'si apoyo la  idea', NULL),
(2, 7, 0, '2026-05-04 02:21:24.291162', 'yo tambien', 1),
(3, 8, 0, '2026-05-04 02:44:07.876453', 'hey porque nadie responde :c
', NULL),
(4, 8, 0, '2026-05-04 02:44:23.561243', 'e kien pa un fri
', NULL),
(5, 8, 0, '2026-05-05 08:54:21.805345', 'Siiii', NULL),
(6, 9, 0, '2026-05-05 12:40:22.054761', 'Comentando', NULL);

INSERT INTO `role` (`id`, `nombre`, `descripcion`) VALUES 
(1, 'admin', NULL),
(2, 'estudiante', NULL),
(3, 'auxiliar', NULL),
(4, 'investigador', NULL),
(5, 'catedratico', NULL);

INSERT INTO `usuario` (`id`, `nombre`, `apellidos`, `correo`, `password`, `description`, `creado_en`, `ultimo_acceso`, `deletedAt`, `rol_id`, `estado_perfil_id`) VALUES 
(3, 'Juan', 'Pérez', 'juan.perez2@example.com', '$2b$12$yExxluOx2mnniuhXMmc4weTYaq1q95E3dQuGsk1EDW5kcl.Qi19EW', ' ', NULL, NULL, NULL, 3, 1),
(5, 'Juan', 'Pérez', 'juan.perez3@example.com', 'MiClaveSegura123', ' ', NULL, NULL, '2026-05-05 09:53:03.000000', 1, 2),
(6, 'Juan', 'Pérez', 'juan.perez4@example.com', 'MiClaveSegura123', 'Desdjslkdjslajlajl', NULL, NULL, '2026-05-05 04:59:46.000000', 1, 1),
(7, 'Juan', 'Pérez', 'juan.pere@example.com', '$2b$12$i60vZlTQXYvZHD8jImuJ1uDzXppSSrz7eSza/l9kmHQEGDT8UHbg6', NULL, NULL, NULL, NULL, 2, 2),
(8, 'Momo', 'Hirai', 'hiraimomo@gmail.com', '$2b$12$LDWHkisiGtJGKsVPZlV8z.uceXp0993IwVcynEmSI38evOnhR4un6', 'Cambio descriocion', NULL, NULL, NULL, 1, 1),
(9, 'Sana', 'Minatozaki', 'minatozakiSana4@twice.com', '$2b$12$NeeXSpMhozElq38p4WTjwO9RvRCCr2z9d8HXVXG5OtIWzyKC5V3pe', '', NULL, NULL, NULL, 4, 1),
(10, 'Yeongyeon', 'Yoo', 'yeongyeon2@twice.com', '$2b$12$4IWRznppJ7.3Zh.UtwP3cusN3YDWnvnLgWiNUuB1NLZs5bnk1Q0gi', 'Estudiando', NULL, NULL, NULL, 5, 1),
(11, 'Cheayoung', 'Son', 'sonchaeyoung8@twice.com', '$2b$12$ScduT1CbTfmHT/7NyupCM.TcEvE7YCUCVZ1dOT.j3dWuahCwsJGkC', '', NULL, NULL, NULL, 2, 1);

INSERT INTO `usuario_carreras` (`usuario_id`, `carrera_id`) VALUES 
(9, 1),
(10, 2),
(10, 3),
(11, 1),
(11, 4);


-- Restore original session settings
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
SET SQL_MODE=@OLD_SQL_MODE;
SET SQL_NOTES=@OLD_SQL_NOTES;
