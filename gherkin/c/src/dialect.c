#include "dialect.h"

static const wchar_t* const af_and_KEYWORDS[] = { L"* ", L"En " };
static const Keywords af_and_keywords = { 2, af_and_KEYWORDS };

static const wchar_t* const af_background_KEYWORDS[] = { L"Agtergrond" };
static const Keywords af_background_keywords = { 1, af_background_KEYWORDS };

static const wchar_t* const af_but_KEYWORDS[] = { L"* ", L"Maar " };
static const Keywords af_but_keywords = { 2, af_but_KEYWORDS };

static const wchar_t* const af_examples_KEYWORDS[] = { L"Voorbeelde" };
static const Keywords af_examples_keywords = { 1, af_examples_KEYWORDS };

static const wchar_t* const af_feature_KEYWORDS[] = { L"Funksie", L"Besigheid Behoefte", L"Vermoë" };
static const Keywords af_feature_keywords = { 3, af_feature_KEYWORDS };

static const wchar_t* const af_given_KEYWORDS[] = { L"* ", L"Gegewe " };
static const Keywords af_given_keywords = { 2, af_given_KEYWORDS };

static const wchar_t* const af_scenario_KEYWORDS[] = { L"Situasie" };
static const Keywords af_scenario_keywords = { 1, af_scenario_KEYWORDS };

static const wchar_t* const af_scenarioOutline_KEYWORDS[] = { L"Situasie Uiteensetting" };
static const Keywords af_scenarioOutline_keywords = { 1, af_scenarioOutline_KEYWORDS };

static const wchar_t* const af_then_KEYWORDS[] = { L"* ", L"Dan " };
static const Keywords af_then_keywords = { 2, af_then_KEYWORDS };

static const wchar_t* const af_when_KEYWORDS[] = { L"* ", L"Wanneer " };
static const Keywords af_when_keywords = { 2, af_when_KEYWORDS };

static const Dialect af_dialect = {
        L"af",
        &af_and_keywords,
        &af_background_keywords,
        &af_but_keywords,
        &af_examples_keywords,
        &af_feature_keywords,
        &af_given_keywords,
        &af_scenario_keywords,
        &af_scenarioOutline_keywords,
        &af_then_keywords,
        &af_when_keywords };

static const wchar_t* const am_and_KEYWORDS[] = { L"* ", L"Եվ " };
static const Keywords am_and_keywords = { 2, am_and_KEYWORDS };

static const wchar_t* const am_background_KEYWORDS[] = { L"Կոնտեքստ" };
static const Keywords am_background_keywords = { 1, am_background_KEYWORDS };

static const wchar_t* const am_but_KEYWORDS[] = { L"* ", L"Բայց " };
static const Keywords am_but_keywords = { 2, am_but_KEYWORDS };

static const wchar_t* const am_examples_KEYWORDS[] = { L"Օրինակներ" };
static const Keywords am_examples_keywords = { 1, am_examples_KEYWORDS };

static const wchar_t* const am_feature_KEYWORDS[] = { L"Ֆունկցիոնալություն", L"Հատկություն" };
static const Keywords am_feature_keywords = { 2, am_feature_KEYWORDS };

static const wchar_t* const am_given_KEYWORDS[] = { L"* ", L"Դիցուք " };
static const Keywords am_given_keywords = { 2, am_given_KEYWORDS };

static const wchar_t* const am_scenario_KEYWORDS[] = { L"Սցենար" };
static const Keywords am_scenario_keywords = { 1, am_scenario_KEYWORDS };

static const wchar_t* const am_scenarioOutline_KEYWORDS[] = { L"Սցենարի կառուցվացքը" };
static const Keywords am_scenarioOutline_keywords = { 1, am_scenarioOutline_KEYWORDS };

static const wchar_t* const am_then_KEYWORDS[] = { L"* ", L"Ապա " };
static const Keywords am_then_keywords = { 2, am_then_KEYWORDS };

static const wchar_t* const am_when_KEYWORDS[] = { L"* ", L"Եթե ", L"Երբ " };
static const Keywords am_when_keywords = { 3, am_when_KEYWORDS };

static const Dialect am_dialect = {
        L"am",
        &am_and_keywords,
        &am_background_keywords,
        &am_but_keywords,
        &am_examples_keywords,
        &am_feature_keywords,
        &am_given_keywords,
        &am_scenario_keywords,
        &am_scenarioOutline_keywords,
        &am_then_keywords,
        &am_when_keywords };

static const wchar_t* const ar_and_KEYWORDS[] = { L"* ", L"و " };
static const Keywords ar_and_keywords = { 2, ar_and_KEYWORDS };

static const wchar_t* const ar_background_KEYWORDS[] = { L"الخلفية" };
static const Keywords ar_background_keywords = { 1, ar_background_KEYWORDS };

static const wchar_t* const ar_but_KEYWORDS[] = { L"* ", L"لكن " };
static const Keywords ar_but_keywords = { 2, ar_but_KEYWORDS };

static const wchar_t* const ar_examples_KEYWORDS[] = { L"امثلة" };
static const Keywords ar_examples_keywords = { 1, ar_examples_KEYWORDS };

static const wchar_t* const ar_feature_KEYWORDS[] = { L"خاصية" };
static const Keywords ar_feature_keywords = { 1, ar_feature_KEYWORDS };

static const wchar_t* const ar_given_KEYWORDS[] = { L"* ", L"بفرض " };
static const Keywords ar_given_keywords = { 2, ar_given_KEYWORDS };

static const wchar_t* const ar_scenario_KEYWORDS[] = { L"سيناريو" };
static const Keywords ar_scenario_keywords = { 1, ar_scenario_KEYWORDS };

static const wchar_t* const ar_scenarioOutline_KEYWORDS[] = { L"سيناريو مخطط" };
static const Keywords ar_scenarioOutline_keywords = { 1, ar_scenarioOutline_KEYWORDS };

static const wchar_t* const ar_then_KEYWORDS[] = { L"* ", L"اذاً ", L"ثم " };
static const Keywords ar_then_keywords = { 3, ar_then_KEYWORDS };

static const wchar_t* const ar_when_KEYWORDS[] = { L"* ", L"متى ", L"عندما " };
static const Keywords ar_when_keywords = { 3, ar_when_KEYWORDS };

static const Dialect ar_dialect = {
        L"ar",
        &ar_and_keywords,
        &ar_background_keywords,
        &ar_but_keywords,
        &ar_examples_keywords,
        &ar_feature_keywords,
        &ar_given_keywords,
        &ar_scenario_keywords,
        &ar_scenarioOutline_keywords,
        &ar_then_keywords,
        &ar_when_keywords };

static const wchar_t* const ast_and_KEYWORDS[] = { L"* ", L"Y ", L"Ya " };
static const Keywords ast_and_keywords = { 3, ast_and_KEYWORDS };

static const wchar_t* const ast_background_KEYWORDS[] = { L"Antecedentes" };
static const Keywords ast_background_keywords = { 1, ast_background_KEYWORDS };

static const wchar_t* const ast_but_KEYWORDS[] = { L"* ", L"Peru " };
static const Keywords ast_but_keywords = { 2, ast_but_KEYWORDS };

static const wchar_t* const ast_examples_KEYWORDS[] = { L"Exemplos" };
static const Keywords ast_examples_keywords = { 1, ast_examples_KEYWORDS };

static const wchar_t* const ast_feature_KEYWORDS[] = { L"Carauterística" };
static const Keywords ast_feature_keywords = { 1, ast_feature_KEYWORDS };

static const wchar_t* const ast_given_KEYWORDS[] = { L"* ", L"Dáu ", L"Dada ", L"Daos ", L"Daes " };
static const Keywords ast_given_keywords = { 5, ast_given_KEYWORDS };

static const wchar_t* const ast_scenario_KEYWORDS[] = { L"Casu" };
static const Keywords ast_scenario_keywords = { 1, ast_scenario_KEYWORDS };

static const wchar_t* const ast_scenarioOutline_KEYWORDS[] = { L"Esbozu del casu" };
static const Keywords ast_scenarioOutline_keywords = { 1, ast_scenarioOutline_KEYWORDS };

static const wchar_t* const ast_then_KEYWORDS[] = { L"* ", L"Entós " };
static const Keywords ast_then_keywords = { 2, ast_then_KEYWORDS };

static const wchar_t* const ast_when_KEYWORDS[] = { L"* ", L"Cuando " };
static const Keywords ast_when_keywords = { 2, ast_when_KEYWORDS };

static const Dialect ast_dialect = {
        L"ast",
        &ast_and_keywords,
        &ast_background_keywords,
        &ast_but_keywords,
        &ast_examples_keywords,
        &ast_feature_keywords,
        &ast_given_keywords,
        &ast_scenario_keywords,
        &ast_scenarioOutline_keywords,
        &ast_then_keywords,
        &ast_when_keywords };

static const wchar_t* const az_and_KEYWORDS[] = { L"* ", L"Və ", L"Həm " };
static const Keywords az_and_keywords = { 3, az_and_KEYWORDS };

static const wchar_t* const az_background_KEYWORDS[] = { L"Keçmiş", L"Kontekst" };
static const Keywords az_background_keywords = { 2, az_background_KEYWORDS };

static const wchar_t* const az_but_KEYWORDS[] = { L"* ", L"Amma ", L"Ancaq " };
static const Keywords az_but_keywords = { 3, az_but_KEYWORDS };

static const wchar_t* const az_examples_KEYWORDS[] = { L"Nümunələr" };
static const Keywords az_examples_keywords = { 1, az_examples_KEYWORDS };

static const wchar_t* const az_feature_KEYWORDS[] = { L"Özəllik" };
static const Keywords az_feature_keywords = { 1, az_feature_KEYWORDS };

static const wchar_t* const az_given_KEYWORDS[] = { L"* ", L"Tutaq ki ", L"Verilir " };
static const Keywords az_given_keywords = { 3, az_given_KEYWORDS };

static const wchar_t* const az_scenario_KEYWORDS[] = { L"Ssenari" };
static const Keywords az_scenario_keywords = { 1, az_scenario_KEYWORDS };

static const wchar_t* const az_scenarioOutline_KEYWORDS[] = { L"Ssenarinin strukturu" };
static const Keywords az_scenarioOutline_keywords = { 1, az_scenarioOutline_KEYWORDS };

static const wchar_t* const az_then_KEYWORDS[] = { L"* ", L"O halda " };
static const Keywords az_then_keywords = { 2, az_then_KEYWORDS };

static const wchar_t* const az_when_KEYWORDS[] = { L"* ", L"Əgər ", L"Nə vaxt ki " };
static const Keywords az_when_keywords = { 3, az_when_KEYWORDS };

static const Dialect az_dialect = {
        L"az",
        &az_and_keywords,
        &az_background_keywords,
        &az_but_keywords,
        &az_examples_keywords,
        &az_feature_keywords,
        &az_given_keywords,
        &az_scenario_keywords,
        &az_scenarioOutline_keywords,
        &az_then_keywords,
        &az_when_keywords };

static const wchar_t* const bg_and_KEYWORDS[] = { L"* ", L"И " };
static const Keywords bg_and_keywords = { 2, bg_and_KEYWORDS };

static const wchar_t* const bg_background_KEYWORDS[] = { L"Предистория" };
static const Keywords bg_background_keywords = { 1, bg_background_KEYWORDS };

static const wchar_t* const bg_but_KEYWORDS[] = { L"* ", L"Но " };
static const Keywords bg_but_keywords = { 2, bg_but_KEYWORDS };

static const wchar_t* const bg_examples_KEYWORDS[] = { L"Примери" };
static const Keywords bg_examples_keywords = { 1, bg_examples_KEYWORDS };

static const wchar_t* const bg_feature_KEYWORDS[] = { L"Функционалност" };
static const Keywords bg_feature_keywords = { 1, bg_feature_KEYWORDS };

static const wchar_t* const bg_given_KEYWORDS[] = { L"* ", L"Дадено " };
static const Keywords bg_given_keywords = { 2, bg_given_KEYWORDS };

static const wchar_t* const bg_scenario_KEYWORDS[] = { L"Сценарий" };
static const Keywords bg_scenario_keywords = { 1, bg_scenario_KEYWORDS };

static const wchar_t* const bg_scenarioOutline_KEYWORDS[] = { L"Рамка на сценарий" };
static const Keywords bg_scenarioOutline_keywords = { 1, bg_scenarioOutline_KEYWORDS };

static const wchar_t* const bg_then_KEYWORDS[] = { L"* ", L"То " };
static const Keywords bg_then_keywords = { 2, bg_then_KEYWORDS };

static const wchar_t* const bg_when_KEYWORDS[] = { L"* ", L"Когато " };
static const Keywords bg_when_keywords = { 2, bg_when_KEYWORDS };

static const Dialect bg_dialect = {
        L"bg",
        &bg_and_keywords,
        &bg_background_keywords,
        &bg_but_keywords,
        &bg_examples_keywords,
        &bg_feature_keywords,
        &bg_given_keywords,
        &bg_scenario_keywords,
        &bg_scenarioOutline_keywords,
        &bg_then_keywords,
        &bg_when_keywords };

static const wchar_t* const bm_and_KEYWORDS[] = { L"* ", L"Dan " };
static const Keywords bm_and_keywords = { 2, bm_and_KEYWORDS };

static const wchar_t* const bm_background_KEYWORDS[] = { L"Latar Belakang" };
static const Keywords bm_background_keywords = { 1, bm_background_KEYWORDS };

static const wchar_t* const bm_but_KEYWORDS[] = { L"* ", L"Tetapi ", L"Tapi " };
static const Keywords bm_but_keywords = { 3, bm_but_KEYWORDS };

static const wchar_t* const bm_examples_KEYWORDS[] = { L"Contoh" };
static const Keywords bm_examples_keywords = { 1, bm_examples_KEYWORDS };

static const wchar_t* const bm_feature_KEYWORDS[] = { L"Fungsi" };
static const Keywords bm_feature_keywords = { 1, bm_feature_KEYWORDS };

static const wchar_t* const bm_given_KEYWORDS[] = { L"* ", L"Diberi ", L"Bagi " };
static const Keywords bm_given_keywords = { 3, bm_given_KEYWORDS };

static const wchar_t* const bm_scenario_KEYWORDS[] = { L"Senario", L"Situasi", L"Keadaan" };
static const Keywords bm_scenario_keywords = { 3, bm_scenario_KEYWORDS };

static const wchar_t* const bm_scenarioOutline_KEYWORDS[] = { L"Kerangka Senario", L"Kerangka Situasi", L"Kerangka Keadaan", L"Garis Panduan Senario" };
static const Keywords bm_scenarioOutline_keywords = { 4, bm_scenarioOutline_KEYWORDS };

static const wchar_t* const bm_then_KEYWORDS[] = { L"* ", L"Maka ", L"Kemudian " };
static const Keywords bm_then_keywords = { 3, bm_then_KEYWORDS };

static const wchar_t* const bm_when_KEYWORDS[] = { L"* ", L"Apabila " };
static const Keywords bm_when_keywords = { 2, bm_when_KEYWORDS };

static const Dialect bm_dialect = {
        L"bm",
        &bm_and_keywords,
        &bm_background_keywords,
        &bm_but_keywords,
        &bm_examples_keywords,
        &bm_feature_keywords,
        &bm_given_keywords,
        &bm_scenario_keywords,
        &bm_scenarioOutline_keywords,
        &bm_then_keywords,
        &bm_when_keywords };

static const wchar_t* const bs_and_KEYWORDS[] = { L"* ", L"I ", L"A " };
static const Keywords bs_and_keywords = { 3, bs_and_KEYWORDS };

static const wchar_t* const bs_background_KEYWORDS[] = { L"Pozadina" };
static const Keywords bs_background_keywords = { 1, bs_background_KEYWORDS };

static const wchar_t* const bs_but_KEYWORDS[] = { L"* ", L"Ali " };
static const Keywords bs_but_keywords = { 2, bs_but_KEYWORDS };

static const wchar_t* const bs_examples_KEYWORDS[] = { L"Primjeri" };
static const Keywords bs_examples_keywords = { 1, bs_examples_KEYWORDS };

static const wchar_t* const bs_feature_KEYWORDS[] = { L"Karakteristika" };
static const Keywords bs_feature_keywords = { 1, bs_feature_KEYWORDS };

static const wchar_t* const bs_given_KEYWORDS[] = { L"* ", L"Dato " };
static const Keywords bs_given_keywords = { 2, bs_given_KEYWORDS };

static const wchar_t* const bs_scenario_KEYWORDS[] = { L"Scenariju", L"Scenario" };
static const Keywords bs_scenario_keywords = { 2, bs_scenario_KEYWORDS };

static const wchar_t* const bs_scenarioOutline_KEYWORDS[] = { L"Scenariju-obris", L"Scenario-outline" };
static const Keywords bs_scenarioOutline_keywords = { 2, bs_scenarioOutline_KEYWORDS };

static const wchar_t* const bs_then_KEYWORDS[] = { L"* ", L"Zatim " };
static const Keywords bs_then_keywords = { 2, bs_then_KEYWORDS };

static const wchar_t* const bs_when_KEYWORDS[] = { L"* ", L"Kada " };
static const Keywords bs_when_keywords = { 2, bs_when_KEYWORDS };

static const Dialect bs_dialect = {
        L"bs",
        &bs_and_keywords,
        &bs_background_keywords,
        &bs_but_keywords,
        &bs_examples_keywords,
        &bs_feature_keywords,
        &bs_given_keywords,
        &bs_scenario_keywords,
        &bs_scenarioOutline_keywords,
        &bs_then_keywords,
        &bs_when_keywords };

static const wchar_t* const ca_and_KEYWORDS[] = { L"* ", L"I " };
static const Keywords ca_and_keywords = { 2, ca_and_KEYWORDS };

static const wchar_t* const ca_background_KEYWORDS[] = { L"Rerefons", L"Antecedents" };
static const Keywords ca_background_keywords = { 2, ca_background_KEYWORDS };

static const wchar_t* const ca_but_KEYWORDS[] = { L"* ", L"Però " };
static const Keywords ca_but_keywords = { 2, ca_but_KEYWORDS };

static const wchar_t* const ca_examples_KEYWORDS[] = { L"Exemples" };
static const Keywords ca_examples_keywords = { 1, ca_examples_KEYWORDS };

static const wchar_t* const ca_feature_KEYWORDS[] = { L"Característica", L"Funcionalitat" };
static const Keywords ca_feature_keywords = { 2, ca_feature_KEYWORDS };

static const wchar_t* const ca_given_KEYWORDS[] = { L"* ", L"Donat ", L"Donada ", L"Atès ", L"Atesa " };
static const Keywords ca_given_keywords = { 5, ca_given_KEYWORDS };

static const wchar_t* const ca_scenario_KEYWORDS[] = { L"Escenari" };
static const Keywords ca_scenario_keywords = { 1, ca_scenario_KEYWORDS };

static const wchar_t* const ca_scenarioOutline_KEYWORDS[] = { L"Esquema de l'escenari" };
static const Keywords ca_scenarioOutline_keywords = { 1, ca_scenarioOutline_KEYWORDS };

static const wchar_t* const ca_then_KEYWORDS[] = { L"* ", L"Aleshores ", L"Cal " };
static const Keywords ca_then_keywords = { 3, ca_then_KEYWORDS };

static const wchar_t* const ca_when_KEYWORDS[] = { L"* ", L"Quan " };
static const Keywords ca_when_keywords = { 2, ca_when_KEYWORDS };

static const Dialect ca_dialect = {
        L"ca",
        &ca_and_keywords,
        &ca_background_keywords,
        &ca_but_keywords,
        &ca_examples_keywords,
        &ca_feature_keywords,
        &ca_given_keywords,
        &ca_scenario_keywords,
        &ca_scenarioOutline_keywords,
        &ca_then_keywords,
        &ca_when_keywords };

static const wchar_t* const cs_and_KEYWORDS[] = { L"* ", L"A také ", L"A " };
static const Keywords cs_and_keywords = { 3, cs_and_KEYWORDS };

static const wchar_t* const cs_background_KEYWORDS[] = { L"Pozadí", L"Kontext" };
static const Keywords cs_background_keywords = { 2, cs_background_KEYWORDS };

static const wchar_t* const cs_but_KEYWORDS[] = { L"* ", L"Ale " };
static const Keywords cs_but_keywords = { 2, cs_but_KEYWORDS };

static const wchar_t* const cs_examples_KEYWORDS[] = { L"Příklady" };
static const Keywords cs_examples_keywords = { 1, cs_examples_KEYWORDS };

static const wchar_t* const cs_feature_KEYWORDS[] = { L"Požadavek" };
static const Keywords cs_feature_keywords = { 1, cs_feature_KEYWORDS };

static const wchar_t* const cs_given_KEYWORDS[] = { L"* ", L"Pokud ", L"Za předpokladu " };
static const Keywords cs_given_keywords = { 3, cs_given_KEYWORDS };

static const wchar_t* const cs_scenario_KEYWORDS[] = { L"Scénář" };
static const Keywords cs_scenario_keywords = { 1, cs_scenario_KEYWORDS };

static const wchar_t* const cs_scenarioOutline_KEYWORDS[] = { L"Náčrt Scénáře", L"Osnova scénáře" };
static const Keywords cs_scenarioOutline_keywords = { 2, cs_scenarioOutline_KEYWORDS };

static const wchar_t* const cs_then_KEYWORDS[] = { L"* ", L"Pak " };
static const Keywords cs_then_keywords = { 2, cs_then_KEYWORDS };

static const wchar_t* const cs_when_KEYWORDS[] = { L"* ", L"Když " };
static const Keywords cs_when_keywords = { 2, cs_when_KEYWORDS };

