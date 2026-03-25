/**
 * apply-amazon-images.mjs
 * Aplica el mapping de URLs de Amazon a los archivos MDX.
 * Uso: node scripts/apply-amazon-images.mjs
 */

import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";

// Mapping: path_local -> URL Amazon CDN
// Añadir resultados aquí según van llegando los agentes
const MAPPING = {
  // ahorro-energetico (24/24) ✅
  "/images/ahorro-energetico/aislar-puerta-entrada-burletes/producto-1.jpg":
    "https://m.media-amazon.com/images/I/81VyyY92vuL._AC_SL500_.jpg",
  "/images/ahorro-energetico/aislar-puerta-entrada-burletes/producto-2.jpg":
    "https://m.media-amazon.com/images/I/71Cn9QdLyQL._AC_SL500_.jpg",
  "/images/ahorro-energetico/aislar-puerta-entrada-burletes/producto-3.jpg":
    "https://m.media-amazon.com/images/I/41DhPFhKzXL._AC_SL500_.jpg",
  "/images/ahorro-energetico/cambiar-bombillas-led-ahorro-real/producto-1.jpg":
    "https://m.media-amazon.com/images/I/81SBeYevuxL._AC_SL500_.jpg",
  "/images/ahorro-energetico/cambiar-bombillas-led-ahorro-real/producto-2.jpg":
    "https://m.media-amazon.com/images/I/61Ac7U6uKKL._AC_SL500_.jpg",
  "/images/ahorro-energetico/cambiar-bombillas-led-ahorro-real/producto-3.jpg":
    "https://m.media-amazon.com/images/I/711pR0qpNHL._AC_SL500_.jpg",
  "/images/ahorro-energetico/como-aislar-caja-persiana-frio/producto-1.jpg":
    "https://m.media-amazon.com/images/I/61FqAYZ-oeL._AC_SL500_.jpg",
  "/images/ahorro-energetico/como-aislar-caja-persiana-frio/producto-2.jpg":
    "https://m.media-amazon.com/images/I/81M4HtsbpLL._AC_SL500_.jpg",
  "/images/ahorro-energetico/como-aislar-caja-persiana-frio/producto-3.jpg":
    "https://m.media-amazon.com/images/I/81VyyY92vuL._AC_SL500_.jpg",
  "/images/ahorro-energetico/como-aislar-techo-buhardilla-barato/producto-1.jpg":
    "https://m.media-amazon.com/images/I/51u4CpvPG5L._AC_SL500_.jpg",
  "/images/ahorro-energetico/como-aislar-techo-buhardilla-barato/producto-2.jpg":
    "https://m.media-amazon.com/images/I/51skvg4EiDL._AC_SL500_.jpg",
  "/images/ahorro-energetico/como-aislar-techo-buhardilla-barato/producto-3.jpg":
    "https://m.media-amazon.com/images/I/61Z7FDDtAhL._AC_SL500_.jpg",
  "/images/ahorro-energetico/como-aislar-techo-buhardilla-barato/producto-4.jpg":
    "https://m.media-amazon.com/images/I/61mfQBAEMbL._AC_SL500_.jpg",
  "/images/ahorro-energetico/como-poner-paneles-reflectantes-radiadores/producto-1.jpg":
    "https://m.media-amazon.com/images/I/71jVjKF244L._AC_SL500_.jpg",
  "/images/ahorro-energetico/como-poner-paneles-reflectantes-radiadores/producto-2.jpg":
    "https://m.media-amazon.com/images/I/61X4izpuJoL._AC_SL500_.jpg",
  "/images/ahorro-energetico/como-poner-paneles-reflectantes-radiadores/producto-3.jpg":
    "https://m.media-amazon.com/images/I/714q+JKcwKL._AC_SL500_.jpg",
  "/images/ahorro-energetico/como-programar-termostato-ahorrar-calefaccion/producto-1.jpg":
    "https://m.media-amazon.com/images/I/31hcctMkBpL._AC_SL500_.jpg",
  "/images/ahorro-energetico/como-programar-termostato-ahorrar-calefaccion/producto-2.jpg":
    "https://m.media-amazon.com/images/I/51py6jUlcGL._AC_SL500_.jpg",
  "/images/ahorro-energetico/purgar-radiadores-calefaccion-mas-eficiente/producto-1.jpg":
    "https://m.media-amazon.com/images/I/61HDSRouhiL._AC_SL500_.jpg",
  "/images/ahorro-energetico/purgar-radiadores-calefaccion-mas-eficiente/producto-2.jpg":
    "https://m.media-amazon.com/images/I/61QES2bVksL._AC_SL500_.jpg",
  "/images/ahorro-energetico/purgar-radiadores-calefaccion-mas-eficiente/producto-3.jpg":
    "https://m.media-amazon.com/images/I/711mxCQx1gL._AC_SL500_.jpg",
  "/images/ahorro-energetico/valvulas-termostaticas-radiadores-ahorro/producto-1.jpg":
    "https://m.media-amazon.com/images/I/51zxmI7rdwL._AC_SL500_.jpg",
  "/images/ahorro-energetico/valvulas-termostaticas-radiadores-ahorro/producto-2.jpg":
    "https://m.media-amazon.com/images/I/41Ja-QC-pCS._AC_SL500_.jpg",
  "/images/ahorro-energetico/valvulas-termostaticas-radiadores-ahorro/producto-3.jpg":
    "https://m.media-amazon.com/images/I/41nfYDTyGxL._AC_SL500_.jpg",
  // reparaciones (24/24) ✅
  "/images/reparaciones/arreglar-bisagra-puerta-cocina-rota/producto-1.jpg":
    "https://m.media-amazon.com/images/I/61KCyA4MAFL._AC_SL500_.jpg",
  "/images/reparaciones/arreglar-bisagra-puerta-cocina-rota/producto-2.jpg":
    "https://m.media-amazon.com/images/I/61ag4zFYp+L._AC_SL500_.jpg",
  "/images/reparaciones/arreglar-bisagra-puerta-cocina-rota/producto-3.jpg":
    "https://m.media-amazon.com/images/I/61w1vlSGT4L._AC_SL500_.jpg",
  "/images/reparaciones/como-arreglar-cajon-descolgado-guia/producto-1.jpg":
    "https://m.media-amazon.com/images/I/51oB2-FtoYL._AC_SL500_.jpg",
  "/images/reparaciones/como-arreglar-cajon-descolgado-guia/producto-2.jpg":
    "https://m.media-amazon.com/images/I/518MQVBSokL._AC_SL500_.jpg",
  "/images/reparaciones/como-arreglar-cajon-descolgado-guia/producto-3.jpg":
    "https://m.media-amazon.com/images/I/61olGA1WwML._AC_SL500_.jpg",
  "/images/reparaciones/como-arreglar-persiana-enrollable/herramienta-1.jpg":
    "https://m.media-amazon.com/images/I/61IHwF+Zn6L._AC_SL500_.jpg",
  "/images/reparaciones/como-arreglar-persiana-enrollable/herramienta-2.jpg":
    "https://m.media-amazon.com/images/I/81xTZqm-P3L._AC_SL500_.jpg",
  "/images/reparaciones/como-cambiar-resistencia-termo-electrico/producto-1.jpg":
    "https://m.media-amazon.com/images/I/41H+t16GtRL._AC_SL500_.jpg",
  "/images/reparaciones/como-cambiar-resistencia-termo-electrico/producto-2.jpg":
    "https://m.media-amazon.com/images/I/51fbo0uhBoL._AC_SL500_.jpg",
  "/images/reparaciones/como-cambiar-resistencia-termo-electrico/producto-3.jpg":
    "https://m.media-amazon.com/images/I/61lfmR0njqL._AC_SL500_.jpg",
  "/images/reparaciones/como-limpiar-filtro-lavadora-no-desagua/producto-1.jpg":
    "https://m.media-amazon.com/images/I/51auhdV0g1L._AC_SL500_.jpg",
  "/images/reparaciones/como-limpiar-filtro-lavadora-no-desagua/producto-2.jpg":
    "https://m.media-amazon.com/images/I/61RTDXwCE0L._AC_SL500_.jpg",
  "/images/reparaciones/como-reparar-radiador-no-calienta/producto-2.jpg":
    "https://m.media-amazon.com/images/I/31bIoVX9YeL._AC_SL500_.jpg",
  "/images/reparaciones/como-reparar-radiador-no-calienta/producto-3.jpg":
    "https://m.media-amazon.com/images/I/61tpbqXddzL._AC_SL500_.jpg",
  "/images/reparaciones/fontanero-vs-diy-cuando-llamar/producto-1.jpg":
    "https://m.media-amazon.com/images/I/616RwLeRYBL._AC_SL500_.jpg",
  "/images/reparaciones/fontanero-vs-diy-cuando-llamar/producto-2.jpg":
    "https://m.media-amazon.com/images/I/61TTRqRPOLL._AC_SL500_.jpg",
  "/images/reparaciones/reparaciones-caseras-sin-experiencia/producto-2.jpg":
    "https://m.media-amazon.com/images/I/71xjPsypp3L._AC_SL500_.jpg",
  "/images/reparaciones/reparaciones-caseras-sin-experiencia/producto-3.jpg":
    "https://m.media-amazon.com/images/I/51PU5rtCSoL._AC_SL500_.jpg",
  "/images/reparaciones/reparar-juntas-silicona-banera-ennegrecida/producto-1.jpg":
    "https://m.media-amazon.com/images/I/81N-LLHa0WL._AC_SL500_.jpg",
  "/images/reparaciones/reparar-juntas-silicona-banera-ennegrecida/producto-2.jpg":
    "https://m.media-amazon.com/images/I/51dcbjOxlqL._AC_SL500_.jpg",
  "/images/reparaciones/reparar-juntas-silicona-banera-ennegrecida/producto-3.jpg":
    "https://m.media-amazon.com/images/I/61RvJECC7zL._AC_SL500_.jpg",
  "/images/reparaciones/reparar-juntas-silicona-banera-ennegrecida/producto-4.jpg":
    "https://m.media-amazon.com/images/I/61A3Y81EXyS._AC_SL500_.jpg",
  "/images/reparaciones/reparar-juntas-silicona-banera-ennegrecida/producto-5.jpg":
    "https://m.media-amazon.com/images/I/71g3PjG9mOL._AC_SL500_.jpg",
  // herramientas-basicas-para-el-hogar (14/14) ✅
  "/images/herramientas/herramientas-basicas-para-el-hogar/herramienta-1.jpg":
    "https://m.media-amazon.com/images/I/9106YKrt9SL._AC_SL500_.jpg",
  "/images/herramientas/herramientas-basicas-para-el-hogar/herramienta-2.jpg":
    "https://m.media-amazon.com/images/I/81o3dyO-UdL._AC_SL500_.jpg",
  "/images/herramientas/herramientas-basicas-para-el-hogar/herramienta-3.jpg":
    "https://m.media-amazon.com/images/I/61WfCp-Qu3L._AC_SL500_.jpg",
  "/images/herramientas/herramientas-basicas-para-el-hogar/herramienta-4.jpg":
    "https://m.media-amazon.com/images/I/81k7xG0XjsL._AC_SL500_.jpg",
  "/images/herramientas/herramientas-basicas-para-el-hogar/herramienta-5.jpg":
    "https://m.media-amazon.com/images/I/51CQx0NPyZL._AC_SL500_.jpg",
  "/images/herramientas/herramientas-basicas-para-el-hogar/herramienta-6.jpg":
    "https://m.media-amazon.com/images/I/71asqI1azKL._AC_SL500_.jpg",
  "/images/herramientas/herramientas-basicas-para-el-hogar/herramienta-7.jpg":
    "https://m.media-amazon.com/images/I/61yShXJHWXL._AC_SL500_.jpg",
  "/images/herramientas/herramientas-basicas-para-el-hogar/herramienta-8.jpg":
    "https://m.media-amazon.com/images/I/71dzyBIANCL._AC_SL500_.jpg",
  "/images/herramientas/herramientas-basicas-para-el-hogar/herramienta-9.jpg":
    "https://m.media-amazon.com/images/I/81OI9mtwO2L._AC_SL500_.jpg",
  "/images/herramientas/herramientas-basicas-para-el-hogar/herramienta-10.jpg":
    "https://m.media-amazon.com/images/I/41NJRnVC8BL._AC_SL500_.jpg",
  "/images/herramientas/herramientas-basicas-para-el-hogar/herramienta-11.jpg":
    "https://m.media-amazon.com/images/I/61OM+DE+vmL._AC_SL500_.jpg",
  "/images/herramientas/herramientas-basicas-para-el-hogar/herramienta-12.jpg":
    "https://m.media-amazon.com/images/I/61gBvY-AxLL._AC_SL500_.jpg",
  "/images/herramientas/herramientas-basicas-para-el-hogar/herramienta-13.jpg":
    "https://m.media-amazon.com/images/I/41i8AZYG2-L._AC_SL500_.jpg",
  "/images/herramientas/herramientas-basicas-para-el-hogar/herramienta-14.jpg":
    "https://m.media-amazon.com/images/I/719SWcJh-rL._AC_SL500_.jpg",
  // mejores-taladros-para-casa-2026 (5/5) ✅
  "/images/herramientas/mejores-taladros-para-casa-2026/herramienta-1.jpg":
    "https://m.media-amazon.com/images/I/61tnEX2zFQL._AC_SL500_.jpg",
  "/images/herramientas/mejores-taladros-para-casa-2026/herramienta-2.jpg":
    "https://m.media-amazon.com/images/I/51P6Gw5RLSL._AC_SL500_.jpg",
  "/images/herramientas/mejores-taladros-para-casa-2026/herramienta-3.jpg":
    "https://m.media-amazon.com/images/I/51LE8YgJKXL._AC_SL500_.jpg",
  "/images/herramientas/mejores-taladros-para-casa-2026/herramienta-4.jpg":
    "https://m.media-amazon.com/images/I/31503CF1p-L._AC_SL500_.jpg",
  "/images/herramientas/mejores-taladros-para-casa-2026/herramienta-5.jpg":
    "https://m.media-amazon.com/images/I/71s8+g6FbIL._AC_SL500_.jpg",
  // taladro-percutor-vs-atornillador (4/4) ✅
  "/images/herramientas/taladro-percutor-vs-atornillador/herramienta-1.jpg":
    "https://m.media-amazon.com/images/I/71kfwJyfwHL._AC_SL500_.jpg",
  "/images/herramientas/taladro-percutor-vs-atornillador/herramienta-2.jpg":
    "https://m.media-amazon.com/images/I/61tnEX2zFQL._AC_SL500_.jpg",
  "/images/herramientas/taladro-percutor-vs-atornillador/herramienta-brushless.jpg":
    "https://m.media-amazon.com/images/I/71665yoxvvL._AC_SL500_.jpg",
  "/images/herramientas/taladro-percutor-vs-atornillador/herramienta-3.jpg":
    "https://m.media-amazon.com/images/I/61K4M1kWnkL._AC_SL500_.jpg",
  // herramientas-esenciales-inquilinos (6/6) ✅
  "/images/herramientas/herramientas-esenciales-inquilinos/herramienta-1.jpg":
    "https://m.media-amazon.com/images/I/71kfwJyfwHL._AC_SL500_.jpg",
  "/images/herramientas/herramientas-esenciales-inquilinos/herramienta-2.jpg":
    "https://m.media-amazon.com/images/I/61L0IhXCZHL._AC_SL500_.jpg",
  "/images/herramientas/herramientas-esenciales-inquilinos/herramienta-3.jpg":
    "https://m.media-amazon.com/images/I/41uBgEeqGvL._AC_SL500_.jpg",
  "/images/herramientas/herramientas-esenciales-inquilinos/herramienta-4.jpg":
    "https://m.media-amazon.com/images/I/81k7xG0XjsL._AC_SL500_.jpg",
  "/images/herramientas/herramientas-esenciales-inquilinos/herramienta-5.jpg":
    "https://m.media-amazon.com/images/I/61WriSIH1mL._AC_SL500_.jpg",
  "/images/herramientas/herramientas-esenciales-inquilinos/herramienta-6.jpg":
    "https://m.media-amazon.com/images/I/71dzyBIANCL._AC_SL500_.jpg",
  // mejores-cajas-herramientas (5/5) ✅
  "/images/herramientas/mejores-cajas-herramientas/herramienta-1.jpg":
    "https://m.media-amazon.com/images/I/61JV15ghF5L._AC_SL500_.jpg",
  "/images/herramientas/mejores-cajas-herramientas/herramienta-2.jpg":
    "https://m.media-amazon.com/images/I/610m27R-STL._AC_SL500_.jpg",
  "/images/herramientas/mejores-cajas-herramientas/herramienta-3.jpg":
    "https://m.media-amazon.com/images/I/61x6RUoth6L._AC_SL500_.jpg",
  "/images/herramientas/mejores-cajas-herramientas/herramienta-4.jpg":
    "https://m.media-amazon.com/images/I/81rPEP7D3wL._AC_SL500_.jpg",
  "/images/herramientas/mejores-cajas-herramientas/herramienta-5.jpg":
    "https://m.media-amazon.com/images/I/61oto6XCrAL._AC_SL500_.jpg",
  // nivel-laser-barato-merece-la-pena (2/2) ✅
  "/images/herramientas/nivel-laser-barato-merece-la-pena/producto-1.jpg":
    "https://m.media-amazon.com/images/I/712XXqMHLYL._AC_SL500_.jpg",
  "/images/herramientas/nivel-laser-barato-merece-la-pena/producto-2.jpg":
    "https://m.media-amazon.com/images/I/71qiwiu9rzL._AC_SL500_.jpg",
  // sierra-caladora-vs-circular-cual-comprar (2/2) ✅
  "/images/herramientas/sierra-caladora-vs-circular-cual-comprar/producto-1.jpg":
    "https://m.media-amazon.com/images/I/717FEtj0TnL._AC_SL500_.jpg",
  "/images/herramientas/sierra-caladora-vs-circular-cual-comprar/producto-2.jpg":
    "https://m.media-amazon.com/images/I/612fuHb-GTL._AC_SL500_.jpg",
  // como-afilar-brocas-paso-a-paso (3/3) ✅
  "/images/herramientas/como-afilar-brocas-paso-a-paso/producto-1.jpg":
    "https://m.media-amazon.com/images/I/61CQbLXQfnL._AC_SL500_.jpg",
  "/images/herramientas/como-afilar-brocas-paso-a-paso/producto-2.jpg":
    "https://m.media-amazon.com/images/I/41nxUxbIh-L._AC_SL500_.jpg",
  "/images/herramientas/como-afilar-brocas-paso-a-paso/producto-3.jpg":
    "https://m.media-amazon.com/images/I/81qmkp5JSnL._AC_SL500_.jpg",
  // como-mantener-herramientas-buen-estado (3/3) ✅
  "/images/herramientas/como-mantener-herramientas-buen-estado/herramienta-1.jpg":
    "https://m.media-amazon.com/images/I/81yAW0DgLML._AC_SL500_.jpg",
  "/images/herramientas/como-mantener-herramientas-buen-estado/herramienta-2.jpg":
    "https://m.media-amazon.com/images/I/818dFYZi1GL._AC_SL500_.jpg",
  "/images/herramientas/como-mantener-herramientas-buen-estado/herramienta-3.jpg":
    "https://m.media-amazon.com/images/I/81I94+K0tYL._AC_SL500_.jpg",
  // reformas (17/17) ✅
  "/images/reformas/alisar-pared-gotele-facil/producto-1.jpg":
    "https://m.media-amazon.com/images/I/71S+K8XS6HL._AC_SL500_.jpg",
  "/images/reformas/alisar-pared-gotele-facil/producto-2.jpg":
    "https://m.media-amazon.com/images/I/61Ntl16+xJL._AC_SL500_.jpg",
  "/images/reformas/alisar-pared-gotele-facil/producto-3.jpg":
    "https://m.media-amazon.com/images/I/71Cog-laMSL._AC_SL500_.jpg",
  "/images/reformas/como-instalar-friso-madera-pared/producto-1.jpg":
    "https://m.media-amazon.com/images/I/71tE37PkLfL._AC_SL500_.jpg",
  "/images/reformas/como-instalar-friso-madera-pared/producto-2.jpg":
    "https://m.media-amazon.com/images/I/71xb9mVm8mL._AC_SL500_.jpg",
  "/images/reformas/como-instalar-friso-madera-pared/producto-3.jpg":
    "https://m.media-amazon.com/images/I/613n2VODxHL._AC_SL500_.jpg",
  "/images/reformas/como-instalar-suelo-vinilico/herramienta-1.jpg":
    "https://m.media-amazon.com/images/I/71S4ce-Z2DL._AC_SL500_.jpg",
  "/images/reformas/como-instalar-suelo-vinilico/herramienta-2.jpg":
    "https://m.media-amazon.com/images/I/61zseXFL+hL._AC_SL500_.jpg",
  "/images/reformas/como-pintar-habitacion-paso-a-paso/herramienta-1.jpg":
    "https://m.media-amazon.com/images/I/71W7569G-EL._AC_SL500_.jpg",
  "/images/reformas/como-pintar-habitacion-paso-a-paso/herramienta-2.jpg":
    "https://m.media-amazon.com/images/I/513hzJK+BiL._AC_SL500_.jpg",
  "/images/reformas/como-pintar-habitacion-paso-a-paso/herramienta-3.jpg":
    "https://m.media-amazon.com/images/I/81olHWYUw3L._AC_SL500_.jpg",
  "/images/reformas/como-purgar-caldera-gas-presion/producto-1.jpg":
    "https://m.media-amazon.com/images/I/71HH-4xQwUL._AC_SL500_.jpg",
  "/images/reformas/como-purgar-caldera-gas-presion/producto-2.jpg":
    "https://m.media-amazon.com/images/I/81oeolIkOML._AC_SL500_.jpg",
  "/images/reformas/como-purgar-caldera-gas-presion/producto-3.jpg":
    "https://m.media-amazon.com/images/I/61kXj7mEBkL._AC_SL500_.jpg",
  "/images/reformas/pintar-azulejos-bano-cocina-duradero/producto-1.jpg":
    "https://m.media-amazon.com/images/I/91x5WdPhHTL._AC_SL500_.jpg",
  "/images/reformas/pintar-azulejos-bano-cocina-duradero/producto-2.jpg":
    "https://m.media-amazon.com/images/I/51qH+rlZTOL._AC_SL500_.jpg",
  "/images/reformas/pintar-azulejos-bano-cocina-duradero/producto-3.jpg":
    "https://m.media-amazon.com/images/I/51qdJJP39qL._AC_SL500_.jpg",
  // jardin (14/14) ✅
  "/images/jardin/como-cortar-cesped-correctamente/producto-1.jpg":
    "https://m.media-amazon.com/images/I/51dfGGhfwFL._AC_SL500_.jpg",
  "/images/jardin/como-cortar-cesped-correctamente/producto-2.jpg":
    "https://m.media-amazon.com/images/I/81Y+ervfaHL._AC_SL500_.jpg",
  "/images/jardin/como-hacer-compost-casero-sin-olores/producto-1.jpg":
    "https://m.media-amazon.com/images/I/5168kKx+4OL._AC_SL500_.jpg",
  "/images/jardin/como-hacer-compost-casero-sin-olores/producto-2.jpg":
    "https://m.media-amazon.com/images/I/81x3QJL04BL._AC_SL500_.jpg",
  "/images/jardin/como-hacer-compost-casero-sin-olores/producto-3.jpg":
    "https://m.media-amazon.com/images/I/7187BwDTCtL._AC_SL500_.jpg",
  "/images/jardin/como-montar-jardinera-exterior/herramienta-1.jpg":
    "https://m.media-amazon.com/images/I/41S0U1yIbYL._AC_SL500_.jpg",
  "/images/jardin/como-montar-jardinera-exterior/herramienta-2.jpg":
    "https://m.media-amazon.com/images/I/21RvWAI0-FL._AC_SL500_.jpg",
  "/images/jardin/como-montar-riego-por-goteo/producto-1.jpg":
    "https://m.media-amazon.com/images/I/81itmsq2otL._AC_SL500_.jpg",
  "/images/jardin/mejores-plantas-exterior-resistentes-frio/producto-1.jpg":
    "https://m.media-amazon.com/images/I/519yIBTYzWL._AC_SL500_.jpg",
  "/images/jardin/mejores-plantas-exterior-resistentes-frio/producto-2.jpg":
    "https://m.media-amazon.com/images/I/71jfWcVmJ3L._AC_SL500_.jpg",
  "/images/jardin/mejores-plantas-exterior-resistentes-frio/producto-3.jpg":
    "https://m.media-amazon.com/images/I/71hicInx3vL._AC_SL500_.jpg",
  "/images/jardin/riego-automatico-casero/herramienta-1.jpg":
    "https://m.media-amazon.com/images/I/71Em6+dN+BL._AC_SL500_.jpg",
  "/images/jardin/riego-automatico-casero/herramienta-2.jpg":
    "https://m.media-amazon.com/images/I/51hafUJWysL._AC_SL500_.jpg",
  "/images/jardin/riego-automatico-casero/herramienta-3.jpg":
    "https://m.media-amazon.com/images/I/51FWM-RrerL._AC_SL500_.jpg",
  // como-arreglar-persiana-enrollable (1/1 pendiente) ✅
  "/images/reparaciones/como-arreglar-persiana-enrollable/herramienta-3.jpg":
    "https://m.media-amazon.com/images/I/51ywL+2NThL._AC_SL500_.jpg",
  // como-sellar-ventanas-corrientes (4/4) ✅
  "/images/ahorro-energetico/como-sellar-ventanas-corrientes/herramienta-1.jpg":
    "https://m.media-amazon.com/images/I/81lprdeDO8L._AC_SL500_.jpg",
  "/images/ahorro-energetico/como-sellar-ventanas-corrientes/herramienta-2.jpg":
    "https://m.media-amazon.com/images/I/61PXqAwO--L._AC_SL500_.jpg",
  "/images/ahorro-energetico/como-sellar-ventanas-corrientes/herramienta-3.jpg":
    "https://m.media-amazon.com/images/I/516UTAeIi3L._AC_SL500_.jpg",
  "/images/ahorro-energetico/como-sellar-ventanas-corrientes/herramienta-4.jpg":
    "https://m.media-amazon.com/images/I/6113u4gk2sL._AC_SL500_.jpg",
};

function getMdxFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...getMdxFiles(full));
    else if (entry.name.endsWith(".mdx")) files.push(full);
  }
  return files;
}

let totalReplaced = 0;
let filesModified = 0;

for (const file of getMdxFiles("content")) {
  let content = readFileSync(file, "utf8");
  let modified = false;

  for (const [localPath, amazonUrl] of Object.entries(MAPPING)) {
    const escaped = localPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`image="${escaped}"`, "g");
    const newContent = content.replace(regex, `image="${amazonUrl}"`);
    if (newContent !== content) {
      content = newContent;
      modified = true;
      totalReplaced++;
    }
  }

  if (modified) {
    writeFileSync(file, content, "utf8");
    console.log(`✅ ${file.replace("content/", "")}`);
    filesModified++;
  }
}

console.log(
  `\nTotal: ${totalReplaced} imágenes reemplazadas en ${filesModified} archivos`,
);
