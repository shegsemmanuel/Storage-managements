export function StorageOverview() {
  const usedPercentage = 65
  const usedGB = 82
  const totalGB = 128

  return (
    <div className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-8 text-primary-foreground shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="relative w-32 h-32">
            <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="12" />
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="white"
                strokeWidth="12"
                strokeDasharray={`${(usedPercentage / 100) * 314} 314`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold">{usedPercentage}%</span>
              <span className="text-sm opacity-90">Space used</span>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-2">Available Storage</h3>
            <p className="text-lg opacity-90">
              {usedGB}GB / {totalGB}GB
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