static const Dialect cs_dialect = {
        L"cs",
        &cs_and_keywords,
        &cs_background_keywords,
        &cs_but_keywords,
        &cs_examples_keywords,
        &cs_feature_keywords,
        &cs_given_keywords,
        &cs_scenario_keywords,
        &cs_scenarioOutline_keywords,
        &cs_then_keywords,
        &cs_when_keywords };

static const wchar_t* const cy_GB_and_KEYWORDS[] = { L"* ", L"A " };
static const Keywords cy_GB_and_keywords = { 2, cy_GB_and_KEYWORDS };

static const wchar_t* const cy_GB_background_KEYWORDS[] = { L"Cefndir" };
static const Keywords cy_GB_background_keywords = { 1, cy_GB_background_KEYWORDS };

static const wchar_t* const cy_GB_but_KEYWORDS[] = { L"* ", L"Ond " };
static const Keywords cy_GB_but_keywords = { 2, cy_GB_but_KEYWORDS };

static const wchar_t* const cy_GB_examples_KEYWORDS[] = { L"Enghreifftiau" };
static const Keywords cy_GB_examples_keywords = { 1, cy_GB_examples_KEYWORDS };

static const wchar_t* const cy_GB_feature_KEYWORDS[] = { L"Arwedd" };
static const Keywords cy_GB_feature_keywords = { 1, cy_GB_feature_KEYWORDS };

static const wchar_t* const cy_GB_given_KEYWORDS[] = { L"* ", L"Anrhegedig a " };
static const Keywords cy_GB_given_keywords = { 2, cy_GB_given_KEYWORDS };

static const wchar_t* const cy_GB_scenario_KEYWORDS[] = { L"Scenario" };
static const Keywords cy_GB_scenario_keywords = { 1, cy_GB_scenario_KEYWORDS };

static const wchar_t* const cy_GB_scenarioOutline_KEYWORDS[] = { L"Scenario Amlinellol" };
static const Keywords cy_GB_scenarioOutline_keywords = { 1, cy_GB_scenarioOutline_KEYWORDS };

static const wchar_t* const cy_GB_then_KEYWORDS[] = { L"* ", L"Yna " };
static const Keywords cy_GB_then_keywords = { 2, cy_GB_then_KEYWORDS };

static const wchar_t* const cy_GB_when_KEYWORDS[] = { L"* ", L"Pryd " };
static const Keywords cy_GB_when_keywords = { 2, cy_GB_when_KEYWORDS };

static const Dialect cy_GB_dialect = {
        L"cy-GB",
        &cy_GB_and_keywords,
        &cy_GB_background_keywords,
        &cy_GB_but_keywords,
        &cy_GB_examples_keywords,
        &cy_GB_feature_keywords,
        &cy_GB_given_keywords,
        &cy_GB_scenario_keywords,
        &cy_GB_scenarioOutline_keywords,
        &cy_GB_then_keywords,
        &cy_GB_when_keywords };

static const wchar_t* const da_and_KEYWORDS[] = { L"* ", L"Og " };
static const Keywords da_and_keywords = { 2, da_and_KEYWORDS };

static const wchar_t* const da_background_KEYWORDS[] = { L"Baggrund" };
static const Keywords da_background_keywords = { 1, da_background_KEYWORDS };

static const wchar_t* const da_but_KEYWORDS[] = { L"* ", L"Men " };
static const Keywords da_but_keywords = { 2, da_but_KEYWORDS };

static const wchar_t* const da_examples_KEYWORDS[] = { L"Eksempler" };
static const Keywords da_examples_keywords = { 1, da_examples_KEYWORDS };

static const wchar_t* const da_feature_KEYWORDS[] = { L"Egenskab" };
static const Keywords da_feature_keywords = { 1, da_feature_KEYWORDS };

static const wchar_t* const da_given_KEYWORDS[] = { L"* ", L"Givet " };
static const Keywords da_given_keywords = { 2, da_given_KEYWORDS };

static const wchar_t* const da_scenario_KEYWORDS[] = { L"Scenarie" };
static const Keywords da_scenario_keywords = { 1, da_scenario_KEYWORDS };

static const wchar_t* const da_scenarioOutline_KEYWORDS[] = { L"Abstrakt Scenario" };
static const Keywords da_scenarioOutline_keywords = { 1, da_scenarioOutline_KEYWORDS };

static const wchar_t* const da_then_KEYWORDS[] = { L"* ", L"Så " };
static const Keywords da_then_keywords = { 2, da_then_KEYWORDS };

static const wchar_t* const da_when_KEYWORDS[] = { L"* ", L"Når " };
static const Keywords da_when_keywords = { 2, da_when_KEYWORDS };

static const Dialect da_dialect = {
        L"da",
        &da_and_keywords,
        &da_background_keywords,
        &da_but_keywords,
        &da_examples_keywords,
        &da_feature_keywords,
        &da_given_keywords,
        &da_scenario_keywords,
        &da_scenarioOutline_keywords,
        &da_then_keywords,
        &da_when_keywords };

static const wchar_t* const de_and_KEYWORDS[] = { L"* ", L"Und " };
static const Keywords de_and_keywords = { 2, de_and_KEYWORDS };

static const wchar_t* const de_background_KEYWORDS[] = { L"Grundlage" };
static const Keywords de_background_keywords = { 1, de_background_KEYWORDS };

static const wchar_t* const de_but_KEYWORDS[] = { L"* ", L"Aber " };
static const Keywords de_but_keywords = { 2, de_but_KEYWORDS };

static const wchar_t* const de_examples_KEYWORDS[] = { L"Beispiele" };
static const Keywords de_examples_keywords = { 1, de_examples_KEYWORDS };

static const wchar_t* const de_feature_KEYWORDS[] = { L"Funktionalität" };
static const Keywords de_feature_keywords = { 1, de_feature_KEYWORDS };

static const wchar_t* const de_given_KEYWORDS[] = { L"* ", L"Angenommen ", L"Gegeben sei ", L"Gegeben seien " };
static const Keywords de_given_keywords = { 4, de_given_KEYWORDS };

static const wchar_t* const de_scenario_KEYWORDS[] = { L"Szenario" };
static const Keywords de_scenario_keywords = { 1, de_scenario_KEYWORDS };

static const wchar_t* const de_scenarioOutline_KEYWORDS[] = { L"Szenariogrundriss" };
static const Keywords de_scenarioOutline_keywords = { 1, de_scenarioOutline_KEYWORDS };

static const wchar_t* const de_then_KEYWORDS[] = { L"* ", L"Dann " };
static const Keywords de_then_keywords = { 2, de_then_KEYWORDS };

static const wchar_t* const de_when_KEYWORDS[] = { L"* ", L"Wenn " };
static const Keywords de_when_keywords = { 2, de_when_KEYWORDS };

static const Dialect de_dialect = {
        L"de",
        &de_and_keywords,
        &de_background_keywords,
        &de_but_keywords,
        &de_examples_keywords,
        &de_feature_keywords,
        &de_given_keywords,
        &de_scenario_keywords,
        &de_scenarioOutline_keywords,
        &de_then_keywords,
        &de_when_keywords };

static const wchar_t* const el_and_KEYWORDS[] = { L"* ", L"Και " };
static const Keywords el_and_keywords = { 2, el_and_KEYWORDS };

static const wchar_t* const el_background_KEYWORDS[] = { L"Υπόβαθρο" };
static const Keywords el_background_keywords = { 1, el_background_KEYWORDS };

static const wchar_t* const el_but_KEYWORDS[] = { L"* ", L"Αλλά " };
static const Keywords el_but_keywords = { 2, el_but_KEYWORDS };

static const wchar_t* const el_examples_KEYWORDS[] = { L"Παραδείγματα", L"Σενάρια" };
static const Keywords el_examples_keywords = { 2, el_examples_KEYWORDS };

static const wchar_t* const el_feature_KEYWORDS[] = { L"Δυνατότητα", L"Λειτουργία" };
static const Keywords el_feature_keywords = { 2, el_feature_KEYWORDS };

static const wchar_t* const el_given_KEYWORDS[] = { L"* ", L"Δεδομένου " };
static const Keywords el_given_keywords = { 2, el_given_KEYWORDS };

static const wchar_t* const el_scenario_KEYWORDS[] = { L"Σενάριο" };
static const Keywords el_scenario_keywords = { 1, el_scenario_KEYWORDS };

static const wchar_t* const el_scenarioOutline_KEYWORDS[] = { L"Περιγραφή Σεναρίου", L"Περίγραμμα Σεναρίου" };
static const Keywords el_scenarioOutline_keywords = { 2, el_scenarioOutline_KEYWORDS };

static const wchar_t* const el_then_KEYWORDS[] = { L"* ", L"Τότε " };
static const Keywords el_then_keywords = { 2, el_then_KEYWORDS };

static const wchar_t* const el_when_KEYWORDS[] = { L"* ", L"Όταν " };
static const Keywords el_when_keywords = { 2, el_when_KEYWORDS };

static const Dialect el_dialect = {
        L"el",
        &el_and_keywords,
        &el_background_keywords,
        &el_but_keywords,
        &el_examples_keywords,
        &el_feature_keywords,
        &el_given_keywords,
        &el_scenario_keywords,
        &el_scenarioOutline_keywords,
        &el_then_keywords,
        &el_when_keywords };

static const wchar_t* const em_and_KEYWORDS[] = { L"* ", L"😂" };
static const Keywords em_and_keywords = { 2, em_and_KEYWORDS };

static const wchar_t* const em_background_KEYWORDS[] = { L"💤" };
static const Keywords em_background_keywords = { 1, em_background_KEYWORDS };

static const wchar_t* const em_but_KEYWORDS[] = { L"* ", L"😔" };
static const Keywords em_but_keywords = { 2, em_but_KEYWORDS };

static const wchar_t* const em_examples_KEYWORDS[] = { L"📓" };
static const Keywords em_examples_keywords = { 1, em_examples_KEYWORDS };

static const wchar_t* const em_feature_KEYWORDS[] = { L"📚" };
static const Keywords em_feature_keywords = { 1, em_feature_KEYWORDS };

static const wchar_t* const em_given_KEYWORDS[] = { L"* ", L"😐" };
static const Keywords em_given_keywords = { 2, em_given_KEYWORDS };

static const wchar_t* const em_scenario_KEYWORDS[] = { L"📕" };
static const Keywords em_scenario_keywords = { 1, em_scenario_KEYWORDS };

static const wchar_t* const em_scenarioOutline_KEYWORDS[] = { L"📖" };
static const Keywords em_scenarioOutline_keywords = { 1, em_scenarioOutline_KEYWORDS };

static const wchar_t* const em_then_KEYWORDS[] = { L"* ", L"🙏" };
static const Keywords em_then_keywords = { 2, em_then_KEYWORDS };

static const wchar_t* const em_when_KEYWORDS[] = { L"* ", L"🎬" };
static const Keywords em_when_keywords = { 2, em_when_KEYWORDS };

static const Dialect em_dialect = {
        L"em",
        &em_and_keywords,
        &em_background_keywords,
        &em_but_keywords,
        &em_examples_keywords,
        &em_feature_keywords,
        &em_given_keywords,
        &em_scenario_keywords,
        &em_scenarioOutline_keywords,
        &em_then_keywords,
        &em_when_keywords };

static const wchar_t* const en_and_KEYWORDS[] = { L"* ", L"And " };
static const Keywords en_and_keywords = { 2, en_and_KEYWORDS };

static const wchar_t* const en_background_KEYWORDS[] = { L"Background" };
static const Keywords en_background_keywords = { 1, en_background_KEYWORDS };

static const wchar_t* const en_but_KEYWORDS[] = { L"* ", L"But " };
static const Keywords en_but_keywords = { 2, en_but_KEYWORDS };

static const wchar_t* const en_examples_KEYWORDS[] = { L"Examples", L"Scenarios" };
static const Keywords en_examples_keywords = { 2, en_examples_KEYWORDS };

static const wchar_t* const en_feature_KEYWORDS[] = { L"Feature", L"Business Need", L"Ability" };
static const Keywords en_feature_keywords = { 3, en_feature_KEYWORDS };

static const wchar_t* const en_given_KEYWORDS[] = { L"* ", L"Given " };
static const Keywords en_given_keywords = { 2, en_given_KEYWORDS };

static const wchar_t* const en_scenario_KEYWORDS[] = { L"Scenario" };
static const Keywords en_scenario_keywords = { 1, en_scenario_KEYWORDS };

static const wchar_t* const en_scenarioOutline_KEYWORDS[] = { L"Scenario Outline", L"Scenario Template" };
static const Keywords en_scenarioOutline_keywords = { 2, en_scenarioOutline_KEYWORDS };

static const wchar_t* const en_then_KEYWORDS[] = { L"* ", L"Then " };
static const Keywords en_then_keywords = { 2, en_then_KEYWORDS };

static const wchar_t* const en_when_KEYWORDS[] = { L"* ", L"When " };
static const Keywords en_when_keywords = { 2, en_when_KEYWORDS };

static const Dialect en_dialect = {
        L"en",
        &en_and_keywords,
        &en_background_keywords,
        &en_but_keywords,
        &en_examples_keywords,
        &en_feature_keywords,
        &en_given_keywords,
        &en_scenario_keywords,
        &en_scenarioOutline_keywords,
        &en_then_keywords,
        &en_when_keywords };

static const wchar_t* const en_Scouse_and_KEYWORDS[] = { L"* ", L"An " };
static const Keywords en_Scouse_and_keywords = { 2, en_Scouse_and_KEYWORDS };

static const wchar_t* const en_Scouse_background_KEYWORDS[] = { L"Dis is what went down" };
static const Keywords en_Scouse_background_keywords = { 1, en_Scouse_background_KEYWORDS };

static const wchar_t* const en_Scouse_but_KEYWORDS[] = { L"* ", L"Buh " };
static const Keywords en_Scouse_but_keywords = { 2, en_Scouse_but_KEYWORDS };

static const wchar_t* const en_Scouse_examples_KEYWORDS[] = { L"Examples" };
static const Keywords en_Scouse_examples_keywords = { 1, en_Scouse_examples_KEYWORDS };

static const wchar_t* const en_Scouse_feature_KEYWORDS[] = { L"Feature" };
static const Keywords en_Scouse_feature_keywords = { 1, en_Scouse_feature_KEYWORDS };

static const wchar_t* const en_Scouse_given_KEYWORDS[] = { L"* ", L"Givun ", L"Youse know when youse got " };
static const Keywords en_Scouse_given_keywords = { 3, en_Scouse_given_KEYWORDS };

static const wchar_t* const en_Scouse_scenario_KEYWORDS[] = { L"The thing of it is" };
static const Keywords en_Scouse_scenario_keywords = { 1, en_Scouse_scenario_KEYWORDS };

static const wchar_t* const en_Scouse_scenarioOutline_KEYWORDS[] = { L"Wharrimean is" };
static const Keywords en_Scouse_scenarioOutline_keywords = { 1, en_Scouse_scenarioOutline_KEYWORDS };

static const wchar_t* const en_Scouse_then_KEYWORDS[] = { L"* ", L"Dun ", L"Den youse gotta " };
static const Keywords en_Scouse_then_keywords = { 3, en_Scouse_then_KEYWORDS };

static const wchar_t* const en_Scouse_when_KEYWORDS[] = { L"* ", L"Wun ", L"Youse know like when " };
static const Keywords en_Scouse_when_keywords = { 3, en_Scouse_when_KEYWORDS };

static const Dialect en_Scouse_dialect = {
        L"en-Scouse",
        &en_Scouse_and_keywords,
        &en_Scouse_background_keywords,
        &en_Scouse_but_keywords,
        &en_Scouse_examples_keywords,
        &en_Scouse_feature_keywords,
        &en_Scouse_given_keywords,
        &en_Scouse_scenario_keywords,
        &en_Scouse_scenarioOutline_keywords,
        &en_Scouse_then_keywords,
        &en_Scouse_when_keywords };

static const wchar_t* const en_au_and_KEYWORDS[] = { L"* ", L"Too right " };
static const Keywords en_au_and_keywords = { 2, en_au_and_KEYWORDS };

static const wchar_t* const en_au_background_KEYWORDS[] = { L"First off" };
static const Keywords en_au_background_keywords = { 1, en_au_background_KEYWORDS };

static const wchar_t* const en_au_but_KEYWORDS[] = { L"* ", L"Yeah nah " };
static const Keywords en_au_but_keywords = { 2, en_au_but_KEYWORDS };

static const wchar_t* const en_au_examples_KEYWORDS[] = { L"You'll wanna" };
static const Keywords en_au_examples_keywords = { 1, en_au_examples_KEYWORDS };

static const wchar_t* const en_au_feature_KEYWORDS[] = { L"Pretty much" };
static const Keywords en_au_feature_keywords = { 1, en_au_feature_KEYWORDS };

static const wchar_t* const en_au_given_KEYWORDS[] = { L"* ", L"Y'know " };
static const Keywords en_au_given_keywords = { 2, en_au_given_KEYWORDS };

static const wchar_t* const en_au_scenario_KEYWORDS[] = { L"Awww, look mate" };
static const Keywords en_au_scenario_keywords = { 1, en_au_scenario_KEYWORDS };

static const wchar_t* const en_au_scenarioOutline_KEYWORDS[] = { L"Reckon it's like" };
static const Keywords en_au_scenarioOutline_keywords = { 1, en_au_scenarioOutline_KEYWORDS };

static const wchar_t* const en_au_then_KEYWORDS[] = { L"* ", L"But at the end of the day I reckon " };
static const Keywords en_au_then_keywords = { 2, en_au_then_KEYWORDS };

static const wchar_t* const en_au_when_KEYWORDS[] = { L"* ", L"It's just unbelievable " };
static const Keywords en_au_when_keywords = { 2, en_au_when_KEYWORDS };

static const Dialect en_au_dialect = {
        L"en-au",
        &en_au_and_keywords,
        &en_au_background_keywords,
        &en_au_but_keywords,
        &en_au_examples_keywords,
        &en_au_feature_keywords,
        &en_au_given_keywords,
        &en_au_scenario_keywords,
        &en_au_scenarioOutline_keywords,
        &en_au_then_keywords,
        &en_au_when_keywords };

static const wchar_t* const en_lol_and_KEYWORDS[] = { L"* ", L"AN " };
static const Keywords en_lol_and_keywords = { 2, en_lol_and_KEYWORDS };

static const wchar_t* const en_lol_background_KEYWORDS[] = { L"B4" };
static const Keywords en_lol_background_keywords = { 1, en_lol_background_KEYWORDS };

static const wchar_t* const en_lol_but_KEYWORDS[] = { L"* ", L"BUT " };
static const Keywords en_lol_but_keywords = { 2, en_lol_but_KEYWORDS };

static const wchar_t* const en_lol_examples_KEYWORDS[] = { L"EXAMPLZ" };
static const Keywords en_lol_examples_keywords = { 1, en_lol_examples_KEYWORDS };

static const wchar_t* const en_lol_feature_KEYWORDS[] = { L"OH HAI" };
static const Keywords en_lol_feature_keywords = { 1, en_lol_feature_KEYWORDS };

static const wchar_t* const en_lol_given_KEYWORDS[] = { L"* ", L"I CAN HAZ " };
static const Keywords en_lol_given_keywords = { 2, en_lol_given_KEYWORDS };

static const wchar_t* const en_lol_scenario_KEYWORDS[] = { L"MISHUN" };
static const Keywords en_lol_scenario_keywords = { 1, en_lol_scenario_KEYWORDS };

static const wchar_t* const en_lol_scenarioOutline_KEYWORDS[] = { L"MISHUN SRSLY" };
static const Keywords en_lol_scenarioOutline_keywords = { 1, en_lol_scenarioOutline_KEYWORDS };

static const wchar_t* const en_lol_then_KEYWORDS[] = { L"* ", L"DEN " };
static const Keywords en_lol_then_keywords = { 2, en_lol_then_KEYWORDS };

static const wchar_t* const en_lol_when_KEYWORDS[] = { L"* ", L"WEN " };
static const Keywords en_lol_when_keywords = { 2, en_lol_when_KEYWORDS };

static const Dialect en_lol_dialect = {
        L"en-lol",
        &en_lol_and_keywords,
        &en_lol_background_keywords,
        &en_lol_but_keywords,
        &en_lol_examples_keywords,
        &en_lol_feature_keywords,
        &en_lol_given_keywords,
        &en_lol_scenario_keywords,
        &en_lol_scenarioOutline_keywords,
        &en_lol_then_keywords,
        &en_lol_when_keywords };

static const wchar_t* const en_old_and_KEYWORDS[] = { L"* ", L"Ond ", L"7 " };
static const Keywords en_old_and_keywords = { 3, en_old_and_KEYWORDS };

static const wchar_t* const en_old_background_KEYWORDS[] = { L"Aer", L"Ær" };
static const Keywords en_old_background_keywords = { 2, en_old_background_KEYWORDS };

static const wchar_t* const en_old_but_KEYWORDS[] = { L"* ", L"Ac " };
static const Keywords en_old_but_keywords = { 2, en_old_but_KEYWORDS };

static const wchar_t* const en_old_examples_KEYWORDS[] = { L"Se the", L"Se þe", L"Se ðe" };
static const Keywords en_old_examples_keywords = { 3, en_old_examples_KEYWORDS };

static const wchar_t* const en_old_feature_KEYWORDS[] = { L"Hwaet", L"Hwæt" };
static const Keywords en_old_feature_keywords = { 2, en_old_feature_KEYWORDS };

static const wchar_t* const en_old_given_KEYWORDS[] = { L"* ", L"Thurh ", L"Þurh ", L"Ðurh " };
static const Keywords en_old_given_keywords = { 4, en_old_given_KEYWORDS };

static const wchar_t* const en_old_scenario_KEYWORDS[] = { L"Swa" };
static const Keywords en_old_scenario_keywords = { 1, en_old_scenario_KEYWORDS };

