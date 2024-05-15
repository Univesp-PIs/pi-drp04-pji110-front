export function SkeletonCurriculum() {
  return (
    <main className="w-full h-screen">
      <div className="w-full flex justify-center py-16 h-full">
        <div className="max-w-screen-md w-full flex flex-col gap-8 items-center justify-between px-4 md:px-0 animate-pulse">
          <div className="flex flex-col w-full gap-10">
            <div className="w-full flex justify-between">
              <div className="h-9 w-full bg-slate-300 rounded max-w-20" />
              <div className="h-9 w-full bg-slate-300 rounded max-w-20" />
              <div className="h-9 w-full bg-slate-300 rounded max-w-24" />
            </div>
            <div className="w-full flex justify-between items-center">
              <div className="w-2/5 md:w-1/5 rounded-md">
                <div className="bg-slate-300 h-2 rounded" />
              </div>
            </div>

            <div className="w-full p-4 border rounded-md flex flex-col items-center gap-4 md:flex-row justify-between">
              <div className="w-full md:w-5/12 flex flex-col gap-4 justify-center items-center">
                <div className="rounded-full bg-slate-300 h-[200px] w-[200px] text-5xl font-medium border flex justify-center items-center" />
                <div className="h-2 w-1/2 bg-slate-300 rounded" />
                <div className="h-2 w-1/2 bg-slate-300 rounded" />
              </div>
              <div className="w-full md:w-6/12">
                <div className="w-full flex flex-col items-center gap-4">
                  <div className="h-9 w-full bg-slate-300 rounded" />
                  <div className="h-9 w-full bg-slate-300 rounded" />
                  <div className="h-9 w-full bg-slate-300 rounded" />
                  <div className="h-9 w-full bg-slate-300 rounded" />
                  <div className="h-9 w-full bg-slate-300 rounded" />
                  <div className="h-9 w-full bg-slate-300 rounded" />
                  <div className="h-9 w-full bg-slate-300 rounded" />
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col gap-10">
              <div className="h-2 w-1/3 bg-slate-300 rounded" />
              <div className="h-12 w-full bg-slate-300 rounded" />
            </div>
            <div className="w-full flex flex-col gap-10">
              <div className="h-2 w-1/3 bg-slate-300 rounded" />
              <div className="h-12 w-full bg-slate-300 rounded" />
            </div>
            <div className="w-full flex flex-col gap-10">
              <div className="h-2 w-1/3 bg-slate-300 rounded" />
              <div className="h-12 w-full bg-slate-300 rounded" />
            </div>

            <div className="w-full flex justify-start">
              <div className="w-1/3 md:w-1/5 h-12 rounded bg-slate-300" />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
