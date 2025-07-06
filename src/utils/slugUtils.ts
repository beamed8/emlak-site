export function turkceKarakterleriCevir(str?: string): string {
  if (!str) return "";

  return str
    .toLocaleLowerCase("tr-TR") // Türkçe için doğru çeviri
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/\s+/g, "-");
}