static const wchar_t* const en_old_scenarioOutline_KEYWORDS[] = { L"Swa hwaer swa", L"Swa hwær swa" };
static const Keywords en_old_scenarioOutline_keywords = { 2, en_old_scenarioOutline_KEYWORDS };

static const wchar_t* const en_old_then_KEYWORDS[] = { L"* ", L"Tha ", L"Þa ", L"Ða ", L"Tha the ", L"Þa þe ", L"Ða ðe " };
static const Keywords en_old_then_keywords = { 7, en_old_then_KEYWORDS };

static const wchar_t* const en_old_when_KEYWORDS[] = { L"* ", L"Tha ", L"Þa ", L"Ða " };
static const Keywords en_old_when_keywords = { 4, en_old_when_KEYWORDS };

static const Dialect en_old_dialect = {
        L"en-old",
        &en_old_and_keywords,
        &en_old_background_keywords,
        &en_old_but_keywords,
        &en_old_examples_keywords,
        &en_old_feature_keywords,
        &en_old_given_keywords,
        &en_old_scenario_keywords,
        &en_old_scenarioOutline_keywords,
        &en_old_then_keywords,
        &en_old_when_keywords };

static const wchar_t* const en_pirate_and_KEYWORDS[] = { L"* ", L"Aye " };
static const Keywords en_pirate_and_keywords = { 2, en_pirate_and_KEYWORDS };

static const wchar_t* const en_pirate_background_KEYWORDS[] = { L"Yo-ho-ho" };
static const Keywords en_pirate_background_keywords = { 1, en_pirate_background_KEYWORDS };

static const wchar_t* const en_pirate_but_KEYWORDS[] = { L"* ", L"Avast! " };
static const Keywords en_pirate_but_keywords = { 2, en_pirate_but_KEYWORDS };

static const wchar_t* const en_pirate_examples_KEYWORDS[] = { L"Dead men tell no tales" };
static const Keywords en_pirate_examples_keywords = { 1, en_pirate_examples_KEYWORDS };

static const wchar_t* const en_pirate_feature_KEYWORDS[] = { L"Ahoy matey!" };
static const Keywords en_pirate_feature_keywords = { 1, en_pirate_feature_KEYWORDS };

static const wchar_t* const en_pirate_given_KEYWORDS[] = { L"* ", L"Gangway! " };
static const Keywords en_pirate_given_keywords = { 2, en_pirate_given_KEYWORDS };

static const wchar_t* const en_pirate_scenario_KEYWORDS[] = { L"Heave to" };
static const Keywords en_pirate_scenario_keywords = { 1, en_pirate_scenario_KEYWORDS };

static const wchar_t* const en_pirate_scenarioOutline_KEYWORDS[] = { L"Shiver me timbers" };
static const Keywords en_pirate_scenarioOutline_keywords = { 1, en_pirate_scenarioOutline_KEYWORDS };

static const wchar_t* const en_pirate_then_KEYWORDS[] = { L"* ", L"Let go and haul " };
static const Keywords en_pirate_then_keywords = { 2, en_pirate_then_KEYWORDS };

static const wchar_t* const en_pirate_when_KEYWORDS[] = { L"* ", L"Blimey! " };
static const Keywords en_pirate_when_keywords = { 2, en_pirate_when_KEYWORDS };

static const Dialect en_pirate_dialect = {
        L"en-pirate",
        &en_pirate_and_keywords,
        &en_pirate_background_keywords,
        &en_pirate_but_keywords,
        &en_pirate_examples_keywords,
        &en_pirate_feature_keywords,
        &en_pirate_given_keywords,
        &en_pirate_scenario_keywords,
        &en_pirate_scenarioOutline_keywords,
        &en_pirate_then_keywords,
        &en_pirate_when_keywords };

static const wchar_t* const eo_and_KEYWORDS[] = { L"* ", L"Kaj " };
static const Keywords eo_and_keywords = { 2, eo_and_KEYWORDS };

static const wchar_t* const eo_background_KEYWORDS[] = { L"Fono" };
static const Keywords eo_background_keywords = { 1, eo_background_KEYWORDS };

static const wchar_t* const eo_but_KEYWORDS[] = { L"* ", L"Sed " };
static const Keywords eo_but_keywords = { 2, eo_but_KEYWORDS };

static const wchar_t* const eo_examples_KEYWORDS[] = { L"Ekzemploj" };
static const Keywords eo_examples_keywords = { 1, eo_examples_KEYWORDS };

static const wchar_t* const eo_feature_KEYWORDS[] = { L"Trajto" };
static const Keywords eo_feature_keywords = { 1, eo_feature_KEYWORDS };

static const wchar_t* const eo_given_KEYWORDS[] = { L"* ", L"Donitaĵo ", L"Komence " };
static const Keywords eo_given_keywords = { 3, eo_given_KEYWORDS };

static const wchar_t* const eo_scenario_KEYWORDS[] = { L"Scenaro", L"Kazo" };
static const Keywords eo_scenario_keywords = { 2, eo_scenario_KEYWORDS };

static const wchar_t* const eo_scenarioOutline_KEYWORDS[] = { L"Konturo de la scenaro", L"Skizo", L"Kazo-skizo" };
static const Keywords eo_scenarioOutline_keywords = { 3, eo_scenarioOutline_KEYWORDS };

static const wchar_t* const eo_then_KEYWORDS[] = { L"* ", L"Do " };
static const Keywords eo_then_keywords = { 2, eo_then_KEYWORDS };

static const wchar_t* const eo_when_KEYWORDS[] = { L"* ", L"Se " };
static const Keywords eo_when_keywords = { 2, eo_when_KEYWORDS };

static const Dialect eo_dialect = {
        L"eo",
        &eo_and_keywords,
        &eo_background_keywords,
        &eo_but_keywords,
        &eo_examples_keywords,
        &eo_feature_keywords,
        &eo_given_keywords,
        &eo_scenario_keywords,
        &eo_scenarioOutline_keywords,
        &eo_then_keywords,
        &eo_when_keywords };

static const wchar_t* const es_and_KEYWORDS[] = { L"* ", L"Y ", L"E " };
static const Keywords es_and_keywords = { 3, es_and_KEYWORDS };

static const wchar_t* const es_background_KEYWORDS[] = { L"Antecedentes" };
static const Keywords es_background_keywords = { 1, es_background_KEYWORDS };

static const wchar_t* const es_but_KEYWORDS[] = { L"* ", L"Pero " };
static const Keywords es_but_keywords = { 2, es_but_KEYWORDS };

static const wchar_t* const es_examples_KEYWORDS[] = { L"Ejemplos" };
static const Keywords es_examples_keywords = { 1, es_examples_KEYWORDS };

static const wchar_t* const es_feature_KEYWORDS[] = { L"Característica" };
static const Keywords es_feature_keywords = { 1, es_feature_KEYWORDS };

static const wchar_t* const es_given_KEYWORDS[] = { L"* ", L"Dado ", L"Dada ", L"Dados ", L"Dadas " };
static const Keywords es_given_keywords = { 5, es_given_KEYWORDS };

static const wchar_t* const es_scenario_KEYWORDS[] = { L"Escenario" };
static const Keywords es_scenario_keywords = { 1, es_scenario_KEYWORDS };

static const wchar_t* const es_scenarioOutline_KEYWORDS[] = { L"Esquema del escenario" };
static const Keywords es_scenarioOutline_keywords = { 1, es_scenarioOutline_KEYWORDS };

static const wchar_t* const es_then_KEYWORDS[] = { L"* ", L"Entonces " };
static const Keywords es_then_keywords = { 2, es_then_KEYWORDS };

static const wchar_t* const es_when_KEYWORDS[] = { L"* ", L"Cuando " };
static const Keywords es_when_keywords = { 2, es_when_KEYWORDS };

static const Dialect es_dialect = {
        L"es",
        &es_and_keywords,
        &es_background_keywords,
        &es_but_keywords,
        &es_examples_keywords,
        &es_feature_keywords,
        &es_given_keywords,
        &es_scenario_keywords,
        &es_scenarioOutline_keywords,
        &es_then_keywords,
        &es_when_keywords };

static const wchar_t* const et_and_KEYWORDS[] = { L"* ", L"Ja " };
static const Keywords et_and_keywords = { 2, et_and_KEYWORDS };

static const wchar_t* const et_background_KEYWORDS[] = { L"Taust" };
static const Keywords et_background_keywords = { 1, et_background_KEYWORDS };

static const wchar_t* const et_but_KEYWORDS[] = { L"* ", L"Kuid " };
static const Keywords et_but_keywords = { 2, et_but_KEYWORDS };

static const wchar_t* const et_examples_KEYWORDS[] = { L"Juhtumid" };
static const Keywords et_examples_keywords = { 1, et_examples_KEYWORDS };

static const wchar_t* const et_feature_KEYWORDS[] = { L"Omadus" };
static const Keywords et_feature_keywords = { 1, et_feature_KEYWORDS };

static const wchar_t* const et_given_KEYWORDS[] = { L"* ", L"Eeldades " };
static const Keywords et_given_keywords = { 2, et_given_KEYWORDS };

static const wchar_t* const et_scenario_KEYWORDS[] = { L"Stsenaarium" };
static const Keywords et_scenario_keywords = { 1, et_scenario_KEYWORDS };

static const wchar_t* const et_scenarioOutline_KEYWORDS[] = { L"Raamstsenaarium" };
static const Keywords et_scenarioOutline_keywords = { 1, et_scenarioOutline_KEYWORDS };

static const wchar_t* const et_then_KEYWORDS[] = { L"* ", L"Siis " };
static const Keywords et_then_keywords = { 2, et_then_KEYWORDS };

static const wchar_t* const et_when_KEYWORDS[] = { L"* ", L"Kui " };
static const Keywords et_when_keywords = { 2, et_when_KEYWORDS };

static const Dialect et_dialect = {
        L"et",
        &et_and_keywords,
        &et_background_keywords,
        &et_but_keywords,
        &et_examples_keywords,
        &et_feature_keywords,
        &et_given_keywords,
        &et_scenario_keywords,
        &et_scenarioOutline_keywords,
        &et_then_keywords,
        &et_when_keywords };

static const wchar_t* const fa_and_KEYWORDS[] = { L"* ", L"و " };
static const Keywords fa_and_keywords = { 2, fa_and_KEYWORDS };

static const wchar_t* const fa_background_KEYWORDS[] = { L"زمینه" };
static const Keywords fa_background_keywords = { 1, fa_background_KEYWORDS };

static const wchar_t* const fa_but_KEYWORDS[] = { L"* ", L"اما " };
static const Keywords fa_but_keywords = { 2, fa_but_KEYWORDS };

static const wchar_t* const fa_examples_KEYWORDS[] = { L"نمونه ها" };
static const Keywords fa_examples_keywords = { 1, fa_examples_KEYWORDS };

static const wchar_t* const fa_feature_KEYWORDS[] = { L"وِیژگی" };
static const Keywords fa_feature_keywords = { 1, fa_feature_KEYWORDS };

static const wchar_t* const fa_given_KEYWORDS[] = { L"* ", L"با فرض " };
static const Keywords fa_given_keywords = { 2, fa_given_KEYWORDS };

static const wchar_t* const fa_scenario_KEYWORDS[] = { L"سناریو" };
static const Keywords fa_scenario_keywords = { 1, fa_scenario_KEYWORDS };

static const wchar_t* const fa_scenarioOutline_KEYWORDS[] = { L"الگوی سناریو" };
static const Keywords fa_scenarioOutline_keywords = { 1, fa_scenarioOutline_KEYWORDS };

static const wchar_t* const fa_then_KEYWORDS[] = { L"* ", L"آنگاه " };
static const Keywords fa_then_keywords = { 2, fa_then_KEYWORDS };

static const wchar_t* const fa_when_KEYWORDS[] = { L"* ", L"هنگامی " };
static const Keywords fa_when_keywords = { 2, fa_when_KEYWORDS };

static const Dialect fa_dialect = {
        L"fa",
        &fa_and_keywords,
        &fa_background_keywords,
        &fa_but_keywords,
        &fa_examples_keywords,
        &fa_feature_keywords,
        &fa_given_keywords,
        &fa_scenario_keywords,
        &fa_scenarioOutline_keywords,
        &fa_then_keywords,
        &fa_when_keywords };

static const wchar_t* const fi_and_KEYWORDS[] = { L"* ", L"Ja " };
static const Keywords fi_and_keywords = { 2, fi_and_KEYWORDS };

static const wchar_t* const fi_background_KEYWORDS[] = { L"Tausta" };
static const Keywords fi_background_keywords = { 1, fi_background_KEYWORDS };

static const wchar_t* const fi_but_KEYWORDS[] = { L"* ", L"Mutta " };
static const Keywords fi_but_keywords = { 2, fi_but_KEYWORDS };

static const wchar_t* const fi_examples_KEYWORDS[] = { L"Tapaukset" };
static const Keywords fi_examples_keywords = { 1, fi_examples_KEYWORDS };

static const wchar_t* const fi_feature_KEYWORDS[] = { L"Ominaisuus" };
static const Keywords fi_feature_keywords = { 1, fi_feature_KEYWORDS };

static const wchar_t* const fi_given_KEYWORDS[] = { L"* ", L"Oletetaan " };
static const Keywords fi_given_keywords = { 2, fi_given_KEYWORDS };

static const wchar_t* const fi_scenario_KEYWORDS[] = { L"Tapaus" };
static const Keywords fi_scenario_keywords = { 1, fi_scenario_KEYWORDS };

static const wchar_t* const fi_scenarioOutline_KEYWORDS[] = { L"Tapausaihio" };
static const Keywords fi_scenarioOutline_keywords = { 1, fi_scenarioOutline_KEYWORDS };

static const wchar_t* const fi_then_KEYWORDS[] = { L"* ", L"Niin " };
static const Keywords fi_then_keywords = { 2, fi_then_KEYWORDS };

static const wchar_t* const fi_when_KEYWORDS[] = { L"* ", L"Kun " };
static const Keywords fi_when_keywords = { 2, fi_when_KEYWORDS };

static const Dialect fi_dialect = {
        L"fi",
        &fi_and_keywords,
        &fi_background_keywords,
        &fi_but_keywords,
        &fi_examples_keywords,
        &fi_feature_keywords,
        &fi_given_keywords,
        &fi_scenario_keywords,
        &fi_scenarioOutline_keywords,
        &fi_then_keywords,
        &fi_when_keywords };

static const wchar_t* const fr_and_KEYWORDS[] = { L"* ", L"Et que ", L"Et qu'", L"Et " };
static const Keywords fr_and_keywords = { 4, fr_and_KEYWORDS };

static const wchar_t* const fr_background_KEYWORDS[] = { L"Contexte" };
static const Keywords fr_background_keywords = { 1, fr_background_KEYWORDS };

static const wchar_t* const fr_but_KEYWORDS[] = { L"* ", L"Mais que ", L"Mais qu'", L"Mais " };
static const Keywords fr_but_keywords = { 4, fr_but_KEYWORDS };

static const wchar_t* const fr_examples_KEYWORDS[] = { L"Exemples" };
static const Keywords fr_examples_keywords = { 1, fr_examples_KEYWORDS };

static const wchar_t* const fr_feature_KEYWORDS[] = { L"Fonctionnalité" };
static const Keywords fr_feature_keywords = { 1, fr_feature_KEYWORDS };

static const wchar_t* const fr_given_KEYWORDS[] = { L"* ", L"Soit ", L"Etant donné que ", L"Etant donné qu'", L"Etant donné ", L"Etant donnée ", L"Etant donnés ", L"Etant données ", L"Étant donné que ", L"Étant donné qu'", L"Étant donné ", L"Étant donnée ", L"Étant donnés ", L"Étant données " };
static const Keywords fr_given_keywords = { 14, fr_given_KEYWORDS };

static const wchar_t* const fr_scenario_KEYWORDS[] = { L"Scénario" };
static const Keywords fr_scenario_keywords = { 1, fr_scenario_KEYWORDS };

static const wchar_t* const fr_scenarioOutline_KEYWORDS[] = { L"Plan du scénario", L"Plan du Scénario" };
static const Keywords fr_scenarioOutline_keywords = { 2, fr_scenarioOutline_KEYWORDS };

static const wchar_t* const fr_then_KEYWORDS[] = { L"* ", L"Alors " };
static const Keywords fr_then_keywords = { 2, fr_then_KEYWORDS };

static const wchar_t* const fr_when_KEYWORDS[] = { L"* ", L"Quand ", L"Lorsque ", L"Lorsqu'" };
static const Keywords fr_when_keywords = { 4, fr_when_KEYWORDS };

static const Dialect fr_dialect = {
        L"fr",
        &fr_and_keywords,
        &fr_background_keywords,
        &fr_but_keywords,
        &fr_examples_keywords,
        &fr_feature_keywords,
        &fr_given_keywords,
        &fr_scenario_keywords,
        &fr_scenarioOutline_keywords,
        &fr_then_keywords,
        &fr_when_keywords };

static const wchar_t* const ga_and_KEYWORDS[] = { L"* ", L"Agus" };
static const Keywords ga_and_keywords = { 2, ga_and_KEYWORDS };

static const wchar_t* const ga_background_KEYWORDS[] = { L"Cúlra" };
static const Keywords ga_background_keywords = { 1, ga_background_KEYWORDS };

static const wchar_t* const ga_but_KEYWORDS[] = { L"* ", L"Ach" };
static const Keywords ga_but_keywords = { 2, ga_but_KEYWORDS };

static const wchar_t* const ga_examples_KEYWORDS[] = { L"Samplaí" };
static const Keywords ga_examples_keywords = { 1, ga_examples_KEYWORDS };

static const wchar_t* const ga_feature_KEYWORDS[] = { L"Gné" };
static const Keywords ga_feature_keywords = { 1, ga_feature_KEYWORDS };

static const wchar_t* const ga_given_KEYWORDS[] = { L"* ", L"Cuir i gcás go", L"Cuir i gcás nach", L"Cuir i gcás gur", L"Cuir i gcás nár" };
static const Keywords ga_given_keywords = { 5, ga_given_KEYWORDS };

static const wchar_t* const ga_scenario_KEYWORDS[] = { L"Cás" };
static const Keywords ga_scenario_keywords = { 1, ga_scenario_KEYWORDS };

static const wchar_t* const ga_scenarioOutline_KEYWORDS[] = { L"Cás Achomair" };
static const Keywords ga_scenarioOutline_keywords = { 1, ga_scenarioOutline_KEYWORDS };

static const wchar_t* const ga_then_KEYWORDS[] = { L"* ", L"Ansin" };
static const Keywords ga_then_keywords = { 2, ga_then_KEYWORDS };

static const wchar_t* const ga_when_KEYWORDS[] = { L"* ", L"Nuair a", L"Nuair nach", L"Nuair ba", L"Nuair nár" };
static const Keywords ga_when_keywords = { 5, ga_when_KEYWORDS };

static const Dialect ga_dialect = {
        L"ga",
        &ga_and_keywords,
        &ga_background_keywords,
        &ga_but_keywords,
        &ga_examples_keywords,
        &ga_feature_keywords,
        &ga_given_keywords,
        &ga_scenario_keywords,
        &ga_scenarioOutline_keywords,
        &ga_then_keywords,
        &ga_when_keywords };

static const wchar_t* const gj_and_KEYWORDS[] = { L"* ", L"અને " };
static const Keywords gj_and_keywords = { 2, gj_and_KEYWORDS };

static const wchar_t* const gj_background_KEYWORDS[] = { L"બેકગ્રાઉન્ડ" };
static const Keywords gj_background_keywords = { 1, gj_background_KEYWORDS };

static const wchar_t* const gj_but_KEYWORDS[] = { L"* ", L"પણ " };
static const Keywords gj_but_keywords = { 2, gj_but_KEYWORDS };

static const wchar_t* const gj_examples_KEYWORDS[] = { L"ઉદાહરણો" };
static const Keywords gj_examples_keywords = { 1, gj_examples_KEYWORDS };

static const wchar_t* const gj_feature_KEYWORDS[] = { L"લક્ષણ", L"વ્યાપાર જરૂર", L"ક્ષમતા" };
static const Keywords gj_feature_keywords = { 3, gj_feature_KEYWORDS };

static const wchar_t* const gj_given_KEYWORDS[] = { L"* ", L"આપેલ છે " };
static const Keywords gj_given_keywords = { 2, gj_given_KEYWORDS };

static const wchar_t* const gj_scenario_KEYWORDS[] = { L"સ્થિતિ" };
static const Keywords gj_scenario_keywords = { 1, gj_scenario_KEYWORDS };

static const wchar_t* const gj_scenarioOutline_KEYWORDS[] = { L"પરિદ્દશ્ય રૂપરેખા", L"પરિદ્દશ્ય ઢાંચો" };
static const Keywords gj_scenarioOutline_keywords = { 2, gj_scenarioOutline_KEYWORDS };

static const wchar_t* const gj_then_KEYWORDS[] = { L"* ", L"પછી " };
static const Keywords gj_then_keywords = { 2, gj_then_KEYWORDS };

static const wchar_t* const gj_when_KEYWORDS[] = { L"* ", L"ક્યારે " };
static const Keywords gj_when_keywords = { 2, gj_when_KEYWORDS };

static const Dialect gj_dialect = {
        L"gj",
        &gj_and_keywords,
        &gj_background_keywords,
        &gj_but_keywords,
        &gj_examples_keywords,
        &gj_feature_keywords,
        &gj_given_keywords,
        &gj_scenario_keywords,
        &gj_scenarioOutline_keywords,
        &gj_then_keywords,
        &gj_when_keywords };

static const wchar_t* const gl_and_KEYWORDS[] = { L"* ", L"E " };
static const Keywords gl_and_keywords = { 2, gl_and_KEYWORDS };

static const wchar_t* const gl_background_KEYWORDS[] = { L"Contexto" };
static const Keywords gl_background_keywords = { 1, gl_background_KEYWORDS };

