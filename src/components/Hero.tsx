// components/Hero.tsx
export default function Hero() {
  return (
    <section className="bg-blue-600 text-white py-20 px-4 text-center">
      <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
        Evinizi Bulmanın En Kolay Yolu
      </h1>
      <p className="mb-8 text-lg max-w-xl mx-auto">
        En iyi ilanlar, en uygun fiyatlarla. Hemen aramaya başlayın!
      </p>
      <form className="max-w-xl mx-auto flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Aramak istediğiniz il, semt ya da ilan"
          className="p-3 rounded-md flex-grow text-gray-800"
        />
        <button
          type="submit"
          className="bg-yellow-400 hover:bg-yellow-300 rounded-md px-6 py-3 font-semibold text-gray-900"
        >
          Ara
        </button>
      </form>
    </section>
  );
}
