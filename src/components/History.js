const History = () => {
    return (
        <div className="flex bg-slate-700 w-1/4 flex-col items-center text-center min-h-custom border-2 border-white">
            <h1 className="my-4 text-xl font-semibold text-white">History</h1>
            <div className="w-full flex flex-1 flex-col justify-between gap-1">
                <div className="flex flex-col gap-1">
                    {/* 1 history */}
                    <div className="bg-slate-900 rounded-lg h-12 w-full flex items-center justify-between px-2">
                        <h1 className="text-lg text-white">titlu</h1>
                        <button className="bg-blue-500 p-1 rounded-md">View</button>
                    </div>
                    <div className="bg-slate-900 rounded-lg h-12 w-full flex items-center justify-between px-2">
                        <h1 className="text-lg text-white">titlu</h1>
                        <button className="bg-blue-500 p-1 rounded-md">View</button>
                    </div>
                    <div className="bg-slate-900 rounded-lg h-12 w-full flex items-center justify-between px-2">
                        <h1 className="text-lg text-white">titlu</h1>
                        <button className="bg-blue-500 p-1 rounded-md">View</button>
                    </div>
                    <div className="bg-slate-900 rounded-lg h-12 w-full flex items-center justify-between px-2">
                        <h1 className="text-lg text-white">titlu</h1>
                        <button className="bg-blue-500 p-1 rounded-md">View</button>
                    </div>
                </div>
                <div className="flex p-2 bg-slate-800">
                    <h1 className="text-white">User</h1>
                </div>
            </div>
        </div>)
}

export default History