static const wchar_t* const gl_but_KEYWORDS[] = { L"* ", L"Mais ", L"Pero " };
static const Keywords gl_but_keywords = { 3, gl_but_KEYWORDS };

static const wchar_t* const gl_examples_KEYWORDS[] = { L"Exemplos" };
static const Keywords gl_examples_keywords = { 1, gl_examples_KEYWORDS };

static const wchar_t* const gl_feature_KEYWORDS[] = { L"Característica" };
static const Keywords gl_feature_keywords = { 1, gl_feature_KEYWORDS };

static const wchar_t* const gl_given_KEYWORDS[] = { L"* ", L"Dado ", L"Dada ", L"Dados ", L"Dadas " };
static const Keywords gl_given_keywords = { 5, gl_given_KEYWORDS };

static const wchar_t* const gl_scenario_KEYWORDS[] = { L"Escenario" };
static const Keywords gl_scenario_keywords = { 1, gl_scenario_KEYWORDS };

static const wchar_t* const gl_scenarioOutline_KEYWORDS[] = { L"Esbozo do escenario" };
static const Keywords gl_scenarioOutline_keywords = { 1, gl_scenarioOutline_KEYWORDS };

static const wchar_t* const gl_then_KEYWORDS[] = { L"* ", L"Entón ", L"Logo " };
static const Keywords gl_then_keywords = { 3, gl_then_KEYWORDS };

static const wchar_t* const gl_when_KEYWORDS[] = { L"* ", L"Cando " };
static const Keywords gl_when_keywords = { 2, gl_when_KEYWORDS };

static const Dialect gl_dialect = {
        L"gl",
        &gl_and_keywords,
        &gl_background_keywords,
        &gl_but_keywords,
        &gl_examples_keywords,
        &gl_feature_keywords,
        &gl_given_keywords,
        &gl_scenario_keywords,
        &gl_scenarioOutline_keywords,
        &gl_then_keywords,
        &gl_when_keywords };

static const wchar_t* const he_and_KEYWORDS[] = { L"* ", L"וגם " };
static const Keywords he_and_keywords = { 2, he_and_KEYWORDS };

static const wchar_t* const he_background_KEYWORDS[] = { L"רקע" };
static const Keywords he_background_keywords = { 1, he_background_KEYWORDS };

static const wchar_t* const he_but_KEYWORDS[] = { L"* ", L"אבל " };
static const Keywords he_but_keywords = { 2, he_but_KEYWORDS };

static const wchar_t* const he_examples_KEYWORDS[] = { L"דוגמאות" };
static const Keywords he_examples_keywords = { 1, he_examples_KEYWORDS };

static const wchar_t* const he_feature_KEYWORDS[] = { L"תכונה" };
static const Keywords he_feature_keywords = { 1, he_feature_KEYWORDS };

static const wchar_t* const he_given_KEYWORDS[] = { L"* ", L"בהינתן " };
static const Keywords he_given_keywords = { 2, he_given_KEYWORDS };

static const wchar_t* const he_scenario_KEYWORDS[] = { L"תרחיש" };
static const Keywords he_scenario_keywords = { 1, he_scenario_KEYWORDS };

static const wchar_t* const he_scenarioOutline_KEYWORDS[] = { L"תבנית תרחיש" };
static const Keywords he_scenarioOutline_keywords = { 1, he_scenarioOutline_KEYWORDS };

static const wchar_t* const he_then_KEYWORDS[] = { L"* ", L"אז ", L"אזי " };
static const Keywords he_then_keywords = { 3, he_then_KEYWORDS };

static const wchar_t* const he_when_KEYWORDS[] = { L"* ", L"כאשר " };
static const Keywords he_when_keywords = { 2, he_when_KEYWORDS };

static const Dialect he_dialect = {
        L"he",
        &he_and_keywords,
        &he_background_keywords,
        &he_but_keywords,
        &he_examples_keywords,
        &he_feature_keywords,
        &he_given_keywords,
        &he_scenario_keywords,
        &he_scenarioOutline_keywords,
        &he_then_keywords,
        &he_when_keywords };

static const wchar_t* const hi_and_KEYWORDS[] = { L"* ", L"और ", L"तथा " };
static const Keywords hi_and_keywords = { 3, hi_and_KEYWORDS };

static const wchar_t* const hi_background_KEYWORDS[] = { L"पृष्ठभूमि" };
static const Keywords hi_background_keywords = { 1, hi_background_KEYWORDS };

static const wchar_t* const hi_but_KEYWORDS[] = { L"* ", L"पर ", L"परन्तु ", L"किन्तु " };
static const Keywords hi_but_keywords = { 4, hi_but_KEYWORDS };

static const wchar_t* const hi_examples_KEYWORDS[] = { L"उदाहरण" };
static const Keywords hi_examples_keywords = { 1, hi_examples_KEYWORDS };

static const wchar_t* const hi_feature_KEYWORDS[] = { L"रूप लेख" };
static const Keywords hi_feature_keywords = { 1, hi_feature_KEYWORDS };

static const wchar_t* const hi_given_KEYWORDS[] = { L"* ", L"अगर ", L"यदि ", L"चूंकि " };
static const Keywords hi_given_keywords = { 4, hi_given_KEYWORDS };

static const wchar_t* const hi_scenario_KEYWORDS[] = { L"परिदृश्य" };
static const Keywords hi_scenario_keywords = { 1, hi_scenario_KEYWORDS };

static const wchar_t* const hi_scenarioOutline_KEYWORDS[] = { L"परिदृश्य रूपरेखा" };
static const Keywords hi_scenarioOutline_keywords = { 1, hi_scenarioOutline_KEYWORDS };

static const wchar_t* const hi_then_KEYWORDS[] = { L"* ", L"तब ", L"तदा " };
static const Keywords hi_then_keywords = { 3, hi_then_KEYWORDS };

static const wchar_t* const hi_when_KEYWORDS[] = { L"* ", L"जब ", L"कदा " };
static const Keywords hi_when_keywords = { 3, hi_when_KEYWORDS };

static const Dialect hi_dialect = {
        L"hi",
        &hi_and_keywords,
        &hi_background_keywords,
        &hi_but_keywords,
        &hi_examples_keywords,
        &hi_feature_keywords,
        &hi_given_keywords,
        &hi_scenario_keywords,
        &hi_scenarioOutline_keywords,
        &hi_then_keywords,
        &hi_when_keywords };

static const wchar_t* const hr_and_KEYWORDS[] = { L"* ", L"I " };
static const Keywords hr_and_keywords = { 2, hr_and_KEYWORDS };

static const wchar_t* const hr_background_KEYWORDS[] = { L"Pozadina" };
static const Keywords hr_background_keywords = { 1, hr_background_KEYWORDS };

static const wchar_t* const hr_but_KEYWORDS[] = { L"* ", L"Ali " };
static const Keywords hr_but_keywords = { 2, hr_but_KEYWORDS };

static const wchar_t* const hr_examples_KEYWORDS[] = { L"Primjeri", L"Scenariji" };
static const Keywords hr_examples_keywords = { 2, hr_examples_KEYWORDS };

static const wchar_t* const hr_feature_KEYWORDS[] = { L"Osobina", L"Mogućnost", L"Mogucnost" };
static const Keywords hr_feature_keywords = { 3, hr_feature_KEYWORDS };

static const wchar_t* const hr_given_KEYWORDS[] = { L"* ", L"Zadan ", L"Zadani ", L"Zadano " };
static const Keywords hr_given_keywords = { 4, hr_given_KEYWORDS };

static const wchar_t* const hr_scenario_KEYWORDS[] = { L"Scenarij" };
static const Keywords hr_scenario_keywords = { 1, hr_scenario_KEYWORDS };

static const wchar_t* const hr_scenarioOutline_KEYWORDS[] = { L"Skica", L"Koncept" };
static const Keywords hr_scenarioOutline_keywords = { 2, hr_scenarioOutline_KEYWORDS };

static const wchar_t* const hr_then_KEYWORDS[] = { L"* ", L"Onda " };
static const Keywords hr_then_keywords = { 2, hr_then_KEYWORDS };

static const wchar_t* const hr_when_KEYWORDS[] = { L"* ", L"Kada ", L"Kad " };
static const Keywords hr_when_keywords = { 3, hr_when_KEYWORDS };

static const Dialect hr_dialect = {
        L"hr",
        &hr_and_keywords,
        &hr_background_keywords,
        &hr_but_keywords,
        &hr_examples_keywords,
        &hr_feature_keywords,
        &hr_given_keywords,
        &hr_scenario_keywords,
        &hr_scenarioOutline_keywords,
        &hr_then_keywords,
        &hr_when_keywords };

static const wchar_t* const ht_and_KEYWORDS[] = { L"* ", L"Ak ", L"Epi ", L"E " };
static const Keywords ht_and_keywords = { 4, ht_and_KEYWORDS };

static const wchar_t* const ht_background_KEYWORDS[] = { L"Kontèks", L"Istorik" };
static const Keywords ht_background_keywords = { 2, ht_background_KEYWORDS };

static const wchar_t* const ht_but_KEYWORDS[] = { L"* ", L"Men " };
static const Keywords ht_but_keywords = { 2, ht_but_KEYWORDS };

static const wchar_t* const ht_examples_KEYWORDS[] = { L"Egzanp" };
static const Keywords ht_examples_keywords = { 1, ht_examples_KEYWORDS };

static const wchar_t* const ht_feature_KEYWORDS[] = { L"Karakteristik", L"Mak", L"Fonksyonalite" };
static const Keywords ht_feature_keywords = { 3, ht_feature_KEYWORDS };

static const wchar_t* const ht_given_KEYWORDS[] = { L"* ", L"Sipoze ", L"Sipoze ke ", L"Sipoze Ke " };
static const Keywords ht_given_keywords = { 4, ht_given_KEYWORDS };

static const wchar_t* const ht_scenario_KEYWORDS[] = { L"Senaryo" };
static const Keywords ht_scenario_keywords = { 1, ht_scenario_KEYWORDS };

static const wchar_t* const ht_scenarioOutline_KEYWORDS[] = { L"Plan senaryo", L"Plan Senaryo", L"Senaryo deskripsyon", L"Senaryo Deskripsyon", L"Dyagram senaryo", L"Dyagram Senaryo" };
static const Keywords ht_scenarioOutline_keywords = { 6, ht_scenarioOutline_KEYWORDS };

static const wchar_t* const ht_then_KEYWORDS[] = { L"* ", L"Lè sa a ", L"Le sa a " };
static const Keywords ht_then_keywords = { 3, ht_then_KEYWORDS };

static const wchar_t* const ht_when_KEYWORDS[] = { L"* ", L"Lè ", L"Le " };
static const Keywords ht_when_keywords = { 3, ht_when_KEYWORDS };

static const Dialect ht_dialect = {
        L"ht",
        &ht_and_keywords,
        &ht_background_keywords,
        &ht_but_keywords,
        &ht_examples_keywords,
        &ht_feature_keywords,
        &ht_given_keywords,
        &ht_scenario_keywords,
        &ht_scenarioOutline_keywords,
        &ht_then_keywords,
        &ht_when_keywords };

static const wchar_t* const hu_and_KEYWORDS[] = { L"* ", L"És " };
static const Keywords hu_and_keywords = { 2, hu_and_KEYWORDS };

static const wchar_t* const hu_background_KEYWORDS[] = { L"Háttér" };
static const Keywords hu_background_keywords = { 1, hu_background_KEYWORDS };

static const wchar_t* const hu_but_KEYWORDS[] = { L"* ", L"De " };
static const Keywords hu_but_keywords = { 2, hu_but_KEYWORDS };

static const wchar_t* const hu_examples_KEYWORDS[] = { L"Példák" };
static const Keywords hu_examples_keywords = { 1, hu_examples_KEYWORDS };

static const wchar_t* const hu_feature_KEYWORDS[] = { L"Jellemző" };
static const Keywords hu_feature_keywords = { 1, hu_feature_KEYWORDS };

static const wchar_t* const hu_given_KEYWORDS[] = { L"* ", L"Amennyiben ", L"Adott " };
static const Keywords hu_given_keywords = { 3, hu_given_KEYWORDS };

static const wchar_t* const hu_scenario_KEYWORDS[] = { L"Forgatókönyv" };
static const Keywords hu_scenario_keywords = { 1, hu_scenario_KEYWORDS };

static const wchar_t* const hu_scenarioOutline_KEYWORDS[] = { L"Forgatókönyv vázlat" };
static const Keywords hu_scenarioOutline_keywords = { 1, hu_scenarioOutline_KEYWORDS };

static const wchar_t* const hu_then_KEYWORDS[] = { L"* ", L"Akkor " };
static const Keywords hu_then_keywords = { 2, hu_then_KEYWORDS };

static const wchar_t* const hu_when_KEYWORDS[] = { L"* ", L"Majd ", L"Ha ", L"Amikor " };
static const Keywords hu_when_keywords = { 4, hu_when_KEYWORDS };

static const Dialect hu_dialect = {
        L"hu",
        &hu_and_keywords,
        &hu_background_keywords,
        &hu_but_keywords,
        &hu_examples_keywords,
        &hu_feature_keywords,
        &hu_given_keywords,
        &hu_scenario_keywords,
        &hu_scenarioOutline_keywords,
        &hu_then_keywords,
        &hu_when_keywords };

static const wchar_t* const id_and_KEYWORDS[] = { L"* ", L"Dan " };
static const Keywords id_and_keywords = { 2, id_and_KEYWORDS };

static const wchar_t* const id_background_KEYWORDS[] = { L"Dasar" };
static const Keywords id_background_keywords = { 1, id_background_KEYWORDS };

static const wchar_t* const id_but_KEYWORDS[] = { L"* ", L"Tapi " };
static const Keywords id_but_keywords = { 2, id_but_KEYWORDS };

static const wchar_t* const id_examples_KEYWORDS[] = { L"Contoh" };
static const Keywords id_examples_keywords = { 1, id_examples_KEYWORDS };

static const wchar_t* const id_feature_KEYWORDS[] = { L"Fitur" };
static const Keywords id_feature_keywords = { 1, id_feature_KEYWORDS };

static const wchar_t* const id_given_KEYWORDS[] = { L"* ", L"Dengan " };
static const Keywords id_given_keywords = { 2, id_given_KEYWORDS };

static const wchar_t* const id_scenario_KEYWORDS[] = { L"Skenario" };
static const Keywords id_scenario_keywords = { 1, id_scenario_KEYWORDS };

static const wchar_t* const id_scenarioOutline_KEYWORDS[] = { L"Skenario konsep" };
static const Keywords id_scenarioOutline_keywords = { 1, id_scenarioOutline_KEYWORDS };

static const wchar_t* const id_then_KEYWORDS[] = { L"* ", L"Maka " };
static const Keywords id_then_keywords = { 2, id_then_KEYWORDS };

static const wchar_t* const id_when_KEYWORDS[] = { L"* ", L"Ketika " };
static const Keywords id_when_keywords = { 2, id_when_KEYWORDS };

static const Dialect id_dialect = {
        L"id",
        &id_and_keywords,
        &id_background_keywords,
        &id_but_keywords,
        &id_examples_keywords,
        &id_feature_keywords,
        &id_given_keywords,
        &id_scenario_keywords,
        &id_scenarioOutline_keywords,
        &id_then_keywords,
        &id_when_keywords };

static const wchar_t* const is_and_KEYWORDS[] = { L"* ", L"Og " };
static const Keywords is_and_keywords = { 2, is_and_KEYWORDS };

static const wchar_t* const is_background_KEYWORDS[] = { L"Bakgrunnur" };
static const Keywords is_background_keywords = { 1, is_background_KEYWORDS };

static const wchar_t* const is_but_KEYWORDS[] = { L"* ", L"En " };
static const Keywords is_but_keywords = { 2, is_but_KEYWORDS };

static const wchar_t* const is_examples_KEYWORDS[] = { L"Dæmi", L"Atburðarásir" };
static const Keywords is_examples_keywords = { 2, is_examples_KEYWORDS };

static const wchar_t* const is_feature_KEYWORDS[] = { L"Eiginleiki" };
static const Keywords is_feature_keywords = { 1, is_feature_KEYWORDS };

static const wchar_t* const is_given_KEYWORDS[] = { L"* ", L"Ef " };
static const Keywords is_given_keywords = { 2, is_given_KEYWORDS };

static const wchar_t* const is_scenario_KEYWORDS[] = { L"Atburðarás" };
static const Keywords is_scenario_keywords = { 1, is_scenario_KEYWORDS };

static const wchar_t* const is_scenarioOutline_KEYWORDS[] = { L"Lýsing Atburðarásar", L"Lýsing Dæma" };
static const Keywords is_scenarioOutline_keywords = { 2, is_scenarioOutline_KEYWORDS };

static const wchar_t* const is_then_KEYWORDS[] = { L"* ", L"Þá " };
static const Keywords is_then_keywords = { 2, is_then_KEYWORDS };

static const wchar_t* const is_when_KEYWORDS[] = { L"* ", L"Þegar " };
static const Keywords is_when_keywords = { 2, is_when_KEYWORDS };

static const Dialect is_dialect = {
        L"is",
        &is_and_keywords,
        &is_background_keywords,
        &is_but_keywords,
        &is_examples_keywords,
        &is_feature_keywords,
        &is_given_keywords,
        &is_scenario_keywords,
        &is_scenarioOutline_keywords,
        &is_then_keywords,
        &is_when_keywords };

static const wchar_t* const it_and_KEYWORDS[] = { L"* ", L"E " };
static const Keywords it_and_keywords = { 2, it_and_KEYWORDS };

static const wchar_t* const it_background_KEYWORDS[] = { L"Contesto" };
static const Keywords it_background_keywords = { 1, it_background_KEYWORDS };

static const wchar_t* const it_but_KEYWORDS[] = { L"* ", L"Ma " };
static const Keywords it_but_keywords = { 2, it_but_KEYWORDS };

static const wchar_t* const it_examples_KEYWORDS[] = { L"Esempi" };
static const Keywords it_examples_keywords = { 1, it_examples_KEYWORDS };

static const wchar_t* const it_feature_KEYWORDS[] = { L"Funzionalità" };
static const Keywords it_feature_keywords = { 1, it_feature_KEYWORDS };

static const wchar_t* const it_given_KEYWORDS[] = { L"* ", L"Dato ", L"Data ", L"Dati ", L"Date " };
static const Keywords it_given_keywords = { 5, it_given_KEYWORDS };

static const wchar_t* const it_scenario_KEYWORDS[] = { L"Scenario" };
static const Keywords it_scenario_keywords = { 1, it_scenario_KEYWORDS };

static const wchar_t* const it_scenarioOutline_KEYWORDS[] = { L"Schema dello scenario" };
static const Keywords it_scenarioOutline_keywords = { 1, it_scenarioOutline_KEYWORDS };

static const wchar_t* const it_then_KEYWORDS[] = { L"* ", L"Allora " };
static const Keywords it_then_keywords = { 2, it_then_KEYWORDS };

static const wchar_t* const it_when_KEYWORDS[] = { L"* ", L"Quando " };
static const Keywords it_when_keywords = { 2, it_when_KEYWORDS };

static const Dialect it_dialect = {
        L"it",
        &it_and_keywords,
        &it_background_keywords,
        &it_but_keywords,
        &it_examples_keywords,
        &it_feature_keywords,
        &it_given_keywords,
        &it_scenario_keywords,
        &it_scenarioOutline_keywords,
        &it_then_keywords,
        &it_when_keywords };

static const wchar_t* const ja_and_KEYWORDS[] = { L"* ", L"かつ" };
static const Keywords ja_and_keywords = { 2, ja_and_KEYWORDS };

static const wchar_t* const ja_background_KEYWORDS[] = { L"背景" };
static const Keywords ja_background_keywords = { 1, ja_background_KEYWORDS };

static const wchar_t* const ja_but_KEYWORDS[] = { L"* ", L"しかし", L"但し", L"ただし" };
static const Keywords ja_but_keywords = { 4, ja_but_KEYWORDS };

static const wchar_t* const ja_examples_KEYWORDS[] = { L"例", L"サンプル" };
static const Keywords ja_examples_keywords = { 2, ja_examples_KEYWORDS };

static const wchar_t* const ja_feature_KEYWORDS[] = { L"フィーチャ", L"機能" };
static const Keywords ja_feature_keywords = { 2, ja_feature_KEYWORDS };

static const wchar_t* const ja_given_KEYWORDS[] = { L"* ", L"前提" };
static const Keywords ja_given_keywords = { 2, ja_given_KEYWORDS };

static const wchar_t* const ja_scenario_KEYWORDS[] = { L"シナリオ" };
static const Keywords ja_scenario_keywords = { 1, ja_scenario_KEYWORDS };

static const wchar_t* const ja_scenarioOutline_KEYWORDS[] = { L"シナリオアウトライン", L"シナリオテンプレート", L"テンプレ", L"シナリオテンプレ" };
static const Keywords ja_scenarioOutline_keywords = { 4, ja_scenarioOutline_KEYWORDS };

static const wchar_t* const ja_then_KEYWORDS[] = { L"* ", L"ならば" };
static const Keywords ja_then_keywords = { 2, ja_then_KEYWORDS };

static const wchar_t* const ja_when_KEYWORDS[] = { L"* ", L"もし" };
static const Keywords ja_when_keywords = { 2, ja_when_KEYWORDS };

static const Dialect ja_dialect = {
        L"ja",
        &ja_and_keywords,
        &ja_background_keywords,
        &ja_but_keywords,
        &ja_examples_keywords,
        &ja_feature_keywords,
        &ja_given_keywords,
        &ja_scenario_keywords,
        &ja_scenarioOutline_keywords,
        &ja_then_keywords,
        &ja_when_keywords };

