import React from "react";

export const Header = ({headerName}: { headerName: string }) => {
    return (
        <header className="bg-gray-100 py-4">
            <div className="max-w-7xl  px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                <h1 className="text-4xl font-bold text-center">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                        {headerName}
                    </span>
                </h1>
            </div>
        </header>
    );
}
