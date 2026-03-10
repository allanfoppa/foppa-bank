export const BalanceCard = ({ balance, loading }: { balance: number; loading: boolean }) => (
  <div className="bg-gradient-to-r from-blue-700 to-blue-500 p-6 rounded-2xl text-white shadow-lg">
    <p className="text-sm opacity-80 uppercase tracking-widest">Saldo Disponível</p>
    <h2 className="text-4xl font-bold mt-1">
      {loading ? "..." : `R$ ${balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
    </h2>
  </div>
);