static const wchar_t* const jv_and_KEYWORDS[] = { L"* ", L"Lan " };
static const Keywords jv_and_keywords = { 2, jv_and_KEYWORDS };

static const wchar_t* const jv_background_KEYWORDS[] = { L"Dasar" };
static const Keywords jv_background_keywords = { 1, jv_background_KEYWORDS };

static const wchar_t* const jv_but_KEYWORDS[] = { L"* ", L"Tapi ", L"Nanging ", L"Ananging " };
static const Keywords jv_but_keywords = { 4, jv_but_KEYWORDS };

static const wchar_t* const jv_examples_KEYWORDS[] = { L"Conto", L"Contone" };
static const Keywords jv_examples_keywords = { 2, jv_examples_KEYWORDS };

static const wchar_t* const jv_feature_KEYWORDS[] = { L"Fitur" };
static const Keywords jv_feature_keywords = { 1, jv_feature_KEYWORDS };

static const wchar_t* const jv_given_KEYWORDS[] = { L"* ", L"Nalika ", L"Nalikaning " };
static const Keywords jv_given_keywords = { 3, jv_given_KEYWORDS };

static const wchar_t* const jv_scenario_KEYWORDS[] = { L"Skenario" };
static const Keywords jv_scenario_keywords = { 1, jv_scenario_KEYWORDS };

static const wchar_t* const jv_scenarioOutline_KEYWORDS[] = { L"Konsep skenario" };
static const Keywords jv_scenarioOutline_keywords = { 1, jv_scenarioOutline_KEYWORDS };

static const wchar_t* const jv_then_KEYWORDS[] = { L"* ", L"Njuk ", L"Banjur " };
static const Keywords jv_then_keywords = { 3, jv_then_KEYWORDS };

static const wchar_t* const jv_when_KEYWORDS[] = { L"* ", L"Manawa ", L"Menawa " };
static const Keywords jv_when_keywords = { 3, jv_when_KEYWORDS };

static const Dialect jv_dialect = {
        L"jv",
        &jv_and_keywords,
        &jv_background_keywords,
        &jv_but_keywords,
        &jv_examples_keywords,
        &jv_feature_keywords,
        &jv_given_keywords,
        &jv_scenario_keywords,
        &jv_scenarioOutline_keywords,
        &jv_then_keywords,
        &jv_when_keywords };

static const wchar_t* const ka_and_KEYWORDS[] = { L"* ", L"და" };
static const Keywords ka_and_keywords = { 2, ka_and_KEYWORDS };

static const wchar_t* const ka_background_KEYWORDS[] = { L"კონტექსტი" };
static const Keywords ka_background_keywords = { 1, ka_background_KEYWORDS };

static const wchar_t* const ka_but_KEYWORDS[] = { L"* ", L"მაგ­რამ" };
static const Keywords ka_but_keywords = { 2, ka_but_KEYWORDS };

static const wchar_t* const ka_examples_KEYWORDS[] = { L"მაგალითები" };
static const Keywords ka_examples_keywords = { 1, ka_examples_KEYWORDS };

static const wchar_t* const ka_feature_KEYWORDS[] = { L"თვისება" };
static const Keywords ka_feature_keywords = { 1, ka_feature_KEYWORDS };

static const wchar_t* const ka_given_KEYWORDS[] = { L"* ", L"მოცემული" };
static const Keywords ka_given_keywords = { 2, ka_given_KEYWORDS };

static const wchar_t* const ka_scenario_KEYWORDS[] = { L"სცენარის" };
static const Keywords ka_scenario_keywords = { 1, ka_scenario_KEYWORDS };

static const wchar_t* const ka_scenarioOutline_KEYWORDS[] = { L"სცენარის ნიმუში" };
static const Keywords ka_scenarioOutline_keywords = { 1, ka_scenarioOutline_KEYWORDS };

static const wchar_t* const ka_then_KEYWORDS[] = { L"* ", L"მაშინ" };
static const Keywords ka_then_keywords = { 2, ka_then_KEYWORDS };

static const wchar_t* const ka_when_KEYWORDS[] = { L"* ", L"როდესაც" };
static const Keywords ka_when_keywords = { 2, ka_when_KEYWORDS };

static const Dialect ka_dialect = {
        L"ka",
        &ka_and_keywords,
        &ka_background_keywords,
        &ka_but_keywords,
        &ka_examples_keywords,
        &ka_feature_keywords,
        &ka_given_keywords,
        &ka_scenario_keywords,
        &ka_scenarioOutline_keywords,
        &ka_then_keywords,
        &ka_when_keywords };

static const wchar_t* const kn_and_KEYWORDS[] = { L"* ", L"ಮತ್ತು " };
static const Keywords kn_and_keywords = { 2, kn_and_KEYWORDS };

static const wchar_t* const kn_background_KEYWORDS[] = { L"ಹಿನ್ನೆಲೆ" };
static const Keywords kn_background_keywords = { 1, kn_background_KEYWORDS };

static const wchar_t* const kn_but_KEYWORDS[] = { L"* ", L"ಆದರೆ " };
static const Keywords kn_but_keywords = { 2, kn_but_KEYWORDS };

static const wchar_t* const kn_examples_KEYWORDS[] = { L"ಉದಾಹರಣೆಗಳು" };
static const Keywords kn_examples_keywords = { 1, kn_examples_KEYWORDS };

static const wchar_t* const kn_feature_KEYWORDS[] = { L"ಹೆಚ್ಚಳ" };
static const Keywords kn_feature_keywords = { 1, kn_feature_KEYWORDS };

static const wchar_t* const kn_given_KEYWORDS[] = { L"* ", L"ನೀಡಿದ " };
static const Keywords kn_given_keywords = { 2, kn_given_KEYWORDS };

static const wchar_t* const kn_scenario_KEYWORDS[] = { L"ಕಥಾಸಾರಾಂಶ" };
static const Keywords kn_scenario_keywords = { 1, kn_scenario_KEYWORDS };

static const wchar_t* const kn_scenarioOutline_KEYWORDS[] = { L"ವಿವರಣೆ" };
static const Keywords kn_scenarioOutline_keywords = { 1, kn_scenarioOutline_KEYWORDS };

static const wchar_t* const kn_then_KEYWORDS[] = { L"* ", L"ನಂತರ " };
static const Keywords kn_then_keywords = { 2, kn_then_KEYWORDS };

static const wchar_t* const kn_when_KEYWORDS[] = { L"* ", L"ಸ್ಥಿತಿಯನ್ನು " };
static const Keywords kn_when_keywords = { 2, kn_when_KEYWORDS };

static const Dialect kn_dialect = {
        L"kn",
        &kn_and_keywords,
        &kn_background_keywords,
        &kn_but_keywords,
        &kn_examples_keywords,
        &kn_feature_keywords,
        &kn_given_keywords,
        &kn_scenario_keywords,
        &kn_scenarioOutline_keywords,
        &kn_then_keywords,
        &kn_when_keywords };

static const wchar_t* const ko_and_KEYWORDS[] = { L"* ", L"그리고" };
static const Keywords ko_and_keywords = { 2, ko_and_KEYWORDS };

static const wchar_t* const ko_background_KEYWORDS[] = { L"배경" };
static const Keywords ko_background_keywords = { 1, ko_background_KEYWORDS };

static const wchar_t* const ko_but_KEYWORDS[] = { L"* ", L"하지만", L"단" };
static const Keywords ko_but_keywords = { 3, ko_but_KEYWORDS };

static const wchar_t* const ko_examples_KEYWORDS[] = { L"예" };
static const Keywords ko_examples_keywords = { 1, ko_examples_KEYWORDS };

static const wchar_t* const ko_feature_KEYWORDS[] = { L"기능" };
static const Keywords ko_feature_keywords = { 1, ko_feature_KEYWORDS };

static const wchar_t* const ko_given_KEYWORDS[] = { L"* ", L"조건", L"먼저" };
static const Keywords ko_given_keywords = { 3, ko_given_KEYWORDS };

static const wchar_t* const ko_scenario_KEYWORDS[] = { L"시나리오" };
static const Keywords ko_scenario_keywords = { 1, ko_scenario_KEYWORDS };

static const wchar_t* const ko_scenarioOutline_KEYWORDS[] = { L"시나리오 개요" };
static const Keywords ko_scenarioOutline_keywords = { 1, ko_scenarioOutline_KEYWORDS };

static const wchar_t* const ko_then_KEYWORDS[] = { L"* ", L"그러면" };
static const Keywords ko_then_keywords = { 2, ko_then_KEYWORDS };

static const wchar_t* const ko_when_KEYWORDS[] = { L"* ", L"만일", L"만약" };
static const Keywords ko_when_keywords = { 3, ko_when_KEYWORDS };

static const Dialect ko_dialect = {
        L"ko",
        &ko_and_keywords,
        &ko_background_keywords,
        &ko_but_keywords,
        &ko_examples_keywords,
        &ko_feature_keywords,
        &ko_given_keywords,
        &ko_scenario_keywords,
        &ko_scenarioOutline_keywords,
        &ko_then_keywords,
        &ko_when_keywords };

static const wchar_t* const lt_and_KEYWORDS[] = { L"* ", L"Ir " };
static const Keywords lt_and_keywords = { 2, lt_and_KEYWORDS };

static const wchar_t* const lt_background_KEYWORDS[] = { L"Kontekstas" };
static const Keywords lt_background_keywords = { 1, lt_background_KEYWORDS };

static const wchar_t* const lt_but_KEYWORDS[] = { L"* ", L"Bet " };
static const Keywords lt_but_keywords = { 2, lt_but_KEYWORDS };

static const wchar_t* const lt_examples_KEYWORDS[] = { L"Pavyzdžiai", L"Scenarijai", L"Variantai" };
static const Keywords lt_examples_keywords = { 3, lt_examples_KEYWORDS };

static const wchar_t* const lt_feature_KEYWORDS[] = { L"Savybė" };
static const Keywords lt_feature_keywords = { 1, lt_feature_KEYWORDS };

static const wchar_t* const lt_given_KEYWORDS[] = { L"* ", L"Duota " };
static const Keywords lt_given_keywords = { 2, lt_given_KEYWORDS };

static const wchar_t* const lt_scenario_KEYWORDS[] = { L"Scenarijus" };
static const Keywords lt_scenario_keywords = { 1, lt_scenario_KEYWORDS };

static const wchar_t* const lt_scenarioOutline_KEYWORDS[] = { L"Scenarijaus šablonas" };
static const Keywords lt_scenarioOutline_keywords = { 1, lt_scenarioOutline_KEYWORDS };

static const wchar_t* const lt_then_KEYWORDS[] = { L"* ", L"Tada " };
static const Keywords lt_then_keywords = { 2, lt_then_KEYWORDS };

static const wchar_t* const lt_when_KEYWORDS[] = { L"* ", L"Kai " };
static const Keywords lt_when_keywords = { 2, lt_when_KEYWORDS };

static const Dialect lt_dialect = {
        L"lt",
        &lt_and_keywords,
        &lt_background_keywords,
        &lt_but_keywords,
        &lt_examples_keywords,
        &lt_feature_keywords,
        &lt_given_keywords,
        &lt_scenario_keywords,
        &lt_scenarioOutline_keywords,
        &lt_then_keywords,
        &lt_when_keywords };

static const wchar_t* const lu_and_KEYWORDS[] = { L"* ", L"an ", L"a " };
static const Keywords lu_and_keywords = { 3, lu_and_KEYWORDS };

static const wchar_t* const lu_background_KEYWORDS[] = { L"Hannergrond" };
static const Keywords lu_background_keywords = { 1, lu_background_KEYWORDS };

static const wchar_t* const lu_but_KEYWORDS[] = { L"* ", L"awer ", L"mä " };
static const Keywords lu_but_keywords = { 3, lu_but_KEYWORDS };

static const wchar_t* const lu_examples_KEYWORDS[] = { L"Beispiller" };
static const Keywords lu_examples_keywords = { 1, lu_examples_KEYWORDS };

static const wchar_t* const lu_feature_KEYWORDS[] = { L"Funktionalitéit" };
static const Keywords lu_feature_keywords = { 1, lu_feature_KEYWORDS };

static const wchar_t* const lu_given_KEYWORDS[] = { L"* ", L"ugeholl " };
static const Keywords lu_given_keywords = { 2, lu_given_KEYWORDS };

static const wchar_t* const lu_scenario_KEYWORDS[] = { L"Szenario" };
static const Keywords lu_scenario_keywords = { 1, lu_scenario_KEYWORDS };

static const wchar_t* const lu_scenarioOutline_KEYWORDS[] = { L"Plang vum Szenario" };
static const Keywords lu_scenarioOutline_keywords = { 1, lu_scenarioOutline_KEYWORDS };

static const wchar_t* const lu_then_KEYWORDS[] = { L"* ", L"dann " };
static const Keywords lu_then_keywords = { 2, lu_then_KEYWORDS };

static const wchar_t* const lu_when_KEYWORDS[] = { L"* ", L"wann " };
static const Keywords lu_when_keywords = { 2, lu_when_KEYWORDS };

static const Dialect lu_dialect = {
        L"lu",
        &lu_and_keywords,
        &lu_background_keywords,
        &lu_but_keywords,
        &lu_examples_keywords,
        &lu_feature_keywords,
        &lu_given_keywords,
        &lu_scenario_keywords,
        &lu_scenarioOutline_keywords,
        &lu_then_keywords,
        &lu_when_keywords };

static const wchar_t* const lv_and_KEYWORDS[] = { L"* ", L"Un " };
static const Keywords lv_and_keywords = { 2, lv_and_KEYWORDS };

static const wchar_t* const lv_background_KEYWORDS[] = { L"Konteksts", L"Situācija" };
static const Keywords lv_background_keywords = { 2, lv_background_KEYWORDS };

static const wchar_t* const lv_but_KEYWORDS[] = { L"* ", L"Bet " };
static const Keywords lv_but_keywords = { 2, lv_but_KEYWORDS };

static const wchar_t* const lv_examples_KEYWORDS[] = { L"Piemēri", L"Paraugs" };
static const Keywords lv_examples_keywords = { 2, lv_examples_KEYWORDS };

static const wchar_t* const lv_feature_KEYWORDS[] = { L"Funkcionalitāte", L"Fīča" };
static const Keywords lv_feature_keywords = { 2, lv_feature_KEYWORDS };

static const wchar_t* const lv_given_KEYWORDS[] = { L"* ", L"Kad " };
static const Keywords lv_given_keywords = { 2, lv_given_KEYWORDS };

static const wchar_t* const lv_scenario_KEYWORDS[] = { L"Scenārijs" };
static const Keywords lv_scenario_keywords = { 1, lv_scenario_KEYWORDS };

static const wchar_t* const lv_scenarioOutline_KEYWORDS[] = { L"Scenārijs pēc parauga" };
static const Keywords lv_scenarioOutline_keywords = { 1, lv_scenarioOutline_KEYWORDS };

static const wchar_t* const lv_then_KEYWORDS[] = { L"* ", L"Tad " };
static const Keywords lv_then_keywords = { 2, lv_then_KEYWORDS };

static const wchar_t* const lv_when_KEYWORDS[] = { L"* ", L"Ja " };
static const Keywords lv_when_keywords = { 2, lv_when_KEYWORDS };

static const Dialect lv_dialect = {
        L"lv",
        &lv_and_keywords,
        &lv_background_keywords,
        &lv_but_keywords,
        &lv_examples_keywords,
        &lv_feature_keywords,
        &lv_given_keywords,
        &lv_scenario_keywords,
        &lv_scenarioOutline_keywords,
        &lv_then_keywords,
        &lv_when_keywords };

static const wchar_t* const mk_Cyrl_and_KEYWORDS[] = { L"* ", L"И " };
static const Keywords mk_Cyrl_and_keywords = { 2, mk_Cyrl_and_KEYWORDS };

static const wchar_t* const mk_Cyrl_background_KEYWORDS[] = { L"Контекст", L"Содржина" };
static const Keywords mk_Cyrl_background_keywords = { 2, mk_Cyrl_background_KEYWORDS };

static const wchar_t* const mk_Cyrl_but_KEYWORDS[] = { L"* ", L"Но " };
static const Keywords mk_Cyrl_but_keywords = { 2, mk_Cyrl_but_KEYWORDS };

static const wchar_t* const mk_Cyrl_examples_KEYWORDS[] = { L"Примери", L"Сценарија" };
static const Keywords mk_Cyrl_examples_keywords = { 2, mk_Cyrl_examples_KEYWORDS };

static const wchar_t* const mk_Cyrl_feature_KEYWORDS[] = { L"Функционалност", L"Бизнис потреба", L"Можност" };
static const Keywords mk_Cyrl_feature_keywords = { 3, mk_Cyrl_feature_KEYWORDS };

static const wchar_t* const mk_Cyrl_given_KEYWORDS[] = { L"* ", L"Дадено ", L"Дадена " };
static const Keywords mk_Cyrl_given_keywords = { 3, mk_Cyrl_given_KEYWORDS };

static const wchar_t* const mk_Cyrl_scenario_KEYWORDS[] = { L"Сценарио", L"На пример" };
static const Keywords mk_Cyrl_scenario_keywords = { 2, mk_Cyrl_scenario_KEYWORDS };

static const wchar_t* const mk_Cyrl_scenarioOutline_KEYWORDS[] = { L"Преглед на сценарија", L"Скица", L"Концепт" };
static const Keywords mk_Cyrl_scenarioOutline_keywords = { 3, mk_Cyrl_scenarioOutline_KEYWORDS };

static const wchar_t* const mk_Cyrl_then_KEYWORDS[] = { L"* ", L"Тогаш " };
static const Keywords mk_Cyrl_then_keywords = { 2, mk_Cyrl_then_KEYWORDS };

static const wchar_t* const mk_Cyrl_when_KEYWORDS[] = { L"* ", L"Кога " };
static const Keywords mk_Cyrl_when_keywords = { 2, mk_Cyrl_when_KEYWORDS };

static const Dialect mk_Cyrl_dialect = {
        L"mk-Cyrl",
        &mk_Cyrl_and_keywords,
        &mk_Cyrl_background_keywords,
        &mk_Cyrl_but_keywords,
        &mk_Cyrl_examples_keywords,
        &mk_Cyrl_feature_keywords,
        &mk_Cyrl_given_keywords,
        &mk_Cyrl_scenario_keywords,
        &mk_Cyrl_scenarioOutline_keywords,
        &mk_Cyrl_then_keywords,
        &mk_Cyrl_when_keywords };

static const wchar_t* const mk_Latn_and_KEYWORDS[] = { L"* ", L"I " };
static const Keywords mk_Latn_and_keywords = { 2, mk_Latn_and_KEYWORDS };

static const wchar_t* const mk_Latn_background_KEYWORDS[] = { L"Kontekst", L"Sodrzhina" };
static const Keywords mk_Latn_background_keywords = { 2, mk_Latn_background_KEYWORDS };

static const wchar_t* const mk_Latn_but_KEYWORDS[] = { L"* ", L"No " };
static const Keywords mk_Latn_but_keywords = { 2, mk_Latn_but_KEYWORDS };

static const wchar_t* const mk_Latn_examples_KEYWORDS[] = { L"Primeri", L"Scenaria" };
static const Keywords mk_Latn_examples_keywords = { 2, mk_Latn_examples_KEYWORDS };

static const wchar_t* const mk_Latn_feature_KEYWORDS[] = { L"Funkcionalnost", L"Biznis potreba", L"Mozhnost" };
static const Keywords mk_Latn_feature_keywords = { 3, mk_Latn_feature_KEYWORDS };

static const wchar_t* const mk_Latn_given_KEYWORDS[] = { L"* ", L"Dadeno ", L"Dadena " };
static const Keywords mk_Latn_given_keywords = { 3, mk_Latn_given_KEYWORDS };

static const wchar_t* const mk_Latn_scenario_KEYWORDS[] = { L"Scenario", L"Na primer" };
static const Keywords mk_Latn_scenario_keywords = { 2, mk_Latn_scenario_KEYWORDS };

static const wchar_t* const mk_Latn_scenarioOutline_KEYWORDS[] = { L"Pregled na scenarija", L"Skica", L"Koncept" };
static const Keywords mk_Latn_scenarioOutline_keywords = { 3, mk_Latn_scenarioOutline_KEYWORDS };

static const wchar_t* const mk_Latn_then_KEYWORDS[] = { L"* ", L"Togash " };
static const Keywords mk_Latn_then_keywords = { 2, mk_Latn_then_KEYWORDS };

static const wchar_t* const mk_Latn_when_KEYWORDS[] = { L"* ", L"Koga " };
static const Keywords mk_Latn_when_keywords = { 2, mk_Latn_when_KEYWORDS };

static const Dialect mk_Latn_dialect = {
        L"mk-Latn",
        &mk_Latn_and_keywords,
        &mk_Latn_background_keywords,
        &mk_Latn_but_keywords,
        &mk_Latn_examples_keywords,
        &mk_Latn_feature_keywords,
        &mk_Latn_given_keywords,
        &mk_Latn_scenario_keywords,
        &mk_Latn_scenarioOutline_keywords,
        &mk_Latn_then_keywords,
        &mk_Latn_when_keywords };

static const wchar_t* const mn_and_KEYWORDS[] = { L"* ", L"Мөн ", L"Тэгээд " };
static const Keywords mn_and_keywords = { 3, mn_and_KEYWORDS };

static const wchar_t* const mn_background_KEYWORDS[] = { L"Агуулга" };
static const Keywords mn_background_keywords = { 1, mn_background_KEYWORDS };

static const wchar_t* const mn_but_KEYWORDS[] = { L"* ", L"Гэхдээ ", L"Харин " };
static const Keywords mn_but_keywords = { 3, mn_but_KEYWORDS };

static const wchar_t* const mn_examples_KEYWORDS[] = { L"Тухайлбал" };
static const Keywords mn_examples_keywords = { 1, mn_examples_KEYWORDS };

