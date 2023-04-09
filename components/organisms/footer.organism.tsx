import React from "react";

export const Footer = ({lastUpdatedDate}: { lastUpdatedDate: string }) => {
    return (
        <footer className="bg-gray-800 text-gray-500 py-4 mt-auto">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">
                    <span>&copy; 2023 Code With Dulan</span>
                    <span>Last Updated: {lastUpdatedDate}</span>
                </div>
            </div>
        </footer>
    )
}
