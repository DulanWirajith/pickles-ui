export const Header = ({headerName}: { headerName: string }) => {
    return (
        <header className="flex justify-between px-4 pt-4">
            <h1 className="text-4xl font-bold text-center">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                    {headerName}
                </span>
            </h1>
        </header>
    )
}