static const wchar_t* const mn_feature_KEYWORDS[] = { L"Функц", L"Функционал" };
static const Keywords mn_feature_keywords = { 2, mn_feature_KEYWORDS };

static const wchar_t* const mn_given_KEYWORDS[] = { L"* ", L"Өгөгдсөн нь ", L"Анх " };
static const Keywords mn_given_keywords = { 3, mn_given_KEYWORDS };

static const wchar_t* const mn_scenario_KEYWORDS[] = { L"Сценар" };
static const Keywords mn_scenario_keywords = { 1, mn_scenario_KEYWORDS };

static const wchar_t* const mn_scenarioOutline_KEYWORDS[] = { L"Сценарын төлөвлөгөө" };
static const Keywords mn_scenarioOutline_keywords = { 1, mn_scenarioOutline_KEYWORDS };

static const wchar_t* const mn_then_KEYWORDS[] = { L"* ", L"Тэгэхэд ", L"Үүний дараа " };
static const Keywords mn_then_keywords = { 3, mn_then_KEYWORDS };

static const wchar_t* const mn_when_KEYWORDS[] = { L"* ", L"Хэрэв " };
static const Keywords mn_when_keywords = { 2, mn_when_KEYWORDS };

static const Dialect mn_dialect = {
        L"mn",
        &mn_and_keywords,
        &mn_background_keywords,
        &mn_but_keywords,
        &mn_examples_keywords,
        &mn_feature_keywords,
        &mn_given_keywords,
        &mn_scenario_keywords,
        &mn_scenarioOutline_keywords,
        &mn_then_keywords,
        &mn_when_keywords };

static const wchar_t* const nl_and_KEYWORDS[] = { L"* ", L"En " };
static const Keywords nl_and_keywords = { 2, nl_and_KEYWORDS };

static const wchar_t* const nl_background_KEYWORDS[] = { L"Achtergrond" };
static const Keywords nl_background_keywords = { 1, nl_background_KEYWORDS };

static const wchar_t* const nl_but_KEYWORDS[] = { L"* ", L"Maar " };
static const Keywords nl_but_keywords = { 2, nl_but_KEYWORDS };

static const wchar_t* const nl_examples_KEYWORDS[] = { L"Voorbeelden" };
static const Keywords nl_examples_keywords = { 1, nl_examples_KEYWORDS };

static const wchar_t* const nl_feature_KEYWORDS[] = { L"Functionaliteit" };
static const Keywords nl_feature_keywords = { 1, nl_feature_KEYWORDS };

static const wchar_t* const nl_given_KEYWORDS[] = { L"* ", L"Gegeven ", L"Stel " };
static const Keywords nl_given_keywords = { 3, nl_given_KEYWORDS };

static const wchar_t* const nl_scenario_KEYWORDS[] = { L"Scenario" };
static const Keywords nl_scenario_keywords = { 1, nl_scenario_KEYWORDS };

static const wchar_t* const nl_scenarioOutline_KEYWORDS[] = { L"Abstract Scenario" };
static const Keywords nl_scenarioOutline_keywords = { 1, nl_scenarioOutline_KEYWORDS };

static const wchar_t* const nl_then_KEYWORDS[] = { L"* ", L"Dan " };
static const Keywords nl_then_keywords = { 2, nl_then_KEYWORDS };

static const wchar_t* const nl_when_KEYWORDS[] = { L"* ", L"Als ", L"Wanneer " };
static const Keywords nl_when_keywords = { 3, nl_when_KEYWORDS };

static const Dialect nl_dialect = {
        L"nl",
        &nl_and_keywords,
        &nl_background_keywords,
        &nl_but_keywords,
        &nl_examples_keywords,
        &nl_feature_keywords,
        &nl_given_keywords,
        &nl_scenario_keywords,
        &nl_scenarioOutline_keywords,
        &nl_then_keywords,
        &nl_when_keywords };

static const wchar_t* const no_and_KEYWORDS[] = { L"* ", L"Og " };
static const Keywords no_and_keywords = { 2, no_and_KEYWORDS };

static const wchar_t* const no_background_KEYWORDS[] = { L"Bakgrunn" };
static const Keywords no_background_keywords = { 1, no_background_KEYWORDS };

static const wchar_t* const no_but_KEYWORDS[] = { L"* ", L"Men " };
static const Keywords no_but_keywords = { 2, no_but_KEYWORDS };

static const wchar_t* const no_examples_KEYWORDS[] = { L"Eksempler" };
static const Keywords no_examples_keywords = { 1, no_examples_KEYWORDS };

static const wchar_t* const no_feature_KEYWORDS[] = { L"Egenskap" };
static const Keywords no_feature_keywords = { 1, no_feature_KEYWORDS };

static const wchar_t* const no_given_KEYWORDS[] = { L"* ", L"Gitt " };
static const Keywords no_given_keywords = { 2, no_given_KEYWORDS };

static const wchar_t* const no_scenario_KEYWORDS[] = { L"Scenario" };
static const Keywords no_scenario_keywords = { 1, no_scenario_KEYWORDS };

static const wchar_t* const no_scenarioOutline_KEYWORDS[] = { L"Scenariomal", L"Abstrakt Scenario" };
static const Keywords no_scenarioOutline_keywords = { 2, no_scenarioOutline_KEYWORDS };

static const wchar_t* const no_then_KEYWORDS[] = { L"* ", L"Så " };
static const Keywords no_then_keywords = { 2, no_then_KEYWORDS };

static const wchar_t* const no_when_KEYWORDS[] = { L"* ", L"Når " };
static const Keywords no_when_keywords = { 2, no_when_KEYWORDS };

static const Dialect no_dialect = {
        L"no",
        &no_and_keywords,
        &no_background_keywords,
        &no_but_keywords,
        &no_examples_keywords,
        &no_feature_keywords,
        &no_given_keywords,
        &no_scenario_keywords,
        &no_scenarioOutline_keywords,
        &no_then_keywords,
        &no_when_keywords };

static const wchar_t* const pa_and_KEYWORDS[] = { L"* ", L"ਅਤੇ " };
static const Keywords pa_and_keywords = { 2, pa_and_KEYWORDS };

static const wchar_t* const pa_background_KEYWORDS[] = { L"ਪਿਛੋਕੜ" };
static const Keywords pa_background_keywords = { 1, pa_background_KEYWORDS };

static const wchar_t* const pa_but_KEYWORDS[] = { L"* ", L"ਪਰ " };
static const Keywords pa_but_keywords = { 2, pa_but_KEYWORDS };

static const wchar_t* const pa_examples_KEYWORDS[] = { L"ਉਦਾਹਰਨਾਂ" };
static const Keywords pa_examples_keywords = { 1, pa_examples_KEYWORDS };

static const wchar_t* const pa_feature_KEYWORDS[] = { L"ਖਾਸੀਅਤ", L"ਮੁਹਾਂਦਰਾ", L"ਨਕਸ਼ ਨੁਹਾਰ" };
static const Keywords pa_feature_keywords = { 3, pa_feature_KEYWORDS };

static const wchar_t* const pa_given_KEYWORDS[] = { L"* ", L"ਜੇਕਰ ", L"ਜਿਵੇਂ ਕਿ " };
static const Keywords pa_given_keywords = { 3, pa_given_KEYWORDS };

static const wchar_t* const pa_scenario_KEYWORDS[] = { L"ਪਟਕਥਾ" };
static const Keywords pa_scenario_keywords = { 1, pa_scenario_KEYWORDS };

static const wchar_t* const pa_scenarioOutline_KEYWORDS[] = { L"ਪਟਕਥਾ ਢਾਂਚਾ", L"ਪਟਕਥਾ ਰੂਪ ਰੇਖਾ" };
static const Keywords pa_scenarioOutline_keywords = { 2, pa_scenarioOutline_KEYWORDS };

static const wchar_t* const pa_then_KEYWORDS[] = { L"* ", L"ਤਦ " };
static const Keywords pa_then_keywords = { 2, pa_then_KEYWORDS };

static const wchar_t* const pa_when_KEYWORDS[] = { L"* ", L"ਜਦੋਂ " };
static const Keywords pa_when_keywords = { 2, pa_when_KEYWORDS };

static const Dialect pa_dialect = {
        L"pa",
        &pa_and_keywords,
        &pa_background_keywords,
        &pa_but_keywords,
        &pa_examples_keywords,
        &pa_feature_keywords,
        &pa_given_keywords,
        &pa_scenario_keywords,
        &pa_scenarioOutline_keywords,
        &pa_then_keywords,
        &pa_when_keywords };

static const wchar_t* const pl_and_KEYWORDS[] = { L"* ", L"Oraz ", L"I " };
static const Keywords pl_and_keywords = { 3, pl_and_KEYWORDS };

static const wchar_t* const pl_background_KEYWORDS[] = { L"Założenia" };
static const Keywords pl_background_keywords = { 1, pl_background_KEYWORDS };

static const wchar_t* const pl_but_KEYWORDS[] = { L"* ", L"Ale " };
static const Keywords pl_but_keywords = { 2, pl_but_KEYWORDS };

static const wchar_t* const pl_examples_KEYWORDS[] = { L"Przykłady" };
static const Keywords pl_examples_keywords = { 1, pl_examples_KEYWORDS };

static const wchar_t* const pl_feature_KEYWORDS[] = { L"Właściwość", L"Funkcja", L"Aspekt", L"Potrzeba biznesowa" };
static const Keywords pl_feature_keywords = { 4, pl_feature_KEYWORDS };

static const wchar_t* const pl_given_KEYWORDS[] = { L"* ", L"Zakładając ", L"Mając ", L"Zakładając, że " };
static const Keywords pl_given_keywords = { 4, pl_given_KEYWORDS };

static const wchar_t* const pl_scenario_KEYWORDS[] = { L"Scenariusz" };
static const Keywords pl_scenario_keywords = { 1, pl_scenario_KEYWORDS };

static const wchar_t* const pl_scenarioOutline_KEYWORDS[] = { L"Szablon scenariusza" };
static const Keywords pl_scenarioOutline_keywords = { 1, pl_scenarioOutline_KEYWORDS };

static const wchar_t* const pl_then_KEYWORDS[] = { L"* ", L"Wtedy " };
static const Keywords pl_then_keywords = { 2, pl_then_KEYWORDS };

static const wchar_t* const pl_when_KEYWORDS[] = { L"* ", L"Jeżeli ", L"Jeśli ", L"Gdy ", L"Kiedy " };
static const Keywords pl_when_keywords = { 5, pl_when_KEYWORDS };

static const Dialect pl_dialect = {
        L"pl",
        &pl_and_keywords,
        &pl_background_keywords,
        &pl_but_keywords,
        &pl_examples_keywords,
        &pl_feature_keywords,
        &pl_given_keywords,
        &pl_scenario_keywords,
        &pl_scenarioOutline_keywords,
        &pl_then_keywords,
        &pl_when_keywords };

static const wchar_t* const pt_and_KEYWORDS[] = { L"* ", L"E " };
static const Keywords pt_and_keywords = { 2, pt_and_KEYWORDS };

static const wchar_t* const pt_background_KEYWORDS[] = { L"Contexto", L"Cenário de Fundo", L"Cenario de Fundo", L"Fundo" };
static const Keywords pt_background_keywords = { 4, pt_background_KEYWORDS };

static const wchar_t* const pt_but_KEYWORDS[] = { L"* ", L"Mas " };
static const Keywords pt_but_keywords = { 2, pt_but_KEYWORDS };

static const wchar_t* const pt_examples_KEYWORDS[] = { L"Exemplos", L"Cenários", L"Cenarios" };
static const Keywords pt_examples_keywords = { 3, pt_examples_KEYWORDS };

static const wchar_t* const pt_feature_KEYWORDS[] = { L"Funcionalidade", L"Característica", L"Caracteristica" };
static const Keywords pt_feature_keywords = { 3, pt_feature_KEYWORDS };

static const wchar_t* const pt_given_KEYWORDS[] = { L"* ", L"Dado ", L"Dada ", L"Dados ", L"Dadas " };
static const Keywords pt_given_keywords = { 5, pt_given_KEYWORDS };

static const wchar_t* const pt_scenario_KEYWORDS[] = { L"Cenário", L"Cenario" };
static const Keywords pt_scenario_keywords = { 2, pt_scenario_KEYWORDS };

static const wchar_t* const pt_scenarioOutline_KEYWORDS[] = { L"Esquema do Cenário", L"Esquema do Cenario", L"Delineação do Cenário", L"Delineacao do Cenario" };
static const Keywords pt_scenarioOutline_keywords = { 4, pt_scenarioOutline_KEYWORDS };

static const wchar_t* const pt_then_KEYWORDS[] = { L"* ", L"Então ", L"Entao " };
static const Keywords pt_then_keywords = { 3, pt_then_KEYWORDS };

static const wchar_t* const pt_when_KEYWORDS[] = { L"* ", L"Quando " };
static const Keywords pt_when_keywords = { 2, pt_when_KEYWORDS };

static const Dialect pt_dialect = {
        L"pt",
        &pt_and_keywords,
        &pt_background_keywords,
        &pt_but_keywords,
        &pt_examples_keywords,
        &pt_feature_keywords,
        &pt_given_keywords,
        &pt_scenario_keywords,
        &pt_scenarioOutline_keywords,
        &pt_then_keywords,
        &pt_when_keywords };

static const wchar_t* const ro_and_KEYWORDS[] = { L"* ", L"Si ", L"Și ", L"Şi " };
static const Keywords ro_and_keywords = { 4, ro_and_KEYWORDS };

static const wchar_t* const ro_background_KEYWORDS[] = { L"Context" };
static const Keywords ro_background_keywords = { 1, ro_background_KEYWORDS };

static const wchar_t* const ro_but_KEYWORDS[] = { L"* ", L"Dar " };
static const Keywords ro_but_keywords = { 2, ro_but_KEYWORDS };

static const wchar_t* const ro_examples_KEYWORDS[] = { L"Exemple" };
static const Keywords ro_examples_keywords = { 1, ro_examples_KEYWORDS };

static const wchar_t* const ro_feature_KEYWORDS[] = { L"Functionalitate", L"Funcționalitate", L"Funcţionalitate" };
static const Keywords ro_feature_keywords = { 3, ro_feature_KEYWORDS };

static const wchar_t* const ro_given_KEYWORDS[] = { L"* ", L"Date fiind ", L"Dat fiind ", L"Dată fiind", L"Dati fiind ", L"Dați fiind ", L"Daţi fiind " };
static const Keywords ro_given_keywords = { 7, ro_given_KEYWORDS };

static const wchar_t* const ro_scenario_KEYWORDS[] = { L"Scenariu" };
static const Keywords ro_scenario_keywords = { 1, ro_scenario_KEYWORDS };

static const wchar_t* const ro_scenarioOutline_KEYWORDS[] = { L"Structura scenariu", L"Structură scenariu" };
static const Keywords ro_scenarioOutline_keywords = { 2, ro_scenarioOutline_KEYWORDS };

static const wchar_t* const ro_then_KEYWORDS[] = { L"* ", L"Atunci " };
static const Keywords ro_then_keywords = { 2, ro_then_KEYWORDS };

static const wchar_t* const ro_when_KEYWORDS[] = { L"* ", L"Cand ", L"Când " };
static const Keywords ro_when_keywords = { 3, ro_when_KEYWORDS };

static const Dialect ro_dialect = {
        L"ro",
        &ro_and_keywords,
        &ro_background_keywords,
        &ro_but_keywords,
        &ro_examples_keywords,
        &ro_feature_keywords,
        &ro_given_keywords,
        &ro_scenario_keywords,
        &ro_scenarioOutline_keywords,
        &ro_then_keywords,
        &ro_when_keywords };

static const wchar_t* const ru_and_KEYWORDS[] = { L"* ", L"И ", L"К тому же ", L"Также " };
static const Keywords ru_and_keywords = { 4, ru_and_KEYWORDS };

static const wchar_t* const ru_background_KEYWORDS[] = { L"Предыстория", L"Контекст" };
static const Keywords ru_background_keywords = { 2, ru_background_KEYWORDS };

static const wchar_t* const ru_but_KEYWORDS[] = { L"* ", L"Но ", L"А ", L"Иначе " };
static const Keywords ru_but_keywords = { 4, ru_but_KEYWORDS };

static const wchar_t* const ru_examples_KEYWORDS[] = { L"Примеры" };
static const Keywords ru_examples_keywords = { 1, ru_examples_KEYWORDS };

static const wchar_t* const ru_feature_KEYWORDS[] = { L"Функция", L"Функциональность", L"Функционал", L"Свойство" };
static const Keywords ru_feature_keywords = { 4, ru_feature_KEYWORDS };

static const wchar_t* const ru_given_KEYWORDS[] = { L"* ", L"Допустим ", L"Дано ", L"Пусть ", L"Если " };
static const Keywords ru_given_keywords = { 5, ru_given_KEYWORDS };

static const wchar_t* const ru_scenario_KEYWORDS[] = { L"Сценарий" };
static const Keywords ru_scenario_keywords = { 1, ru_scenario_KEYWORDS };

static const wchar_t* const ru_scenarioOutline_KEYWORDS[] = { L"Структура сценария" };
static const Keywords ru_scenarioOutline_keywords = { 1, ru_scenarioOutline_KEYWORDS };

static const wchar_t* const ru_then_KEYWORDS[] = { L"* ", L"То ", L"Затем ", L"Тогда " };
static const Keywords ru_then_keywords = { 4, ru_then_KEYWORDS };

static const wchar_t* const ru_when_KEYWORDS[] = { L"* ", L"Когда " };
static const Keywords ru_when_keywords = { 2, ru_when_KEYWORDS };

static const Dialect ru_dialect = {
        L"ru",
        &ru_and_keywords,
        &ru_background_keywords,
        &ru_but_keywords,
        &ru_examples_keywords,
        &ru_feature_keywords,
        &ru_given_keywords,
        &ru_scenario_keywords,
        &ru_scenarioOutline_keywords,
        &ru_then_keywords,
        &ru_when_keywords };

static const wchar_t* const sk_and_KEYWORDS[] = { L"* ", L"A ", L"A tiež ", L"A taktiež ", L"A zároveň " };
static const Keywords sk_and_keywords = { 5, sk_and_KEYWORDS };

static const wchar_t* const sk_background_KEYWORDS[] = { L"Pozadie" };
static const Keywords sk_background_keywords = { 1, sk_background_KEYWORDS };

static const wchar_t* const sk_but_KEYWORDS[] = { L"* ", L"Ale " };
static const Keywords sk_but_keywords = { 2, sk_but_KEYWORDS };

static const wchar_t* const sk_examples_KEYWORDS[] = { L"Príklady" };
static const Keywords sk_examples_keywords = { 1, sk_examples_KEYWORDS };

static const wchar_t* const sk_feature_KEYWORDS[] = { L"Požiadavka", L"Funkcia", L"Vlastnosť" };
static const Keywords sk_feature_keywords = { 3, sk_feature_KEYWORDS };

static const wchar_t* const sk_given_KEYWORDS[] = { L"* ", L"Pokiaľ ", L"Za predpokladu " };
static const Keywords sk_given_keywords = { 3, sk_given_KEYWORDS };

static const wchar_t* const sk_scenario_KEYWORDS[] = { L"Scenár" };
static const Keywords sk_scenario_keywords = { 1, sk_scenario_KEYWORDS };

static const wchar_t* const sk_scenarioOutline_KEYWORDS[] = { L"Náčrt Scenáru", L"Náčrt Scenára", L"Osnova Scenára" };
static const Keywords sk_scenarioOutline_keywords = { 3, sk_scenarioOutline_KEYWORDS };

static const wchar_t* const sk_then_KEYWORDS[] = { L"* ", L"Tak ", L"Potom " };
static const Keywords sk_then_keywords = { 3, sk_then_KEYWORDS };

static const wchar_t* const sk_when_KEYWORDS[] = { L"* ", L"Keď ", L"Ak " };
static const Keywords sk_when_keywords = { 3, sk_when_KEYWORDS };

static const Dialect sk_dialect = {
        L"sk",
        &sk_and_keywords,
        &sk_background_keywords,
        &sk_but_keywords,
        &sk_examples_keywords,
        &sk_feature_keywords,
        &sk_given_keywords,
        &sk_scenario_keywords,
        &sk_scenarioOutline_keywords,
        &sk_then_keywords,
        &sk_when_keywords };

static const wchar_t* const sl_and_KEYWORDS[] = { L"In ", L"Ter " };
static const Keywords sl_and_keywords = { 2, sl_and_KEYWORDS };

static const wchar_t* const sl_background_KEYWORDS[] = { L"Kontekst", L"Osnova", L"Ozadje" };
static const Keywords sl_background_keywords = { 3, sl_background_KEYWORDS };

static const wchar_t* const sl_but_KEYWORDS[] = { L"Toda ", L"Ampak ", L"Vendar " };
static const Keywords sl_but_keywords = { 3, sl_but_KEYWORDS };

static const wchar_t* const sl_examples_KEYWORDS[] = { L"Primeri", L"Scenariji" };
static const Keywords sl_examples_keywords = { 2, sl_examples_KEYWORDS };

static const wchar_t* const sl_feature_KEYWORDS[] = { L"Funkcionalnost", L"Funkcija", L"Možnosti", L"Moznosti", L"Lastnost", L"Značilnost" };
static const Keywords sl_feature_keywords = { 6, sl_feature_KEYWORDS };

static const wchar_t* const sl_given_KEYWORDS[] = { L"Dano ", L"Podano ", L"Zaradi ", L"Privzeto " };
static const Keywords sl_given_keywords = { 4, sl_given_KEYWORDS };

static const wchar_t* const sl_scenario_KEYWORDS[] = { L"Scenarij", L"Primer" };
static const Keywords sl_scenario_keywords = { 2, sl_scenario_KEYWORDS };

static const wchar_t* const sl_scenarioOutline_KEYWORDS[] = { L"Struktura scenarija", L"Skica", L"Koncept", L"Oris scenarija", L"Osnutek" };
static const Keywords sl_scenarioOutline_keywords = { 5, sl_scenarioOutline_KEYWORDS };

static const wchar_t* const sl_then_KEYWORDS[] = { L"Nato ", L"Potem ", L"Takrat " };
static const Keywords sl_then_keywords = { 3, sl_then_KEYWORDS };

static const wchar_t* const sl_when_KEYWORDS[] = { L"Ko ", L"Ce ", L"Če ", L"Kadar " };
static const Keywords sl_when_keywords = { 4, sl_when_KEYWORDS };

static const Dialect sl_dialect = {
        L"sl",
        &sl_and_keywords,
        &sl_background_keywords,
        &sl_but_keywords,
        &sl_examples_keywords,
        &sl_feature_keywords,
        &sl_given_keywords,
        &sl_scenario_keywords,
        &sl_scenarioOutline_keywords,
        &sl_then_keywords,
        &sl_when_keywords };

static const wchar_t* const sr_Cyrl_and_KEYWORDS[] = { L"* ", L"И " };
static const Keywords sr_Cyrl_and_keywords = { 2, sr_Cyrl_and_KEYWORDS };

static const wchar_t* const sr_Cyrl_background_KEYWORDS[] = { L"Контекст", L"Основа", L"Позадина" };
static const Keywords sr_Cyrl_background_keywords = { 3, sr_Cyrl_background_KEYWORDS };

static const wchar_t* const sr_Cyrl_but_KEYWORDS[] = { L"* ", L"Али " };
static const Keywords sr_Cyrl_but_keywords = { 2, sr_Cyrl_but_KEYWORDS };

static const wchar_t* const sr_Cyrl_examples_KEYWORDS[] = { L"Примери", L"Сценарији" };
static const Keywords sr_Cyrl_examples_keywords = { 2, sr_Cyrl_examples_KEYWORDS };

static const wchar_t* const sr_Cyrl_feature_KEYWORDS[] = { L"Функционалност", L"Могућност", L"Особина" };
static const Keywords sr_Cyrl_feature_keywords = { 3, sr_Cyrl_feature_KEYWORDS };

static const wchar_t* const sr_Cyrl_given_KEYWORDS[] = { L"* ", L"За дато ", L"За дате ", L"За дати " };
static const Keywords sr_Cyrl_given_keywords = { 4, sr_Cyrl_given_KEYWORDS };

static const wchar_t* const sr_Cyrl_scenario_KEYWORDS[] = { L"Сценарио", L"Пример" };
static const Keywords sr_Cyrl_scenario_keywords = { 2, sr_Cyrl_scenario_KEYWORDS };

static const wchar_t* const sr_Cyrl_scenarioOutline_KEYWORDS[] = { L"Структура сценарија", L"Скица", L"Концепт" };
static const Keywords sr_Cyrl_scenarioOutline_keywords = { 3, sr_Cyrl_scenarioOutline_KEYWORDS };

static const wchar_t* const sr_Cyrl_then_KEYWORDS[] = { L"* ", L"Онда " };
static const Keywords sr_Cyrl_then_keywords = { 2, sr_Cyrl_then_KEYWORDS };

static const wchar_t* const sr_Cyrl_when_KEYWORDS[] = { L"* ", L"Када ", L"Кад " };
static const Keywords sr_Cyrl_when_keywords = { 3, sr_Cyrl_when_KEYWORDS };

static const Dialect sr_Cyrl_dialect = {
        L"sr-Cyrl",
        &sr_Cyrl_and_keywords,
        &sr_Cyrl_background_keywords,
        &sr_Cyrl_but_keywords,
        &sr_Cyrl_examples_keywords,
        &sr_Cyrl_feature_keywords,
        &sr_Cyrl_given_keywords,
        &sr_Cyrl_scenario_keywords,
        &sr_Cyrl_scenarioOutline_keywords,
        &sr_Cyrl_then_keywords,
        &sr_Cyrl_when_keywords };

static const wchar_t* const sr_Latn_and_KEYWORDS[] = { L"* ", L"I " };
static const Keywords sr_Latn_and_keywords = { 2, sr_Latn_and_KEYWORDS };

static const wchar_t* const sr_Latn_background_KEYWORDS[] = { L"Kontekst", L"Osnova", L"Pozadina" };
static const Keywords sr_Latn_background_keywords = { 3, sr_Latn_background_KEYWORDS };

static const wchar_t* const sr_Latn_but_KEYWORDS[] = { L"* ", L"Ali " };
static const Keywords sr_Latn_but_keywords = { 2, sr_Latn_but_KEYWORDS };

static const wchar_t* const sr_Latn_examples_KEYWORDS[] = { L"Primeri", L"Scenariji" };
static const Keywords sr_Latn_examples_keywords = { 2, sr_Latn_examples_KEYWORDS };

static const wchar_t* const sr_Latn_feature_KEYWORDS[] = { L"Funkcionalnost", L"Mogućnost", L"Mogucnost", L"Osobina" };
static const Keywords sr_Latn_feature_keywords = { 4, sr_Latn_feature_KEYWORDS };

static const wchar_t* const sr_Latn_given_KEYWORDS[] = { L"* ", L"Za dato ", L"Za date ", L"Za dati " };
static const Keywords sr_Latn_given_keywords = { 4, sr_Latn_given_KEYWORDS };

static const wchar_t* const sr_Latn_scenario_KEYWORDS[] = { L"Scenario", L"Primer" };
static const Keywords sr_Latn_scenario_keywords = { 2, sr_Latn_scenario_KEYWORDS };

static const wchar_t* const sr_Latn_scenarioOutline_KEYWORDS[] = { L"Struktura scenarija", L"Skica", L"Koncept" };
static const Keywords sr_Latn_scenarioOutline_keywords = { 3, sr_Latn_scenarioOutline_KEYWORDS };

static const wchar_t* const sr_Latn_then_KEYWORDS[] = { L"* ", L"Onda " };
static const Keywords sr_Latn_then_keywords = { 2, sr_Latn_then_KEYWORDS };

static const wchar_t* const sr_Latn_when_KEYWORDS[] = { L"* ", L"Kada ", L"Kad " };
static const Keywords sr_Latn_when_keywords = { 3, sr_Latn_when_KEYWORDS };

static const Dialect sr_Latn_dialect = {
        L"sr-Latn",
        &sr_Latn_and_keywords,
        &sr_Latn_background_keywords,
        &sr_Latn_but_keywords,
        &sr_Latn_examples_keywords,
        &sr_Latn_feature_keywords,
        &sr_Latn_given_keywords,
        &sr_Latn_scenario_keywords,
        &sr_Latn_scenarioOutline_keywords,
        &sr_Latn_then_keywords,
        &sr_Latn_when_keywords };

static const wchar_t* const sv_and_KEYWORDS[] = { L"* ", L"Och " };
static const Keywords sv_and_keywords = { 2, sv_and_KEYWORDS };

static const wchar_t* const sv_background_KEYWORDS[] = { L"Bakgrund" };
static const Keywords sv_background_keywords = { 1, sv_background_KEYWORDS };

static const wchar_t* const sv_but_KEYWORDS[] = { L"* ", L"Men " };
static const Keywords sv_but_keywords = { 2, sv_but_KEYWORDS };

static const wchar_t* const sv_examples_KEYWORDS[] = { L"Exempel" };
static const Keywords sv_examples_keywords = { 1, sv_examples_KEYWORDS };

static const wchar_t* const sv_feature_KEYWORDS[] = { L"Egenskap" };
static const Keywords sv_feature_keywords = { 1, sv_feature_KEYWORDS };

static const wchar_t* const sv_given_KEYWORDS[] = { L"* ", L"Givet " };
static const Keywords sv_given_keywords = { 2, sv_given_KEYWORDS };

static const wchar_t* const sv_scenario_KEYWORDS[] = { L"Scenario" };
static const Keywords sv_scenario_keywords = { 1, sv_scenario_KEYWORDS };

static const wchar_t* const sv_scenarioOutline_KEYWORDS[] = { L"Abstrakt Scenario", L"Scenariomall" };
static const Keywords sv_scenarioOutline_keywords = { 2, sv_scenarioOutline_KEYWORDS };

static const wchar_t* const sv_then_KEYWORDS[] = { L"* ", L"Så " };
static const Keywords sv_then_keywords = { 2, sv_then_KEYWORDS };

static const wchar_t* const sv_when_KEYWORDS[] = { L"* ", L"När " };
static const Keywords sv_when_keywords = { 2, sv_when_KEYWORDS };

static const Dialect sv_dialect = {
        L"sv",
        &sv_and_keywords,
        &sv_background_keywords,
        &sv_but_keywords,
        &sv_examples_keywords,
        &sv_feature_keywords,
        &sv_given_keywords,
        &sv_scenario_keywords,
        &sv_scenarioOutline_keywords,
        &sv_then_keywords,
        &sv_when_keywords };

static const wchar_t* const ta_and_KEYWORDS[] = { L"* ", L"மேலும்  ", L"மற்றும் " };
static const Keywords ta_and_keywords = { 3, ta_and_KEYWORDS };

static const wchar_t* const ta_background_KEYWORDS[] = { L"பின்னணி" };
static const Keywords ta_background_keywords = { 1, ta_background_KEYWORDS };

static const wchar_t* const ta_but_KEYWORDS[] = { L"* ", L"ஆனால்  " };
static const Keywords ta_but_keywords = { 2, ta_but_KEYWORDS };

static const wchar_t* const ta_examples_KEYWORDS[] = { L"எடுத்துக்காட்டுகள்", L"காட்சிகள்", L" நிலைமைகளில்" };
static const Keywords ta_examples_keywords = { 3, ta_examples_KEYWORDS };

static const wchar_t* const ta_feature_KEYWORDS[] = { L"அம்சம்", L"வணிக தேவை", L"திறன்" };
static const Keywords ta_feature_keywords = { 3, ta_feature_KEYWORDS };

static const wchar_t* const ta_given_KEYWORDS[] = { L"* ", L"கொடுக்கப்பட்ட " };
static const Keywords ta_given_keywords = { 2, ta_given_KEYWORDS };

static const wchar_t* const ta_scenario_KEYWORDS[] = { L"காட்சி" };
static const Keywords ta_scenario_keywords = { 1, ta_scenario_KEYWORDS };

static const wchar_t* const ta_scenarioOutline_KEYWORDS[] = { L"காட்சி சுருக்கம்", L"காட்சி வார்ப்புரு" };
static const Keywords ta_scenarioOutline_keywords = { 2, ta_scenarioOutline_KEYWORDS };

static const wchar_t* const ta_then_KEYWORDS[] = { L"* ", L"அப்பொழுது " };
static const Keywords ta_then_keywords = { 2, ta_then_KEYWORDS };

static const wchar_t* const ta_when_KEYWORDS[] = { L"* ", L"எப்போது " };
static const Keywords ta_when_keywords = { 2, ta_when_KEYWORDS };

static const Dialect ta_dialect = {
        L"ta",
        &ta_and_keywords,
        &ta_background_keywords,
        &ta_but_keywords,
        &ta_examples_keywords,
        &ta_feature_keywords,
        &ta_given_keywords,
        &ta_scenario_keywords,
        &ta_scenarioOutline_keywords,
        &ta_then_keywords,
        &ta_when_keywords };

static const wchar_t* const th_and_KEYWORDS[] = { L"* ", L"และ " };
static const Keywords th_and_keywords = { 2, th_and_KEYWORDS };

static const wchar_t* const th_background_KEYWORDS[] = { L"แนวคิด" };
static const Keywords th_background_keywords = { 1, th_background_KEYWORDS };

static const wchar_t* const th_but_KEYWORDS[] = { L"* ", L"แต่ " };
static const Keywords th_but_keywords = { 2, th_but_KEYWORDS };

static const wchar_t* const th_examples_KEYWORDS[] = { L"ชุดของตัวอย่าง", L"ชุดของเหตุการณ์" };
static const Keywords th_examples_keywords = { 2, th_examples_KEYWORDS };

static const wchar_t* const th_feature_KEYWORDS[] = { L"โครงหลัก", L"ความต้องการทางธุรกิจ", L"ความสามารถ" };
static const Keywords th_feature_keywords = { 3, th_feature_KEYWORDS };

static const wchar_t* const th_given_KEYWORDS[] = { L"* ", L"กำหนดให้ " };
static const Keywords th_given_keywords = { 2, th_given_KEYWORDS };

static const wchar_t* const th_scenario_KEYWORDS[] = { L"เหตุการณ์" };
static const Keywords th_scenario_keywords = { 1, th_scenario_KEYWORDS };

static const wchar_t* const th_scenarioOutline_KEYWORDS[] = { L"สรุปเหตุการณ์", L"โครงสร้างของเหตุการณ์" };
static const Keywords th_scenarioOutline_keywords = { 2, th_scenarioOutline_KEYWORDS };

static const wchar_t* const th_then_KEYWORDS[] = { L"* ", L"ดังนั้น " };
static const Keywords th_then_keywords = { 2, th_then_KEYWORDS };

static const wchar_t* const th_when_KEYWORDS[] = { L"* ", L"เมื่อ " };
static const Keywords th_when_keywords = { 2, th_when_KEYWORDS };

static const Dialect th_dialect = {
        L"th",
        &th_and_keywords,
        &th_background_keywords,
        &th_but_keywords,
        &th_examples_keywords,
        &th_feature_keywords,
        &th_given_keywords,
        &th_scenario_keywords,
        &th_scenarioOutline_keywords,
        &th_then_keywords,
        &th_when_keywords };

static const wchar_t* const tl_and_KEYWORDS[] = { L"* ", L"మరియు " };
static const Keywords tl_and_keywords = { 2, tl_and_KEYWORDS };

static const wchar_t* const tl_background_KEYWORDS[] = { L"నేపథ్యం" };
static const Keywords tl_background_keywords = { 1, tl_background_KEYWORDS };

static const wchar_t* const tl_but_KEYWORDS[] = { L"* ", L"కాని " };
static const Keywords tl_but_keywords = { 2, tl_but_KEYWORDS };

static const wchar_t* const tl_examples_KEYWORDS[] = { L"ఉదాహరణలు" };
static const Keywords tl_examples_keywords = { 1, tl_examples_KEYWORDS };

static const wchar_t* const tl_feature_KEYWORDS[] = { L"గుణము" };
static const Keywords tl_feature_keywords = { 1, tl_feature_KEYWORDS };

static const wchar_t* const tl_given_KEYWORDS[] = { L"* ", L"చెప్పబడినది " };
static const Keywords tl_given_keywords = { 2, tl_given_KEYWORDS };

static const wchar_t* const tl_scenario_KEYWORDS[] = { L"సన్నివేశం" };
static const Keywords tl_scenario_keywords = { 1, tl_scenario_KEYWORDS };

static const wchar_t* const tl_scenarioOutline_KEYWORDS[] = { L"కథనం" };
static const Keywords tl_scenarioOutline_keywords = { 1, tl_scenarioOutline_KEYWORDS };

static const wchar_t* const tl_then_KEYWORDS[] = { L"* ", L"అప్పుడు " };
static const Keywords tl_then_keywords = { 2, tl_then_KEYWORDS };

static const wchar_t* const tl_when_KEYWORDS[] = { L"* ", L"ఈ పరిస్థితిలో " };
static const Keywords tl_when_keywords = { 2, tl_when_KEYWORDS };

static const Dialect tl_dialect = {
        L"tl",
        &tl_and_keywords,
        &tl_background_keywords,
        &tl_but_keywords,
        &tl_examples_keywords,
        &tl_feature_keywords,
        &tl_given_keywords,
        &tl_scenario_keywords,
        &tl_scenarioOutline_keywords,
        &tl_then_keywords,
        &tl_when_keywords };

static const wchar_t* const tlh_and_KEYWORDS[] = { L"* ", L"'ej ", L"latlh " };
static const Keywords tlh_and_keywords = { 3, tlh_and_KEYWORDS };

static const wchar_t* const tlh_background_KEYWORDS[] = { L"mo'" };
static const Keywords tlh_background_keywords = { 1, tlh_background_KEYWORDS };

static const wchar_t* const tlh_but_KEYWORDS[] = { L"* ", L"'ach ", L"'a " };
static const Keywords tlh_but_keywords = { 3, tlh_but_KEYWORDS };

static const wchar_t* const tlh_examples_KEYWORDS[] = { L"ghantoH", L"lutmey" };
static const Keywords tlh_examples_keywords = { 2, tlh_examples_KEYWORDS };

static const wchar_t* const tlh_feature_KEYWORDS[] = { L"Qap", L"Qu'meH 'ut", L"perbogh", L"poQbogh malja'", L"laH" };
static const Keywords tlh_feature_keywords = { 5, tlh_feature_KEYWORDS };

static const wchar_t* const tlh_given_KEYWORDS[] = { L"* ", L"ghu' noblu' ", L"DaH ghu' bejlu' " };
static const Keywords tlh_given_keywords = { 3, tlh_given_KEYWORDS };

static const wchar_t* const tlh_scenario_KEYWORDS[] = { L"lut" };
static const Keywords tlh_scenario_keywords = { 1, tlh_scenario_KEYWORDS };

static const wchar_t* const tlh_scenarioOutline_KEYWORDS[] = { L"lut chovnatlh" };
static const Keywords tlh_scenarioOutline_keywords = { 1, tlh_scenarioOutline_KEYWORDS };

static const wchar_t* const tlh_then_KEYWORDS[] = { L"* ", L"vaj " };
static const Keywords tlh_then_keywords = { 2, tlh_then_KEYWORDS };

static const wchar_t* const tlh_when_KEYWORDS[] = { L"* ", L"qaSDI' " };
static const Keywords tlh_when_keywords = { 2, tlh_when_KEYWORDS };

static const Dialect tlh_dialect = {
        L"tlh",
        &tlh_and_keywords,
        &tlh_background_keywords,
        &tlh_but_keywords,
        &tlh_examples_keywords,
        &tlh_feature_keywords,
        &tlh_given_keywords,
        &tlh_scenario_keywords,
        &tlh_scenarioOutline_keywords,
        &tlh_then_keywords,
        &tlh_when_keywords };

static const wchar_t* const tr_and_KEYWORDS[] = { L"* ", L"Ve " };
static const Keywords tr_and_keywords = { 2, tr_and_KEYWORDS };

static const wchar_t* const tr_background_KEYWORDS[] = { L"Geçmiş" };
static const Keywords tr_background_keywords = { 1, tr_background_KEYWORDS };

static const wchar_t* const tr_but_KEYWORDS[] = { L"* ", L"Fakat ", L"Ama " };
static const Keywords tr_but_keywords = { 3, tr_but_KEYWORDS };

static const wchar_t* const tr_examples_KEYWORDS[] = { L"Örnekler" };
static const Keywords tr_examples_keywords = { 1, tr_examples_KEYWORDS };

static const wchar_t* const tr_feature_KEYWORDS[] = { L"Özellik" };
static const Keywords tr_feature_keywords = { 1, tr_feature_KEYWORDS };

static const wchar_t* const tr_given_KEYWORDS[] = { L"* ", L"Diyelim ki " };
static const Keywords tr_given_keywords = { 2, tr_given_KEYWORDS };

static const wchar_t* const tr_scenario_KEYWORDS[] = { L"Senaryo" };
static const Keywords tr_scenario_keywords = { 1, tr_scenario_KEYWORDS };

static const wchar_t* const tr_scenarioOutline_KEYWORDS[] = { L"Senaryo taslağı" };
static const Keywords tr_scenarioOutline_keywords = { 1, tr_scenarioOutline_KEYWORDS };

static const wchar_t* const tr_then_KEYWORDS[] = { L"* ", L"O zaman " };
static const Keywords tr_then_keywords = { 2, tr_then_KEYWORDS };

static const wchar_t* const tr_when_KEYWORDS[] = { L"* ", L"Eğer ki " };
static const Keywords tr_when_keywords = { 2, tr_when_KEYWORDS };

static const Dialect tr_dialect = {
        L"tr",
        &tr_and_keywords,
        &tr_background_keywords,
        &tr_but_keywords,
        &tr_examples_keywords,
        &tr_feature_keywords,
        &tr_given_keywords,
        &tr_scenario_keywords,
        &tr_scenarioOutline_keywords,
        &tr_then_keywords,
        &tr_when_keywords };

static const wchar_t* const tt_and_KEYWORDS[] = { L"* ", L"Һәм ", L"Вә " };
static const Keywords tt_and_keywords = { 3, tt_and_KEYWORDS };

static const wchar_t* const tt_background_KEYWORDS[] = { L"Кереш" };
static const Keywords tt_background_keywords = { 1, tt_background_KEYWORDS };

static const wchar_t* const tt_but_KEYWORDS[] = { L"* ", L"Ләкин ", L"Әмма " };
static const Keywords tt_but_keywords = { 3, tt_but_KEYWORDS };

static const wchar_t* const tt_examples_KEYWORDS[] = { L"Үрнәкләр", L"Мисаллар" };
static const Keywords tt_examples_keywords = { 2, tt_examples_KEYWORDS };

static const wchar_t* const tt_feature_KEYWORDS[] = { L"Мөмкинлек", L"Үзенчәлеклелек" };
static const Keywords tt_feature_keywords = { 2, tt_feature_KEYWORDS };

static const wchar_t* const tt_given_KEYWORDS[] = { L"* ", L"Әйтик " };
static const Keywords tt_given_keywords = { 2, tt_given_KEYWORDS };

static const wchar_t* const tt_scenario_KEYWORDS[] = { L"Сценарий" };
static const Keywords tt_scenario_keywords = { 1, tt_scenario_KEYWORDS };

static const wchar_t* const tt_scenarioOutline_KEYWORDS[] = { L"Сценарийның төзелеше" };
static const Keywords tt_scenarioOutline_keywords = { 1, tt_scenarioOutline_KEYWORDS };

static const wchar_t* const tt_then_KEYWORDS[] = { L"* ", L"Нәтиҗәдә " };
static const Keywords tt_then_keywords = { 2, tt_then_KEYWORDS };

static const wchar_t* const tt_when_KEYWORDS[] = { L"* ", L"Әгәр " };
static const Keywords tt_when_keywords = { 2, tt_when_KEYWORDS };

static const Dialect tt_dialect = {
        L"tt",
        &tt_and_keywords,
        &tt_background_keywords,
        &tt_but_keywords,
        &tt_examples_keywords,
        &tt_feature_keywords,
        &tt_given_keywords,
        &tt_scenario_keywords,
        &tt_scenarioOutline_keywords,
        &tt_then_keywords,
        &tt_when_keywords };

static const wchar_t* const uk_and_KEYWORDS[] = { L"* ", L"І ", L"А також ", L"Та " };
static const Keywords uk_and_keywords = { 4, uk_and_KEYWORDS };

static const wchar_t* const uk_background_KEYWORDS[] = { L"Передумова" };
static const Keywords uk_background_keywords = { 1, uk_background_KEYWORDS };

static const wchar_t* const uk_but_KEYWORDS[] = { L"* ", L"Але " };
static const Keywords uk_but_keywords = { 2, uk_but_KEYWORDS };

static const wchar_t* const uk_examples_KEYWORDS[] = { L"Приклади" };
static const Keywords uk_examples_keywords = { 1, uk_examples_KEYWORDS };

static const wchar_t* const uk_feature_KEYWORDS[] = { L"Функціонал" };
static const Keywords uk_feature_keywords = { 1, uk_feature_KEYWORDS };

static const wchar_t* const uk_given_KEYWORDS[] = { L"* ", L"Припустимо ", L"Припустимо, що ", L"Нехай ", L"Дано " };
static const Keywords uk_given_keywords = { 5, uk_given_KEYWORDS };

static const wchar_t* const uk_scenario_KEYWORDS[] = { L"Сценарій" };
static const Keywords uk_scenario_keywords = { 1, uk_scenario_KEYWORDS };

static const wchar_t* const uk_scenarioOutline_KEYWORDS[] = { L"Структура сценарію" };
static const Keywords uk_scenarioOutline_keywords = { 1, uk_scenarioOutline_KEYWORDS };

static const wchar_t* const uk_then_KEYWORDS[] = { L"* ", L"То ", L"Тоді " };
static const Keywords uk_then_keywords = { 3, uk_then_KEYWORDS };

static const wchar_t* const uk_when_KEYWORDS[] = { L"* ", L"Якщо ", L"Коли " };
static const Keywords uk_when_keywords = { 3, uk_when_KEYWORDS };

static const Dialect uk_dialect = {
        L"uk",
        &uk_and_keywords,
        &uk_background_keywords,
        &uk_but_keywords,
        &uk_examples_keywords,
        &uk_feature_keywords,
        &uk_given_keywords,
        &uk_scenario_keywords,
        &uk_scenarioOutline_keywords,
        &uk_then_keywords,
        &uk_when_keywords };

static const wchar_t* const ur_and_KEYWORDS[] = { L"* ", L"اور " };
static const Keywords ur_and_keywords = { 2, ur_and_KEYWORDS };

static const wchar_t* const ur_background_KEYWORDS[] = { L"پس منظر" };
static const Keywords ur_background_keywords = { 1, ur_background_KEYWORDS };

static const wchar_t* const ur_but_KEYWORDS[] = { L"* ", L"لیکن " };
static const Keywords ur_but_keywords = { 2, ur_but_KEYWORDS };

static const wchar_t* const ur_examples_KEYWORDS[] = { L"مثالیں" };
static const Keywords ur_examples_keywords = { 1, ur_examples_KEYWORDS };

static const wchar_t* const ur_feature_KEYWORDS[] = { L"صلاحیت", L"کاروبار کی ضرورت", L"خصوصیت" };
static const Keywords ur_feature_keywords = { 3, ur_feature_KEYWORDS };

static const wchar_t* const ur_given_KEYWORDS[] = { L"* ", L"اگر ", L"بالفرض ", L"فرض کیا " };
static const Keywords ur_given_keywords = { 4, ur_given_KEYWORDS };

static const wchar_t* const ur_scenario_KEYWORDS[] = { L"منظرنامہ" };
static const Keywords ur_scenario_keywords = { 1, ur_scenario_KEYWORDS };

static const wchar_t* const ur_scenarioOutline_KEYWORDS[] = { L"منظر نامے کا خاکہ" };
static const Keywords ur_scenarioOutline_keywords = { 1, ur_scenarioOutline_KEYWORDS };

static const wchar_t* const ur_then_KEYWORDS[] = { L"* ", L"پھر ", L"تب " };
static const Keywords ur_then_keywords = { 3, ur_then_KEYWORDS };

static const wchar_t* const ur_when_KEYWORDS[] = { L"* ", L"جب " };
static const Keywords ur_when_keywords = { 2, ur_when_KEYWORDS };

static const Dialect ur_dialect = {
        L"ur",
        &ur_and_keywords,
        &ur_background_keywords,
        &ur_but_keywords,
        &ur_examples_keywords,
        &ur_feature_keywords,
        &ur_given_keywords,
        &ur_scenario_keywords,
        &ur_scenarioOutline_keywords,
        &ur_then_keywords,
        &ur_when_keywords };

static const wchar_t* const uz_and_KEYWORDS[] = { L"* ", L"Ва " };
static const Keywords uz_and_keywords = { 2, uz_and_KEYWORDS };

static const wchar_t* const uz_background_KEYWORDS[] = { L"Тарих" };
static const Keywords uz_background_keywords = { 1, uz_background_KEYWORDS };

static const wchar_t* const uz_but_KEYWORDS[] = { L"* ", L"Лекин ", L"Бирок ", L"Аммо " };
static const Keywords uz_but_keywords = { 4, uz_but_KEYWORDS };

static const wchar_t* const uz_examples_KEYWORDS[] = { L"Мисоллар" };
static const Keywords uz_examples_keywords = { 1, uz_examples_KEYWORDS };

static const wchar_t* const uz_feature_KEYWORDS[] = { L"Функционал" };
static const Keywords uz_feature_keywords = { 1, uz_feature_KEYWORDS };

static const wchar_t* const uz_given_KEYWORDS[] = { L"* ", L"Агар " };
static const Keywords uz_given_keywords = { 2, uz_given_KEYWORDS };

static const wchar_t* const uz_scenario_KEYWORDS[] = { L"Сценарий" };
static const Keywords uz_scenario_keywords = { 1, uz_scenario_KEYWORDS };

static const wchar_t* const uz_scenarioOutline_KEYWORDS[] = { L"Сценарий структураси" };
static const Keywords uz_scenarioOutline_keywords = { 1, uz_scenarioOutline_KEYWORDS };

static const wchar_t* const uz_then_KEYWORDS[] = { L"* ", L"Унда " };
static const Keywords uz_then_keywords = { 2, uz_then_KEYWORDS };

static const wchar_t* const uz_when_KEYWORDS[] = { L"* ", L"Агар " };
static const Keywords uz_when_keywords = { 2, uz_when_KEYWORDS };

static const Dialect uz_dialect = {
        L"uz",
        &uz_and_keywords,
        &uz_background_keywords,
        &uz_but_keywords,
        &uz_examples_keywords,
        &uz_feature_keywords,
        &uz_given_keywords,
        &uz_scenario_keywords,
        &uz_scenarioOutline_keywords,
        &uz_then_keywords,
        &uz_when_keywords };

static const wchar_t* const vi_and_KEYWORDS[] = { L"* ", L"Và " };
static const Keywords vi_and_keywords = { 2, vi_and_KEYWORDS };

static const wchar_t* const vi_background_KEYWORDS[] = { L"Bối cảnh" };
static const Keywords vi_background_keywords = { 1, vi_background_KEYWORDS };

static const wchar_t* const vi_but_KEYWORDS[] = { L"* ", L"Nhưng " };
static const Keywords vi_but_keywords = { 2, vi_but_KEYWORDS };

static const wchar_t* const vi_examples_KEYWORDS[] = { L"Dữ liệu" };
static const Keywords vi_examples_keywords = { 1, vi_examples_KEYWORDS };

static const wchar_t* const vi_feature_KEYWORDS[] = { L"Tính năng" };
static const Keywords vi_feature_keywords = { 1, vi_feature_KEYWORDS };

static const wchar_t* const vi_given_KEYWORDS[] = { L"* ", L"Biết ", L"Cho " };
static const Keywords vi_given_keywords = { 3, vi_given_KEYWORDS };

static const wchar_t* const vi_scenario_KEYWORDS[] = { L"Tình huống", L"Kịch bản" };
static const Keywords vi_scenario_keywords = { 2, vi_scenario_KEYWORDS };

static const wchar_t* const vi_scenarioOutline_KEYWORDS[] = { L"Khung tình huống", L"Khung kịch bản" };
static const Keywords vi_scenarioOutline_keywords = { 2, vi_scenarioOutline_KEYWORDS };

static const wchar_t* const vi_then_KEYWORDS[] = { L"* ", L"Thì " };
static const Keywords vi_then_keywords = { 2, vi_then_KEYWORDS };

static const wchar_t* const vi_when_KEYWORDS[] = { L"* ", L"Khi " };
static const Keywords vi_when_keywords = { 2, vi_when_KEYWORDS };

static const Dialect vi_dialect = {
        L"vi",
        &vi_and_keywords,
        &vi_background_keywords,
        &vi_but_keywords,
        &vi_examples_keywords,
        &vi_feature_keywords,
        &vi_given_keywords,
        &vi_scenario_keywords,
        &vi_scenarioOutline_keywords,
        &vi_then_keywords,
        &vi_when_keywords };

static const wchar_t* const zh_CN_and_KEYWORDS[] = { L"* ", L"而且", L"并且", L"同时" };
static const Keywords zh_CN_and_keywords = { 4, zh_CN_and_KEYWORDS };

static const wchar_t* const zh_CN_background_KEYWORDS[] = { L"背景" };
static const Keywords zh_CN_background_keywords = { 1, zh_CN_background_KEYWORDS };

static const wchar_t* const zh_CN_but_KEYWORDS[] = { L"* ", L"但是" };
static const Keywords zh_CN_but_keywords = { 2, zh_CN_but_KEYWORDS };

static const wchar_t* const zh_CN_examples_KEYWORDS[] = { L"例子" };
static const Keywords zh_CN_examples_keywords = { 1, zh_CN_examples_KEYWORDS };

static const wchar_t* const zh_CN_feature_KEYWORDS[] = { L"功能" };
static const Keywords zh_CN_feature_keywords = { 1, zh_CN_feature_KEYWORDS };

static const wchar_t* const zh_CN_given_KEYWORDS[] = { L"* ", L"假如", L"假设", L"假定" };
static const Keywords zh_CN_given_keywords = { 4, zh_CN_given_KEYWORDS };

static const wchar_t* const zh_CN_scenario_KEYWORDS[] = { L"场景", L"剧本" };
static const Keywords zh_CN_scenario_keywords = { 2, zh_CN_scenario_KEYWORDS };

static const wchar_t* const zh_CN_scenarioOutline_KEYWORDS[] = { L"场景大纲", L"剧本大纲" };
static const Keywords zh_CN_scenarioOutline_keywords = { 2, zh_CN_scenarioOutline_KEYWORDS };

static const wchar_t* const zh_CN_then_KEYWORDS[] = { L"* ", L"那么" };
static const Keywords zh_CN_then_keywords = { 2, zh_CN_then_KEYWORDS };

static const wchar_t* const zh_CN_when_KEYWORDS[] = { L"* ", L"当" };
static const Keywords zh_CN_when_keywords = { 2, zh_CN_when_KEYWORDS };

static const Dialect zh_CN_dialect = {
        L"zh-CN",
        &zh_CN_and_keywords,
        &zh_CN_background_keywords,
        &zh_CN_but_keywords,
        &zh_CN_examples_keywords,
        &zh_CN_feature_keywords,
        &zh_CN_given_keywords,
        &zh_CN_scenario_keywords,
        &zh_CN_scenarioOutline_keywords,
        &zh_CN_then_keywords,
        &zh_CN_when_keywords };

static const wchar_t* const zh_TW_and_KEYWORDS[] = { L"* ", L"而且", L"並且", L"同時" };
static const Keywords zh_TW_and_keywords = { 4, zh_TW_and_KEYWORDS };

static const wchar_t* const zh_TW_background_KEYWORDS[] = { L"背景" };
static const Keywords zh_TW_background_keywords = { 1, zh_TW_background_KEYWORDS };

static const wchar_t* const zh_TW_but_KEYWORDS[] = { L"* ", L"但是" };
static const Keywords zh_TW_but_keywords = { 2, zh_TW_but_KEYWORDS };

static const wchar_t* const zh_TW_examples_KEYWORDS[] = { L"例子" };
static const Keywords zh_TW_examples_keywords = { 1, zh_TW_examples_KEYWORDS };

static const wchar_t* const zh_TW_feature_KEYWORDS[] = { L"功能" };
static const Keywords zh_TW_feature_keywords = { 1, zh_TW_feature_KEYWORDS };

static const wchar_t* const zh_TW_given_KEYWORDS[] = { L"* ", L"假如", L"假設", L"假定" };
static const Keywords zh_TW_given_keywords = { 4, zh_TW_given_KEYWORDS };

static const wchar_t* const zh_TW_scenario_KEYWORDS[] = { L"場景", L"劇本" };
static const Keywords zh_TW_scenario_keywords = { 2, zh_TW_scenario_KEYWORDS };

static const wchar_t* const zh_TW_scenarioOutline_KEYWORDS[] = { L"場景大綱", L"劇本大綱" };
static const Keywords zh_TW_scenarioOutline_keywords = { 2, zh_TW_scenarioOutline_KEYWORDS };

static const wchar_t* const zh_TW_then_KEYWORDS[] = { L"* ", L"那麼" };
static const Keywords zh_TW_then_keywords = { 2, zh_TW_then_KEYWORDS };

static const wchar_t* const zh_TW_when_KEYWORDS[] = { L"* ", L"當" };
static const Keywords zh_TW_when_keywords = { 2, zh_TW_when_KEYWORDS };

static const Dialect zh_TW_dialect = {
        L"zh-TW",
        &zh_TW_and_keywords,
        &zh_TW_background_keywords,
        &zh_TW_but_keywords,
        &zh_TW_examples_keywords,
        &zh_TW_feature_keywords,
        &zh_TW_given_keywords,
        &zh_TW_scenario_keywords,
        &zh_TW_scenarioOutline_keywords,
        &zh_TW_then_keywords,
        &zh_TW_when_keywords };

const Dialect* Dialect_for(const wchar_t* language) {
    if (wcscmp(af_dialect.language_name, language) == 0)
        return &af_dialect;
    if (wcscmp(am_dialect.language_name, language) == 0)
        return &am_dialect;
    if (wcscmp(ar_dialect.language_name, language) == 0)
        return &ar_dialect;
    if (wcscmp(ast_dialect.language_name, language) == 0)
        return &ast_dialect;
    if (wcscmp(az_dialect.language_name, language) == 0)
        return &az_dialect;
    if (wcscmp(bg_dialect.language_name, language) == 0)
        return &bg_dialect;
    if (wcscmp(bm_dialect.language_name, language) == 0)
        return &bm_dialect;
    if (wcscmp(bs_dialect.language_name, language) == 0)
        return &bs_dialect;
    if (wcscmp(ca_dialect.language_name, language) == 0)
        return &ca_dialect;
    if (wcscmp(cs_dialect.language_name, language) == 0)
        return &cs_dialect;
    if (wcscmp(cy_GB_dialect.language_name, language) == 0)
        return &cy_GB_dialect;
    if (wcscmp(da_dialect.language_name, language) == 0)
        return &da_dialect;
    if (wcscmp(de_dialect.language_name, language) == 0)
        return &de_dialect;
    if (wcscmp(el_dialect.language_name, language) == 0)
        return &el_dialect;
    if (wcscmp(em_dialect.language_name, language) == 0)
        return &em_dialect;
    if (wcscmp(en_dialect.language_name, language) == 0)
        return &en_dialect;
    if (wcscmp(en_Scouse_dialect.language_name, language) == 0)
        return &en_Scouse_dialect;
    if (wcscmp(en_au_dialect.language_name, language) == 0)
        return &en_au_dialect;
    if (wcscmp(en_lol_dialect.language_name, language) == 0)
        return &en_lol_dialect;
    if (wcscmp(en_old_dialect.language_name, language) == 0)
        return &en_old_dialect;
    if (wcscmp(en_pirate_dialect.language_name, language) == 0)
        return &en_pirate_dialect;
    if (wcscmp(eo_dialect.language_name, language) == 0)
        return &eo_dialect;
    if (wcscmp(es_dialect.language_name, language) == 0)
        return &es_dialect;
    if (wcscmp(et_dialect.language_name, language) == 0)
        return &et_dialect;
    if (wcscmp(fa_dialect.language_name, language) == 0)
        return &fa_dialect;
    if (wcscmp(fi_dialect.language_name, language) == 0)
        return &fi_dialect;
    if (wcscmp(fr_dialect.language_name, language) == 0)
        return &fr_dialect;
    if (wcscmp(ga_dialect.language_name, language) == 0)
        return &ga_dialect;
    if (wcscmp(gj_dialect.language_name, language) == 0)
        return &gj_dialect;
    if (wcscmp(gl_dialect.language_name, language) == 0)
        return &gl_dialect;
    if (wcscmp(he_dialect.language_name, language) == 0)
        return &he_dialect;
    if (wcscmp(hi_dialect.language_name, language) == 0)
        return &hi_dialect;
    if (wcscmp(hr_dialect.language_name, language) == 0)
        return &hr_dialect;
    if (wcscmp(ht_dialect.language_name, language) == 0)
        return &ht_dialect;
    if (wcscmp(hu_dialect.language_name, language) == 0)
        return &hu_dialect;
    if (wcscmp(id_dialect.language_name, language) == 0)
        return &id_dialect;
    if (wcscmp(is_dialect.language_name, language) == 0)
        return &is_dialect;
    if (wcscmp(it_dialect.language_name, language) == 0)
        return &it_dialect;
    if (wcscmp(ja_dialect.language_name, language) == 0)
        return &ja_dialect;
    if (wcscmp(jv_dialect.language_name, language) == 0)
        return &jv_dialect;
    if (wcscmp(ka_dialect.language_name, language) == 0)
        return &ka_dialect;
    if (wcscmp(kn_dialect.language_name, language) == 0)
        return &kn_dialect;
    if (wcscmp(ko_dialect.language_name, language) == 0)
        return &ko_dialect;
    if (wcscmp(lt_dialect.language_name, language) == 0)
        return &lt_dialect;
    if (wcscmp(lu_dialect.language_name, language) == 0)
        return &lu_dialect;
    if (wcscmp(lv_dialect.language_name, language) == 0)
        return &lv_dialect;
    if (wcscmp(mk_Cyrl_dialect.language_name, language) == 0)
        return &mk_Cyrl_dialect;
    if (wcscmp(mk_Latn_dialect.language_name, language) == 0)
        return &mk_Latn_dialect;
    if (wcscmp(mn_dialect.language_name, language) == 0)
        return &mn_dialect;
    if (wcscmp(nl_dialect.language_name, language) == 0)
        return &nl_dialect;
    if (wcscmp(no_dialect.language_name, language) == 0)
        return &no_dialect;
    if (wcscmp(pa_dialect.language_name, language) == 0)
        return &pa_dialect;
    if (wcscmp(pl_dialect.language_name, language) == 0)
        return &pl_dialect;
    if (wcscmp(pt_dialect.language_name, language) == 0)
        return &pt_dialect;
    if (wcscmp(ro_dialect.language_name, language) == 0)
        return &ro_dialect;
    if (wcscmp(ru_dialect.language_name, language) == 0)
        return &ru_dialect;
    if (wcscmp(sk_dialect.language_name, language) == 0)
        return &sk_dialect;
    if (wcscmp(sl_dialect.language_name, language) == 0)
        return &sl_dialect;
    if (wcscmp(sr_Cyrl_dialect.language_name, language) == 0)
        return &sr_Cyrl_dialect;
    if (wcscmp(sr_Latn_dialect.language_name, language) == 0)
        return &sr_Latn_dialect;
    if (wcscmp(sv_dialect.language_name, language) == 0)
        return &sv_dialect;
    if (wcscmp(ta_dialect.language_name, language) == 0)
        return &ta_dialect;
    if (wcscmp(th_dialect.language_name, language) == 0)
        return &th_dialect;
    if (wcscmp(tl_dialect.language_name, language) == 0)
        return &tl_dialect;
    if (wcscmp(tlh_dialect.language_name, language) == 0)
        return &tlh_dialect;
    if (wcscmp(tr_dialect.language_name, language) == 0)
        return &tr_dialect;
    if (wcscmp(tt_dialect.language_name, language) == 0)
        return &tt_dialect;
    if (wcscmp(uk_dialect.language_name, language) == 0)
        return &uk_dialect;
    if (wcscmp(ur_dialect.language_name, language) == 0)
        return &ur_dialect;
    if (wcscmp(uz_dialect.language_name, language) == 0)
        return &uz_dialect;
    if (wcscmp(vi_dialect.language_name, language) == 0)
        return &vi_dialect;
    if (wcscmp(zh_CN_dialect.language_name, language) == 0)
        return &zh_CN_dialect;
    if (wcscmp(zh_TW_dialect.language_name, language) == 0)
        return &zh_TW_dialect;
    return 0;
}

